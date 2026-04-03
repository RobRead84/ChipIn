"use client";
import { motion } from "framer-motion";

const FORMSPREE_URL = "https://formspree.io/f/meepkwde";

function Header() {
  return (
    <header className="header-inner" style={{
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid var(--color-black)',
    }}>
      <div style={{
        fontFamily: 'var(--font-archivo-black), Archivo Black, sans-serif',
        fontSize: '1.6rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        CHIP<span style={{ color: 'var(--color-accent)' }}>IN</span>
      </div>
      <a
        href="#waitlist"
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.8rem',
          textDecoration: 'none',
          border: '2px solid var(--color-black)',
          padding: '8px 16px',
          color: 'var(--color-black)',
          textTransform: 'uppercase',
        }}
      >
        Get access
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" style={{
      padding: '120px 32px 100px',
      maxWidth: '1000px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.75rem',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{
          display: 'block',
          width: '40px',
          height: '2px',
          background: 'var(--color-accent)',
        }} />
        LinkedIn conversation discovery
      </motion.div>

      <motion.h1
        className="hero-headline"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-archivo-black), Archivo Black, sans-serif',
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          marginBottom: '32px',
          color: 'var(--color-black)',
        }}
      >
        Unlock the conversations{' '}
        <span style={{ color: 'var(--color-accent)', display: 'block' }}>
          you&apos;re not seeing
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        style={{
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: 'var(--color-muted)',
          maxWidth: '520px',
          marginBottom: '48px',
        }}
      >
        LinkedIn is full of conversations that could change your career, your pipeline, or your next big idea. Most of them never reach your feed. ChipIn finds them for you.
      </motion.p>

      <motion.a
        href="#waitlist"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
        style={{
          display: 'inline-block',
          background: 'var(--color-black)',
          color: 'var(--color-bg)',
          padding: '16px 40px',
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-3px, -3px)';
          e.currentTarget.style.boxShadow = '5px 5px 0 var(--color-accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Get early access →
      </motion.a>
    </section>
  );
}

