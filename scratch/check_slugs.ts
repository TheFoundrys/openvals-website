
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'lvb9zui8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-04-06',
});

async function checkSlugs() {
  const query = '*[_type == "post"]{title, "slug": slug.current}';
  const posts = await client.fetch(query);
  console.log(JSON.stringify(posts, null, 2));
}

checkSlugs().catch(console.error);
