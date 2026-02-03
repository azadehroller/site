import type { Meta, StoryObj } from 'astrobook';
import HeadingComposition from '../components/blocks/HeadingComposition.astro';

const meta: Meta<typeof HeadingComposition> = {
  title: 'Components/HeadingComposition',
  component: HeadingComposition,
};

export default meta;
type Story = StoryObj<typeof HeadingComposition>;

// Basic heading - dark theme (on light background)
export const BasicDark: Story = {
  args: {
    eyebrow: 'Features',
    title: 'Everything you need to succeed',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'red',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Light theme (on dark background)
export const LightTheme: Story = {
  args: {
    eyebrow: 'About Us',
    title: 'Transforming guest experiences worldwide',
    theme: 'light',
    textAlignment: 'LEFT',
    eyebrowStyle: 'none',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Center aligned
export const CenterAligned: Story = {
  args: {
    eyebrow: 'Testimonials',
    title: 'What our customers say',
    theme: 'dark',
    textAlignment: 'CENTER',
    eyebrowStyle: 'red',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// GX Score theme
export const GxScoreTheme: Story = {
  args: {
    eyebrow: 'GX Score',
    title: 'Measure what matters most',
    theme: 'gxscore',
    textAlignment: 'LEFT',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// SMB theme with pill eyebrow
export const SmbTheme: Story = {
  args: {
    eyebrow: 'Small Business',
    title: 'Built for growing venues',
    theme: 'smb',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Enterprise theme with animated eyebrow
export const EnterpriseTheme: Story = {
  args: {
    eyebrow: 'Enterprise',
    title: 'Scale with confidence',
    theme: 'enterprise',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Blue eyebrow style
export const BlueEyebrow: Story = {
  args: {
    eyebrow: 'New Feature',
    title: 'Introducing real-time analytics',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'blue',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Bright blue eyebrow
export const BrightBlueEyebrow: Story = {
  args: {
    eyebrow: 'Coming Soon',
    title: 'Next-generation insights',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'bright_blue',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Iris eyebrow style
export const IrisEyebrow: Story = {
  args: {
    eyebrow: 'Premium',
    title: 'Unlock advanced capabilities',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'iris',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Gradient eyebrow
export const GradientEyebrow: Story = {
  args: {
    eyebrow: 'Innovation',
    title: 'The future of guest experience',
    theme: 'dark',
    textAlignment: 'CENTER',
    eyebrowStyle: 'gradient',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// H1 heading
export const H1Heading: Story = {
  args: {
    eyebrow: 'Welcome',
    title: 'The ultimate platform for venue success',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'red',
    headingType: 'h1',
    displayType: 'h1',
  },
};

// H3 heading (smaller)
export const H3Heading: Story = {
  args: {
    eyebrow: 'Section',
    title: 'Key benefits of our platform',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'red',
    headingType: 'h3',
    displayType: 'h3',
  },
};

// With border line
export const WithBorderLine: Story = {
  args: {
    eyebrow: 'Highlight',
    title: 'Stand out from the competition',
    theme: 'dark',
    textAlignment: 'LEFT',
    eyebrowStyle: 'red',
    headingType: 'h2',
    displayType: 'h2',
    addBorderLine: true,
  },
};

// Title only (no eyebrow)
export const TitleOnly: Story = {
  args: {
    title: 'Simple and effective',
    theme: 'dark',
    textAlignment: 'CENTER',
    headingType: 'h2',
    displayType: 'h2',
  },
};

// Industry report theme
export const IndustryReport: Story = {
  args: {
    eyebrow: '2024 Report',
    title: 'State of Guest Experience',
    theme: 'industry_report',
    textAlignment: 'LEFT',
    headingType: 'h2',
    displayType: 'h2',
  },
};
