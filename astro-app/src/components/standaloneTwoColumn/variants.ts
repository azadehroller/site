export * from './options';

import type { PortableTextBlock } from '@portabletext/types';
import type {
  StandaloneTwoColumnBackground,
  StandaloneTwoColumnBodySize,
  StandaloneTwoColumnButtonStyle,
  StandaloneTwoColumnEyebrowColor,
  StandaloneTwoColumnHeadingSize,
  StandaloneTwoColumnImageLoading,
  StandaloneTwoColumnLayout,
  StandaloneTwoColumnMediaSide,
  StandaloneTwoColumnMediaType,
  StandaloneTwoColumnRowMode,
  StandaloneTwoColumnStatPlacement,
  StandaloneTwoColumnTextColor,
  StandaloneTwoColumnTheme,
} from './options';

export interface StandaloneTwoColumnAsset {
  _ref?: string;
  url?: string;
}

export interface StandaloneTwoColumnImage {
  asset?: StandaloneTwoColumnAsset;
  alt?: string;
}

export interface StandaloneTwoColumnContentReference {
  _id?: string;
  _type?: string;
  title?: string;
  slug?: { current?: string };
}

export interface StandaloneTwoColumnButtonLink {
  urlType?: 'EXTERNAL' | 'EMAIL_ADDRESS' | 'CONTENT' | 'FILE';
  href?: string;
  contentReference?: StandaloneTwoColumnContentReference;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface StandaloneTwoColumnButton {
  _key?: string;
  label?: string;
  style?: StandaloneTwoColumnButtonStyle;
  link?: StandaloneTwoColumnButtonLink;
}

export interface StandaloneTwoColumnLoopItem {
  _key?: string;
  heading?: string;
  body?: string;
  image?: StandaloneTwoColumnImage;
}

export interface StandaloneTwoColumnProps {
  _type?: 'standaloneTwoColumnBlock';
  _key?: string;
  theme?: StandaloneTwoColumnTheme;
  background?: StandaloneTwoColumnBackground;
  textColor?: StandaloneTwoColumnTextColor;
  layout?: StandaloneTwoColumnLayout;
  rowMode?: StandaloneTwoColumnRowMode;
  columnLoop?: StandaloneTwoColumnLoopItem[];
  mediaSide?: StandaloneTwoColumnMediaSide;
  mediaOnTopMobile?: boolean;
  mediaType?: StandaloneTwoColumnMediaType;
  image?: StandaloneTwoColumnImage;
  imageLoading?: StandaloneTwoColumnImageLoading;
  wistiaId?: string;
  posterImage?: StandaloneTwoColumnImage;
  stat?: {
    number?: string;
    label?: string;
    placement?: StandaloneTwoColumnStatPlacement;
  };
  eyebrow?: {
    text?: string;
    color?: StandaloneTwoColumnEyebrowColor;
  };
  heading?: {
    text?: string;
    size?: StandaloneTwoColumnHeadingSize;
  };
  body?: PortableTextBlock[];
  bodySize?: StandaloneTwoColumnBodySize;
  quote?: {
    quoteText?: string;
    quoterName?: string;
    quoterPosition?: string;
    quoterLogo?: StandaloneTwoColumnImage;
  };
  buttons?: StandaloneTwoColumnButton[];
  documentId?: string;
  documentType?: string;
}
