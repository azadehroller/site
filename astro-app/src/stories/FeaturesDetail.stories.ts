import type { Meta, StoryObj } from 'astrobook';
import FeaturesDetail from '../components/blocks/FeaturesDetail.astro';

const meta: Meta<typeof FeaturesDetail> = {
  title: 'Components/FeaturesDetail',
  component: FeaturesDetail,
};

export default meta;
type Story = StoryObj<typeof FeaturesDetail>;

// Note: FeaturesDetail displays a list of features with icons, titles, text, and optional links
// It has different layout modes: default, widget (card style), and integration

// Default layout - grid of features
export const DefaultLayout: Story = {
  args: {
    content: {
      _key: 'features-default',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'CORE FEATURES',
        title: 'Everything you need to succeed',
        text: [
          {
            _type: 'block',
            _key: 'text1',
            children: [{ _type: 'span', text: 'Our platform provides all the tools you need to manage your venue efficiently.' }],
          },
        ],
      },
      features: [
        {
          _key: 'f1',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
          title: 'Online Booking',
          text: 'Accept bookings 24/7 with our powerful online ticketing system.',
          linkLabel: 'Learn more',
          link: { href: '/features/booking', openInNewTab: false },
        },
        {
          _key: 'f2',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
          title: 'Point of Sale',
          text: 'Fast, reliable POS for in-venue transactions.',
          linkLabel: 'Explore POS',
          link: { href: '/features/pos', openInNewTab: false },
        },
        {
          _key: 'f3',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
          title: 'Guest Management',
          text: 'Build lasting relationships with powerful CRM tools.',
          linkLabel: 'View CRM',
          link: { href: '/features/crm', openInNewTab: false },
        },
        {
          _key: 'f4',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
          title: 'Analytics',
          text: 'Make data-driven decisions with real-time insights.',
          linkLabel: 'See analytics',
          link: { href: '/features/analytics', openInNewTab: false },
        },
      ],
      styles: {
        layout: 'default',
        contentLayout: 'default',
      },
    },
  },
};

// Widget layout (card style with shadow)
export const WidgetLayout: Story = {
  args: {
    content: {
      _key: 'features-widget',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'WHY CHOOSE US',
        title: 'Powerful features for modern venues',
      },
      features: [
        {
          _key: 'f1',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF290C" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
          title: 'Save Time',
          text: 'Automate repetitive tasks and focus on what matters most.',
        },
        {
          _key: 'f2',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF290C" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
          title: 'Increase Revenue',
          text: 'Maximize sales with upsells, memberships, and dynamic pricing.',
        },
        {
          _key: 'f3',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF290C" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
          title: 'Delight Guests',
          text: 'Create memorable experiences that keep guests coming back.',
        },
      ],
      styles: {
        layout: 'widget',
        contentLayout: 'default',
      },
    },
  },
};

// Widget with column layout
export const WidgetColumnLayout: Story = {
  args: {
    content: {
      _key: 'features-widget-column',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'PLATFORM BENEFITS',
        title: 'Built for success',
      },
      features: [
        {
          _key: 'f1',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0960F6" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
          title: 'Cloud-Based',
          text: 'Access your data anywhere, anytime. No servers to maintain.',
        },
        {
          _key: 'f2',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0960F6" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          title: 'Secure',
          text: 'Enterprise-grade security with SOC 2 compliance and encryption.',
        },
        {
          _key: 'f3',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0960F6" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
          title: 'Reliable',
          text: '99.9% uptime guarantee with global infrastructure.',
        },
      ],
      styles: {
        layout: 'widget',
        contentLayout: 'column_item',
      },
    },
  },
};

// Integration layout (for partner/integration showcases)
export const IntegrationLayout: Story = {
  args: {
    content: {
      _key: 'features-integration',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'INTEGRATIONS',
        title: 'Connect with your favorite tools',
        text: [
          {
            _type: 'block',
            _key: 'text1',
            children: [{ _type: 'span', text: 'Seamlessly integrate with the tools you already use.' }],
          },
        ],
      },
      features: [
        {
          _key: 'i1',
          title: 'Stripe',
          text: 'Accept payments securely with Stripe integration.',
          link: { href: '/integrations/stripe', openInNewTab: false },
        },
        {
          _key: 'i2',
          title: 'Mailchimp',
          text: 'Sync guest data for targeted email marketing.',
          link: { href: '/integrations/mailchimp', openInNewTab: false },
        },
        {
          _key: 'i3',
          title: 'Google Analytics',
          text: 'Track website and booking conversion metrics.',
          link: { href: '/integrations/google-analytics', openInNewTab: false },
        },
        {
          _key: 'i4',
          title: 'Salesforce',
          text: 'Enterprise CRM integration for large organizations.',
          link: { href: '/integrations/salesforce', openInNewTab: false },
        },
      ],
      styles: {
        layout: 'integration',
        contentLayout: 'default',
      },
    },
  },
};

// Without links
export const WithoutLinks: Story = {
  args: {
    content: {
      _key: 'features-no-links',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'KEY BENEFITS',
        title: 'Why venues love us',
      },
      features: [
        {
          _key: 'f1',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#603FF5" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
          title: 'Easy to Use',
          text: 'Intuitive interface that your team will love from day one.',
        },
        {
          _key: 'f2',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#603FF5" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
          title: 'Customizable',
          text: 'Configure the platform to match your unique business needs.',
        },
        {
          _key: 'f3',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#603FF5" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
          title: 'Real-time Updates',
          text: 'Stay informed with instant notifications and alerts.',
        },
        {
          _key: 'f4',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#603FF5" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
          title: 'Scalable',
          text: 'Grows with your business from one venue to hundreds.',
        },
      ],
      styles: {
        layout: 'default',
        contentLayout: 'default',
      },
    },
  },
};

// Two features only
export const TwoFeatures: Story = {
  args: {
    content: {
      _key: 'features-two',
      _type: 'featuresDetail',
      content: {
        eyebrow: 'SIMPLE & POWERFUL',
        title: 'Focus on what matters',
      },
      features: [
        {
          _key: 'f1',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
          title: 'Quick Setup',
          text: 'Get started in minutes, not months. Our team handles the heavy lifting.',
          linkLabel: 'Start now',
          link: { href: '/get-started', openInNewTab: false },
        },
        {
          _key: 'f2',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#033180" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
          title: '24/7 Support',
          text: 'Our expert team is always here to help you succeed.',
          linkLabel: 'Contact us',
          link: { href: '/support', openInNewTab: false },
        },
      ],
      styles: {
        layout: 'default',
        contentLayout: 'default',
      },
    },
  },
};
