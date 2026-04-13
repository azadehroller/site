import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";

// Column content types
export interface TextBlock {
  _type: "textBlock";
  _key?: string;
  label?: string;
  content?: PortableTextBlock[];
}

export interface RotatingTextBlock {
  _type: "rotatingTextBlock";
  _key?: string;
  label?: string;
  eyebrow?: string;
  title: string;
  rotatingText?: { _key?: string; rotatingTextItem: string }[];
  text?: string;
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: '' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  rotatingTextLength?: number;
}

export interface ImageVideoModal {
  _type: "imageVideoModal";
  _key?: string;
  label?: string;
  thumbnail?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  videoId: string;
  border?: boolean;
  lightBackgroundShadow?: boolean;
  loading?: 'lazy' | 'eager';
}

export interface ImageBlock {
  _type: "image";
  _key?: string;
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

export interface AdvancedImage {
  _type: "advancedImage";
  _key?: string;
  // Image
  image?: {
    asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } };
  };
  alt?: string;
  caption?: string;
  // Performance
  loading?: 'lazy' | 'eager';
  fetchpriority?: boolean;
  // Dimensions
  responsiveBehavior?: 'fluid' | 'fixed';
  maxWidth?: number;
  customWidth?: number;
  customHeight?: number;
  aspectRatio?: 'original' | '16/9' | '4/3' | '1/1' | '3/2' | '21/9';
  // Button overlay
  showButton?: boolean;
  buttonLink?: string;
  buttonText?: string;
  buttonOpenInNewTab?: boolean;
  // Style
  alignment?: 'left' | 'center' | 'right';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'blue-light' | 'blue-dark';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
}

export interface HeadingCompositionVariant {
  _key?: string;
  variantLabel?: string;
  targetRegions?: string[];
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
}

export interface HeadingComposition {
  _type: "headingComposition";
  _key?: string;
  // Content
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
  // A/B Testing
  experimentActive?: boolean;
  variants?: HeadingCompositionVariant[];
  // Styles
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  addBorderLine?: boolean;
}

// HubSpot Form types
export interface HubspotForm {
  _type: "hubspotForm";
  _id?: string;
  name?: string;
  portalId?: string;
  formId?: string;
  region?: string;
  description?: string;
}

export interface HubspotFormReference {
  _type: "hubspotFormReference";
  _key?: string;
  form?: HubspotForm;
  theme?: 'light' | 'dark';
}

// IndustrySelector types
export interface IndustryLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface IndustryItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: IndustryLink;
}

export interface IndustrySelector {
  _type: "industrySelector";
  _key?: string;
  // Heading - uses HeadingComposition type
  heading?: HeadingComposition;
  // Industries
  industries?: IndustryItem[];
  // CTA
  ctaLabel?: string;
  ctaLink?: IndustryLink;
}

// FAQsSelector types
export interface FaqItem {
  _key?: string;
  title?: string;
  content?: string;
}

// Embedded heading data for FAQs (same structure as HeadingComposition but without _type)
export interface FaqsHeadingData {
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  addBorderLine?: boolean;
}

export interface FAQs {
  _type: "faqs";
  _key?: string;
  // Embedded HeadingComposition for header
  heading?: FaqsHeadingData;
  // FAQ items
  items?: FaqItem[];
  // FAQ-specific styles (separate from heading styles)
  theme?: 'light' | 'dark';
  expandFirst?: boolean;
}

// Results List types
export interface ResultItem {
  _key?: string;
  icon?: string;
  animationFile?: string;
  title?: string;
  content?: string;
  linkLabel?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
}

export interface ResultsList {
  _type: "resultsList";
  _key?: string;
  // Items
  items?: ResultItem[];
  // Optional side image
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  imageAlt?: string;
  // Style options
  theme?: 'light' | 'dark' | 'gxscore';
  // Settings
  useAnimations?: boolean;
}

// Comparison Table types
export interface ComparisonItem {
  _key?: string;
  text?: string;
}

