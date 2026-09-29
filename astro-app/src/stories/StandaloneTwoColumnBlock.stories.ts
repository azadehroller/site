import type { Meta, StoryObj } from 'astrobook';
import StandaloneTwoColumnBlock from '@components/StandaloneTwoColumnBlock.astro';
import { baseStandaloneTwoColumnProps, storyImage, storyLogo, storyParagraph } from './standaloneTwoColumn/fixtures';

const meta: Meta<typeof StandaloneTwoColumnBlock> = {
  title: 'Standalone Two Column Block',
  component: StandaloneTwoColumnBlock,
};

export default meta;
type Story = StoryObj<typeof StandaloneTwoColumnBlock>;

export const Default: Story = {
  args: baseStandaloneTwoColumnProps,
};

export const MediaLeft: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    mediaSide: 'left',
    mediaOnTopMobile: true,
    heading: { text: 'Intelligence built for attractions', size: 'big' },
  },
};

export const WithQuote: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    quote: {
      quoteText:
        'We are making money while we sleep! We get an extra $600–$700 per day from online bookings.',
      quoterName: 'Jessica McDonald',
      quoterPosition: 'Owner & Operator, Lollipops Playland Penrith',
      quoterLogo: storyLogo,
    },
  },
};

export const WithContentStat: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    heading: { text: 'Tempor lorem pharetra velit interdum purus', size: 'normal' },
    stat: { number: '$2B', label: 'processed in guest spend', placement: 'content' },
    buttons: [
      { label: 'Get started', style: 'red', link: { href: '#' } },
      { label: 'Watch a demo', style: 'outlined', link: { href: '#' } },
    ],
  },
};

export const WithMediaStat: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    stat: { number: '50%', label: 'increase in basket size', placement: 'mediaOverlay' },
  },
};

export const TwoButtons: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    heading: { text: 'Never miss a guest inquiry or booking opportunity', size: 'normal' },
    buttons: [
      { label: 'Join the waitlist', style: 'red', link: { href: '#' } },
      { label: 'Watch a demo', style: 'outlined', link: { href: '#' } },
    ],
  },
};

export const LightBlueBackground: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    background: 'lightBlue',
    heading: { text: 'Create incentives that encourage repeat visits', size: 'normal' },
  },
};

export const NavyBackground: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    theme: 'dark',
    background: 'navy',
    textColor: 'white',
    eyebrow: { text: 'Always-on guest service', color: 'white' },
    buttons: [{ label: 'Request a demo', style: 'outlined', link: { href: '#' } }],
  },
};

export const DarkThemeLightBlueText: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    theme: 'dark',
    background: 'darkBlue',
    textColor: 'lightBlue',
    eyebrow: { text: 'Always-on guest service', color: 'lightBlue' },
    heading: { text: 'Dark theme with light colour options', size: 'big' },
    buttons: [{ label: 'Request a demo', style: 'outlined', link: { href: '#' } }],
  },
};

export const BiggerLeft: Story = {
  args: {
    ...baseStandaloneTwoColumnProps,
    layout: 'biggerLeft',
    rowMode: 'single',
    mediaSide: 'right',
    eyebrow: { text: 'Make the most of ROLLER', color: 'red' },
    heading: { text: 'Accelerate your success', size: 'big' },
    body: storyParagraph(
      'ROLLER’s professional services team is here to help you during every step of your journey with us.',
      'Whether you’re new to ROLLER or an existing customer looking to refresh your strategy, we’re here to partner with you.',
    ),
    buttons: [{ label: 'Request more information', style: 'red', link: { href: '#' } }],
  },
};

export const ColumnLoop: Story = {
  args: {
    background: 'white',
    layout: 'biggerLeft',
    rowMode: 'loop',
    columnLoop: [
      {
        heading: 'Obsess over customer success',
        body: 'We put the customer first in everything we do. To truly align with our customers, we listen intently, we empathise deeply, and we go above and beyond for them.',
        image: storyImage,
      },
      {
        heading: 'Keep it real',
        body: 'We are genuine. We are open. We call it how it is, no sugar coating. We are candid with each other, at all times.',
        image: storyLogo,
      },
      {
        heading: 'Make it happen',
        body: 'We are energetic, focused, and results driven, in pursuit of achieving greatness.',
        image: storyImage,
      },
    ],
  },
};
