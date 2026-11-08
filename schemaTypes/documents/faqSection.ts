import {defineField, defineType} from 'sanity'

// One document per page, each a singleton in structure.ts (landingFaq now;
// aboutFaq and collabFaq later). The website reads them by document ID.
export default defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading, e.g. "Questions people ask before their first session"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [{type: 'faqItem'}],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare: ({title, items}) => ({
      title,
      subtitle: `${items?.length ?? 0} questions`,
    }),
  },
})