export interface ComparisonColumn {
  _key?: string;
  isCompetitor?: boolean;
  title?: string;
  items?: ComparisonItem[];
}

export interface ComparisonTable {
  _type: "comparisonTable";
  _key?: string;
  columns?: ComparisonColumn[];
}

// Features Pricing Card types
export interface FeaturesPricingFeatureItem {
  _key?: string;
  text?: string;
  tooltip?: string;
}

export interface FeaturesPricingButtonLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface FeaturesPricingCardItem {
  _key?: string;
  title?: string;
  subtitle?: string;
  showDivider?: boolean;
  featuresHeading?: string;
  features?: FeaturesPricingFeatureItem[];
  buttonLabel?: string;
  buttonLink?: FeaturesPricingButtonLink;
}

export interface FeaturesPricingCard {
  _type: "featuresPricingCard";
  _key?: string;
  cards?: FeaturesPricingCardItem[];
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  buttonStyle?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
}

// Features Horizontal Slider types
export interface FeaturesHorizontalSliderSlide {
  _key?: string;
  title?: string;
  content?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  linkLabel?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
}

export interface FeaturesHorizontalSlider {
  _type: "featuresHorizontalSlider";
  _key?: string;
  slides?: FeaturesHorizontalSliderSlide[];
  theme?: 'light' | 'dark' | 'gxscore';
  autoplayDelay?: number;
}

// Card Segmentation types
export interface CardSegmentationLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface CardSegmentationItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  title?: string;
  content?: string;
  linkLabel?: string;
  link?: CardSegmentationLink;
}

export interface CardSegmentation {
  _type: "cardSegmentation";
  _key?: string;
  cards?: CardSegmentationItem[];
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise';
}

// Industry Selector Global types
export interface IndustrySelectorGlobalLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface IndustrySelectorGlobalItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: IndustrySelectorGlobalLink;
}

export interface IndustrySelectorGlobal {
  _type: "industrySelectorGlobal";
  _key?: string;
  heading?: HeadingComposition;
  industries?: IndustrySelectorGlobalItem[];
  ctaLabel?: string;
  ctaLink?: IndustrySelectorGlobalLink;
  theme?: 'light' | 'dark';
}

// Industry Selector Global Reference types (references the global document)
export interface IndustrySelectorGlobalDoc {
  _id: string;
  _type: "industrySelectorGlobalDoc";
  heading?: HeadingComposition;
  industries?: IndustrySelectorGlobalItem[];
  ctaLabel?: string;
  ctaLink?: IndustrySelectorGlobalLink;
  theme?: 'light' | 'dark';
}

export interface IndustrySelectorGlobalReference {
  _type: "industrySelectorGlobalReference";
  _key?: string;
  reference?: IndustrySelectorGlobalDoc;
}

// Stats Set Stacked Global types
export interface StatsSetStackedGlobalItem {
  _key?: string;
  statsNumber?: string;
  statsText?: string;
}

export interface StatsSetStackedGlobalDoc {
  _id: string;
  _type: "statsSetStackedGlobalDoc";
  stats?: StatsSetStackedGlobalItem[];
  theme?: 'light' | 'dark';
  numberColor?: string;
  dividerColor?: 'navy-80' | 'white' | 'navy-40';
}

export interface StatsSetStackedGlobalReference {
  _type: "statsSetStackedGlobalReference";
  _key?: string;
  statsSetStackedGlobal?: StatsSetStackedGlobalDoc;
}

// Widget User Review Card types
export interface WidgetUserReviewCardBadge {
  _key?: string;
  image?: {
    asset?: { _ref?: string; _id?: string; url?: string };
  };
  alt?: string;
  link?: string;
}

