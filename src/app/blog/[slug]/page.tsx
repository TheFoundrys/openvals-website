import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import styles from "@/components/ui.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { urlFor } from "@/sanity/lib/image";
import BlogAnalytics from "@/components/BlogAnalytics";

export const revalidate = 60; // Revalidate every minute

const components = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div style={{ margin: "40px 0", borderRadius: "8px", overflow: "hidden" }}>
          <img
            src={urlFor(value).url()}
            alt={value.alt || "OpenVals Research Image"}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      );
    },
  },
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(postSlugsQuery);
    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error("Failed to fetch slugs from Sanity", error);
    return [{ slug: "understanding-adversarial-attacks" }];
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let post: any;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch post from Sanity", error);
  }

  // Fallback data for specific demo slugs or when fetch fails entirely
  if (!post && (slug === "future-of-ai-validation" || slug === "understanding-adversarial-attacks")) {
    post = {
      title: slug === "future-of-ai-validation" ? "The Future of AI Validation" : "Understanding Adversarial Attacks",
      publishedAt: new Date().toISOString(),
      author: { name: "Vishwanath Akuthota" },
      imageUrl: slug === "future-of-ai-validation"
        ? "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
        : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
      body: [
        {
          _type: "block",
          children: [{ _type: "span", text: "As AI systems become more autonomous and complex, the traditional methods of validation are becoming obsolete. At OpenVals, we are pioneering a new framework that combines adversarial pressure-testing with rigorous algorithmic verification to ensure that models remain reliable even under hostile conditions." }]
        },
        {
          _type: "block",
          children: [{ _type: "span", text: "Modern enterprises cannot afford to deploy 'black box' models. Our research indicates that 85% of early-stage LLM deployments are vulnerable to sophisticated prompt injection attacks that bypass standard filters. The future of AI validation lies in creating active, defensive layers that validate every input and output in real-time." }]
        }
      ]
    };
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className={styles.section} style={{ paddingTop: "140px", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Article Not Found</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>The research paper you are looking for might have been moved or archived.</p>
            <Link href="/blog" className={styles.button} style={{ background: "var(--accent)", color: "#fff" }}>
              Explore Other Research
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.section} style={{ paddingTop: "clamp(100px, 12vw, 160px)" }}>
        <div className={styles.blogContainer}>
          {/* BREADCRUMBS */}
          <div style={{ marginBottom: "32px", fontSize: "14px", fontWeight: 600 }}>
            <Link href="/blog" style={{ color: "var(--accent)" }}>Research</Link>
            <span style={{ margin: "0 12px", opacity: 0.3 }}>/</span>
            <span style={{ color: "var(--text-muted)" }}>Article</span>
          </div>

          <header className={styles.blogHeader}>
            {post.analytics?.topic && (
              <div style={{ color: "var(--accent)", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                {post.analytics.topic}
              </div>
            )}
            <h1 className={styles.blogTitle}>{post.title}</h1>

            <div className={styles.authorRow}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", color: "#fff" }}>
                {post.author?.name?.charAt(0) || "O"}
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>{post.author?.name}</div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {(post.mainImage || post.imageUrl) && (
              <div style={{ marginBottom: "24px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <img
                  src={post.mainImage ? urlFor(post.mainImage).url() : post.imageUrl}
                  alt={post.title}
                  style={{ width: "100%", height: "auto", display: "block", background: "#000" }}
                />
              </div>
            )}
          </header>

          <article className={styles.articleBody}>
            <PortableText value={post.body} components={components} />
          </article>

          <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "18px", marginBottom: "24px", color: "var(--text-muted)" }}>Interested in securing your AI deployment?</p>
            <Link 
              id="blog-cta-discuss"
              href="/contact" 
              className={styles.button} 
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Discuss Custom Validation
            </Link>
          </div>

          {/* INTERNAL PERFORMANCE DASHBOARD (Hidden by default, show with ?stats=true) */}
          {post.analytics && (
            <div id="performance-dashboard" style={{ marginTop: "80px", padding: "32px", background: "rgba(0,0,0,0.03)", borderRadius: "24px", border: "1px solid var(--border)", display: "none" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "20px", color: "var(--accent)" }}>Post Performance (Internal)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Views</div>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>{post.analytics.pageViews || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Visitors</div>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>{post.analytics.uniqueVisitors || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>CTA Clicks</div>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>{post.analytics.ctaClicks || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Conv. Rate</div>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>{post.analytics.conversionRate || 0}%</div>
                </div>
              </div>
              <div style={{ marginTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Next Action</div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>{post.analytics.nextAction || "None"}</div>
                </div>
                <button 
                  onClick={() => {
                    const btn = document.getElementById('sync-btn');
                    if (btn) btn.innerText = 'Syncing...';
                    fetch('/api/blog/sync', {
                      method: 'POST',
                      body: JSON.stringify({ slug: post.slug.current }),
                    })
                    .then(res => res.json())
                    .then(data => {
                      if (data.success) {
                        alert('Synced successfully to SharePoint!');
                        if (btn) btn.innerText = 'Sync to Excel';
                      } else {
                        alert('Sync failed: ' + (data.error || 'Unknown error'));
                        if (btn) btn.innerText = 'Retry Sync';
                      }
                    });
                  }}
                  id="sync-btn"
                  style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}
                >
                  Sync to Excel
                </button>
              </div>
            </div>
          )}
          <script dangerouslySetInnerHTML={{ __html: `
            if (window.location.search.includes('stats=true')) {
              document.getElementById('performance-dashboard').style.display = 'block';
            }
          `}} />
        </div>
        <BlogAnalytics slug={post.slug.current} ctaId="blog-cta-discuss" />
      </main>

      <Footer />
    </>
  );
}
