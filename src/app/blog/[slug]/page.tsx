import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import styles from "@/components/ui.module.css";

import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60; // Revalidate every minute

const components = {
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: "40px 0", borderRadius: "8px", overflow: "hidden" }}>
        <img
          src={urlFor(value).url()}
          alt={value.alt || "OpenVals Research Image"}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery);
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return (
      <div className={styles.section} style={{ textAlign: "center", padding: "100px" }}>
        <h2>Post not found.</h2>
        <Link href="/blog">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link href="/">OpenVals</Link>
        </h1>
        <nav className={styles.nav}>
          <Link href="/blog">Back to Blog</Link>
          <Link href="/contact" style={{ color: "var(--text-main)", fontWeight: 500 }}>
            Contact
          </Link>
        </nav>
      </header>

      <main className={styles.section}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <header style={{ marginBottom: "60px" }}>
            <h1 style={{ fontSize: "52px", lineHeight: "1.1", marginBottom: "20px" }}>{post.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", marginBottom: "30px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent)" }}></div>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-main)" }}>{post.author?.name}</span>
              <span>•</span>
              <span style={{ fontSize: "14px" }}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            
            {post.mainImage && (
              <div style={{ marginBottom: "40px", borderRadius: "12px", overflow: "hidden" }}>
                <img 
                  src={urlFor(post.mainImage).url()} 
                  alt={post.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            )}
          </header>

          <article className={styles.articleBody} style={{ fontSize: "18px", lineHeight: "1.8", color: "var(--text-main)" }}>
            <PortableText value={post.body} components={components} />
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>© 2026 OpenVals. All rights reserved.</div>
      </footer>
    </>
  );
}