export interface WidgetUserReviewCard {
  _type: "widgetUserReviewCard";
  _key?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  badges?: WidgetUserReviewCardBadge[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export type ColumnContent = TextBlock | RotatingTextBlock | ImageVideoModal | ImageBlock | AdvancedImage | ButtonStack | SingleButton | LogoSet | LogoSetReference | StatsSet | QuoteBlock | WidgetStatsReference | WidgetUserReviewsReference | TestimonialCarouselReference | FeaturesStackedContent | HeadingComposition | TrustedPartner | HubspotFormReference | IndustrySelector | FeaturesSelectorGlobalReference | FAQs | ResultsList | ComparisonTable | FeaturesPricingCard | FeaturesHorizontalSlider | CardSegmentation | IndustrySelectorGlobal | IndustrySelectorGlobalReference | WidgetUserReviewCard | StatsSetStackedGlobalReference;

// Button Stack types
export interface ButtonLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface ButtonSettings {
  modalTrigger?: boolean;
  modalTriggerVideo?: boolean;
  formId?: string;
  videoId?: string;
  btnLabel?: string;
  /** Order in a horizontal button row (matches Studio buttonStack) */
  position?: 'left' | 'right';
  buttonLink?: ButtonLink;
}

export interface ButtonIcon {
  iconFieldSvg?: string;
  iconPosition?: 'left' | 'right';
}

export interface ButtonStyles {
  bgKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'primary-inverted' | 'gx_score' | 'gx_score_inverted' | 'industry_report';
}

export interface Button {
  _key?: string;
  buttonSettings?: ButtonSettings;
  btnIcon?: ButtonIcon;
  buttonStyles?: ButtonStyles;
}

export interface ButtonStackStyles {
  layout?: {
    spacing?: {
      marginTop?: string;
      marginBottom?: string;
      marginLeft?: string;
      marginRight?: string;
    };
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  };
  animation?: {
    type?: 'none' | 'pulse';
  };
}

export interface ButtonStack {
  _type: "buttonStack";
  _key?: string;
  buttonList?: Button[];
  styles?: ButtonStackStyles;
}

// Single Button types (matching HubSpot button.module)
export interface SingleButtonLink {
  href?: string;
  urlType?: 'EXTERNAL' | 'EMAIL_ADDRESS' | 'CONTENT' | 'FILE';
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface SingleButtonSettings {
  buttonText?: string;
  link?: SingleButtonLink;
}

export interface SingleButtonIcon {
  iconFieldSvg?: string;
  iconPosition?: 'left' | 'right';
}

export interface SingleButtonBackground {
  bgKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'gx_score' | 'iris' | 'alternative' | 'bright_blue' | 'transparent';
}

export interface SingleButtonAlignment {
  horizontalAlign?: 'LEFT' | 'CENTER' | 'RIGHT';
  buttonWidth?: 'auto' | 'full';
}

export interface SingleButtonAnimation {
  type?: 'none' | 'pulse' | 'scrollto';
}

export interface SingleButtonStyles {
  background?: SingleButtonBackground;
  alignment?: SingleButtonAlignment;
  animation?: SingleButtonAnimation;
}

export interface SingleButton {
  _type: "button";
  _key?: string;
  settings?: SingleButtonSettings;
  btnIcon?: SingleButtonIcon;
  styles?: SingleButtonStyles;
}

// Divider types
export interface Divider {
  _type: "divider";
  _key?: string;
  showDivider?: boolean;
  dividerType?: 'tall' | 'short';
  background?: 'light' | 'dark';
  darkBackgroundColor?: string;
}

// LogoSet types
export interface LogoItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  alt?: string;
}

export interface LogoSet {
  _type: "logoSet";
  _key?: string;
  customTitle?: string;
  amerLogos?: LogoItem[];
  apacLogos?: LogoItem[];
  emeaLogos?: LogoItem[];
  ukLogos?: LogoItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
}

// LogoSetGlobal - Global document for Logo Set
export interface LogoSetGlobal {
  _type: "logoSetGlobal";
  _id?: string;
  customTitle?: string;
  amerLogos?: LogoItem[];
  apacLogos?: LogoItem[];
  emeaLogos?: LogoItem[];
  ukLogos?: LogoItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
}

// LogoSetReference - Reference to global LogoSet document
export interface LogoSetReference {
  _type: "logoSetReference";
  _key?: string;
  pageTitle?: string;
  centerPageTitle?: boolean;
  reference?: LogoSetGlobal;
}

// StatsSet types
export interface StatItemData {
  _key?: string;
  tag?: string;
  statsNumber?: string;
  statsText?: string;
}

export interface StatsSet {
  _type: "statsSet";
  _key?: string;
  stats?: StatItemData[];
  theme?: 'light' | 'dark';
  textType?: '2xl' | 'xl' | 'base' | 'sm' | 'xs';
  spacingStyle?: 'default' | 'small';
}

// QuoteBlock types
export interface QuoteBlockLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface QuoteBlock {
  _type: "quoteBlock";
  _key?: string;
  quoteText?: string;
  quoteAuthor?: string;
  quoteTitle?: string;
  customerStoryLink?: QuoteBlockLink;
  linkLabel?: string;
  imageType?: 'none' | 'avatar' | 'logo';
  avatar?: {
    asset?: { _ref?: string; url?: string };
  };
  avatarAlt?: string;
  logo?: {
    asset?: { _ref?: string; url?: string };
  };
  logoAlt?: string;
  theme?: 'light' | 'dark' | 'gxscore';
  styleVariant?: 'extrabold' | 'regular';
}

// Widget Stats types
export interface StatItem {
  _key?: string;
  icon?: string;
  value?: string;
  label?: string;
}

export interface WidgetStats {
  _type: "widgetStats";
  _id?: string;
  eyebrow?: string;
  title?: string;
  blurb?: string;
  stats?: StatItem[];
  horizontalLayout?: boolean;
}

export interface WidgetStatsReference {
  _type: "widgetStatsReference";
  _key?: string;
  reference?: WidgetStats;
}

// Features Selector Global types
export interface FeatureSelectorLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface FeatureSelectorItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: FeatureSelectorLink;
}

export interface FeaturesSelectorGlobal {
  _type: "featuresSelectorGlobal";
  _id?: string;
  heading?: HeadingComposition;
  features?: FeatureSelectorItem[];
  ctaLabel?: string;
  ctaLink?: FeatureSelectorLink;
}

export interface FeaturesSelectorGlobalReference {
  _type: "featuresSelectorGlobalReference";
  _key?: string;
  reference?: FeaturesSelectorGlobal;
}

// Widget User Reviews types
export interface BadgeItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  alt?: string;
  link?: string;
}

