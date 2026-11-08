import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroMedia',
  title: 'Hero Media',
  type: 'document',
  description:
    'A background video and poster. Pick one in the Top banner on the Home page.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/mp4' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Static fallback / loading thumbnail',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'posterImage',
    },
  },
})
