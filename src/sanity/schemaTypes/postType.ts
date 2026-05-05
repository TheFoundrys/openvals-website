import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'analytics',
      title: 'Blog Analytics & Reporting',
      type: 'object',
      fields: [
        defineField({ name: 'topic', type: 'string', title: 'Topic' }),
        defineField({ name: 'objective', type: 'string', title: 'Objective' }),
        defineField({ name: 'pageViews', type: 'number', title: 'Page Views' }),
        defineField({ name: 'uniqueVisitors', type: 'number', title: 'Unique Visitors' }),
        defineField({ name: 'avgTimeOnPage', type: 'number', title: 'Avg Time on Page (sec)' }),
        defineField({ name: 'bounceRate', type: 'number', title: 'Bounce Rate (%)' }),
        defineField({ name: 'scrollDepth', type: 'number', title: 'Max Scroll Depth (%)' }),
        defineField({ name: 'ctaClicks', type: 'number', title: 'CTA Clicks' }),
        defineField({ name: 'conversions', type: 'number', title: 'Conversions' }),
        defineField({ name: 'conversionRate', type: 'number', title: 'Conversion Rate (%)' }),
        defineField({ name: 'keywordRanking', type: 'string', title: 'Top Keyword Ranking' }),
        defineField({ name: 'impressions', type: 'number', title: 'Impressions' }),
        defineField({ name: 'backlinks', type: 'number', title: 'Backlinks' }),
        defineField({ name: 'insights', type: 'text', title: 'Key Insights' }),
        defineField({ name: 'nextAction', type: 'string', title: 'Next Action' }),
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
