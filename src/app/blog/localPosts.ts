export type LocalBlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: { name: string };
  imageUrl: string;
  externalUrl: string;
  topic?: string;
  summary?: string;
  paragraphs?: string[];
  takeaways?: string[];
};

type BlogPostLike = {
  slug?: { current?: string };
  publishedAt?: string;
};

export const localBlogPosts: LocalBlogPost[] = [
  {
    _id: "local-question-for-founders-cxos-investors-technology-leaders",
    title:
      "A question for fellow founders, CXOs, investors, and technology leaders:",
    slug: { current: "question-for-fellow-founders-cxos-investors-technology-leaders" },
    publishedAt: "2026-11-09T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/question_for_founders_cxos_cover.png",
    externalUrl:
      "https://www.linkedin.com/pulse/question-fellow-founders-cxos-investors-technology-vishwa-akuthota--mk9wf",
  },
  {
    _id: "local-ai-assurance",
    title: "AI Assurance: Passing a Benchmark Is Not Permission to Deploy",
    slug: { current: "ai-assurance" },
    publishedAt: "2026-11-03T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_assurance_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/ai-assurance-vishwa-akuthota--xitlc/",
    topic: "AI Assurance & Trust",
    summary: "Passing a benchmark is not permission to deploy. Benchmarking measures performance, validation establishes evidence, and assurance keeps asking whether that evidence still holds across real operating conditions, over time, and in the presence of continuous risk.",
    paragraphs: [
      "The demo was impressive. The AI answered almost every question correctly. The benchmark results looked excellent. Someone in the room finally said: “Looks good. Let’s put it into production.”",
      "Then the security architect asked one question: “What happens when it gets something wrong?” Silence followed in the room.",
      "They had measured accuracy. But nobody had tested hallucination under difficult scenarios. Nobody had checked whether the same prompt produced consistently reliable answers over multiple runs. They had tested normal, well-behaved users—nobody had behaved like an attacker attempting prompt injection. They had validated the model weights, but nobody had validated the data pipeline feeding it. The benchmark wasn’t wrong. It was incomplete.",
      "Imagine that AI is now in production helping thousands of enterprise customers. One day, something changes. Perhaps the upstream provider silently updates model weights. Perhaps the RAG pipeline retrieves the wrong document. Perhaps an attacker discovers a new prompt injection vector. The monitoring dashboard remains green, but its real-world behavior has changed. And the leadership team asks: “Didn’t we validate this?” Yes. Once. In isolation. Under static conditions.",
      "Benchmarking asks: “How did this AI perform during this test?” Validation asks: “Is this AI suitable for our intended use case?” Assurance asks something larger: “Can we prove that this AI remains trustworthy across real operating conditions, over time, and in the presence of continuous risk?”",
      "That distinction becomes critical as AI moves deeper into enterprise operations. We’re not building OpenVals to create another leaderboard. There are already plenty of those. We’re building toward continuous assurance: where models are evaluated, datasets are validated, hallucination risk is quantified, and revalidation is automated. Trust isn’t claimed. It’s measured.",
    ],
    takeaways: [
      "Passing a benchmark is not permission to deploy—benchmarks test static performance, not operational resilience.",
      "Single-point evaluation fails to account for concept drift, retrieval corruption, and evolving prompt injection attacks.",
      "Continuous assurance requires ongoing Decision Reliability Scoring (DRS), automated adversarial testing, and verified audit trails.",
    ],
  },
  {
    _id: "local-ai-supply-chain-risk",
    title: "AI Supply Chain Risk",
    slug: { current: "ai-supply-chain-risk" },
    publishedAt: "2026-10-27T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_supply_chain_risk_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/ai-supply-chain-risk-vishwa-akuthota--zokac",
  },
  {
    _id: "local-shadow-ai-your-employees-may-already-deploying",
    title: "Shadow AI: Your Employees May Already Be Deploying It (And You Don't Even Know)",
    slug: { current: "shadow-ai-your-employees-may-already-deploying" },
    publishedAt: "2026-10-20T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/shadow_ai_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/shadow-ai-your-employees-may-already-deploying-you-dont-akuthota--3qptc",
  },
  {
    _id: "local-what-happens-when-ai-stops-answering-starts-acting",
    title: "What Happens When AI Stops Answering and Starts Acting",
    slug: { current: "what-happens-when-ai-stops-answering-starts-acting" },
    publishedAt: "2026-10-13T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/what_happens_when_ai_stops_answering_starts_acting_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/what-happens-when-ai-stops-answering-starts-acting-vishwa-akuthota--mbacc",
  },
  {
    _id: "local-your-ai-only-trustworthy-what-retrieves",
    title: "Your AI Is Only as Trustworthy as What It Retrieves",
    slug: { current: "your-ai-only-trustworthy-what-retrieves" },
    publishedAt: "2026-10-06T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/your_ai_only_trustworthy_what_retrieves_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/your-ai-only-trustworthy-what-retrieves-vishwa-akuthota--rqlif",
  },
  {
    _id: "local-what-your-ai-learned-from-a-lie",
    title: "What Your AI Learned from a Lie",
    slug: { current: "what-your-ai-learned-from-lie" },
    publishedAt: "2026-09-29T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/what_your_ai_learned_from_lie_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/what-your-ai-learned-from-lie-vishwa-akuthota--z8j0c",
  },
  {
    _id: "local-who-really-owns-your-intelligence",
    title: "Who Really Owns Your Intelligence?",
    slug: { current: "who-really-owns-your-intelligence" },
    publishedAt: "2026-09-22T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/who_owns_your_intelligence_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/who-really-owns-your-intelligence-vishwa-akuthota--lrhlc",
  },
  {
    _id: "local-ai-regulation-coming-faster-than-you-think",
    title: "AI Regulation Is Coming Faster Than You Think",
    slug: { current: "ai-regulation-coming-faster-than-you-think" },
    publishedAt: "2026-09-15T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_regulation_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/ai-regulation-coming-faster-than-you-think-vishwa-akuthota--pwjac",
  },
  {
    _id: "local-what-your-employees-are-feeding-ai",
    title: "What Your Employees Are Feeding AI",
    slug: { current: "what-your-employees-are-feeding-ai" },
    publishedAt: "2026-09-01T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    externalUrl: "https://www.linkedin.com/pulse/what-your-employees-feeding-ai-vishwa-akuthota--pfcvc",
  },
  {
    _id: "local-executive-ai-intelligence-brief",
    title: "Executive AI Intelligence Brief",
    slug: { current: "executive-ai-intelligence-brief" },
    publishedAt: "2026-08-26T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/executive_ai_intelligence_brief_cover.png",
    externalUrl: "https://www.linkedin.com/pulse/executive-ai-intelligence-brief-vishwa-akuthota--gpe0f",
  },
  {
    _id: "local-model-drift-why-ai-gets-worse-over-time",
    title: "Model Drift: Why AI Gets Worse Over Time",
    slug: { current: "model-drift-why-ai-gets-worse-over-time" },
    publishedAt: "2026-08-25T12:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    externalUrl: "https://www.linkedin.com/pulse/model-drift-why-ai-gets-worse-over-time-vishwa-akuthota--2vfoc",
  },
  {
    _id: "local-ai-trust-brief-youre-talking-to-attackers",
    title: "AI Trust Brief: You're Talking to Attackers",
    slug: { current: "ai-trust-brief-youre-talking-to-attackers" },
    publishedAt: "2026-08-25T10:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    externalUrl: "https://www.linkedin.com/pulse/ai-trust-brief-your-talking-attackers-vishwa-akuthota--ph8mc",
  },
  {
    _id: "local-what-actually-happens-when-openvals-validates-an-ai-system",
    title: "What Actually Happens When OpenVals Validates an AI System?",
    slug: { current: "what-actually-happens-when-openvals-validates-an-ai-system" },
    publishedAt: "2026-08-11T03:32:35.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_validation_process.png",
    externalUrl: "https://x.com/Vishakuthota/status/2087019318177562654",
  },
  {
    _id: "local-case-study-choosing-the-right-ai-model-isnt-about-benchmarks",
    title: "Case Study: Choosing the Right AI Model Isn’t About Benchmarks",
    slug: { current: "case-study-choosing-the-right-ai-model-isnt-about-benchmarks" },
    publishedAt: "2026-07-15T03:30:24.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/choosing_right_ai_model_cover.png",
    externalUrl: "https://x.com/Vishakuthota/status/2076923013711491435",
  },
  {
    _id: "local-eu-ai-act-nist-ai-rmf-and-ai-validation-why-compliance-starts-with-trust",
    title: "EU AI Act, NIST AI RMF, and AI Validation: Why Compliance Starts with Trust",
    slug: { current: "eu-ai-act-nist-ai-rmf-and-ai-validation-why-compliance-starts-with-trust" },
    publishedAt: "2026-07-08T03:30:24.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/compliance_starts_with_trust.png",
    externalUrl: "https://x.com/Vishakuthota/status/2074697584422408293",
  },
  {
    _id: "local-what-is-ai-red-teaming-and-why-every-enterprise-needs-it",
    title: "What Is AI Red Teaming and Why Every Enterprise Needs It",
    slug: { current: "what-is-ai-red-teaming-and-why-every-enterprise-needs-it" },
    publishedAt: "2026-07-01T05:01:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_red_teaming_cover.png",
    externalUrl: "https://x.com/Vishakuthota/status/2072183709823033473",
  },
  {
    _id: "local-the-silent-cost-of-ai-hallucinations",
    title: "The Silent Cost of AI Hallucinations",
    slug: { current: "the-silent-cost-of-ai-hallucinations" },
    publishedAt: "2026-06-29T02:48:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/ai_hallucinations_cover.png",
    externalUrl: "https://x.com/Vishakuthota/status/2071425453945204919",
  },
  {
    _id: "local-llm-evaluation-vs-ai-validation-what-enterprises-miss",
    title: "LLM Evaluation vs AI Validation: What Enterprises Miss",
    slug: { current: "llm-evaluation-vs-ai-validation-what-enterprises-miss" },
    publishedAt: "2026-06-23T04:36:28.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "/llm_eval_vs_validation_cover.png",
    externalUrl: "https://x.com/Vishakuthota/status/2069278393108189384",
  },
  {
    _id: "local-why-ai-model-validation-is-now-a-boardroom-risk",
    title: "Why AI Model Validation Is Now a Boardroom Risk",
    slug: { current: "why-ai-model-validation-is-now-a-boardroom-risk" },
    publishedAt: "2026-06-15T00:00:00.000Z",
    author: { name: "Vishwanath Akuthota" },
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    externalUrl: "https://x.com/Vishakuthota/status/2066400750432067841",
  },
];

