import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'aboutStep' }],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'moreLinkText',
      title: 'Link to the About page',
      type: 'string',
      description:
        'Button text on the last slide, linking to /about. Make it a hook, not "Read more", e.g. "Read how a garage became a community". Leave empty to hide the button.',
      validation: (Rule) => Rule.max(60),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Section' }
    },
  },
})
