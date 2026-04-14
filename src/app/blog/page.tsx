import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "../../sanity/lib/queries";
import styles from "../../components/ui.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndex() {
  let posts: any[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch (error) {
    console.error("Failed to fetch posts from Sanity", error);
    // Dummy posts for local development with realistic images
    posts = [
      {
        _id: "demo1",
        title: "The Future of AI Validation",
        slug: { current: "future-of-ai-validation" },
        publishedAt: new Date().toISOString(),
        author: { name: "Vishwanath Akuthota" },
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
      },
      {
        _id: "demo2",
        title: "Understanding Adversarial Attacks",
        slug: { current: "understanding-adversarial-attacks" },
        publishedAt: new Date().toISOString(),
        author: { name: "OpenVals Team" },
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
      }
    ];
  }

  return (
    <>
      <Header />

      <main className={styles.section} style={{ paddingTop: "120px" }}>
        <div className="container" style={{ margin: "0 auto", padding: "0 var(--container-padding)" }}>
          <div style={{ marginBottom: "60px" }}>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.1, marginBottom: "16px" }}>
              OpenVals Research <br /><span style={{ color: "var(--accent)" }}>& Blog</span>.
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "600px" }}>
              Deep-tech insights into AI reliability, prompt injection defense, and model validation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px" }}>
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className={styles.card} style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden", border: "1px solid var(--border)", background: "var(--secondary-bg)", height: "100%" }}>
                <div style={{ position: "relative", width: "100%", height: "220px", background: "#000" }}>
                  {(post.mainImage || post.imageUrl) ? (
                    <img
                      src={post.mainImage ? urlFor(post.mainImage).url() : post.imageUrl}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,212,255,0.05)", color: "var(--accent)" }}>
                      OpenVals Research
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to top, var(--secondary-bg), transparent)" }} />
                </div>

                <div style={{ padding: "32px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px", lineHeight: 1.3 }}>{post.title}</h3>
                  <div style={{ marginTop: "auto" }}>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", color: "#000" }}>
                        {post.author?.name?.charAt(0) || "O"}
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 500 }}>{post.author?.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p style={{ textAlign: "center", padding: "100px 0", color: "var(--text-muted)" }}>
              No research articles published yet. Check back soon.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
