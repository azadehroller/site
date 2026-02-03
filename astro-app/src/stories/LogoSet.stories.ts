import type { Meta, StoryObj } from 'astrobook';
import LogoSet from '../components/blocks/LogoSet.astro';

const meta: Meta<typeof LogoSet> = {
  title: 'Components/LogoSet',
  component: LogoSet,
};

export default meta;
type Story = StoryObj<typeof LogoSet>;

// Note: LogoSet displays different logos based on user's region (AMER, APAC, EMEA, UK)
// Using placeholder images for demonstration
// In production, these would come from Sanity CMS

// All placeholder logos using placehold.co service (guaranteed to work)
const sampleLogos = {
  logo1: 'https://placehold.co/194x80/033180/white/png?text=Partner+1',
  logo2: 'https://placehold.co/194x80/033180/white/png?text=Partner+2',
  logo3: 'https://placehold.co/194x80/033180/white/png?text=Partner+3',
  logo4: 'https://placehold.co/194x80/033180/white/png?text=Partner+4',
  logo5: 'https://placehold.co/194x80/033180/white/png?text=Partner+5',
  logo6: 'https://placehold.co/194x80/033180/white/png?text=Partner+6',
  logo7: 'https://placehold.co/194x80/033180/white/png?text=Partner+7',
  logo8: 'https://placehold.co/194x80/033180/white/png?text=Partner+8',
};

// Basic with Americas logos
export const AmericasLogos: Story = {
  args: {
    customTitle: 'Trusted by leading venues across the Americas',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
      { _key: '4', image: { asset: { url: sampleLogos.logo4 } }, alt: 'Partner 4' },
    ],
    theme: 'dark',
    textAlignment: 'center',
    showDivider: false,
  },
};

// EMEA region logos
export const EmeaLogos: Story = {
  args: {
    customTitle: 'Trusted by top European venues',
    emeaLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
    ],
    theme: 'dark',
    textAlignment: 'center',
  },
};

// APAC region logos
export const ApacLogos: Story = {
  args: {
    customTitle: 'Leading the way in Asia Pacific',
    apacLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo4 } }, alt: 'Partner 4' },
      { _key: '2', image: { asset: { url: sampleLogos.logo5 } }, alt: 'Partner 5' },
      { _key: '3', image: { asset: { url: sampleLogos.logo6 } }, alt: 'Partner 6' },
    ],
    theme: 'dark',
    textAlignment: 'center',
  },
};

// UK region logos
export const UkLogos: Story = {
  args: {
    customTitle: 'Trusted by UK hospitality leaders',
    ukLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo5 } }, alt: 'Partner 5' },
      { _key: '2', image: { asset: { url: sampleLogos.logo6 } }, alt: 'Partner 6' },
      { _key: '3', image: { asset: { url: sampleLogos.logo7 } }, alt: 'Partner 7' },
    ],
    theme: 'dark',
    textAlignment: 'center',
  },
};

// Light theme (on dark background)
export const LightTheme: Story = {
  args: {
    customTitle: 'Our partners worldwide',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
    ],
    theme: 'light',
    textAlignment: 'center',
  },
};

// GX Score theme
export const GxScoreTheme: Story = {
  args: {
    customTitle: 'Powering guest experience excellence',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
    ],
    theme: 'gxscore',
    textAlignment: 'center',
  },
};

// Left aligned
export const LeftAligned: Story = {
  args: {
    customTitle: 'Industry leaders trust us',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
    ],
    theme: 'dark',
    textAlignment: 'left',
  },
};

// With divider
export const WithDivider: Story = {
  args: {
    customTitle: 'Trusted by over 3,000 venues worldwide',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
      { _key: '4', image: { asset: { url: sampleLogos.logo4 } }, alt: 'Partner 4' },
    ],
    theme: 'light',
    textAlignment: 'center',
    showDivider: true,
  },
};

// Default title
export const DefaultTitle: Story = {
  args: {
    // Uses default title: "Trusted by over 3,000 venues worldwide"
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo5 } }, alt: 'Partner 5' },
      { _key: '2', image: { asset: { url: sampleLogos.logo6 } }, alt: 'Partner 6' },
      { _key: '3', image: { asset: { url: sampleLogos.logo7 } }, alt: 'Partner 7' },
    ],
    theme: 'dark',
    textAlignment: 'center',
  },
};

// Many logos (scrolling animation)
export const ManyLogos: Story = {
  args: {
    customTitle: 'Trusted by industry leaders worldwide',
    amerLogos: [
      { _key: '1', image: { asset: { url: sampleLogos.logo1 } }, alt: 'Partner 1' },
      { _key: '2', image: { asset: { url: sampleLogos.logo2 } }, alt: 'Partner 2' },
      { _key: '3', image: { asset: { url: sampleLogos.logo3 } }, alt: 'Partner 3' },
      { _key: '4', image: { asset: { url: sampleLogos.logo4 } }, alt: 'Partner 4' },
      { _key: '5', image: { asset: { url: sampleLogos.logo5 } }, alt: 'Partner 5' },
      { _key: '6', image: { asset: { url: sampleLogos.logo6 } }, alt: 'Partner 6' },
    ],
    theme: 'dark',
    textAlignment: 'center',
  },
};
