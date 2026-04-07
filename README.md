# OpenVals - The Trust Layer for AI

OpenVals is a modern web application that provides AI validation and security services. The platform helps organizations ensure their AI systems are secure, reliable, and validated before deployment.

## Features

- **AI Red Teaming**: Simulating real-world attacks including prompt injection, jailbreaks, and adversarial inputs
- **Model Validation**: Testing accuracy, hallucinations, bias, and performance under stress conditions
- **AI Security**: Identifying data leakage, model extraction risks, and API vulnerabilities
- **Certification**: Audit-grade validation reports and deployment readiness scoring
- **OpenVals AI Assurance Framework™**: A comprehensive framework for AI validation across four stages:
  - V1: Validation (Accuracy, bias, performance)
  - V2: Vulnerability (Attacks, exploits, leakage)
  - V3: Variability (Drift, instability, edge cases)
  - V4: Verifiability (Audit, reporting, certification)

## Technology Stack

- **Frontend**: Next.js (React framework)
- **Styling**: CSS Modules with a modern, responsive design system
- **Animations**: Framer Motion for smooth, interactive animations
- **Content Management**: Sanity CMS for blog content
- **UI Components**: Custom components with a consistent design language

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── blog/           # Blog section
│   │   ├── page.tsx    # Blog index page
│   │   └── [slug]/     # Dynamic blog post pages
│   │       └── page.tsx
│   └── components/     # Reusable components
│       └── ui.module.css # Global styles
├── sanity/             # Sanity CMS configuration
│   ├── lib/            # Sanity client and utilities
│   │   ├── client.ts   # Sanity client configuration
│   │   └── queries.ts  # Sanity queries
│   └── schemas/        # Sanity schema definitions
└── public/             # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Sanity environment variables
4. Run the development server: `npm run dev`

## Usage

The application features:
- A clean, modern design with smooth animations
- Sections for services, framework, and blog
- Dynamic blog functionality with individual post pages
- Use of Portable Text for rich blog content
- Responsive design that works on all devices

