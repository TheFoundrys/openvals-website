import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Quality & Assurance | OpenVals Trust Layer',
  description: 'Industrial-grade validation, stress-testing, and proactive security auditing to ensure your enterprise AI models are safe, compliant, and attack-resistant.',
  keywords: [
    'AI Quality Assurance',
    'AI Security',
    'Model Validation',
    'AI Compliance',
    'Responsible AI',
    'Model Performance Testing',
    'AI Drift Detection',
    'Model Auditing',
    'Test Automation for AI',
    'Enterprise AI Governance'
  ],
  openGraph: {
    title: 'AI Quality & Assurance | OpenVals',
    description: 'Ensure your AI works flawlessly in real-world conditions with industrial-grade AI security and performance validation.',
    url: 'https://openvalidations.com/services/ai-quality-assurance',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
