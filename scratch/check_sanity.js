
async function check() {
  const query = encodeURIComponent('*[_type == "post"]{title, "slug": slug.current}');
  const url = `https://lvb9zui8.api.sanity.io/v2026-04-06/data/query/production?query=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}
check();
