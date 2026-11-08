import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, singletonTypes} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Momentum Web',

  projectId: 'dsr2azhe',
  dataset: process.env.SANITY_STUDIO_DATASET || 'development',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // One-off pages are edited from the desk only, never created from "New".
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.includes(schemaType)),
  },

  document: {
    // No duplicate or delete on one-off pages (the website reads fixed IDs).
    actions: (input, {schemaType}) =>
      singletonTypes.includes(schemaType)
        ? input.filter(({action}) => action && !['duplicate', 'delete'].includes(action))
        : input,
  },
})
