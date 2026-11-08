import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  description:
    'The first thing visitors see at the top of the Home page: headline, tagline, button and background video.',
  groups: [
    {name: 'text', title: 'Text'},
    {name: 'button', title: 'Button'},
    {name: 'media', title: 'Background'},
  ],
  fields: [
    defineField({
      name: 'headline',
      group: 'text',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverText',
      group: 'text',
      title: 'Hover Text',
      type: 'string',
      description: 'Text revealed on hover behind the headline',
    }),
    defineField({
      name: 'tagline',
      group: 'text',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      group: 'button',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      group: 'button',
      title: 'CTA Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundMedia',
      group: 'media',
      title: 'Background Media (Reference)',
      type: 'reference',
      to: [{ type: 'heroMedia' }],
      description: 'Upload video via Hero Media, then reference it here',
    }),
    defineField({
      name: 'videoUrl',
      group: 'media',
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
