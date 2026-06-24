import {StructureToolOptions} from 'sanity/structure'

export const structure: StructureToolOptions['structure'] = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.listItem()
        .title('About Section')
        .child(
          S.document().schemaType('aboutSection').documentId('aboutSection'),
        ),
      S.listItem()
        .title('Vault Section')
        .child(
          S.document().schemaType('vaultSection').documentId('vaultSection'),
        ),
      S.divider(),
      S.documentTypeListItem('vaultEvent').title('Vault Events'),
      S.divider(),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('member').title('Members'),
      S.divider(),
      S.listItem()
        .title('Collab Page')
        .child(
          S.document().schemaType('collabPage').documentId('collabPage'),
        ),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
    ])
