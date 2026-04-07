import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import styles from "@/components/ui.module.css";

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndex() {
  const posts = await client.fetch(postsQuery);

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link href="/">OpenVals</Link>
        </h1>
        <nav className={styles.nav}>
          <Link href="/#services">Services</Link>
          <Link href="/#framework">Framework</Link>
          <Link href="/blog" style={{ color: "var(--text-main)", fontWeight: 500 }}>
            Blog
          </Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className={styles.section}>
        <div className="container">
          <h2 style={{ fontSize: "40px", marginBottom: "40px" }}>OpenVals Research & Blog</h2>
          
          <div className={styles.grid}>
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className={styles.card}>
                {post.mainImage && (
                  <div style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden", background: "#f0f0f0", height: "200px" }}>
                    {/* Simplified image placeholder for now */}
                    <div style={{ padding: "20px", color: "var(--text-muted)", fontSize: "12px" }}>Image: {post.title}</div>
                  </div>
                )}
                <h4>{post.title}</h4>
                <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent)" }}></div>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{post.author?.name}</span>
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

      <footer className={styles.footer}>
        <div>© 2026 OpenVals. All rights reserved.</div>
      </footer>
    </>
  );
}
