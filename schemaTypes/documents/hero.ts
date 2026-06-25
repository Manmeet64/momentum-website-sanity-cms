import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverText',
      title: 'Hover Text',
      type: 'string',
      description: 'Text revealed on hover behind the headline',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media (Reference)',
      type: 'reference',
      to: [{ type: 'heroMedia' }],
      description: 'Upload video via Hero Media, then reference it here',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Alternative)',
      type: 'url',
      description: 'Or paste a direct video URL here (overrides reference)',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
})
