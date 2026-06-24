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
  ],
  preview: {
    prepare() {
      return { title: 'About Section' }
    },
  },
})
