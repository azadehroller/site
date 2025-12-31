import blockContent from './objects/blockContent'
import columnsBlock from './objects/columnsBlock'
import textBlock from './objects/textBlock'
import rotatingTextBlock from './objects/rotatingTextBlock'
import imageVideoModal from './objects/imageVideoModal'
import buttonStack from './objects/buttonStack'
import button from './objects/button'
import divider from './objects/divider'
import logoSet from './objects/logoSet'
import widgetStatsReference from './objects/widgetStatsReference'
import widgetUserReviewsReference from './objects/widgetUserReviewsReference'
import featuresStackedContent from './objects/featuresStackedContent'
import headingComposition from './objects/headingComposition'
import advancedImage from './objects/advancedImage'
import trustedPartner from './objects/trustedPartner'
import statsSet from './objects/statsSet'
import quoteBlock from './objects/quoteBlock'
import { footerGlobal, footerLink, quickLink, footerColumn, socialLink } from './objects/footerGlobal'
import post from './documents/post'
import page from './documents/page'
import homepage from './documents/homepage'
import getStartedPage from './documents/getStartedPage'
import blogLandingPage from './documents/blogLandingPage'
import pricingPage from './documents/pricingPage'
import featuresLandingPage from './documents/featuresLandingPage'
import industriesLandingPage from './documents/industriesLandingPage'
import partnersLandingPage from './documents/partnersLandingPage'
import competitorsLandingPage from './documents/competitorsLandingPage'
import notFoundPage from './documents/notFoundPage'
import feature from './documents/feature'
import industry from './documents/industry'
import partner from './documents/partner'
import competitor from './documents/competitor'
import solution from './documents/solution'
import roller from './documents/roller'
import landingPage from './documents/landingPage'
import { rawHtmlPage } from './documents/rawHtmlPage'
import { widgetStats, widgetUserReviews, testimonialCarousel, logoSetGlobal, featuresSelectorGlobal, headerGlobal } from './documents/globals'
import testimonialCarouselReference from './objects/testimonialCarouselReference'
import logoSetReference from './objects/logoSetReference'
import { hubspotForm } from './documents/formsGlobal'
import hubspotFormReference from './objects/hubspotFormReference'
import industrySelector from './objects/industrySelector'
import featuresSelectorGlobalReference from './objects/featuresSelectorGlobalReference'
import faqs from './objects/faqs'
import resultsList from './objects/resultsList'
import comparisonTable from './objects/comparisonTable'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singles (singleton pages)
  homepage,
  getStartedPage,
  blogLandingPage,
  pricingPage,
  featuresLandingPage,
  industriesLandingPage,
  partnersLandingPage,
  competitorsLandingPage,
  notFoundPage,
  // Document types - Collections
  feature,
  industry,
  partner,
  competitor,
  solution,
  roller,
  landingPage,
  post,
  page,
  // Block types
  blockContent,
  columnsBlock,
  textBlock,
  rotatingTextBlock,
  imageVideoModal,
  buttonStack,
  button,
  divider,
  logoSet,
  widgetStatsReference,
  featuresStackedContent,
  headingComposition,
  advancedImage,
  trustedPartner,
  statsSet,
  quoteBlock,
  widgetStats,
  widgetUserReviews,
  widgetUserReviewsReference,
  testimonialCarousel,
  testimonialCarouselReference,
  logoSetGlobal,
  logoSetReference,
  featuresSelectorGlobal,
  featuresSelectorGlobalReference,
  headerGlobal,
  rawHtmlPage,
  // Footer types
  footerGlobal,
  footerLink,
  quickLink,
  footerColumn,
  socialLink,
  // Forms
  hubspotForm,
  hubspotFormReference,
  // Industry
  industrySelector,
  // FAQs
  faqs,
  // Results List
  resultsList,
  // Comparison Table
  comparisonTable,
]
