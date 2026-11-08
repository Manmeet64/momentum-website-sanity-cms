import type {StructureBuilder, StructureToolOptions} from 'sanity/structure'
import {FolderIcon, ListIcon, PageIcon} from './icons'

// Types that exist exactly once (fixed document ID = type name, except the
// per-page FAQs). Used by sanity.config.ts to hide "create" and delete.
export const singletonTypes = [
  'hero',
  'aboutSection',
  'aboutPage',
  'ctaSection',
  'collabPage',
  'siteSettings',
  'sessionSection',
  'faqSection',
]

const single = (
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId = schemaType,
) =>
  S.listItem()
    .title(title)
    .icon(PageIcon)
    .id(documentId)
    .child(S.document().schemaType(schemaType).documentId(documentId))

const list = (S: StructureBuilder, title: string, schemaType: string) =>
  S.documentTypeListItem(schemaType).title(title).icon(ListIcon)

// A folder is a pane that lists its content; titles say what it is and where
// it appears on the website, since editors find content by page.
const folder = (S: StructureBuilder, title: string, items: any[]) =>
  S.listItem()
    .title(title)
    .icon(FolderIcon)
    .child(S.list().title(title).items(items))

export const structure: StructureToolOptions['structure'] = (S) =>
  S.list()
    .title('Content')
    .items([
      folder(S, 'Home page', [
        single(S, 'Top banner', 'hero'),
        single(S, 'About us steps', 'aboutSection'),
        single(S, 'The session', 'sessionSection'),
        single(S, 'FAQ', 'faqSection', 'landingFaq'),
        S.divider(),
        list(S, '→ Events (shared)', 'vaultEvent'),
        list(S, '→ Partners (shared)', 'partner'),
      ]),
      folder(S, 'About page', [
        single(S, 'About page content', 'aboutPage'),
        single(S, 'FAQ', 'faqSection', 'aboutFaq'),
      ]),
      folder(S, 'Collab page', [
        single(S, 'Collab page content', 'collabPage'),
      ]),
      S.divider(),
      folder(S, 'Shared content', [
        list(S, 'Events', 'vaultEvent'),
        list(S, 'Partners', 'partner'),
        list(S, 'Testimonials', 'testimonial'),
        list(S, 'Members', 'member'),
        list(S, 'Hero videos', 'heroMedia'),
        single(S, 'Join banner', 'ctaSection'),
      ]),
      S.divider(),
      single(S, 'Site settings', 'siteSettings'),
    ])
