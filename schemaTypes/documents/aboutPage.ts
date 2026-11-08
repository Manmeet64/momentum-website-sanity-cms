// studio/schemaTypes/documents/aboutPage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  description:
    'Everything on the About page (/about): intro, montage video, sports ticker and founders.',
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'montage', title: 'Video'},
    {name: 'sports', title: 'Sports'},
    {name: 'founders', title: 'Founders'},
  ],
  fields: [
    defineField({
      name: 'hero',
      group: 'intro',
      title: 'Hero',
      type: 'object',
      fields: [
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
      name: 'montage',
      group: 'montage',
      title: 'Montage video',
      description:
        'Landscape MP4 (H.264, ideally 1080p or lower, under ~60 MB). It streams from Sanity as you watch; viewers do not download it first. Leave empty to hide the section.',
      type: 'object',
      fields: [
        defineField({
          name: 'video',
          title: 'Video file',
          type: 'file',
          options: { accept: 'video/mp4,video/webm' },
        }),
        defineField({
          name: 'poster',
          title: 'Poster image',
          description: 'Shown until the video starts. Pick a frame that looks good on its own.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          validation: (Rule) => Rule.max(120),
        }),
      ],
    }),
    defineField({
      name: 'sports',
      group: 'sports',
      title: 'Sports ticker',
      description:
        'The big scrolling words under the story. Split across two rows, so 8 or more looks best. Tick "Highlight" for anything that is ours (like Myrox).',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(24),
            }),
            defineField({
              name: 'highlight',
              title: 'Highlight',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', highlight: 'highlight' },
            prepare: ({ title, highlight }) => ({ title, subtitle: highlight ? 'Highlighted' : '' }),
          },
        },
      ],
    }),
    defineField({
      name: 'founders',
      group: 'founders',
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
