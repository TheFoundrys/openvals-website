"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Database,
  Activity,
  ShieldAlert,
  FileBadge2,
  Gauge,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Printer,
  Calendar,
  TrendingUp,
  Lock,
  RefreshCw,
  AlertTriangle,
  Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGrid from "@/components/AmbientGrid";
import Link from "next/link";
import styles from "@/components/ui.module.css";

// Questions structured under 6 pillars
interface Question {
  id: number;
  text: string;
  shortName: string;
}

interface Pillar {
  title: string;
  description: string;
  icon: React.ElementType;
  questions: Question[];
}

const pillars: Pillar[] = [
  {
    title: "Strategy & Leadership",
    description: "Assess executive support, strategic alignment, and overall risk posture.",
    icon: Compass,
    questions: [
      { id: 1, text: "Do you have a documented AI strategy?", shortName: "Documented AI Strategy" },
      { id: 2, text: "Is executive leadership actively involved in AI initiatives?", shortName: "Executive Leadership Involvement" },
      { id: 3, text: "Are business objectives clearly defined for AI projects?", shortName: "Clear AI Business Objectives" },
      { id: 4, text: "Do you have AI-specific governance policies?", shortName: "AI Governance Policies" },
      { id: 5, text: "Have AI risks been identified and documented?", shortName: "AI Risk Assessment" },
    ],
  },
  {
    title: "Data Readiness",
    description: "Evaluate data governance, quality, security, and usage boundaries.",
    icon: Database,
    questions: [
      { id: 6, text: "Do you have defined data ownership across business units?", shortName: "Data Ownership & Stewardship" },
      { id: 7, text: "Are data quality standards established?", shortName: "Data Quality Standards" },
      { id: 8, text: "Do you classify sensitive data before AI usage?", shortName: "Sensitive Data Classification" },
      { id: 9, text: "Are data access controls enforced?", shortName: "Data Access Controls" },
      { id: 10, text: "Do you continuously monitor data quality?", shortName: "Continuous Data Quality Monitoring" },
    ],
  },
  {
    title: "AI Model Validation",
    description: "Verify model evaluation methods, drift checking, and output benchmarking.",
    icon: Activity,
    questions: [
      { id: 11, text: "Do you benchmark AI models before deployment?", shortName: "Pre-deployment Model Benchmarking" },
      { id: 12, text: "Do you measure accuracy against business objectives?", shortName: "Business-aligned Accuracy Metrics" },
      { id: 13, text: "Do you evaluate hallucination rates?", shortName: "Hallucination & Bias Evaluation" },
      { id: 14, text: "Do you validate outputs using human review?", shortName: "Human-in-the-Loop Validation" },
      { id: 15, text: "Do you test AI systems using real-world scenarios?", shortName: "Real-world Scenario Testing" },
    ],
  },
  {
    title: "AI Security",
    description: "Measure protection against injection attacks, data leaks, and model exploits.",
    icon: ShieldAlert,
    questions: [
      { id: 16, text: "Have you tested for prompt injection vulnerabilities?", shortName: "Prompt Injection Testing" },
      { id: 17, text: "Do you perform AI red teaming exercises?", shortName: "AI Red Teaming" },
      { id: 18, text: "Have you assessed risks of data leakage?", shortName: "Data Leakage Assessments" },
      { id: 19, text: "Are AI APIs protected using security controls?", shortName: "API Security Protections" },
      { id: 20, text: "Do you continuously monitor AI security events?", shortName: "AI Security Event Monitoring" },
    ],
  },
  {
    title: "Compliance & Governance",
    description: "Review audit readiness, documentation, and regulatory compliance paths.",
    icon: FileBadge2,
    questions: [
      { id: 21, text: "Do you maintain AI usage policies?", shortName: "AI Usage & Access Policies" },
      { id: 22, text: "Can AI decisions be audited?", shortName: "Auditability of AI Decisions" },
      { id: 23, text: "Do you maintain model documentation?", shortName: "Model Cards & Documentation" },
      { id: 24, text: "Have you assessed compliance obligations?", shortName: "Regulatory Compliance Reviews" },
      { id: 25, text: "Do you conduct regular AI governance reviews?", shortName: "AI Governance Audits" },
    ],
  },
  {
    title: "Operations & Monitoring",
    description: "Check live model tracking, logging, rollbacks, and incident handling.",
    icon: Gauge,
    questions: [
      { id: 26, text: "Do you monitor model drift?", shortName: "Model Drift Monitoring" },
      { id: 27, text: "Do you monitor AI performance in production?", shortName: "Production Performance Monitoring" },
      { id: 28, text: "Do you have rollback procedures for AI failures?", shortName: "Model Rollback & Fallback Procedures" },
      { id: 29, text: "Do you track AI incidents and failures?", shortName: "Incident & Failure Tracking" },
      { id: 30, text: "Do you continuously reassess AI risk?", shortName: "Continuous Risk Reassessments" },
    ],
  },
];

