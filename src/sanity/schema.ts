export const schema = {
  types: [
    {
      name: 'post',
      title: 'Post',
      type: 'document',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'publishedAt', title: 'Published at', type: 'datetime' },
        { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }
      ]
    }
  ]
}
