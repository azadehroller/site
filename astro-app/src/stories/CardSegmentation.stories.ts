import type { Meta, StoryObj } from 'astrobook';
import CardSegmentation from '../components/blocks/CardSegmentation.astro';

const meta: Meta<typeof CardSegmentation> = {
  title: 'Components/CardSegmentation',
  component: CardSegmentation,
};

export default meta;
type Story = StoryObj<typeof CardSegmentation>;

// Sample card data using placeholder images
const sampleCards = [
  {
    _key: '1',
    image: {
      asset: { url: 'https://placehold.co/400x200/033180/white/png?text=Feature+1' },
      alt: 'Feature 1',
    },
    title: 'Online Ticketing',
    content: 'Sell tickets online 24/7 with our powerful e-commerce platform. Increase revenue and reduce queues.',
    linkLabel: 'Learn more',
    link: { href: '/features/ticketing', openInNewTab: false },
  },
  {
    _key: '2',
    image: {
      asset: { url: 'https://placehold.co/400x200/033180/white/png?text=Feature+2' },
      alt: 'Feature 2',
    },
    title: 'Point of Sale',
    content: 'Streamline in-venue sales with our integrated POS system. Fast, reliable, and easy to use.',
    linkLabel: 'Explore POS',
    link: { href: '/features/pos', openInNewTab: false },
  },
  {
    _key: '3',
    image: {
      asset: { url: 'https://placehold.co/400x200/033180/white/png?text=Feature+3' },
      alt: 'Feature 3',
    },
    title: 'Guest Management',
    content: 'Build lasting relationships with powerful CRM tools. Know your guests better than ever.',
    linkLabel: 'Discover more',
    link: { href: '/features/crm', openInNewTab: false },
  },
];

// Dark theme (default) - white cards on dark background
export const DarkTheme: Story = {
  args: {
    cards: sampleCards,
    theme: 'dark',
  },
};

// Light theme - dark cards on light background
export const LightTheme: Story = {
  args: {
    cards: sampleCards.map((card, i) => ({
      ...card,
      image: {
        asset: { url: `https://placehold.co/400x200/ffffff/033180/png?text=Feature+${i + 1}` },
        alt: `Feature ${i + 1}`,
      },
    })),
    theme: 'light',
  },
};

// GX Score theme (purple)
export const GxScoreTheme: Story = {
  args: {
    cards: [
      {
        _key: '1',
        image: {
          asset: { url: 'https://placehold.co/400x200/603FF5/white/png?text=GX+Score' },
          alt: 'GX Score',
        },
        title: 'Measure Guest Experience',
        content: 'Track and improve your GX Score with real-time guest feedback and analytics.',
        linkLabel: 'Learn about GX Score',
        link: { href: '/gx-score', openInNewTab: false },
      },
      {
        _key: '2',
        image: {
          asset: { url: 'https://placehold.co/400x200/603FF5/white/png?text=Surveys' },
          alt: 'Surveys',
        },
        title: 'Guest Surveys',
        content: 'Collect valuable feedback with automated post-visit surveys.',
        linkLabel: 'Explore surveys',
        link: { href: '/features/surveys', openInNewTab: false },
      },
      {
        _key: '3',
        image: {
          asset: { url: 'https://placehold.co/400x200/603FF5/white/png?text=Analytics' },
          alt: 'Analytics',
        },
        title: 'Advanced Analytics',
        content: 'Turn guest data into actionable insights with powerful reporting tools.',
        linkLabel: 'View analytics',
        link: { href: '/features/analytics', openInNewTab: false },
      },
    ],
    theme: 'gxscore',
  },
};

// SMB theme
export const SmbTheme: Story = {
  args: {
    cards: [
      {
        _key: '1',
        image: {
          asset: { url: 'https://placehold.co/400x200/0960F6/white/png?text=SMB+1' },
          alt: 'Small Business 1',
        },
        title: 'Easy Setup',
        content: 'Get started in minutes with our simple onboarding process designed for small venues.',
        linkLabel: 'Get started',
        link: { href: '/smb/setup', openInNewTab: false },
      },
      {
        _key: '2',
        image: {
          asset: { url: 'https://placehold.co/400x200/0960F6/white/png?text=SMB+2' },
          alt: 'Small Business 2',
        },
        title: 'Affordable Pricing',
        content: 'Flexible plans that grow with your business. No hidden fees.',
        linkLabel: 'View pricing',
        link: { href: '/pricing', openInNewTab: false },
      },
      {
        _key: '3',
        image: {
          asset: { url: 'https://placehold.co/400x200/0960F6/white/png?text=SMB+3' },
          alt: 'Small Business 3',
        },
        title: '24/7 Support',
        content: 'Our dedicated support team is always here to help you succeed.',
        linkLabel: 'Contact support',
        link: { href: '/support', openInNewTab: false },
      },
    ],
    theme: 'smb',
  },
};

// Enterprise theme
export const EnterpriseTheme: Story = {
  args: {
    cards: [
      {
        _key: '1',
        image: {
          asset: { url: 'https://placehold.co/400x200/011840/white/png?text=Enterprise+1' },
          alt: 'Enterprise 1',
        },
        title: 'Multi-Venue Management',
        content: 'Manage all your locations from a single dashboard with centralized reporting.',
        linkLabel: 'Learn more',
        link: { href: '/enterprise/multi-venue', openInNewTab: false },
      },
      {
        _key: '2',
        image: {
          asset: { url: 'https://placehold.co/400x200/011840/white/png?text=Enterprise+2' },
          alt: 'Enterprise 2',
        },
        title: 'Custom Integrations',
        content: 'Connect with your existing systems through our powerful API and integrations.',
        linkLabel: 'Explore integrations',
        link: { href: '/enterprise/integrations', openInNewTab: false },
      },
      {
        _key: '3',
        image: {
          asset: { url: 'https://placehold.co/400x200/011840/white/png?text=Enterprise+3' },
          alt: 'Enterprise 3',
        },
        title: 'Dedicated Account Manager',
        content: 'Get personalized support from a dedicated team that knows your business.',
        linkLabel: 'Contact sales',
        link: { href: '/enterprise/contact', openInNewTab: false },
      },
    ],
    theme: 'enterprise',
  },
};

// Two cards only
export const TwoCards: Story = {
  args: {
    cards: sampleCards.slice(0, 2),
    theme: 'dark',
  },
};

// Four cards
export const FourCards: Story = {
  args: {
    cards: [
      ...sampleCards,
      {
        _key: '4',
        image: {
          asset: { url: 'https://placehold.co/400x200/033180/white/png?text=Feature+4' },
          alt: 'Feature 4',
        },
        title: 'Reporting & Insights',
        content: 'Make data-driven decisions with comprehensive analytics and reporting.',
        linkLabel: 'View reports',
        link: { href: '/features/reports', openInNewTab: false },
      },
    ],
    theme: 'dark',
  },
};

// Without links
export const WithoutLinks: Story = {
  args: {
    cards: sampleCards.map(({ link, linkLabel, ...card }) => card),
    theme: 'dark',
  },
};

// Without images
export const WithoutImages: Story = {
  args: {
    cards: sampleCards.map(({ image, ...card }) => card),
    theme: 'dark',
  },
};

// External links (open in new tab)
export const ExternalLinks: Story = {
  args: {
    cards: sampleCards.map((card) => ({
      ...card,
      link: {
        href: 'https://example.com',
        openInNewTab: true,
        noFollow: true,
      },
    })),
    theme: 'dark',
  },
};
