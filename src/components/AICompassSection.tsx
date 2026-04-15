"use client";

import { motion, Variants } from "framer-motion";
import { Compass, Target, Zap, ShieldCheck, Database, Award, Users, BookOpen, HelpCircle, CheckCircle2 } from "lucide-react";
import styles from "./ui.module.css";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PILLARS = [
  {
    icon: Compass,
    title: "1. AI Readiness Assessment",
    desc: "Evaluate your organizational preparedness across people, processes, data, and technology."
  },
  {
    icon: Target,
    title: "2. Strategic Alignment",
    desc: "Clearly define how AI supports your broader business goals and innovation strategies."
  },
  {
    icon: Database,
    title: "3. Opportunity Identification",
    desc: "Discover high-impact AI opportunities through value mapping and capability assessments."
  },
  {
    icon: ShieldCheck,
    title: "4. Risk Evaluation",
    desc: "Systematically assess market, operational, and technological risks associated with your AI initiatives."
  },
  {
    icon: Zap,
    title: "5. Vendor and Solution Selection",
    desc: "Objectively evaluate AI vendors and solutions against clear performance metrics and strategic alignment."
  },
  {
    icon: Award,
    title: "6. Implementation Roadmap",
    desc: "Create a phased, scalable roadmap that ensures AI integration is sustainable and impactful."
  }
];

export default function AICompassSection() {
  return (
    <section className={styles.section} id="framework" style={{ background: "var(--secondary-bg)", overflow: "hidden", paddingTop: "60px" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none", background: "radial-gradient(circle at 70% 30%, var(--accent) 0%, transparent 50%)" }}></div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 56px)", marginBottom: "24px" }}>Guiding Innovation,<br /><span style={{ color: "var(--accent)" }}>Securing Intelligence.</span></motion.h2>
          <motion.p variants={FADE_UP} style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text-muted)", fontSize: "18px", lineHeight: "1.7", fontStyle: "italic" }}>
            &quot;AI Compass is a comprehensive consulting framework designed by OpenVals to guide organizations through the complexities of AI adoption and integration. It ensures that AI initiatives are not only strategically aligned but also deliver measurable and sustainable results.&quot;
          </motion.p>
        </div>

        <div className={styles.frameworkGrid} style={{ marginBottom: "100px" }}>
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={FADE_UP}
              style={{
                background: "var(--primary-bg)",
                padding: "32px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ color: "var(--accent)", marginBottom: "20px" }}>
                <pillar.icon size={28} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: "var(--text-main)" }}>{pillar.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6", flexGrow: 1 }}>{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "60px", alignItems: "center" }}>
          <motion.div variants={FADE_UP}>
            <h3 style={{ fontSize: "32px", marginBottom: "32px" }}>Why AI Compass?</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "40px", lineHeight: "1.8" }}>
              AI projects fail when companies leap directly into implementation without understanding readiness or strategic alignment.
              AI Compass fills this gap by delivering clarity and confidence.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { title: "Strategic Clarity", desc: "Align AI with your organization's core strategic objectives." },
                { title: "Risk Mitigation", desc: "Identify potential risks and capability gaps before costly deployments." },
                { title: "Resource Optimization", desc: "Ensure effective allocation of talent, technology, and budget." },
                { title: "Measurable Success", desc: "Establish metrics and benchmarks to track AI performance outcomes." }
              ].map((benefit, i) => (
                <div key={i} style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flexShrink: 0, marginTop: "4px", color: "var(--accent)" }}><CheckCircle2 size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>{benefit.title}</h4>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={FADE_UP}
            style={{
              background: "var(--primary-bg)",
              padding: "48px",
              borderRadius: "24px",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ fontSize: "24px", marginBottom: "32px", textAlign: "center" }}>Who Should Use AI Compass?</h3>
            <div style={{ display: "grid", gap: "24px" }}>
              {[
                { role: "Business Leaders & Executives", detail: "Aiming for strategic growth and competitive advantage.", icon: Award },
                { role: "CTOs & CIOs", detail: "Responsible for technology adoption, innovation, and infrastructure.", icon: Zap },
                { role: "AI & Data Science Leaders", detail: "Who require clarity and direction for enterprise-wide initiatives.", icon: Users }
              ].map((user, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "20px", background: "var(--secondary-bg)", borderRadius: "16px", border: "1px solid var(--border)" }}>
                  <div style={{ color: "var(--accent)" }}><user.icon size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{user.role}</h4>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{user.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
