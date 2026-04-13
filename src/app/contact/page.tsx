"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, Variants } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import styles from "../../components/ui.module.css";

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as any },
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

const offices = [
    {
        country: "India",
        city: "Jubilee Hills",
        address: "Sasi Icon, Beside Madhapur Metro Station, Jubilee Hills Road No 36 & 37, Hyderabad, Telangana - 500033",
    },
    {
        country: "Australia",
        city: "Googong",
        address: "84 Erskine Loop, Googong NSW 2620, Australia",
    },
    {
        country: "USA",
        city: "Virginia",
        address: "2343 Dulles Station Blvd Apt 256, Herndon, Virginia 20171",
    },
    {
        country: "UK",
        city: "Leicestershire",
        address: "11 Samphire Cl, Hamilton, Leicester LE5 1RW, UK",
    },
    {
        country: "Qatar",
        city: "Doha City",
        address: "Office 1, Building 69, Street 220, Zone 26, PO Box 7894, Doha",
    },
];

export default function Contact() {
    return (
        <>
            <Header />

            <main>
                {/* Hero Section */}
                <section className={styles.section} style={{ paddingTop: "clamp(80px, 15vw, 150px)", backgroundColor: "var(--primary-bg)" }}>
                    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={STAGGER}
                        >
                            <motion.h1 variants={FADE_UP} style={{ fontSize: "clamp(48px, 8vw, 80px)", margin: "0 0 24px 0", lineHeight: 1.1, color: "var(--text-main)" }}>
                                Say <span style={{ color: "var(--accent)" }}>Hello</span>.
                            </motion.h1>
                            <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6, margin: "0 auto 60px" }}>
                                Whether you're looking for admissions, partnership, or just want to see our campus, we're here to help. Reach out to us directly or visit one of our global offices.
                            </motion.p>
                        </motion.div>

                        {/* Quick Contact Cards */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={STAGGER}
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "40px" }}
                        >
                            <motion.a
                                href="tel:+917981171474"
                                variants={FADE_UP}
                                className={styles.card}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}
                            >
                                <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "var(--secondary-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                                    <Phone size={28} style={{ color: "var(--accent)" }} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Call Us</span>
                                <span style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--text-main)" }}>+91 79811 71474</span>
                            </motion.a>

                            <motion.a
                                href="mailto:openvals.drp@gmail.com"
                                variants={FADE_UP}
                                className={styles.card}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}
                            >
                                <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "var(--secondary-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                                    <Mail size={28} style={{ color: "var(--accent)" }} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Email Us</span>
                                <span style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "var(--text-main)" }}>openvals.drp@gmail.com</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </section>

                {/* Offices Section */}
                <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
                        <div style={{ marginBottom: "60px" }}>
                            <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 16px 0", color: "var(--text-main)" }}>Our Locations</motion.h2>
                            <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", margin: 0 }}>Find us in major cities across the globe.</motion.p>
                        </div>

                        <motion.div className={styles.grid} variants={STAGGER} style={{ marginTop: 0 }}>
                            {offices.map((office, index) => (
                                <motion.div key={index} className={styles.card} variants={FADE_UP} style={{ padding: "40px 30px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                                        <MapPin size={18} style={{ color: "var(--accent)" }} />
                                        <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
                                            {office.country}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 16px 0", color: "var(--text-main)" }}>
                                        {office.city}
                                    </h3>
                                    <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                                        {office.address}
                                    </p>
                                    <button style={{
                                        display: "flex", alignItems: "center", gap: "8px", fontSize: "12px",
                                        fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em",
                                        color: "var(--text-main)", background: "none", border: "none", padding: 0,
                                        cursor: "pointer", transition: "color 0.2s"
                                    }}>
                                        Directions <ArrowRight size={14} />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </>
    );
}
