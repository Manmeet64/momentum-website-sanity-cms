import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Phrase it the way a visitor would ask it, e.g. "Can I come alone?"',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description:
        'Plain text. Answer in the first sentence, then add detail. About 40 to 70 words works best.',
      validation: (Rule) => Rule.required().max(700),
    }),
  ],
  preview: {
    select: {title: 'question', subtitle: 'answer'},
  },
})
