
async function testQuery() {
  const slug = "What Does It Mean to Evaluate an AI Model"; // No question mark
  const query = encodeURIComponent(`*[_type == "post" && (slug.current == $slug || slug.current == $slug + " " || slug.current match $slug)][0]{title, slug}`);
  const url = `https://lvb9zui8.api.sanity.io/v2026-04-06/data/query/production?query=${query}&$slug=%22${encodeURIComponent(slug)}%22`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Query with $slug:", slug);
    console.log("Result:", JSON.stringify(data.result, null, 2));
  } catch (e) {
    console.error(e);
  }
}
testQuery();
