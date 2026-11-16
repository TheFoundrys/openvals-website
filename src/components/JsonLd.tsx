import type { JsonLd } from "@/lib/structuredData";

/** Always emit a single object with @context — bare arrays break parsers that call @context.toLowerCase(). */
function normalizeJsonLd(data: JsonLd): Record<string, unknown> | null {
  if (!data) return null;

  if (Array.isArray(data)) {
    const graph = data
      .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
      .map((item) => {
        const { "@context": _context, ...rest } = item;
        return rest;
      });

    if (graph.length === 0) return null;
    if (graph.length === 1) {
      return { "@context": "https://schema.org", ...graph[0] };
    }

    return {
      "@context": "https://schema.org",
      "@graph": graph,
    };
  }

  if (!data["@context"]) {
    return { "@context": "https://schema.org", ...data };
  }

  return data;
}

export default function JsonLdScript({ data }: { data: JsonLd }) {
  const payload = normalizeJsonLd(data);
  if (!payload) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
