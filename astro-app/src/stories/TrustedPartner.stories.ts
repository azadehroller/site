import type { Meta, StoryObj } from 'astrobook';
import TrustedPartner from '../components/blocks/TrustedPartner.astro';

const meta: Meta<typeof TrustedPartner> = {
  title: 'Components/TrustedPartner',
  component: TrustedPartner,
};

export default meta;
type Story = StoryObj<typeof TrustedPartner>;

// Note: TrustedPartner combines HeadingComposition with WidgetUserReviews badges
// Badges require Sanity images - showing placeholder configuration

// Basic card - light theme
export const BasicLight: Story = {
  args: {
    eyebrow: 'TRUSTED BY',
    title: 'Industry Leaders',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    eyebrow: 'RECOGNIZED BY',
    title: 'Top Review Platforms',
    theme: 'dark',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--primary-50)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// GX Score theme
export const GxScoreTheme: Story = {
  args: {
    eyebrow: 'GX SCORE',
    title: 'Trusted Excellence',
    theme: 'gxscore',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--gx-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// Left aligned
export const LeftAligned: Story = {
  args: {
    eyebrow: 'OUR PARTNERS',
    title: 'Working with the Best',
    theme: 'light',
    textAlignment: 'LEFT',
    headingType: 'h3',
    displayType: 'h3',
    backgroundColor: 'var(--neutral-white)',
    cardPadding: '24px',
    borderRadius: '16px',
  },
};

// With red eyebrow style
export const RedEyebrow: Story = {
  args: {
    eyebrow: 'FEATURED ON',
    title: 'Press & Media',
    theme: 'light',
    textAlignment: 'CENTER',
    eyebrowStyle: 'red',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// With blue eyebrow style
export const BlueEyebrow: Story = {
  args: {
    eyebrow: 'CERTIFIED BY',
    title: 'Security Partners',
    theme: 'light',
    textAlignment: 'CENTER',
    eyebrowStyle: 'blue',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--neutral-white)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// With iris (purple) eyebrow style
export const IrisEyebrow: Story = {
  args: {
    eyebrow: 'POWERED BY',
    title: 'Innovation Leaders',
    theme: 'light',
    textAlignment: 'CENTER',
    eyebrowStyle: 'iris',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// Custom background color
export const CustomBackground: Story = {
  args: {
    eyebrow: 'PARTNERS',
    title: 'Global Reach',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'custom',
    customBackgroundColor: '#f0f5ff',
    cardPadding: '40px',
    borderRadius: '32px',
  },
};

// Large padding
export const LargePadding: Story = {
  args: {
    eyebrow: 'TRUSTED',
    title: 'By Thousands Worldwide',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '48px',
    borderRadius: '32px',
  },
};

// Small border radius
export const SmallBorderRadius: Story = {
  args: {
    eyebrow: 'RECOGNIZED',
    title: 'Award Winners',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h3',
    displayType: 'h3',
    backgroundColor: 'var(--neutral-white)',
    cardPadding: '24px',
    borderRadius: '8px',
  },
};

// With border line
export const WithBorderLine: Story = {
  args: {
    eyebrow: 'ENDORSED BY',
    title: 'Industry Experts',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    addBorderLine: true,
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// Smaller heading size
export const SmallerHeading: Story = {
  args: {
    eyebrow: 'PARTNERS',
    title: 'Technology Allies',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h4',
    displayType: 'h4',
    backgroundColor: 'var(--neutral-white)',
    cardPadding: '24px',
    borderRadius: '16px',
  },
};

// SMB theme
export const SmbTheme: Story = {
  args: {
    eyebrow: 'SMB EDITION',
    title: 'Small Business Partners',
    theme: 'smb',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// Enterprise theme
export const EnterpriseTheme: Story = {
  args: {
    eyebrow: 'ENTERPRISE',
    title: 'Enterprise Solutions',
    theme: 'enterprise',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--primary-50)',
    cardPadding: '32px',
    borderRadius: '24px',
  },
};

// With placeholder badges (demonstrates structure)
export const WithBadges: Story = {
  args: {
    eyebrow: 'AS SEEN ON',
    title: 'Review Platforms',
    theme: 'light',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
    backgroundColor: 'var(--blue-10)',
    cardPadding: '32px',
    borderRadius: '24px',
    badges: [
      {
        _key: '1',
        alt: 'G2 Badge',
        link: 'https://www.g2.com',
      },
      {
        _key: '2',
        alt: 'Capterra Badge',
        link: 'https://www.capterra.com',
      },
      {
        _key: '3',
        alt: 'GetApp Badge',
        link: 'https://www.getapp.com',
      },
    ],
  },
};
