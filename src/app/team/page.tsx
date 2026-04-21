"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AmbientGrid from "../../components/AmbientGrid";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } as const },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const TEAM = [
  {
    name: "Vishwanath Akuthota",
    role: "Founder",
    image: "https://thefoundrys.com/images/vishwa-new.jpg",
    bio: "Vishwanath Akuthota is a distinguished deep-tech entrepreneur and AI architect with over 1.5 decades of experience in Artificial Intelligence, Machine Learning, and Generative AI. He has been at the forefront of building world-class AI products and Large Language Model (LLM) applications. His work is characterized by a mission to develop responsible and trustworthy AI systems that align with ethical principles and industry standards.",
    linkedin: "https://www.linkedin.com/in/vishwanathakuthota/"
  },
  {
    name: "SaiPramodu",
    role: "Full Stack Developer",
    image: "/logos/team/saipramod.jpeg",
    bio: "Sai Pramodu is a Full Stack Developer experienced in building scalable, production-ready applications using React.js, Node.js, and Flutter, working across backend architecture, databases, and responsive frontend systems. He has developed secure, high-performance solutions with JWT authentication, RBAC, real-time features, and optimized APIs, while also exploring AI-driven workflows using Python and Streamlit.",
    linkedin: "#"
  },
  {
    name: "Venkata Shiva Ranga Reddy",
    role: "AI & Cybersecurity Professional",
    image: "/logos/team/shiva.jpeg",
    bio: "Venkata Shiva Ranga Reddy is an AI and cybersecurity professional focused on building secure, future-ready systems in the age of intelligent technologies. Working at the intersection of Artificial Intelligence and Cybersecurity, he develops innovative approaches to technology intelligence that keep pace with rapid advancements. He specializes in leveraging AI to transform complex data into actionable insights, while addressing critical challenges in AI adoption such as governance, compliance, and security validation. With a strong emphasis on practical implementation, he contributes to developing tools and strategies that help organizations assess and strengthen their AI defenses. Venkat’s approach combines analytical depth with execution, enabling enterprises to navigate AI-driven transformation with confidence and resilience.",
    linkedin: "#"
  },
  {
    name: "Aravind Terli",
    role: "Full Stack Developer",
    image: "/logos/team/Aravind.jpeg",
    bio: "Aravind Terli is a Full Stack Developer with has 4+ years of experience building scalable, production-ready enterprise applications. he works across the full stack from backend architecture and database design to responsive frontend interfaces — crafting systems that are both high-performing and built to last. His work spans the entire application lifecycle: designing data schemas, optimizing query performance, implementing secure authentication, and deploying cloud-hosted systems with a strong focus on reliability and scale. He brings engineering discipline and attention to detail to every layer of what he builds, with hands-on experience integrating third-party payment and compliance services in real-world production environments. What sets Aravind apart is his applied focus on AI — using intelligent models to power features like legal document generation, AI-assisted will creation, and conversational automation.",
    linkedin: "#"
  },
  {
    name: "Divya",
    role: "Business Strategist | Deep Tech & Data Insights",
    image: "/logos/divya.jpeg",
    bio: "Divya brings over a decade of IT experience combined with advanced specialization in Data Science and Business Analytics to the Dr. Pinnacle team. As a Business Strategist, she serves as a strategic catalyst, bridging the gap between complex technical architectures and high-level business objectives. With a PGDM in Data Science and a background in managing large-scale IT operations, Divya excels at transforming raw data into actionable business intelligence. Her approach is grounded in a 'no-fluff' philosophy, focusing on identifying data-driven growth opportunities and implementing lean, effective strategies that ensure enterprise-grade reliability.",
    linkedin: "#"
  },
  {
    name: "Punith Nayeeni",
    role: "QA Automation Engineer",
    image: "/logos/team/puneeth.jpeg",
    bio: "Punith is a quality-focused QA Automation Tester with 2 years of hands-on experience in content validation, quality assurance, and test automation. He has a proven ability to design and execute comprehensive test cases, identify and track defects, and ensure content accuracy, consistency, and compliance with defined standards. Skilled in leveraging automation frameworks to streamline testing processes, reduce manual effort, and improve overall efficiency, he works collaboratively with development teams to resolve issues and deliver reliable, high-quality software. He is passionate about continuous improvement and committed to delivering a seamless, defect-free user experience.",
    linkedin: "#"
  },
  {
    name: "Pakanati Jayavardhan Reddy",
    role: "Full Stack Developer",
    image: "/logos/team/jaya.jpeg",
    bio: "Pakanati Jayavardhan Reddy is a Full Stack Developer with a strong foundation in Artificial Intelligence and Machine Learning. Skilled in building scalable web applications using React, Django, and Python, along with RESTful APIs and database management systems. Developed projects including an HRMS system and a Cybercrime Incident Reporting Portal, focusing on real-world usability and system efficiency. Committed to writing clean, efficient code and delivering reliable software solutions..",
    linkedin: "#"
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--primary-bg)", minHeight: "100vh" }}>
        <section className={styles.section} style={{ paddingTop: "140px", position: "relative" }}>
          <AmbientGrid />

          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <motion.div variants={FADE_UP} style={{ color: "var(--accent)", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontWeight: "700", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.1em" }}>
                <Users size={20} /> OUR TEAM
              </motion.div>
              <motion.h1
                variants={FADE_UP}
                style={{ fontSize: "clamp(48px, 8vw, 72px)", lineHeight: 1.1, marginBottom: "24px" }}
                className={styles.sectionTitleHighlighted}
              >
                The Minds Behind the <br /><span style={{ color: "var(--accent)" }}>Trust Layer</span>.
              </motion.h1>
              <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "800px", margin: "0 auto" }}>
                We bring together expertise in deep tech, cybersecurity, and strategic business intelligence to solve the world&apos;s most complex AI reliability challenges.
              </motion.p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
              {TEAM.map((member, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "60px",
                    alignItems: "center",
                    padding: "48px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "40px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{
                    borderRadius: "32px",
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    maxWidth: "400px",
                    margin: "0 auto",
                    border: "1px solid var(--border)",
                    background: "var(--primary-bg)"
                  }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        imageRendering: "auto",
                        filter: "contrast(1.05) brightness(1.02)"
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <h2 style={{ fontSize: "36px", margin: 0 }}>{member.name}</h2>
                      <p style={{ fontSize: "18px", color: "var(--accent)", fontWeight: 600, margin: 0 }}>{member.role}</p>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "17px", lineHeight: 1.7, textAlign: "justify", margin: 0 }}>
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={styles.section} style={{ textAlign: "center", padding: "100px 20px" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>Join Our Mission.</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>
              We are always looking for passionate minds to join the OpenVals journey. If you believe you have what it takes to build the future of AI trust, let&apos;s talk.
            </p>
            <Link href="/contact" className={styles.button} style={{ background: "var(--accent)", color: "#fff" }}>
              Work With Us
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
