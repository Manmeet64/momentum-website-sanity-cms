import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
    }),
    defineField({
      name: 'eventMode',
      title: 'Event Mode',
      type: 'boolean',
      initialValue: false,
      description:
        'ON: show next event + signup button. OFF: general CTA to WhatsApp.',
    }),
    defineField({
      name: 'eventCtaText',
      title: 'Event CTA Text',
      type: 'string',
      description: 'Button label when Event Mode is on (e.g., "Sign up")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventCtaLink',
      title: 'Event CTA Link',
      type: 'url',
      description: 'Signup form URL used when Event Mode is on',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
})
