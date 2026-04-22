import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Compass - OpenVals Strategy Layer',
  description: 'Navigate the enterprise AI landscape with structured strategy, readiness assessment, risk evaluation, and a scalable implementation roadmap.',
  keywords: [
    'AI Strategy Formulation',
    'AI Readiness Assessment',
    'AI Implementation Roadmap',
    'Enterprise AI Consulting',
    'AI Risk Evaluation',
    'Strategic AI Alignment',
    'AI Opportunity Identification',
    'AI Vendor Selection'
  ],
  openGraph: {
    title: 'AI Compass Framework - OpenVals',
    description: 'Transform organizational ideas into impactful business value safely and effectively using our structured AI Compass consulting framework.',
    url: 'https://openvalidations.com/services/ai-compass',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
