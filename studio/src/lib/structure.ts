import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singles - Singleton pages (Homepage, Get Started, etc.)
      S.listItem()
        .title('Singles')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Single Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(() => '🏠')
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('Get Started')
                .icon(() => '🚀')
                .child(
                  S.document()
                    .schemaType('getStartedPage')
                    .documentId('getStartedPage')
                ),
            ])
        ),
      S.divider(),
      // Globals section
      S.listItem()
        .title('Globals')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Global Components')
            .items([
              S.listItem()
                .title('Footer')
                .icon(() => '📋')
                .child(
                  S.document()
                    .schemaType('footerGlobal')
                    .documentId('footerGlobal')
                ),
              S.listItem()
                .title('Forms')
                .icon(() => '📝')
                .child(
                  S.documentTypeList('hubspotForm')
                    .title('HubSpot Forms')
                ),
              S.listItem()
                .title('Widget Stats')
                .icon(() => '📊')
                .child(
                  S.document()
                    .schemaType('widgetStats')
                    .documentId('widgetStats')
                ),
              S.listItem()
                .title('Widget User Reviews')
                .icon(() => '⭐')
                .child(
                  S.document()
                    .schemaType('widgetUserReviews')
                    .documentId('widgetUserReviews')
                ),
            ])
        ),
      S.divider(),
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => ![
          'homepage',
          'getStartedPage',
          'widgetStats', 
          'widgetUserReviews', 
          'footerGlobal',
          'hubspotForm',
          // Filter out object types that shouldn't appear as documents
          'footerLink',
          'quickLink', 
          'footerColumn',
          'socialLink',
        ].includes(listItem.getId() ?? '')
      ),
    ])