export default function AssessmentPage() {
  // Wizard state: 0 = intake, 1..6 = pillars, 7 = results
  const [step, setStep] = useState(0);
  
  // Lead Intake Form
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    eduBackground: "", // maps to Company/Organization in the CRM
    phone: "",
    location: "",
    aiDescription: "",
  });

  // Assessment Answers state: maps question ID (1 to 30) to score (1 to 4)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  // CRM API submission status
  const [submitting, setSubmitting] = useState(false);
  const [crmStatus, setCrmStatus] = useState<"idle" | "success" | "error">("idle");

  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Handle lead form changes
  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  // Handle radio/pill selections
  const handleAnswerSelect = (questionId: number, score: number) => {
    setAnswers({ ...answers, [questionId]: score });
  };

  // Get list of unanswered questions in the current pillar
  const getCurrentPillarUnanswered = () => {
    if (step < 1 || step > 6) return [];
    const currentPillar = pillars[step - 1];
    return currentPillar.questions.filter(q => !answers[q.id]);
  };

  // Calculate scores
  const getObtainedScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getNormalizedScore = () => {
    const total = getObtainedScore();
    // 30 questions * 4 max = 120 max score
    return Math.round((total / 120) * 100);
  };

  const getRiskLevel = (score: number) => {
    if (score <= 20) return { title: "Critical Risk", desc: "AI adoption likely introduces significant business, security, and operational risk.", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" };
    if (score <= 40) return { title: "High Risk", desc: "Major gaps exist across governance, validation, and security controls.", color: "#F97316", bg: "rgba(249, 115, 22, 0.1)" };
    if (score <= 60) return { title: "Moderate Risk", desc: "Basic controls exist, but significant improvements are needed before scaling production AI.", color: "#EAB308", bg: "rgba(234, 179, 8, 0.1)" };
    if (score <= 80) return { title: "Managed", desc: "Good foundation with opportunities for optimizing security, validation, and compliance.", color: "#06B6D4", bg: "rgba(6, 182, 212, 0.1)" };
    return { title: "Trusted AI Ready", desc: "Strong governance, validation, security, and operational maturity. Ready for advanced AI deployments.", color: "#22C55E", bg: "rgba(34, 197, 94, 0.1)" };
  };

  // Dimension Calculations (v2)
  // Strategy: Pillar 1 (5 questions, max score 20)
  // Validation: Pillar 2 (Data Readiness, 5 questions) + Pillar 3 (Model Validation, 5 questions), max 40
  // Security: Pillar 4 (5 questions, max score 20)
  // Compliance: Pillar 5 (5 questions, max score 20)
  // Operations: Pillar 6 (5 questions, max score 20)
  const getDimensionScores = () => {
    const getPillarSum = (pillarIdx: number) => {
      return pillars[pillarIdx].questions.reduce((sum, q) => sum + (answers[q.id] || 1), 0);
    };

    const strategyRaw = getPillarSum(0);
    const dataRaw = getPillarSum(1);
    const validationRaw = getPillarSum(2);
    const securityRaw = getPillarSum(3);
    const complianceRaw = getPillarSum(4);
    const operationsRaw = getPillarSum(5);

    const strategy = Math.round((strategyRaw / 20) * 100);
    const validation = Math.round(((dataRaw + validationRaw) / 40) * 100);
    const security = Math.round((securityRaw / 20) * 100);
    const compliance = Math.round((complianceRaw / 20) * 100);
    const operations = Math.round((operationsRaw / 20) * 100);

    const overallWeighted = Math.round(
      strategy * 0.20 +
      validation * 0.25 +
      security * 0.25 +
      compliance * 0.15 +
      operations * 0.15
    );

    return {
      strategy,
      validation,
      security,
      compliance,
      operations,
      overallWeighted
    };
  };

  // Identify Top Strengths & Gaps
  const getStrengthsAndGaps = () => {
    const dims = getDimensionScores();
    const list = [
      { name: "Strategy & Governance", score: dims.strategy },
      { name: "Model Validation & Data", score: dims.validation },
      { name: "AI Security Red Teaming", score: dims.security },
      { name: "Compliance Frameworks", score: dims.compliance },
      { name: "Operations & Monitoring", score: dims.operations }
    ];

    // Strengths: dimensions with highest scores
    const strengths = [...list].sort((a, b) => b.score - a.score).slice(0, 3).map(d => d.name);

    // Gaps: find individual questions where score <= 2 (No / Partially)
    const lowQuestions: { text: string; shortName: string; pillarTitle: string }[] = [];
    pillars.forEach((pillar) => {
      pillar.questions.forEach((q) => {
        const score = answers[q.id] || 1;
        if (score <= 2) {
          lowQuestions.push({
            text: q.text,
            shortName: q.shortName,
            pillarTitle: pillar.title
          });
        }
      });
    });

    // Take top 3 low-scoring questions as Gaps, fallback to lowest dimension categories if none
    const gaps = lowQuestions.slice(0, 3).map(q => q.shortName);
    if (gaps.length === 0) {
      // If no question scored <= 2, take lowest dimension categories
      gaps.push(...[...list].sort((a, b) => a.score - b.score).slice(0, 2).map(d => d.name));
    }

    return { strengths, gaps };
  };

  // Submit Lead to CRM API
  const submitToCRM = async (finalScore: number, finalRisk: string, strengths: string[], gaps: string[]) => {
    setSubmitting(true);
    
    // Construct rich AI description with assessment summary
    const formattedDescription = `
AI USE CASE:
${leadData.aiDescription}

------------------------------------------------
AITRA ASSESSMENT DETAILS:
Overall Score: ${finalScore}/100
Risk Profile: ${finalRisk}
Top Strengths: ${strengths.join(", ")}
Top Gaps: ${gaps.join(", ")}

DIMENSION RATINGS:
- Strategy & Leadership: ${getDimensionScores().strategy}%
- Data & Validation: ${getDimensionScores().validation}%
- Security: ${getDimensionScores().security}%
- Compliance: ${getDimensionScores().compliance}%
- Operations: ${getDimensionScores().operations}%
    `.trim();

    try {
      const response = await fetch("https://crm.thefoundrys.com/api/v1/lms/external", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "default-lms-secret-key"
        },
        body: JSON.stringify({
          name: leadData.name,
          phone: leadData.phone || "N/A",
          email: leadData.email,
          location: leadData.location || "Online Assessment",
          eduBackground: leadData.eduBackground,
          aiDescription: formattedDescription,
          leadSource: "AITRA Assessment"
        })
      });

      if (response.ok) {
        console.log("CRM Lead Successfully Registered");
        setCrmStatus("success");
      } else {
        console.error("CRM Lead submission failed:", await response.text());
        setCrmStatus("error");
      }
    } catch (err) {
      console.error("Network error submitting CRM Lead:", err);
      setCrmStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      // Verify lead data is filled
      if (!leadData.name || !leadData.email || !leadData.eduBackground || !leadData.aiDescription) {
        alert("Please fill out all required fields to start the assessment.");
        return;
      }
      setStep(1);
    } else if (step >= 1 && step <= 5) {
      // Verify all questions in current pillar are answered
      const unanswered = getCurrentPillarUnanswered();
      if (unanswered.length > 0) {
        alert(`Please answer all questions before proceeding. (${unanswered.length} remaining)`);
        return;
      }
      setStep(step + 1);
    } else if (step === 6) {
      // Last pillar, calculate results and submit to CRM
      const unanswered = getCurrentPillarUnanswered();
      if (unanswered.length > 0) {
        alert(`Please answer all questions before generating your report. (${unanswered.length} remaining)`);
        return;
      }
      
      const normalizedScore = getNormalizedScore();
      const risk = getRiskLevel(normalizedScore).title;
      const { strengths, gaps } = getStrengthsAndGaps();
      
      setStep(7);
      submitToCRM(normalizedScore, risk, strengths, gaps);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setStep(0);
    setCrmStatus("idle");
  };

  // Math variables for Radar chart SVG
  const cx = 150;
  const cy = 150;
  const r = 100;
  const dims = getDimensionScores();
  const dimensionScores = [dims.strategy, dims.validation, dims.security, dims.compliance, dims.operations];

  const getRadarCoordinates = (scores: number[], maxVal = 100) => {
    return scores.map((score, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const valueRatio = Math.max(15, Math.min(score, maxVal)) / maxVal; // minimum 15% for visual visibility
      const x = cx + r * valueRatio * Math.cos(angle);
      const y = cy + r * valueRatio * Math.sin(angle);
      return { x, y };
    });
  };

  const radarPoints = getRadarCoordinates(dimensionScores).map(p => `${p.x},${p.y}`).join(" ");

  // Pentagonal Grid Rings
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = gridLevels.map(level => {
    return Array.from({ length: 5 }).map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      const x = cx + r * level * Math.cos(angle);
      const y = cy + r * level * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  });

  // Label Coordinates
  const labels = [
    { text: "Strategy", x: 150, y: 15, textAnchor: "middle" },
    { text: "Validation", x: 268, y: 110, textAnchor: "start" },
    { text: "Security", x: 228, y: 268, textAnchor: "start" },
    { text: "Compliance", x: 72, y: 268, textAnchor: "end" },
    { text: "Operations", x: 32, y: 110, textAnchor: "end" }
  ] as const;

  // Colors mapping for simple score
  const scoreColor = getRiskLevel(getNormalizedScore()).color;
  const riskDetails = getRiskLevel(getNormalizedScore());

  return (
    <>
      <Header />
      <main style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--primary-bg)", overflow: "hidden" }}>
        <AmbientGrid />

        <section className={styles.section} style={{ padding: "70px var(--container-padding) 60px", position: "relative", zIndex: 5 }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            
            <AnimatePresence mode="wait">
              {/* STEP 0: INTAKE & WELCOME */}
              {step === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, marginBottom: "18px", color: "var(--text-main)" }}>
                      AI Trust Readiness Assessment
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
                      Evaluate your organization’s capabilities to deploy, secure, validate, and govern AI systems in production. Get an instant 0–100 Trust Score and Executive Risk Profile.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "stretch" }}>
                    
                    {/* Welcome Context */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px", padding: "32px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--secondary-bg)" }}>
                      <div>
                        <h3 style={{ fontSize: "22px", marginBottom: "18px" }}>About AITRA Assessment</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px" }}>
                          This framework measures maturity across 6 strategic pillars: Strategy, Data Readiness, Validation, Security, Compliance, and Live Operations.
                        </p>
                        
                        <div style={{ display: "grid", gap: "16px" }}>
                          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                              <ClockIcon />
                            </div>
                            <div>
                              <strong style={{ display: "block", fontSize: "14px" }}>10–15 Minutes</strong>
                              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Fast but thorough self-assessment</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                              <TrendingUp size={16} />
                            </div>
                            <div>
                              <strong style={{ display: "block", fontSize: "14px" }}>Normalized Scoring</strong>
                              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Comprehensive score mapped 0–100</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                              <Award size={16} />
                            </div>
                            <div>
                              <strong style={{ display: "block", fontSize: "14px" }}>Executive Report</strong>
                              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Includes a 5-dimension AI Trust Radar</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "18px", fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <Lock size={14} style={{ color: "var(--accent)" }} />
                        <span>Data is protected and processed under OpenVals trust agreements.</span>
                      </div>
                    </div>

                    {/* Intake Form Card */}
                    <div style={{ padding: "36px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", boxShadow: "var(--shadow)" }}>
                      <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>{"Let's customize your report"}</h3>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={leadData.name}
                            onChange={handleLeadChange}
                            style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px" }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="john@organization.com"
                              value={leadData.email}
                              onChange={handleLeadChange}
                              style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px" }}
                            />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="+1 (555) 019-2834"
                              value={leadData.phone}
                              onChange={handleLeadChange}
                              style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px" }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Company / Org *</label>
                            <input
                              type="text"
                              name="eduBackground"
                              required
                              placeholder="Acme Corporation"
                              value={leadData.eduBackground}
                              onChange={handleLeadChange}
                              style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px" }}
                            />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>Location</label>
                            <input
                              type="text"
                              name="location"
                              placeholder="San Francisco, CA"
                              value={leadData.location}
                              onChange={handleLeadChange}
                              style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px" }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>AI System or Use Case *</label>
                          <textarea
                            name="aiDescription"
                            required
                            placeholder="e.g. Deploying a customer service copilot connected to corporate databases for document retrieval."
                            rows={3}
                            value={leadData.aiDescription}
                            onChange={handleLeadChange}
                            style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--secondary-bg)", border: "1px solid var(--border)", color: "var(--text-main)", outline: "none", fontSize: "14px", resize: "none" }}
                          />
                        </div>

                        <button
                          onClick={handleNextStep}
                          className={`${styles.button} ${styles.primary}`}
                          style={{ width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "10px", fontSize: "15px", fontWeight: 700 }}
                        >
                          Start Free Assessment <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEPS 1..6: PILLARS ASSESSMENT */}
              {step >= 1 && step <= 6 && (
                <motion.div
                  key={`pillar-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
                >
                  {/* Progress Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "14px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                        {React.createElement(pillars[step - 1].icon, { size: 16 })}
                        <span>Pillar {step} of 6</span>
                      </div>
                      <h2 style={{ fontSize: "28px", margin: 0 }}>{pillars[step - 1].title}</h2>
                    </div>
                    <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600 }}>
                      Question {((step - 1) * 5) + 1} to {step * 5} of 30
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: "100%", height: "6px", background: "var(--border)", borderRadius: "10px", marginBottom: "32px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${(((step - 1) * 5) + Object.keys(answers).filter(id => {
                          const nid = Number(id);
                          return nid >= ((step - 1) * 5) + 1 && nid <= (step * 5);
                        }).length) / 30 * 100}%`,
                        height: "100%",
                        background: "linear-gradient(to right, var(--accent), #2f80ed)",
                        borderRadius: "10px",
                        transition: "width 0.3s ease"
                      }}
                    />
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "32px", lineHeight: 1.6 }}>
                    {pillars[step - 1].description}
                  </p>

                  {/* Questions Deck */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
                    {pillars[step - 1].questions.map((q) => {
                      const selectedScore = answers[q.id];

                      return (
                        <div
                          key={q.id}
                          style={{
                            padding: "24px",
                            borderRadius: "14px",
                            border: "1px solid var(--border)",
                            background: "var(--card-bg)",
                            boxShadow: selectedScore ? "0 4px 15px rgba(0, 0, 0, 0.02)" : "none",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "var(--text-main)", display: "flex", gap: "8px" }}>
                            <span>{q.id}.</span>
                            <span>{q.text}</span>
                          </div>

                          {/* Segmented Controls (No, Partially, Mostly, Yes) */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                            {[
                              { label: "No", score: 1 },
                              { label: "Partially", score: 2 },
                              { label: "Mostly", score: 3 },
                              { label: "Yes", score: 4 },
                            ].map((opt) => {
                              const active = selectedScore === opt.score;
                              return (
                                <button
                                  key={opt.score}
                                  onClick={() => handleAnswerSelect(q.id, opt.score)}
                                  style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: active ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                                    background: active ? "rgba(59, 130, 246, 0.08)" : "var(--secondary-bg)",
                                    color: active ? "var(--accent)" : "var(--text-muted)",
                                    fontWeight: active ? 700 : 500,
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    outline: "none"
                                  }}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions Band */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      onClick={handlePrevStep}
                      style={{
                        padding: "12px 20px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        background: "var(--card-bg)",
                        color: "var(--text-main)",
                        fontWeight: 600,
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <ArrowLeft size={16} /> Previous
                    </button>

                    <button
                      onClick={handleNextStep}
                      className={`${styles.button} ${styles.primary}`}
                      style={{
                        padding: "12px 24px",
                        fontWeight: 700,
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        opacity: getCurrentPillarUnanswered().length > 0 ? 0.6 : 1,
                        cursor: getCurrentPillarUnanswered().length > 0 ? "not-allowed" : "pointer"
                      }}
                    >
                      {step === 6 ? "Generate Report" : "Next Pillar"} <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 7: EXECUTIVE REPORT & RADAR */}
              {step === 7 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  ref={resultsRef}
                >
                  <div style={{ textAlign: "center", marginBottom: "40px" }} className="no-print">
                    <span style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
                      OpenVals Executive Report
                    </span>
                    <h1 style={{ fontSize: "36px", margin: "0 0 10px" }}>AI Trust Readiness Score</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
                      Prepared for <strong>{leadData.name}</strong> at <strong>{leadData.eduBackground}</strong> • {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "32px", alignItems: "start" }}>
                    
                    {/* LEFT COLUMN: GAUGE & RADAR CHART */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      
                      {/* Gauge Card */}
                      <div style={{ padding: "32px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", textAlign: "center", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                          AI Trust Score
                        </div>

                        {/* Circular Progress Gauge */}
                        <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 20px" }}>
                          <svg width="160" height="160" viewBox="0 0 160 160">
                            {/* Track circle */}
                            <circle
                              cx="80"
                              cy="80"
                              r="68"
                              fill="none"
                              stroke="var(--border)"
                              strokeWidth="12"
                            />
                            {/* Value Circle */}
                            <circle
                              cx="80"
                              cy="80"
                              r="68"
                              fill="none"
                              stroke={scoreColor}
                              strokeWidth="12"
                              strokeDasharray={2 * Math.PI * 68}
                              strokeDashoffset={2 * Math.PI * 68 * (1 - getNormalizedScore() / 100)}
                              strokeLinecap="round"
                              transform="rotate(-90 80 80)"
                              style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
                            />
                          </svg>
                          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-main)", lineHeight: 1 }}>
                              {getNormalizedScore()}
                            </span>
                            <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
                              / 100
                            </span>
                          </div>
                        </div>

                        {/* Risk Level Banner */}
                        <div style={{ padding: "12px", borderRadius: "8px", backgroundColor: riskDetails.bg, color: scoreColor, fontWeight: 800, fontSize: "16px", marginBottom: "12px", display: "inline-block" }}>
                          {riskDetails.title}
                        </div>
                        
                        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.5 }}>
                          {riskDetails.desc}
                        </p>
                      </div>

                      {/* Radar Chart Card */}
                      <div style={{ padding: "28px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", boxShadow: "var(--shadow)", textAlign: "center" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                          AI Trust Radar (v2)
                        </div>

                        {/* Radar Chart SVG */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                          <svg width="300" height="300" viewBox="0 0 300 300">
                            {/* Grid levels */}
                            {gridPolygons.map((pointsStr, idx) => (
                              <polygon
                                key={idx}
                                points={pointsStr}
                                fill="none"
                                stroke="var(--border)"
                                strokeWidth="1"
                                strokeDasharray={idx === 4 ? "0" : "3,3"}
                              />
                            ))}

                            {/* Axis Lines */}
                            {labels.map((lbl, idx) => {
                              const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
                              const outerX = cx + r * Math.cos(angle);
                              const outerY = cy + r * Math.sin(angle);
                              return (
                                <line
                                  key={idx}
                                  x1={cx}
                                  y1={cy}
                                  x2={outerX}
                                  y2={outerY}
                                  stroke="var(--border)"
                                  strokeWidth="1"
                                />
                              );
                            })}

                            {/* Polygon Area */}
                            <polygon
                              points={radarPoints}
                              fill="rgba(59, 130, 246, 0.22)"
                              stroke={scoreColor}
                              strokeWidth="2"
                              style={{ transition: "points 1s" }}
                            />

                            {/* Vertices Dots */}
                            {getRadarCoordinates(dimensionScores).map((p, idx) => (
                              <circle
                                key={idx}
                                cx={p.x}
                                cy={p.y}
                                r="4"
                                fill={scoreColor}
                                stroke="var(--primary-bg)"
                                strokeWidth="1.5"
                              />
                            ))}

                            {/* Axis Labels */}
                            {labels.map((lbl, idx) => (
                              <text
                                key={idx}
                                x={lbl.x}
                                y={lbl.y}
                                textAnchor={lbl.textAnchor}
                                fontSize="11px"
                                fontWeight="800"
                                fill="var(--text-main)"
                                fontFamily="var(--font-inter), monospace"
                              >
                                {lbl.text} ({dimensionScores[idx]}%)
                              </text>
                            ))}
                          </svg>
                        </div>
                        
                        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.4 }}>
                          Risk-Adjusted Trust Score (v2 Weighted): <strong style={{ color: "var(--text-main)" }}>{dims.overallWeighted}/100</strong>
                        </p>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: STRENGTHS, GAPS, CRM & CALL TO ACTIONS */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      
                      {/* Dimension Breakdown Cards */}
                      <div style={{ padding: "28px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", boxShadow: "var(--shadow)" }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                          <TrendingUp size={18} style={{ color: "var(--accent)" }} /> Pillar Breakdown
                        </h3>

                        <div style={{ display: "grid", gap: "12px" }}>
                          {[
                            { name: "Strategy & Leadership", score: dims.strategy, icon: Compass },
                            { name: "Data & Validation Readiness", score: dims.validation, icon: Activity },
                            { name: "AI Security Posture", score: dims.security, icon: ShieldAlert },
                            { name: "Compliance & Governance", score: dims.compliance, icon: FileBadge2 },
                            { name: "Operations & Monitoring", score: dims.operations, icon: Gauge }
                          ].map((d) => (
                            <div key={d.name} style={{ padding: "14px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--secondary-bg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {React.createElement(d.icon, { size: 16, style: { color: "var(--accent)" } })}
                                <span style={{ fontSize: "14px", fontWeight: 600 }}>{d.name}</span>
                              </div>
                              <span style={{ fontSize: "15px", fontWeight: 800, color: d.score >= 80 ? "#22C55E" : d.score >= 60 ? "#06B6D4" : d.score >= 40 ? "#EAB308" : "#EF4444" }}>
                                {d.score}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths & Gaps Card */}
                      <div style={{ padding: "28px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", boxShadow: "var(--shadow)", display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                        <div>
                          <h4 style={{ fontSize: "15px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#22C55E", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <CheckCircle2 size={16} /> Top Strengths
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-muted)", fontSize: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {getStrengthsAndGaps().strengths.map((str, i) => (
                              <li key={i}><strong>{str}</strong></li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                          <h4 style={{ fontSize: "15px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#EF4444", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <AlertTriangle size={16} /> Priority Gaps
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-muted)", fontSize: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {getStrengthsAndGaps().gaps.map((gap, i) => (
                              <li key={i}><strong>{gap}</strong></li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Recommended Services Card */}
                      <div style={{ padding: "28px", borderRadius: "18px", border: "1px solid var(--border)", background: "var(--card-bg)", boxShadow: "var(--shadow)" }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "18px", color: "var(--text-main)" }}>
                          Recommended OpenVals Services
                        </h3>

                        <div style={{ display: "grid", gap: "12px" }}>
                          {[
                            {
                              title: "AI Validation Assessment",
                              desc: "Evaluate model reliability, quality, and output safety against benchmarks.",
                              badge: dims.validation < 80 ? "Recommended" : "Suggested",
                              href: "/ai-model-validation"
                            },
                            {
                              title: "AI Red Teaming",
                              desc: "Simulate attacks, prompt injection, policy bypasses, and data leaks.",
                              badge: dims.security < 80 ? "Recommended" : "Suggested",
                              href: "/ai-red-teaming"
                            },
                            {
                              title: "Compliance Readiness Review",
                              desc: "Prepare model cards and safety logs for regulatory audits.",
                              badge: dims.compliance < 80 ? "Recommended" : "Suggested",
                              href: "/ai-compliance-readiness"
                            }
                          ].map((srv, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: "16px",
                                border: "1.5px solid var(--border)",
                                borderRadius: "10px",
                                background: "var(--secondary-bg)",
                                position: "relative"
                              }}
                            >
                              <span style={{ position: "absolute", top: "14px", right: "14px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", padding: "3px 8px", borderRadius: "20px", background: srv.badge === "Recommended" ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "var(--border)", color: srv.badge === "Recommended" ? "var(--accent)" : "var(--text-muted)" }}>
                                {srv.badge}
                              </span>
                              <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 700 }}>{srv.title}</h4>
                              <p style={{ margin: "0 0 12px", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.4 }}>{srv.desc}</p>
                              <a
                                href={srv.href}
                                className={`${styles.button} ${styles.secondary}`}
                                style={{ padding: "6px 12px", fontSize: "12px", borderRadius: "6px" }}
                              >
                                Learn More
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Report Actions */}
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }} className="no-print">
                        <button
                          onClick={() => window.print()}
                          style={{
                            flex: 1,
                            minWidth: "140px",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            background: "var(--card-bg)",
                            color: "var(--text-main)",
                            fontWeight: 600,
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          <Printer size={16} /> Print Report
                        </button>
                        
                        <Link
                          href={`/contact?source=aitra&score=${getNormalizedScore()}`}
                          className={`${styles.button} ${styles.primary}`}
                          style={{
                            flex: 1.5,
                            minWidth: "180px",
                            padding: "12px 20px",
                            fontSize: "14px",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            textDecoration: "none"
                          }}
                        >
                          <Calendar size={16} /> Schedule Consultation
                        </Link>
                      </div>

                      {/* CRM Submission Sync Status */}
                      <div className="no-print" style={{ textAlign: "center", minHeight: "20px" }}>
                        {submitting && (
                          <div style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                            <RefreshCw size={14} style={{ animation: "spin 2s linear infinite" }} />
                            <span>Registering diagnostic report in CRM...</span>
                          </div>
                        )}
                        {crmStatus === "success" && (
                          <div style={{ fontSize: "13px", color: "#22C55E", fontWeight: 600 }}>
                            ✓ Report registered successfully with OpenVals.
                          </div>
                        )}
                        {crmStatus === "error" && (
                          <div style={{ fontSize: "13px", color: "#EF4444", fontWeight: 600 }}>
                            ⚠ CRM Sync offline. Please download or print your report.
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} className="no-print">
                        <button
                          onClick={resetAssessment}
                          style={{ background: "none", border: "none", color: "var(--text-muted)", textDecoration: "underline", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                        >
                          <RefreshCw size={12} /> Retake Assessment
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>
      </main>
      <Footer />

      {/* Styled Print media override */}
      <style jsx global>{`
        @media print {
          .no-print, header, footer {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          polygon {
            stroke: black !important;
          }
        }
      `}</style>
    </>
  );
}

// Inline temporary components
function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