function ProblemSection() {
  const painPoints = [
    "You get a notification but the message is nowhere to be found",
    "A connection shared a career-changing opportunity — you saw it 3 days later when it was too late",
    "An industry conversation could have changed your next move. You never knew it happened",
  ];

  return (
    <section className="problem-section" style={{
      background: 'var(--color-black)',
      color: 'var(--color-bg)',
      borderTop: '2px solid var(--color-black)',
      padding: '80px 32px',
    }}>
      <div style={{ maxWidth: '1000px' }}>
        <p style={{
          fontSize: '1.3rem',
          lineHeight: 1.6,
          marginBottom: '48px',
          maxWidth: '700px',
          color: 'var(--color-dim)',
        }}>
          <strong style={{ color: 'var(--color-bg)' }}>LinkedIn is the most important professional network in the world.</strong> It&apos;s where careers are built, deals are made, and industries share what they&apos;re thinking. There&apos;s more valuable conversation happening on LinkedIn right now than on any other platform.
        </p>
        <p style={{
          fontSize: '1.3rem',
          lineHeight: 1.6,
          marginBottom: '48px',
          maxWidth: '700px',
          color: 'var(--color-dim)',
        }}>
          The problem is, you&apos;re only seeing a fraction of it. LinkedIn&apos;s feed is built around your existing network and engagement patterns — showing you more of what you&apos;ve already seen, and less of what you haven&apos;t discovered yet.
        </p>

        <div className="pain-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          background: 'var(--color-border-dark)',
        }}>
          {painPoints.map((point, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-black)',
                padding: '32px',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-archivo-black), Archivo Black, sans-serif',
                fontSize: '3rem',
                color: 'var(--color-accent)',
                opacity: 0.4,
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--color-dim)',
              }}>
                {point}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2px',
          background: 'var(--color-accent)',
          color: 'var(--color-white)',
          padding: '24px 32px',
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}>
          RATED 1.2/5 ON TRUSTPILOT → 3,000+ reviews. Broken notifications and buried messages among top complaints.
          <br />
          <a
            href="https://trustpilot.com/review/www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
          >
            trustpilot.com/review/www.linkedin.com
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      label: 'DISCOVERY',
      title: 'Conversation Discovery',
      desc: "LinkedIn is where your industry talks. ChipIn surfaces the threads, posts, and discussions that matter to you — the ones LinkedIn's feed wasn't built to show you. More signal. Less algorithm.",
      hero: true,
    },
    {
      label: 'DM RELIABILITY',
      title: 'Never miss a DM',
      desc: 'LinkedIn notifications are unreliable. ChipIn delivers your direct messages consistently, so opportunities don&apos;t slip through the cracks.',
      hero: false,
    },
    {
      label: 'YOUR SIGNALS',
      title: 'You define what matters',
      desc: 'Set your signals — job titles, topics, companies, keywords. ChipIn finds the conversations that match, so LinkedIn works around what you care about.',
      hero: false,
    },
    {
      label: 'YOUR NETWORK',
      title: 'More from the network you&apos;ve already built',
      desc: "You've spent years building your LinkedIn network. ChipIn helps you get more value from it by surfacing what the algorithm filters out.",
      hero: false,
    },
  ];

  return (
    <section className="features-section" style={{
      padding: '80px 32px',
      maxWidth: '1000px',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-archivo-black), Archivo Black, sans-serif',
        fontSize: '2.5rem',
        textTransform: 'uppercase',
        marginBottom: '48px',
        color: 'var(--color-black)',
      }}>
        What ChipIn does
      </h2>

      <div style={{ display: 'grid', gap: 0 }}>
        {features.map((feature, i) => (
          <div
            className="feature-row"
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: feature.hero ? '200px 1fr' : '200px 1fr',
              borderTop: i === 0 ? '2px solid var(--color-black)' : '2px solid var(--color-border)',
              padding: feature.hero ? '40px 0' : '28px 0',
              borderBottom: i === features.length - 1 ? '2px solid var(--color-border)' : 'none',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-accent)',
              paddingTop: '4px',
            }}>
              {feature.label}
            </h3>
            <p style={{
              fontSize: feature.hero ? '1.05rem' : '0.95rem',
              lineHeight: 1.6,
              color: feature.hero ? 'var(--color-black)' : 'var(--color-muted)',
              maxWidth: '500px',
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <div className="credibility-section" style={{
      padding: '40px 32px',
      borderTop: '2px solid var(--color-border)',
    }}>
      <div className="credibility-inner" style={{
        maxWidth: '1000px',
        display: 'flex',
        gap: '48px',
        alignItems: 'baseline',
      }}>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--color-black)', fontWeight: 400 }}>
            We&apos;re building ChipIn with input from early testers.
          </strong>{' '}
          Join the waitlist to shape what we build.
        </p>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
          lineHeight: 1.6,
        }}>
          Built by professionals who got tired of missing the conversations that matter.
        </p>
      </div>
    </div>
  );
}

function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="waitlist-section"
      style={{
        background: 'var(--color-black)',
        color: 'var(--color-bg)',
        padding: '80px 32px',
        textAlign: 'center',
      }}
    >
      <h2 style={{
        fontFamily: 'var(--font-archivo-black), Archivo Black, sans-serif',
        fontSize: '2.5rem',
        textTransform: 'uppercase',
        marginBottom: '8px',
        color: 'var(--color-bg)',
      }}>
        Be first to try it
      </h2>
      <p style={{
        fontSize: '0.95rem',
        color: 'var(--color-dim)',
        marginBottom: '32px',
      }}>
        Sign up for early access. Free. No commitment.
      </p>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const res = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            e.currentTarget.innerHTML = '<p style="font-family: var(--font-space-mono), monospace; font-size: 1rem; color: var(--color-bg);">You are on the list!</p>';
          }
        }}
      >
        <div className="waitlist-form-row" style={{ display: 'flex', gap: 0 }}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              padding: '16px 20px',
              border: '2px solid var(--color-bg)',
              background: 'transparent',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.85rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '16px 28px',
              background: 'var(--color-accent)',
              color: 'var(--color-white)',
              border: '2px solid var(--color-accent)',
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            Join →
          </button>
        </div>

        <input type="hidden" name="_to" value="chipin.waitlist" />
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section" style={{
      padding: '24px 32px',
      borderTop: '2px solid var(--color-border)',
    }}>
      <div className="footer-inner" style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--color-muted)',
        fontFamily: 'var(--font-space-mono), monospace',
      }}>
        <span>CHIPIN — GET MORE FROM LINKEDIN</span>
        <span>COMING SOON / iOS + ANDROID</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main style={{ flex: 1 }}>
      <Header />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <CredibilityStrip />
      <WaitlistSection />
      <Footer />
    </main>
  );
}