import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "analytics",
      title: "Analytics & SEO Metadata",
      type: "object",
      fields: [
        defineField({ name: "topic", title: "Topic", type: "string" }),
        defineField({ name: "objective", title: "Objective", type: "text", rows: 2 }),
        defineField({ name: "pageViews", title: "Page Views", type: "number", initialValue: 0 }),
        defineField({ name: "uniqueVisitors", title: "Unique Visitors", type: "number", initialValue: 0 }),
        defineField({ name: "avgTimeOnPage", title: "Avg Time on Page (sec)", type: "number", initialValue: 0 }),
        defineField({ name: "bounceRate", title: "Bounce Rate (%)", type: "number", initialValue: 0 }),
        defineField({ name: "scrollDepth", title: "Avg Scroll Depth (%)", type: "number", initialValue: 0 }),
        defineField({ name: "ctaClicks", title: "CTA Clicks", type: "number", initialValue: 0 }),
        defineField({ name: "conversions", title: "Conversions", type: "number", initialValue: 0 }),
        defineField({ name: "conversionRate", title: "Conversion Rate (%)", type: "number", initialValue: 0 }),
        defineField({ name: "keywordRanking", title: "Keyword Ranking", type: "string" }),
        defineField({ name: "impressions", title: "Impressions", type: "number", initialValue: 0 }),
        defineField({ name: "backlinks", title: "Backlinks Count", type: "number", initialValue: 0 }),
        defineField({ name: "insights", title: "Insights", type: "text", rows: 3 }),
        defineField({
          name: "nextAction",
          title: "Next Action",
          type: "string",
          options: {
            list: [
              { title: "Update Content", value: "update" },
              { title: "Promote on Social", value: "promote" },
              { title: "Improve SEO", value: "seo" },
              { title: "Archive", value: "archive" },
              { title: "None", value: "none" },
            ]
          }
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      }
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
