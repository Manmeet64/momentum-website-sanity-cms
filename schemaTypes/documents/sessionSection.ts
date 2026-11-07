import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sessionSection',
  title: 'Session Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Phrase it as the question people ask, e.g. "What happens at a Momentum session?"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'whoItsFor',
      title: 'Who it is for',
      type: 'text',
      rows: 2,
      description: 'One or two sentences: beginners welcome, come alone, any pace.',
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'moments',
      title: 'What happens',
      type: 'array',
      description: 'Two to four short moments in order, e.g. arrive, move, hang out after.',
      of: [
        {
          type: 'object',
          name: 'moment',
          title: 'Moment',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(320),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Real photos of members at sessions. Two to four.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Describe the photo',
              type: 'string',
              description: 'For screen readers and search, e.g. "Runners laughing after a Sunday morning run in Kharghar"',
              validation: (Rule) => Rule.required().max(160),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'rhythm',
      title: 'Where and when',
      type: 'text',
      rows: 3,
      description:
        'The usual rhythm in plain words: how often, which days and times, which areas. Individual events keep their own date, time and location.',
      validation: (Rule) => Rule.max(400),
    }),
  ],
  preview: {select: {title: 'heading'}},
})
