import type { Meta, StoryObj } from 'astrobook';
import ComparisonTable from '../components/blocks/ComparisonTable.astro';

const meta: Meta<typeof ComparisonTable> = {
  title: 'Components/ComparisonTable',
  component: ComparisonTable,
};

export default meta;
type Story = StoryObj<typeof ComparisonTable>;

// Basic two-column comparison (Us vs Competitor)
export const TwoColumnComparison: Story = {
  args: {
    id: 'comparison-basic',
    columns: [
      {
        title: 'Our Platform',
        isCompetitor: false,
        items: [
          { text: 'All-in-one venue management solution' },
          { text: 'Real-time analytics and reporting' },
          { text: '24/7 customer support' },
          { text: 'Seamless integrations with major systems' },
          { text: 'Mobile-first design' },
          { text: 'Transparent pricing with no hidden fees' },
        ],
      },
      {
        title: 'Traditional Solutions',
        isCompetitor: true,
        items: [
          { text: 'Multiple disconnected systems required' },
          { text: 'Delayed reporting and manual data entry' },
          { text: 'Limited support hours' },
          { text: 'Complex and costly integrations' },
          { text: 'Desktop-only interfaces' },
          { text: 'Hidden fees and long-term contracts' },
        ],
      },
    ],
  },
};

// Three-column comparison
export const ThreeColumnComparison: Story = {
  args: {
    id: 'comparison-three',
    columns: [
      {
        title: 'Basic Plan',
        isCompetitor: false,
        items: [
          { text: 'Online ticketing' },
          { text: 'Basic reporting' },
          { text: 'Email support' },
          { text: 'Single venue' },
        ],
      },
      {
        title: 'Professional Plan',
        isCompetitor: false,
        items: [
          { text: 'Everything in Basic' },
          { text: 'Advanced analytics' },
          { text: 'Priority support' },
          { text: 'Up to 5 venues' },
        ],
      },
      {
        title: 'Enterprise Plan',
        isCompetitor: false,
        items: [
          { text: 'Everything in Professional' },
          { text: 'Custom integrations' },
          { text: 'Dedicated account manager' },
          { text: 'Unlimited venues' },
        ],
      },
    ],
  },
};

// Feature comparison (platform vs competitors)
export const FeatureComparison: Story = {
  args: {
    id: 'comparison-features',
    columns: [
      {
        title: 'ROLLER',
        isCompetitor: false,
        items: [
          { text: 'Cloud-based platform' },
          { text: 'Automatic updates included' },
          { text: 'GX Score guest experience tracking' },
          { text: 'Built-in marketing tools' },
          { text: 'Real-time capacity management' },
          { text: 'Self-service guest portal' },
          { text: 'API access included' },
        ],
      },
      {
        title: 'Legacy Systems',
        isCompetitor: true,
        items: [
          { text: 'On-premise installation' },
          { text: 'Paid upgrade cycles' },
          { text: 'No guest experience metrics' },
          { text: 'Third-party marketing required' },
          { text: 'Manual capacity tracking' },
          { text: 'Staff-dependent operations' },
          { text: 'Custom development needed' },
        ],
      },
    ],
  },
};

// Pricing comparison
export const PricingComparison: Story = {
  args: {
    id: 'comparison-pricing',
    columns: [
      {
        title: 'Our Pricing',
        isCompetitor: false,
        items: [
          { text: 'Simple per-transaction pricing' },
          { text: 'No setup fees' },
          { text: 'No long-term contracts' },
          { text: 'All features included' },
          { text: 'Free updates forever' },
          { text: 'Cancel anytime' },
        ],
      },
      {
        title: 'Competitor Pricing',
        isCompetitor: true,
        items: [
          { text: 'Complex tiered pricing' },
          { text: 'High upfront setup costs' },
          { text: 'Multi-year contracts required' },
          { text: 'Features sold as add-ons' },
          { text: 'Paid version upgrades' },
          { text: 'Early termination penalties' },
        ],
      },
    ],
  },
};

// Support comparison
export const SupportComparison: Story = {
  args: {
    id: 'comparison-support',
    columns: [
      {
        title: 'Our Support',
        isCompetitor: false,
        items: [
          { text: '24/7 live chat and phone support' },
          { text: 'Dedicated onboarding specialist' },
          { text: 'Comprehensive knowledge base' },
          { text: 'Regular product training webinars' },
          { text: 'Community forum access' },
        ],
      },
      {
        title: 'Industry Standard',
        isCompetitor: true,
        items: [
          { text: 'Business hours email only' },
          { text: 'Self-service setup guides' },
          { text: 'Limited documentation' },
          { text: 'Paid training sessions' },
          { text: 'No community resources' },
        ],
      },
    ],
  },
};

// Short comparison (few items)
export const ShortComparison: Story = {
  args: {
    id: 'comparison-short',
    columns: [
      {
        title: 'With Us',
        isCompetitor: false,
        items: [
          { text: 'Easy to use' },
          { text: 'Fast setup' },
          { text: 'Great support' },
        ],
      },
      {
        title: 'Without Us',
        isCompetitor: true,
        items: [
          { text: 'Complex systems' },
          { text: 'Long implementation' },
          { text: 'Limited help' },
        ],
      },
    ],
  },
};

// Long comparison (many items)
export const LongComparison: Story = {
  args: {
    id: 'comparison-long',
    columns: [
      {
        title: 'Modern Platform',
        isCompetitor: false,
        items: [
          { text: 'Cloud-native architecture' },
          { text: 'Real-time data synchronization' },
          { text: 'Mobile-responsive design' },
          { text: 'Automated backups' },
          { text: 'SSL encryption standard' },
          { text: 'GDPR compliant' },
          { text: 'SOC 2 certified' },
          { text: 'Regular security audits' },
          { text: '99.9% uptime guarantee' },
          { text: 'Global CDN delivery' },
        ],
      },
      {
        title: 'Outdated Systems',
        isCompetitor: true,
        items: [
          { text: 'Legacy server infrastructure' },
          { text: 'Batch processing delays' },
          { text: 'Desktop-only access' },
          { text: 'Manual backup procedures' },
          { text: 'Additional security costs' },
          { text: 'Compliance add-ons required' },
          { text: 'No certifications' },
          { text: 'Infrequent updates' },
          { text: 'No SLA provided' },
          { text: 'Single server location' },
        ],
      },
    ],
  },
};