export function getLocalBlogPost(slug: string) {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return localBlogPosts.find(
    (post) =>
      post.slug.current === slug ||
      slug.startsWith(post.slug.current) ||
      post.slug.current.replace(/-a-/g, "-") === slug.replace(/-a-/g, "-") ||
      normalize(post.slug.current) === normalize(slug)
  );
}

export function mergeLocalBlogPosts<T extends BlogPostLike>(posts: T[]): Array<T | LocalBlogPost> {
  const existingSlugs = new Set(
    posts
      .map((post) => post.slug?.current)
      .filter((slug): slug is string => Boolean(slug)),
  );

  return [
    ...localBlogPosts.filter((post) => !existingSlugs.has(post.slug.current)),
    ...posts,
  ].sort((first, second) => {
    const firstDate = Date.parse(first.publishedAt || "") || 0;
    const secondDate = Date.parse(second.publishedAt || "") || 0;

    return secondDate - firstDate;
  });
}

export type LocalPortableBlock = {
  _type: "block";
  style: "blockquote" | "h2" | "normal";
  children: Array<{
    _type: "span";
    text: string;
  }>;
};

export function getLocalPostPortableText(post: LocalBlogPost): LocalPortableBlock[] {
  const blocks: LocalPortableBlock[] = [];

  // Executive Summary blockquote
  if (post.summary) {
    blocks.push({
      _type: "block",
      style: "blockquote",
      children: [
        {
          _type: "span",
          text: `Executive Brief: ${post.summary}`,
        },
      ],
    });
  } else {
    blocks.push({
      _type: "block",
      style: "blockquote",
      children: [
        {
          _type: "span",
          text: `Executive Brief: As enterprise organizations transition generative AI and autonomous agents from experimental sandboxes into core operational infrastructure, traditional software testing mechanisms no longer suffice. This research paper evaluates the architectural vulnerabilities, verification methodologies, and defensive controls required to ensure model reliability.`,
        },
      ],
    });
  }

  // Section 1: The Core Vulnerability & Engineering Challenge
  blocks.push({
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "1. The Operational Vulnerability" }],
  });

  if (post.paragraphs && post.paragraphs.length > 0) {
    post.paragraphs.forEach((p) => {
      blocks.push({
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: p }],
      });
    });
  } else {
    blocks.push({
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: `In mission-critical enterprise environments, ${post.title.toLowerCase()} represents a critical failure mode that cannot be mitigated through prompt tuning alone. Unlike deterministic software bugs, model vulnerabilities emerge probabilistically through shifting token distributions, latent dataset artifacts, and complex multi-turn agent interactions.`,
        },
      ],
    });

    blocks.push({
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: `Standard academic benchmarks (such as MMLU, GSM8K, or HumanEval) test for static memorization rather than operational robustness. When models face real-world enterprise workloads—including sensitive financial queries, autonomous API calls, or multi-tenant database operations—minor hallucinations or adversarial prompt perturbations can trigger severe cascading failures.`,
        },
      ],
    });
  }

  // Section 2: Technical Deep Dive & Validation Strategy
  blocks.push({
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "2. The OpenVals Validation Framework" }],
  });

  blocks.push({
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: `To solve this, OpenVals establishes an active validation layer combining Decision Reliability Scoring (DRS), automated adversarial red teaming, and continuous telemetry monitoring:`,
      },
    ],
  });

  blocks.push({
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: `• Decision Reliability Scoring (DRS): Transforms raw output probabilities into decision-ready reliability coefficients, quantifying exactly when a model's confidence corresponds to ground truth.`,
      },
    ],
  });

  blocks.push({
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: `• Automated Adversarial Red Teaming: Systematically stress-tests models against prompt injection, jailbreaks, data exfiltration attacks, and indirect instruction hijacking before production deployment.`,
      },
    ],
  });

  blocks.push({
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        text: `• Autonomous Agent Trajectory Tracing: Validates multi-step agent reasoning chains, tool-calling execution parameters, and memory states to prevent rogue or unintended autonomous actions.`,
      },
    ],
  });

  // Section 3: Strategic Recommendations
  blocks.push({
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "3. Strategic Recommendations for AI Teams" }],
  });

  if (post.takeaways && post.takeaways.length > 0) {
    post.takeaways.forEach((t) => {
      blocks.push({
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: `• ${t}` }],
      });
    });
  } else {
    blocks.push({
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: `AI leadership must transition from 'vibes-based' evaluation to verifiable, audit-ready validation. Every deployed model checkpoint, RAG vector index, and autonomous agent workflow should possess continuous reliability telemetry, regression benchmarking, and compliance alignment with standards like the EU AI Act and NIST AI RMF.`,
        },
      ],
    });
  }

  return blocks;
}
