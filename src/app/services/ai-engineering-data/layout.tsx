import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Engineering & Data Science | OpenVals Build Layer',
  description: 'Design, develop, and deploy production-grade AI systems backed by robust data pipelines, analytics, and MLOps to scale securely and perform predictably.',
  keywords: [
    'AI Engineering',
    'Applied Data Science',
    'Machine Learning Models',
    'MLOps',
    'Predictive Modeling',
    'Data Analytics',
    'AI System Deployment',
    'Data Pipelines',
    'Computer Vision',
    'LLM Integration'
  ],
  openGraph: {
    title: 'AI Engineering & Data Science | OpenVals',
    description: 'Transform ideas into scalable, production-ready intelligent systems and turn raw data into actionable intelligence.',
    url: 'https://openvalidations.com/services/ai-engineering-data',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
