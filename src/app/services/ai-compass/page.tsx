"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Target, 
  Lightbulb, 
  ShieldAlert, 
  Users, 
  Map, 
  ClipboardCheck,
  Briefcase,
  Cpu,
  Bot,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import styles from "../../../components/ui.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AmbientGrid from "../../../components/AmbientGrid";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 20 } }
} as const;

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

export default function AICompassPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pillars = [
    { icon: ClipboardCheck, title: "1. AI Readiness Assessment", desc: "Evaluate your organization's preparedness across people, processes, data, and technology." },
    { icon: Target, title: "2. Strategic Alignment", desc: "Define how AI initiatives align with your business vision, goals, and growth strategy." },
    { icon: Lightbulb, title: "3. Opportunity Identification", desc: "Discover high-impact AI use cases tailored to your industry and operations." },
    { icon: ShieldAlert, title: "4. Risk Evaluation", desc: "Assess technical, operational, and ethical risks associated with AI implementation." },
    { icon: Users, title: "5. Vendor & Solution Selection", desc: "Choose the right tools, platforms, and partners based on performance and scalability." },
    { icon: Map, title: "6. Implementation Roadmap", desc: "Create a phased, scalable roadmap for seamless AI integration and execution." }
  ];

  const faqs = [
    { q: "What is AI Compass?", a: "AI Compass is a strategic consulting framework that helps organizations adopt AI in a structured, scalable, and results-driven way." },
    { q: "How does AI Compass work?", a: "It evaluates your readiness, identifies opportunities, mitigates risks, and provides a roadmap for successful AI implementation." },
    { q: "Who should use AI Compass?", a: "Business leaders, CTOs, CIOs, and AI teams looking to implement AI effectively across their organization." },
    { q: "Is AI Compass suitable for startups?", a: "Yes. It helps startups avoid costly mistakes and build AI systems with a strong foundation." },
    { q: "How long does implementation take?", a: "It depends on the organization's size and goals, but typically ranges from a few weeks (assessment) to a few months (full roadmap execution)." }
  ];

  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        
        {/* HERO SECTION */}
        <section className={styles.section} style={{ paddingTop: "80px", paddingBottom: "60px", position: "relative" }}>
          <AmbientGrid />
          <motion.div initial="hidden" animate="show" variants={STAGGER} style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.div variants={FADE_UP} style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              padding: "6px 16px", 
              background: "rgba(59, 130, 246, 0.1)", 
              borderRadius: "100px",
              color: "var(--accent)",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.2em",
              marginBottom: "24px",
              border: "1px solid rgba(59, 130, 246, 0.2)"
            }}>
              <Compass size={16} /> AI COMPASS
            </motion.div>
            
            <motion.h1 variants={FADE_UP} style={{ 
              fontSize: "clamp(32px, 6vw, 72px)", 
              fontWeight: 400, 
              lineHeight: 1.2, 
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              color: "var(--text-main)"
            }}>
              Navigate AI with <span style={{ fontWeight: 800 }}>Confidence.</span><br />
              <span style={{ color: "var(--accent)", fontWeight: 800 }}>Build with Clarity.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} style={{ 
              fontSize: "clamp(18px, 2vw, 22px)", 
              color: "var(--text-muted)", 
              lineHeight: 1.6, 
              maxWidth: "800px", 
              margin: "0 auto 40px" 
            }}>
              AI Compass is your strategic partner in transforming ideas into impactful AI solutions. 
              From readiness assessment to full-scale implementation, we help you unlock real business value with AI.
            </motion.p>

            <motion.div variants={FADE_UP}>
              <Link href="/apply" className={`${styles.button} ${styles.primary}`} style={{ padding: "18px 40px", fontSize: "16px" }}>
                Schedule a Free Consultation &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}>
                <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginBottom: "32px", letterSpacing: "-0.01em" }}>
                  What is AI Compass?
                </motion.h2>
                <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
                  AI Compass is a comprehensive AI consulting framework designed by TechOptima to guide organizations through every stage of their AI journey.
                </motion.p>
                <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.8 }}>
                  We help businesses move beyond experimentation and toward structured, scalable, and measurable AI adoption. Our approach ensures that every AI initiative is:
                </motion.p>
                <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {[
                    "Strategically aligned with goals",
                    "Technically feasible & scalable",
                    "Risk-aware and secure",
                    "Designed for long-term success"
                  ].map((item, i) => (
                    <motion.div key={i} variants={FADE_UP} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600" }}>
                      <CheckCircle2 color="var(--accent)" size={20} /> {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ background: "var(--primary-bg)", padding: "48px", borderRadius: "32px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
                <p style={{ fontSize: "24px", fontWeight: "500", lineHeight: 1.5 }}>
                  "With AI Compass, organizations can confidently navigate complexity, reduce uncertainty, and accelerate innovation."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY AI COMPASS & BENEFITS */}
        <section className={styles.section}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "20px" }}>Why AI Compass?</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
                Many AI projects fail — not due to lack of technology, but due to lack of clarity, direction, and strategy.
              </p>
            </div>
            
            <div className={styles.grid}>
              {[
                { title: "Strategic Clarity", desc: "Align AI initiatives directly with business objectives and measurable outcomes." },
                { title: "Risk Mitigation", desc: "Identify gaps, challenges, and risks early before costly mistakes occur." },
                { title: "Resource Optimization", desc: "Make smarter decisions on budget, tools, and team capabilities." },
                { title: "Measurable Success", desc: "Define clear KPIs and track performance at every stage." }
              ].map((benefit, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className={styles.card} style={{ padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "16px", color: "var(--accent)" }}>{benefit.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.6 }}>{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SIX PILLARS FRAMEWORK */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "16px" }}>Our AI Compass Framework</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>Six essential pillars that ensure successful AI adoption</p>
            </div>
            
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
              {pillars.map((pillar, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }} 
                  style={{ 
                    padding: "32px", 
                    background: "rgba(255,255,255,0.02)", 
                    borderRadius: "20px", 
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "12px", 
                    background: "rgba(59, 130, 246, 0.12)", 
                    display: "grid", 
                    placeItems: "center", 
                    color: "var(--accent)",
                    border: "1px solid rgba(59, 130, 246, 0.2)"
                  }}>
                    <pillar.icon size={24} strokeWidth={2.5} style={{ display: "block", margin: 0 }} />
                  </div>
                  <h4 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>{pillar.title}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO SHOULD USE? */}
        <section className={styles.section}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 700, textAlign: "center", marginBottom: "64px" }}>Who Should Use AI Compass?</h2>
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
              {[
                { icon: Briefcase, title: "Business Leaders & Executives", desc: "Drive growth, efficiency, and competitive advantage through AI." },
                { icon: Cpu, title: "CTOs & CIOs", desc: "Lead technology transformation and infrastructure modernization." },
                { icon: Bot, title: "AI & Data Science Leaders", desc: "Bring clarity and direction to enterprise-wide AI initiatives." }
              ].map((user, i) => (
                <div key={i} style={{ textAlign: "center", padding: "40px" }}>
                   <div style={{ color: "var(--accent)", display: "inline-flex", padding: "20px", background: "var(--secondary-bg)", borderRadius: "50%", marginBottom: "24px" }}>
                     <user.icon size={32} />
                   </div>
                   <h4 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{user.title}</h4>
                   <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>{user.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRY USE CASES */}
        <section className={styles.section} style={{ background: "var(--primary-bg)", borderTop: "1px solid var(--border)" }}>
           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, textAlign: "center", marginBottom: "64px" }}>Industry Use Cases</h2>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
                {[
                  { domain: "Healthcare", use: "Predictive analytics & diagnostics" },
                  { domain: "Retail", use: "Personalization & demand forecasting" },
                  { domain: "Finance", use: "Fraud detection & risk modeling" },
                  { domain: "Manufacturing", use: "Process automation & optimization" },
                  { domain: "Education", use: "Intelligent learning systems" }
                ].map((item, i) => (
                  <div key={i} style={{ padding: "24px 32px", background: "var(--secondary-bg)", border: "1px solid var(--border)", borderRadius: "16px" }}>
                    <div style={{ fontWeight: 800, color: "var(--accent)", marginBottom: "4px" }}>{item.domain}</div>
                    <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>{item.use}</div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* FAQ SECTION */}
        <section className={styles.section} style={{ background: "var(--secondary-bg)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "40px", fontWeight: 800, textAlign: "center", marginBottom: "64px" }}>FAQ Section</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: "var(--primary-bg)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden" }}>
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    style={{ width: "100%", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: 700 }}>{faq.q}</span>
                    <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}><ChevronDown /></motion.div>
                  </button>
                  {activeFaq === i && (
                    <div style={{ padding: "0 24px 24px", color: "var(--text-muted)", lineHeight: 1.6 }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className={styles.section} style={{ background: "var(--accent)", color: "#fff", textAlign: "center" }}>
           <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 700, marginBottom: "24px", color: "#fff" }}>Ready to transform your business with AI?</h2>
              <p style={{ fontSize: "20px", marginBottom: "40px", opacity: 0.9 }}>
                Start your journey with AI Compass today and turn complexity into clarity.
              </p>
              <Link href="/apply" className={styles.button} style={{ background: "#fff", color: "var(--accent)", padding: "18px 40px", fontWeight: 800 }}>
                Schedule Your Free Consultation Now
              </Link>
           </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