export interface WidgetUserReviews {
  _type: "widgetUserReviews";
  _id?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  badges?: BadgeItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: string;
  headingType?: string;
  displayType?: string;
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export interface WidgetUserReviewsReference {
  _type: "widgetUserReviewsReference";
  _key?: string;
  reference?: WidgetUserReviews;
}

// Testimonial Carousel types
export interface TestimonialLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface TestimonialItem {
  _key?: string;
  content?: string;
  author?: string;
  position?: string;
  logo?: {
    asset?: { _ref?: string; url?: string };
  };
  link?: TestimonialLink;
}

export interface TestimonialCarousel {
  _type: "testimonialCarousel";
  _id?: string;
  eyebrow?: string;
  testimonials?: TestimonialItem[];
}

export interface TestimonialCarouselReference {
  _type: "testimonialCarouselReference";
  _key?: string;
  reference?: TestimonialCarousel;
}

// Features Stacked Content types
export interface FeatureItem {
  _key?: string;
  // Text content
  eyebrow?: string;
  title?: string;
  text?: string;
  // Image
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  imageRatio?: 'aspect-square' | 'aspect-video';
  // Stats
  showStats?: boolean;
  statsNumber?: string;
  statsText?: string;
  statsIcon?: string;
  // Quote
  showQuote?: boolean;
  quoteText?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  quoteImageType?: 'avatar' | 'logo';
  quoteImage?: {
    asset?: { _ref?: string; url?: string };
  };
  quoteImageAlt?: string;
  // CTA
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
  ctaOpenInNewTab?: boolean;
  ctaIcon?: string;
  ctaIconPosition?: 'left' | 'right';
  ctaKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'gx_score';
}

export interface FeaturesStackedContent {
  _type: "featuresStackedContent";
  _key?: string;
  items?: FeatureItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: string;
  eyebrowStyle?: 'red' | 'gradient';
  headingType?: string;
  displayType?: string;
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export interface ColumnsBlock {
  _type: "columnsBlock";
  _key?: string;
  layout: '1' | '2' | '3' | '4' | '1/3' | '3/1';
  column1?: ColumnContent[];
  column2?: ColumnContent[];
  column3?: ColumnContent[];
  column4?: ColumnContent[];
  // Background settings
  backgroundColor?: string;
  customBackgroundColor?: string;
  backgroundImage?: {
    asset?: { _ref?: string; url?: string };
  };
  backgroundPosition?: string;
  backgroundSize?: string;
  // Background gradient
  backgroundGradient?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  // Spacing settings
  paddingTop?: string;
  paddingTopMobile?: string;
  paddingBottom?: string;
  paddingBottomMobile?: string;
  paddingLeft?: string;
  paddingLeftMobile?: string;
  paddingRight?: string;
  paddingRightMobile?: string;
}

// Trusted Partner types
export interface TrustedPartner {
  _type: "trustedPartner";
  _key?: string;
  // Content (HeadingComposition fields)
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
  // Styles (same as HeadingComposition)
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  // Widget User Reviews reference
  userReviews?: WidgetUserReviews;
  // Background settings
  backgroundColor?: string;
  customBackgroundColor?: string;
  backgroundImage?: {
    asset?: { _ref?: string; url?: string };
  };
  backgroundPosition?: string;
  backgroundSize?: string;
  // Card spacing
  cardPadding?: string;
  borderRadius?: string;
}

// Announcement bar settings - editable object with theme, text, link, etc.
export interface AnnouncementBarSettings {
  enabled?: boolean;
  theme?: "default" | "new_design" | "industry_report" | "product_launch";
  text?: string;
  ctaText?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
  countdownDate?: string;
}

// SEO fields - shared across all page types
export interface SEOFields {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
    alt?: string;
  };
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface Homepage extends SEOFields {
  _type: "homepage";
  _id: string;
  _updatedAt?: string;
  title?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

export interface GetStartedPage extends SEOFields {
  _type: "getStartedPage";
  _id: string;
  _updatedAt?: string;
  title?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

export interface IndustriesLandingPage extends SEOFields {
  _type: "industriesLandingPage";
  _id: string;
  _updatedAt?: string;
  title?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}

export interface Page extends SEOFields {
  _type: "page";
  _id: string;
  title?: string;
  slug: Slug;
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  sections?: (ColumnsBlock | Divider | Post)[];
}

export interface Feature extends SEOFields {
  _type: "feature";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}

export interface Industry extends SEOFields {
  _type: "industry";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}


// FeaturesLandingPage document type
// FeaturesLandingPage interface
export interface FeaturesLandingPage {
  _id: string;
  _updatedAt?: string;
  _type: "featuresLandingPage";
  title?: string;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

export interface Partner extends SEOFields {
  _type: "partner";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}

export interface PartnersLandingPage extends SEOFields {
  _type: "partnersLandingPage";
  _id: string;
  title?: string;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

export interface Competitor extends SEOFields {
  _type: "competitor";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}

export interface CompetitorsLandingPage extends SEOFields {
  _type: "competitorsLandingPage";
  _id: string;
  title?: string;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

// Blog Topic interface
export interface BlogTopic {
  _type: "blogTopic";
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  hubspotId?: string;
}

// Blog Author interface
export interface BlogAuthor {
  _type: "blogAuthor";
  _id: string;
  name: string;
  slug: Slug;
  email?: string;
  bio?: string;
  avatar?: { url?: string; alt?: string };
  website?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  hubspotId?: string;
}

export interface Post {
  _type: "post";
  _id: string;
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  featuredImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  body?: PortableTextBlock[];
  // New fields for HubSpot compatibility
  topics?: BlogTopic[];
  author?: BlogAuthor;
  tags?: string[];
  metaDescription?: string;
  hubspotId?: string;
  hubspotUrl?: string;
  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
  noIndex?: boolean;
  canonicalUrl?: string;
}

// Footer Global Types
export interface FooterLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface QuickLink extends FooterLink {
  icon?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'linkedin' | 'youtube' | 'facebook' | 'twitter' | 'instagram';
  url: string;
  icon?: string;
}

export interface FooterGlobal {
  _type: "footerGlobal";
  _id: string;
  // Newsletter section
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterButtonText?: string;
  newsletterPlaceholder?: string;
  // Quick links
  quickLinks?: QuickLink[];
  // Navigation columns
  columns?: FooterColumn[];
  // Bottom bar
  copyrightText?: string;
  legalLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  socialText?: string;
  // Floating button
  showFloatingButton?: boolean;
  floatingButtonUrl?: string;
  floatingButtonPrimaryText?: string;
  floatingButtonSecondaryText?: string;
}

// Header types
export interface HeaderNavItem {
  _key?: string;
  label: string;
  href?: string;
  hasMegaMenu?: boolean;
}

export interface HeaderMegaMenuItem {
  _key?: string;
  title: string;
  description?: string;
  icon?: string;
  link?: {
    href: string;
    openInNewTab?: boolean;
  };
  topFeatures?: Array<{
    title: string;
    link?: string;
  }>;
}

export interface HeaderMegaFeaturedItem {
  _key?: string;
  title: string;
  label?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  link?: {
    href: string;
    openInNewTab?: boolean;
  };
}

export interface HeaderSubIntro {
  _key?: string;
  title: string;
}

export interface HeaderMegaMenu {
  _key?: string;
  parentLabel: string;
  menuType?: 'why_roller' | 'features' | 'industries' | 'solutions';
  useAlternateLayout?: boolean;
  subIntros?: HeaderSubIntro[];
  introTitle?: string;
  introDescription?: string;
  items?: HeaderMegaMenuItem[];
  featuredLabel?: string;
  featuredItems?: HeaderMegaFeaturedItem[];
  ctaLabel?: string;
  ctaLink?: string;
}

export interface HeaderButton {
  _key?: string;
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
  openInNewTab?: boolean;
}

export interface HeaderGlobal {
  _type: "headerGlobal";
  _id: string;
  logo?: {
    asset?: {
      url: string;
    };
  };
  logoDark?: {
    asset?: {
      url: string;
    };
  };
  logoAlt?: string;
  logoLink?: string;
  navItems?: HeaderNavItem[];
  megaMenus?: HeaderMegaMenu[];
  buttons?: HeaderButton[];
}

/**
 * Fetch header global settings
 * Returns the header configuration from Sanity
 */

// Landing Page type for root-level landing pages
export interface LandingPage extends SEOFields {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  announcementBar?: AnnouncementBarSettings;
}

// Solution type for solution pages
export interface Solution extends SEOFields {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  announcementBar?: AnnouncementBarSettings;
}

// Chatbot Configuration types
export interface ChatbotConfig {
  enabled: boolean;
  displayName?: string;
  welcomeMessage?: string;
  systemPrompt: string;
  fallbackMessage: string;
  errorMessage?: string;
  maxChunks: number;
  similarityThreshold: number;
  maxTokens: number;
}

// FeaturesDetail types (inferred from component usage)
export interface FeaturesDetailItem {
  _key?: string;
  icon?: string;
  iconAsImage?: {
    asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } };
  };
  image?: {
    asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } };
    alt?: string;
  };
  title?: string;
  text?: string;
  linkLabel?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
}

export interface FeaturesDetail {
  _type: "featuresDetail";
  _key?: string;
  content?: {
    eyebrow?: string;
    title?: string;
    text?: PortableTextBlock[];
  };
  features?: FeaturesDetailItem[];
  styles?: {
    layout?: 'default' | 'widget' | 'integration';
    contentLayout?: 'default' | 'column_item';
    spacing?: {
      marginBottom?: string;
    };
  };
}
