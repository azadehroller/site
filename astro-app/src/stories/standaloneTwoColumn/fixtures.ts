import type { PortableTextBlock } from '@portabletext/types';
import type { StandaloneTwoColumnProps } from '@components/standaloneTwoColumn/variants';

export function storyParagraph(...texts: string[]): PortableTextBlock[] {
  return texts.map((text, index) => ({
    _type: 'block',
    _key: `p${index}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${index}`, text, marks: [] }],
  }));
}

export const storyImage = {
  asset: { url: '/images/placeholder.webp' },
  alt: 'Placeholder',
};

export const storyLogo = {
  asset: { url: '/images/placeholder.webp' },
  alt: 'Venue logo',
};

export const baseStandaloneTwoColumnProps: StandaloneTwoColumnProps = {
  theme: 'light',
  background: 'white',
  textColor: 'navy',
  mediaSide: 'right',
  mediaOnTopMobile: false,
  mediaType: 'image',
  image: storyImage,
  imageLoading: 'eager',
  eyebrow: { text: 'Online ticket booking', color: 'red' },
  heading: { text: 'Increase your online conversion rate', size: 'bigger' },
  body: storyParagraph(
    'Sell more tickets online with a booking flow designed for attractions — less friction for guests, more revenue for you.',
  ),
  bodySize: 'normal',
  buttons: [{ label: 'Learn more', style: 'transparentRedArrow', link: { href: '#' } }],
};
