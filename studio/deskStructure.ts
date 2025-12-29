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
  StackCompactIcon,
  SparklesIcon,
  BlockElementIcon,
  CloseCircleIcon,
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
                .title('Not Found Page')
                .icon(CloseCircleIcon)
                .child(
                  S.document()
                    .schemaType('notFoundPage')
                    .documentId('notFoundPage')
                ),
            ])
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
      // ROLLER - ROLLER Content
      // ==========================================
      S.listItem()
        .title('ROLLER')
        .icon(StackCompactIcon)
        .child(
          S.documentTypeList('roller')
            .title('ROLLER')
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
            ])
        ),
    ])
