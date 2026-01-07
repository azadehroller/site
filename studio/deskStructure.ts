// sanity/deskStructure.ts
import type {StructureResolver} from 'sanity/structure'
import {
  DocumentIcon,
  CogIcon,
  DocumentsIcon,
  TagIcon,
  HomeIcon,
  RocketIcon,
  ComposeIcon,
  CreditCardIcon,
  BulbOutlineIcon,
  EarthGlobeIcon,
  ComponentIcon,
  SparklesIcon,
  BlockElementIcon,
  CloseCircleIcon,
  UsersIcon,
  LinkIcon,
  PresentationIcon,
  EditIcon,
} from '@sanity/icons'

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // ==========================================
      // SINGLES - Singleton Pages
      // ==========================================
      S.listItem()
        .title('Singles')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Single Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                ),
              S.listItem()
                .title('Get Started')
                .icon(RocketIcon)
                .child(
                  S.document()
                    .schemaType('getStartedPage')
                    .documentId('getStartedPage')
                ),
              S.listItem()
                .title('Blog Landing')
                .icon(ComposeIcon)
                .child(
                  S.document()
                    .schemaType('blogLandingPage')
                    .documentId('blogLandingPage')
                ),
              S.listItem()
                .title('Pricing')
                .icon(CreditCardIcon)
                .child(
                  S.document()
                    .schemaType('pricingPage')
                    .documentId('pricingPage')
                ),
              S.listItem()
                .title('Features')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('featuresLandingPage')
                    .documentId('featuresLandingPage')
                ),
              S.listItem()
                .title('Industries')
                .icon(BlockElementIcon)
                .child(
                  S.document()
                    .schemaType('industriesLandingPage')
                    .documentId('industriesLandingPage')
                ),
              S.listItem()
                .title('Partners')
                .icon(LinkIcon)
                .child(
                  S.document()
                    .schemaType('partnersLandingPage')
                    .documentId('partnersLandingPage')
                ),
              S.listItem()
                .title('Competitors')
                .icon(UsersIcon)
                .child(
                  S.document()
                    .schemaType('competitorsLandingPage')
                    .documentId('competitorsLandingPage')
                ),
              S.listItem()
                .title('Not Found Page')
                .icon(CloseCircleIcon)
                .child(
                  S.document()
                    .schemaType('notFoundPage')
                    .documentId('notFoundPage')
                ),
            ])
        ),

      // ==========================================
      // LANDING PAGES - Root-level landing pages
      // ==========================================
      S.listItem()
        .title('Landing Pages')
        .icon(PresentationIcon)
        .child(
          S.documentTypeList('landingPage')
            .title('Landing Pages')
        ),

      // ==========================================
      // GENERAL PAGES - General pages with root-level slugs
      // ==========================================
      S.listItem()
        .title('General Pages')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('page')
            .title('General Pages')
        ),

      S.divider(),

      // ==========================================
      // FEATURES - Product Features
      // ==========================================
      S.listItem()
        .title('Features')
        .icon(BulbOutlineIcon)
        .child(
          S.documentTypeList('feature')
            .title('Features')
        ),

      // ==========================================
      // INDUSTRIES - Industry Pages
      // ==========================================
      S.listItem()
        .title('Industries')
        .icon(EarthGlobeIcon)
        .child(
          S.documentTypeList('industry')
            .title('Industries')
        ),

      // ==========================================
      // SOLUTIONS - Solution Pages
      // ==========================================
      S.listItem()
        .title('Solutions')
        .icon(ComponentIcon)
        .child(
          S.documentTypeList('solution')
            .title('Solutions')
        ),

      // ==========================================
      // PARTNERS - Partner Pages
      // ==========================================
      S.listItem()
        .title('Partners')
        .icon(LinkIcon)
        .child(
          S.documentTypeList('partner')
            .title('Partners')
        ),

      // ==========================================
      // COMPETITORS - Competitor Comparison Pages
      // ==========================================
      S.listItem()
        .title('Competitors')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('competitor')
            .title('Competitors')
        ),

      S.divider(),

      // ==========================================
      // BLOG POSTS
      // ==========================================
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
        ),

      S.divider(),

      // ==========================================
      // GLOBALS - Global Components
      // ==========================================
      S.listItem()
        .title('Globals')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Global Components')
            .items([
              S.listItem()
                .title('Header')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('headerGlobal')
                    .documentId('headerGlobal')
                ),
              S.listItem()
                .title('Footer')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('footerGlobal')
                    .documentId('footerGlobal')
                ),
              S.listItem()
                .title('Forms')
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList('hubspotForm')
                    .title('HubSpot Forms')
                ),
              S.listItem()
                .title('Widget Stats')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('widgetStats')
                    .documentId('widgetStats')
                ),
              S.listItem()
                .title('Widget User Reviews')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('widgetUserReviews')
                    .documentId('widgetUserReviews')
                ),
              S.listItem()
                .title('Testimonial Carousel')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('testimonialCarousel')
                    .documentId('testimonialCarousel')
                ),
              S.listItem()
                .title('Logo Set (Light Background)')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('logoSetGlobal')
                    .documentId('logoSetGlobal')
                    .title('Logo Set (Light Background)')
                ),
              S.listItem()
                .title('Logo Set (Dark Background)')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('logoSetGlobal')
                    .documentId('logoSetGlobalDark')
                    .title('Logo Set (Dark Background)')
                ),
              S.listItem()
                .title('Features Selector')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('featuresSelectorGlobal')
                    .documentId('featuresSelectorGlobal')
                ),
              S.listItem()
                .title('Industry Selector')
                .icon(EarthGlobeIcon)
                .child(
                  S.document()
                    .schemaType('industrySelectorGlobalDoc')
                    .documentId('industrySelectorGlobal')
                ),
              S.listItem()
                .title('Stats Set Stacked')
                .icon(TagIcon)
                .child(
                  S.document()
                    .schemaType('statsSetStackedGlobalDoc')
                    .documentId('statsSetStackedGlobal')
                ),
              
              S.divider(),
              
              // ==========================================
              // Blog Post Metadata - Topics, Authors, Tags
              // ==========================================
              S.listItem()
                .title('Blog Post Metadata')
                .icon(EditIcon)
                .child(
                  S.list()
                    .title('Blog Post Metadata')
                    .items([
                      S.listItem()
                        .title('Topics')
                        .icon(TagIcon)
                        .child(
                          S.documentTypeList('blogTopic')
                            .title('Blog Topics')
                        ),
                      S.listItem()
                        .title('Authors')
                        .icon(UsersIcon)
                        .child(
                          S.documentTypeList('blogAuthor')
                            .title('Blog Authors')
                        ),
                      S.listItem()
                        .title('Tags')
                        .icon(TagIcon)
                        .child(
                          S.document()
                            .schemaType('blogTagsGlobal')
                            .documentId('blogTagsGlobal')
                            .title('Blog Tags')
                        ),
                    ])
                ),
            ])
        ),
    ])
