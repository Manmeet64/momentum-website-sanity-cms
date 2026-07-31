// studio/schemaTypes/documents/aboutPage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required().max(120),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founders',
      title: 'Founders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              validation: (Rule) => Rule.required().max(500),
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'string',
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photoPosition',
              title: 'Photo Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Top', value: 'top' },
                  { title: 'Center', value: 'center' },
                ],
                layout: 'radio',
              },
              initialValue: 'top',
            }),
            defineField({
              name: 'hoverPhoto',
              title: 'Hover Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'hoverPhotoPosition',
              title: 'Hover Photo Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Top', value: 'top' },
                  { title: 'Center', value: 'center' },
                ],
                layout: 'radio',
              },
              initialValue: 'top',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'photo' },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
