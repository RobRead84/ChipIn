"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/meepkwde";

function MagneticButton({ children, className = "", type = "button" as const, disabled = false, onClick, ...props }: { children: React.ReactNode; className?: string; type?: "button" | "submit" | "reset"; disabled?: boolean; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (disabled) return;
        const rect = ref.current!.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.3);
        y.set(dy * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<"email" | "demographics" | "success">("email");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("");
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("demographics");
  };

  const handleDemographicsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("role", role);
    formData.append("challenge", challenge);
    formData.append("source", source);
    formData.append("consent", String(consent));
    formData.append("_to", "chipin.waitlist");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setStatus("idle");
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl bg-blue p-6 text-center ${compact ? "max-w-sm" : "max-w-lg mx-auto"}`}
      >
        <p className="text-white font-bold text-xl mb-1">You are on the list!</p>
        <p className="text-white/80 text-sm mb-4">We will be in touch when ChipIn launches.</p>
        {compact ? null : <p className="text-white/60 text-xs mb-4">Expected launch: Q2 2026</p>}
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2FRobRead84.github.io%2FChipIn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Share on LinkedIn
        </a>
      </motion.div>
    );
  }

  if (step === "demographics") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${compact ? "max-w-md" : "w-full max-w-lg mx-auto"}`}
      >
        <p className="text-gray text-center mb-4 text-sm">(All questions optional - you can skip)</p>
        <form onSubmit={handleDemographicsSubmit} className="space-y-4">
          <div className="bg-white rounded-xl p-4 border-2 border-foreground/10">
            <label className="block text-foreground font-medium mb-2 text-sm">I am a...</label>
            <div className="grid grid-cols-2 gap-2">
              {["Sales Professional", "Recruiter", "Job Seeker", "Other"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(role === r ? "" : r)}
                  className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                    role === r
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-foreground/20 text-foreground hover:border-foreground/40"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-foreground/10">
            <label className="block text-foreground font-medium mb-2 text-sm">My main challenge is...</label>
            <div className="space-y-1">
              {["Missing messages", "Networking blind spots", "Staying visible", "Other"].map((c) => (
                <label
                  key={c}
                  className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                    challenge === c
                      ? "border-blue bg-blue/5"
                      : "border-foreground/20 hover:border-foreground/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="challenge"
                    value={c}
                    checked={challenge === c}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-4 h-4 accent-blue"
                  />
                  <span className={challenge === c ? "text-blue font-medium" : "text-foreground"}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-2 p-3 bg-white rounded-xl border-2 border-foreground/10 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-blue"
            />
            <span className="text-foreground/70 text-xs">I agree to receive updates from ChipIn.</span>
          </label>

          {error && (
            <p className="text-red-500 text-center text-xs">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="px-4 py-2 rounded-full border-2 border-foreground/20 text-foreground text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              Back
            </button>
            <MagneticButton
              type="submit"
              className="flex-1 px-4 py-2 rounded-full bg-blue text-white text-sm font-semibold cursor-pointer"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Complete Signup"}
            </MagneticButton>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <div className={`${compact ? "max-w-md" : "w-full max-w-md mx-auto"}`}>
      <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-full border-2 border-foreground/20 bg-white focus:outline-none focus:border-blue transition-colors text-foreground text-sm"
        />
        <MagneticButton
          type="submit"
          className="px-6 py-3 rounded-full bg-blue text-white font-semibold cursor-pointer text-sm"
        >
          Join waitlist
        </MagneticButton>
      </form>
    </div>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
      className="relative w-[280px] md:w-[320px] mx-auto md:mx-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-slate/20 rounded-[3rem] blur-2xl" />
      <div className="relative bg-charcoal rounded-[3rem] p-2 shadow-2xl">
        <div className="bg-foreground rounded-[2.5rem] overflow-hidden border-4 border-charcoal">
          <div className="bg-charcoal px-6 py-3 flex items-center justify-between">
            <div className="w-16 h-6 bg-foreground rounded-full" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue rounded-full" />
              <div className="w-2 h-2 bg-slate rounded-full" />
              <div className="w-2 h-2 bg-green rounded-full" />
            </div>
          </div>
          <div className="bg-white p-4 space-y-3">
            <div className="flex items-center gap-3 p-2 bg-blue/5 rounded-xl border border-blue/20">
              <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">ChipIn</p>
                <p className="text-[10px] text-gray">Never miss a message</p>
              </div>
              <span className="text-[10px] text-gray">now</span>
            </div>
            <div className="p-3 bg-foreground/5 rounded-xl">
              <p className="text-xs text-foreground font-medium">3 new conversations found</p>
              <p className="text-[10px] text-gray mt-1">LinkedIn buried these from you</p>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue/10 rounded-lg">
              <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-medium text-foreground">Apple has released new tech</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue/10 rounded-lg">
              <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-medium text-foreground">Marie has connected with CEO at Apple</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue/10 rounded-lg">
              <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs font-medium text-foreground">Apple CEO has started a new community for Gen Z</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [showHeroForm, setShowHeroForm] = useState(false);

  return (
    <main className="flex-1">
      <section className="relative min-h-[70dvh] flex items-center overflow-hidden bg-white py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8f7f4] to-cream/30" />
        <div className="absolute top-20 left-[5%] w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-slate/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-blue text-white text-sm font-semibold mb-6 shadow-lg shadow-blue/20">
                  Coming soon to iOS and Android
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4 leading-[1.05]"
              >
                Never miss an important
                <span className="block text-blue">LinkedIn conversation</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray mb-8 leading-relaxed"
              >
                Get reliable notifications and discover conversations LinkedIn hides from you.
              </motion.p>
              
              {!showHeroForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                >
                  <MagneticButton
                    onClick={() => setShowHeroForm(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-white font-bold text-lg cursor-pointer shadow-xl shadow-foreground/20"
                  >
                    Join the waitlist
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md"
                >
                  <WaitlistForm compact />
                </motion.div>
              )}
            </div>
            
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-foreground">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Have you ever noticed how the algorithm is just showing you the same mundane stuff? This is because Linkedin is hiding conversations from you.
            </h2>
            <p className="text-lg text-cream max-w-xl mx-auto">
              LinkedIn serves 950 million members. But their algorithm decides which messages you see.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              "You get a notification but the message is nowhere to be found",
              "Important conversations get buried under AI-generated content",
              "You miss opportunities because you never saw the right message"
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-foreground/50 backdrop-blur-sm border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">&#x2717;</span>
                </div>
                <p className="text-white text-base leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-10 p-6 rounded-2xl bg-blue shadow-xl shadow-blue/30"
          >
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              <strong className="text-2xl">86%</strong> of LinkedIn reviews are 1-star. The top complaint? Notification failures and missing messages.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-white to-[#f8f7f4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              ChipIn: Your LinkedIn companion
            </h2>
            <p className="text-lg text-gray max-w-xl mx-auto">
              Never miss an important LinkedIn conversation again.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
                title: "Reliable notifications",
                desc: "Get alerts for messages that actually matter, delivered every time without fail."
              },
              {
                icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                title: "Conversation discovery",
                desc: "Surface conversations LinkedIn buried in the algorithm before they disappear."
              },
              {
                icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
                title: "Smart filtering",
                desc: "Focus on conversations that move your career forward, not noise."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white border-2 border-sand/40 hover:border-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-gray text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
            Join a wave of new professionals who want to discover new LinkedIn messages and create a bigger network.
          </p>
        </div>
      </section>

      <section id="waitlist" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Be the first to know
          </h2>
          <p className="text-lg text-gray mb-8">
            Early supporters get founding member pricing when we launch.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <footer className="py-10 px-6 bg-foreground">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-lg text-white">ChipIn</span>
          </div>
          <p className="text-cream text-sm">
            Coming soon to iOS and Android
          </p>
        </div>
      </footer>
    </main>
  );
}