"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, Variants } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import styles from "../../components/ui.module.css";

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as const },
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
        city: "Hamilton",
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
                            <motion.h1 
                                variants={FADE_UP} 
                                style={{ fontSize: "clamp(48px, 8vw, 80px)", margin: "0 0 24px 0", lineHeight: 1.1, color: "var(--text-main)" }}
                                className={styles.sectionTitleHighlighted}
                            >
                                Say <span style={{ color: "var(--accent)" }}>Hello</span>.
                            </motion.h1>
                            <motion.p variants={FADE_UP} style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-muted)", lineHeight: 1.6, margin: "0 auto 60px" }}>
                                Whether you&apos;re looking for admissions, partnership, or just want to see our campus, we&apos;re here to help. Reach out to us directly or visit one of our global offices.
                            </motion.p>
                        </motion.div>

                        {/* Quick Contact Cards */}

                    </div>
                </section>

                {/* Offices Section */}
                <section className={styles.section} style={{ backgroundColor: "var(--secondary-bg)" }}>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
                        <div style={{ marginBottom: "60px" }}>
                            <motion.h2 variants={FADE_UP} style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 16px 0", color: "var(--text-main)" }}>Our Locations</motion.h2>
                            <motion.p variants={FADE_UP} style={{ fontSize: "18px", color: "var(--text-muted)", margin: 0 }}>Find us in major cities across the globe.</motion.p>
                        </div>

                        <motion.div className={styles.officeGrid} variants={STAGGER}>
                            {offices.map((office, index) => (
                                <motion.div 
                                    key={index} 
                                    className={`${styles.officeCard} ${index === 0 ? styles.officeCardPrimary : ""}`}
                                    variants={FADE_UP}
                                >
                                    <div className={styles.officeCardContent}>
                                        <div className={styles.officeLabel}>
                                            <MapPin size={16} />
                                            <span>{office.country}</span>
                                        </div>
                                        <h3 className={styles.officeTitle}>{office.city}</h3>
                                        <p className={styles.officeAddress} style={{ maxWidth: index === 0 ? "600px" : "100%" }}>
                                            {office.address}
                                        </p>
                                    </div>
                                    <button className={styles.directionLink}>
                                        DIRECTIONS <ArrowRight size={14} />
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
