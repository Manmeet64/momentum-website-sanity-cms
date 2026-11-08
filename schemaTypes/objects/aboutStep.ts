import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutStep',
  title: 'About Step',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Optional, up to three real photos of members. Each one needs a short description.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Describe the photo',
              type: 'string',
              description:
                'For screen readers and search, e.g. "Members laughing after a Sunday run in Kharghar"',
              validation: (Rule) => Rule.required().max(160),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'images.0',
    },
  },
})
