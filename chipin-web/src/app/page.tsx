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

function MagneticButton({ children, className = "", type = "button" as const, ...props }: { children: React.ReactNode; className?: string; type?: "button" | "submit" | "reset" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.3);
        y.set(dy * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-[#788c5d]/10 border border-[#788c5d]/20 p-8 text-center"
      >
        <p className="text-[#788c5d] font-medium">You are on the list. We will be in touch.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-6 py-4 rounded-full border-2 border-[#b0aea5]/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#d97757] transition-colors text-[#141413]"
      />
      <MagneticButton
        type="submit"
        className="px-8 py-4 rounded-full bg-[#d97757] text-white font-semibold cursor-pointer"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Joining...
          </span>
        ) : (
          "Join waitlist"
        )}
      </MagneticButton>
    </form>
  );
}

function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <StaggerItem index={index}>
      <div className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#e8e6dc] hover:border-[#d97757]/30 hover:shadow-lg transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-[#d97757]/10 flex items-center justify-center mb-4 group-hover:bg-[#d97757]/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-[#141413] mb-2">{title}</h3>
        <p className="text-[#b0aea5] leading-relaxed">{description}</p>
      </div>
    </StaggerItem>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f5] via-[#faf9f5] to-[#e8e6dc]/50" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#d97757]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#6a9bcc]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#e8e6dc] text-[#141413] text-sm font-medium mb-6">
              Coming soon to iOS and Android
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[#141413] mb-6"
          >
            Never miss an important
            <span className="block text-[#d97757]">LinkedIn conversation</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-xl text-[#b0aea5] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Get reliable notifications and discover conversations LinkedIn hides from you. Stop missing opportunities because the algorithm buried the wrong message.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <MagneticButton
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141413] text-white font-semibold text-lg cursor-pointer"
            >
              Join the waitlist
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#141413]">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#faf9f5] mb-4">
                LinkedIn is hiding your conversations
              </h2>
              <p className="text-xl text-[#b0aea5]">
                LinkedIn serves 950 million members. But their algorithm decides which messages you see.
              </p>
            </div>
          </RevealSection>

          <div className="space-y-4">
            {[
              "You get a notification but the message is nowhere to be found",
              "Important conversations get buried under AI-generated content",
              "You miss opportunities because you never saw the right message at the right time",
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#d97757]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#d97757] text-xl">&#x2717;</span>
                  </div>
                  <p className="text-[#faf9f5] text-lg">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </div>

          <RevealSection delay={0.4}>
            <div className="mt-12 p-8 rounded-2xl bg-[#d97757]/10 border-l-4 border-[#d97757]">
              <p className="text-xl text-[#faf9f5]">
                <strong>86%</strong> of LinkedIn reviews are 1-star. The top complaint? Notification failures and missing messages.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#141413] mb-4">
                ChipIn: Your LinkedIn companion
              </h2>
              <p className="text-xl text-[#b0aea5] max-w-2xl mx-auto">
                Never miss an important LinkedIn conversation again.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              index={0}
              icon={
                <svg className="w-6 h-6 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              title="Reliable notifications"
              description="Get alerts for messages that actually matter, every time."
            />
            <FeatureCard
              index={1}
              icon={
                <svg className="w-6 h-6 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Conversation discovery"
              description="Surface conversations LinkedIn buried in the algorithm."
            />
            <FeatureCard
              index={2}
              icon={
                <svg className="w-6 h-6 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              }
              title="Smart filtering"
              description="Focus on conversations that move your career forward."
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#e8e6dc]/30">
        <RevealSection>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-semibold text-[#141413]">
              Join thousands of professionals who never miss an important LinkedIn message.
            </p>
          </div>
        </RevealSection>
      </section>

      <section id="waitlist" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#141413] mb-4">
              Be the first to know
            </h2>
            <p className="text-xl text-[#b0aea5] mb-10">
              Early supporters get founding member pricing when we launch.
            </p>
            <WaitlistForm />
          </RevealSection>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-[#e8e6dc]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d97757] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-[#141413]">ChipIn</span>
          </div>
          <p className="text-[#b0aea5] text-sm">
            Coming soon to iOS and Android
          </p>
        </div>
      </footer>
    </main>
  );
}
