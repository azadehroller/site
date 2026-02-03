import type { Meta, StoryObj } from 'astrobook';
import StatsSet from '../components/blocks/StatsSet.astro';

const meta: Meta<typeof StatsSet> = {
  title: 'Components/StatsSet',
  component: StatsSet,
};

export default meta;
type Story = StoryObj<typeof StatsSet>;

// Basic stats - dark theme (on light background)
export const BasicDark: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '3,000+', statsText: 'Venues worldwide' },
      { _key: '2', statsNumber: '50M+', statsText: 'Guest interactions' },
      { _key: '3', statsNumber: '40%', statsText: 'Average improvement' },
    ],
    theme: 'dark',
    textType: 'xl',
  },
};

// Light theme (on dark background)
export const LightTheme: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '98%', statsText: 'Customer satisfaction' },
      { _key: '2', statsNumber: '24/7', statsText: 'Support available' },
      { _key: '3', statsNumber: '15min', statsText: 'Average response time' },
    ],
    theme: 'light',
    textType: 'xl',
  },
};

// With tags
export const WithTags: Story = {
  args: {
    stats: [
      { _key: '1', tag: 'Growth', statsNumber: '+125%', statsText: 'Revenue increase year over year' },
      { _key: '2', tag: 'Efficiency', statsNumber: '3x', statsText: 'Faster operations' },
      { _key: '3', tag: 'Savings', statsNumber: '$500K', statsText: 'Annual cost reduction' },
    ],
    theme: 'dark',
    textType: 'xl',
  },
};

// Small text type
export const SmallText: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '10+', statsText: 'Years of experience' },
      { _key: '2', statsNumber: '500+', statsText: 'Team members globally' },
      { _key: '3', statsNumber: '30+', statsText: 'Countries served' },
    ],
    theme: 'dark',
    textType: 'sm',
  },
};

// Large text type
export const LargeText: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '99.9%', statsText: 'Uptime guaranteed' },
      { _key: '2', statsNumber: '5 Star', statsText: 'Average rating' },
    ],
    theme: 'dark',
    textType: '2xl',
  },
};

// Small spacing variant
export const SmallSpacing: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '85%', statsText: 'Staff retention' },
      { _key: '2', statsNumber: '92%', statsText: 'Guest return rate' },
      { _key: '3', statsNumber: '4.8', statsText: 'Average review score' },
      { _key: '4', statsNumber: '12', statsText: 'Industry awards' },
    ],
    theme: 'dark',
    textType: 'base',
    spacingStyle: 'small',
  },
};

// Four stats
export const FourStats: Story = {
  args: {
    stats: [
      { _key: '1', statsNumber: '1M+', statsText: 'Active users' },
      { _key: '2', statsNumber: '50+', statsText: 'Integrations' },
      { _key: '3', statsNumber: '99%', statsText: 'Satisfaction rate' },
      { _key: '4', statsNumber: '24h', statsText: 'Setup time' },
    ],
    theme: 'dark',
    textType: 'lg',
  },
};
