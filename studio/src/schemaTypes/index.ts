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
import notFoundPage from './documents/notFoundPage'
import feature from './documents/feature'
import industry from './documents/industry'
import solution from './documents/solution'
import roller from './documents/roller'
import { rawHtmlPage } from './documents/rawHtmlPage'
import { widgetStats, widgetUserReviews, testimonialCarousel } from './documents/globals'
import testimonialCarouselReference from './objects/testimonialCarouselReference'
import { hubspotForm } from './documents/formsGlobal'
import hubspotFormReference from './objects/hubspotFormReference'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singles (singleton pages)
  homepage,
  getStartedPage,
  blogLandingPage,
  pricingPage,
  featuresLandingPage,
  industriesLandingPage,
  notFoundPage,
  // Document types - Collections
  feature,
  industry,
  solution,
  roller,
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
]
