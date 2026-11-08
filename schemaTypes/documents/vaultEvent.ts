import { defineField, defineType } from 'sanity'

// One document per event, for its whole life: add it ahead of time as an
// upcoming event (time + place show on the site's "next session" card), then
// upload photos once it has happened and it moves into the Vault. The type
// name stays `vaultEvent` so existing documents and queries keep working.

// Today as YYYY-MM-DD in IST, comparable with the `date` field's strings.
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })

const isPast = (date: unknown) => typeof date === 'string' && date < todayIST()

export default defineType({
  name: 'vaultEvent',
  title: 'Event',
  type: 'document',
  description:
    'A Vault event. Upcoming events feed the next-event banner on every page; once a cover image is added after the event, it joins the Home carousel.',
  fields: [
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'eventName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: '24-hour time, e.g. 06:30 or 18:00. Shown on the next-session card.',
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:mm' }).warning(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where to show up, e.g. "Palm Beach Road, Vashi".',
    }),
    defineField({
      name: 'sportTag',
      title: 'Sport Tag',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Add after the event. Events appear in the Vault once they have a cover image.',
      validation: (Rule) =>
        Rule.custom((value, ctx) =>
          isPast(ctx.document?.date) && !value
            ? 'This event has happened — add a cover image so it shows in the Vault.'
            : true,
        ).warning(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload after the event.',
      validation: (Rule) =>
        Rule.custom((value, ctx) =>
          isPast(ctx.document?.date) && !(Array.isArray(value) && value.length)
            ? 'This event has happened — upload its photos.'
            : true,
        ).warning(),
    }),
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'eventName',
      date: 'date',
      media: 'coverImage',
    },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? `${date}${isPast(date) ? '' : ' · Upcoming'}` : undefined,
      media,
    }),
  },
})
