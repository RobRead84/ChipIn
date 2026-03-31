"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = "", type = "button" as const, disabled = false, ...props }: { children: React.ReactNode; className?: string; type?: "button" | "submit" | "reset"; disabled?: boolean }) {
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

const FORMSPREE_URL = "https://formspree.io/f/meepkwde";

function WaitlistForm() {
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setStatus("idle");
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-blue p-8 text-center max-w-lg mx-auto"
      >
        <div className="mb-4">
          <svg className="w-16 h-16 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-bold text-2xl mb-2">You are on the list!</p>
        <p className="text-white/80 text-lg mb-6">We will be in touch when ChipIn launches.</p>
        <p className="text-white/60 text-sm mb-6">Expected launch: Q2 2026</p>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2FRobRead84.github.io%2FChipIn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Share on LinkedIn
        </a>
      </motion.div>
    );
  }

  if (step === "demographics") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <p className="text-gray text-lg mb-2">Thanks! One quick question to help us understand you better.</p>
          <p className="text-gray/70 text-sm">(All questions optional - you can skip)</p>
        </div>

        <form onSubmit={handleDemographicsSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-foreground/10">
            <label className="block text-foreground font-semibold mb-3">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {["Sales Professional", "Recruiter", "Job Seeker", "Other"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(role === r ? "" : r)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all text-left ${
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

          <div className="bg-white rounded-2xl p-6 border-2 border-foreground/10">
            <label className="block text-foreground font-semibold mb-3">My main challenge is...</label>
            <div className="space-y-2">
              {["Missing messages", "Networking blind spots", "Staying visible", "Other"].map((c) => (
                <label
                  key={c}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
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
                    className="w-5 h-5 accent-blue"
                  />
                  <span className={challenge === c ? "text-blue font-medium" : "text-foreground"}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-foreground/10">
            <label className="block text-foreground font-semibold mb-3">How did you find us?</label>
            <div className="grid grid-cols-2 gap-3">
              {["LinkedIn", "Google", "Friend", "Other"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSource(source === s ? "" : s)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all text-center ${
                    source === s
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-foreground/20 text-foreground hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-3 p-4 bg-white rounded-2xl border-2 border-foreground/10 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-blue"
            />
            <span className="text-foreground/80 text-sm">I agree to receive updates from ChipIn about product news and launch announcements.</span>
          </label>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="px-6 py-4 rounded-full border-2 border-foreground/20 text-foreground font-semibold hover:border-foreground/40 transition-colors"
            >
              Back
            </button>
            <MagneticButton
              type="submit"
              className="flex-1 px-8 py-4 rounded-full bg-blue text-white font-semibold cursor-pointer shadow-lg shadow-blue/30"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Complete Signup"
              )}
            </MagneticButton>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-6 py-4 rounded-full border-2 border-foreground/20 bg-white focus:outline-none focus:border-blue transition-colors text-foreground"
        />
        <MagneticButton
          type="submit"
          className="px-8 py-4 rounded-full bg-blue text-white font-semibold cursor-pointer shadow-lg shadow-blue/30"
        >
          Join waitlist
        </MagneticButton>
      </form>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <StaggerItem index={index}>
      <div className="group relative p-8 rounded-2xl bg-white border-2 border-sand/40 hover:border-blue hover:shadow-xl transition-all duration-300 h-full">
        <div className="w-14 h-14 rounded-2xl bg-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-gray leading-relaxed text-lg">{description}</p>
      </div>
    </StaggerItem>
  );
}

function ProblemItem({ text, index }: { text: string; index: number }) {
  return (
    <StaggerItem index={index}>
      <div className="flex items-start gap-4 p-6 rounded-xl bg-foreground/50 backdrop-blur-sm border border-white/10">
        <div className="w-10 h-10 rounded-full bg-blue flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-lg font-bold">&#x2717;</span>
        </div>
        <p className="text-white text-xl leading-relaxed">{text}</p>
      </div>
    </StaggerItem>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8f7f4] to-cream/30" />
        <div className="absolute top-32 left-[10%] w-[500px] h-[500px] bg-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-32 right-[10%] w-[600px] h-[600px] bg-slate/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-blue text-white text-sm font-semibold mb-8 shadow-lg shadow-blue/20">
              Coming soon to iOS and Android
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-foreground mb-8 leading-[1.05]"
          >
            Never miss an important
            <span className="block text-blue">LinkedIn conversation</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Get reliable notifications and discover conversations LinkedIn hides from you. Stop missing opportunities because the algorithm buried the wrong message.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <MagneticButton
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-white font-bold text-xl cursor-pointer shadow-xl shadow-foreground/20"
            >
              Join the waitlist
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-foreground">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                LinkedIn is hiding your conversations
              </h2>
              <p className="text-2xl text-cream max-w-2xl mx-auto">
                LinkedIn serves 950 million members. But their algorithm decides which messages you see - and it is notoriously unreliable.
              </p>
            </div>
          </RevealSection>

          <div className="space-y-5">
            <ProblemItem index={0} text="You get a notification but the message is nowhere to be found" />
            <ProblemItem index={1} text="Important conversations get buried under AI-generated content" />
            <ProblemItem index={2} text="You miss opportunities because you never saw the right message at the right time" />
          </div>

          <RevealSection delay={0.4}>
            <div className="mt-16 p-10 rounded-2xl bg-blue shadow-2xl shadow-blue/30">
              <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
                <strong className="text-4xl">86%</strong> of LinkedIn reviews are 1-star. The top complaint? Notification failures and missing messages.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-white to-[#f8f7f4]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                ChipIn: Your LinkedIn companion
              </h2>
              <p className="text-2xl text-gray max-w-2xl mx-auto">
                Never miss an important LinkedIn conversation again.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              index={0}
              icon={
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              title="Reliable notifications"
              description="Get alerts for messages that actually matter, delivered every time without fail."
            />
            <FeatureCard
              index={1}
              icon={
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Conversation discovery"
              description="Surface conversations LinkedIn buried in the algorithm before they disappear."
            />
            <FeatureCard
              index={2}
              icon={
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              }
              title="Smart filtering"
              description="Focus on conversations that move your career forward, not noise."
            />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-cream">
        <RevealSection>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-bold text-foreground leading-snug">
              Join thousands of professionals who never miss an important LinkedIn message.
            </p>
          </div>
        </RevealSection>
      </section>

      <section id="waitlist" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Be the first to know
            </h2>
            <p className="text-2xl text-gray mb-12">
              Early supporters get founding member pricing when we launch.
            </p>
            <WaitlistForm />
          </RevealSection>
        </div>
      </section>

      <footer className="py-16 px-6 bg-foreground">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-white">ChipIn</span>
          </div>
          <p className="text-cream">
            Coming soon to iOS and Android
          </p>
        </div>
      </footer>
    </main>
  );
}
