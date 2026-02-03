import type { Meta, StoryObj } from 'astrobook';
import FAQs from '../components/blocks/FAQs.astro';

const meta: Meta<typeof FAQs> = {
  title: 'Components/FAQs',
  component: FAQs,
};

export default meta;
type Story = StoryObj<typeof FAQs>;

// Basic FAQs - light theme
export const BasicLight: Story = {
  args: {
    items: [
      {
        _key: '1',
        title: 'What is included in the basic plan?',
        content: 'The basic plan includes access to core features, email support, and up to 5 team members. You can track guest feedback, view basic analytics, and export monthly reports.',
      },
      {
        _key: '2',
        title: 'How do I upgrade my subscription?',
        content: 'You can upgrade your subscription at any time from your account settings. Navigate to Billing > Subscription and select your desired plan. Changes take effect immediately.',
      },
      {
        _key: '3',
        title: 'Is there a free trial available?',
        content: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.',
      },
    ],
    theme: 'light',
    expandFirst: false,
  },
};

// Dark theme FAQs
export const DarkTheme: Story = {
  args: {
    items: [
      {
        _key: '1',
        title: 'Can I cancel my subscription anytime?',
        content: 'Absolutely. You can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your billing period.',
      },
      {
        _key: '2',
        title: 'Do you offer enterprise pricing?',
        content: 'Yes, we offer custom enterprise plans for organizations with specific needs. Contact our sales team for a personalized quote.',
      },
      {
        _key: '3',
        title: 'What payment methods do you accept?',
        content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
      },
    ],
    theme: 'dark',
    expandFirst: false,
  },
};

// With first item expanded
export const FirstExpanded: Story = {
  args: {
    items: [
      {
        _key: '1',
        title: 'How does the guest feedback system work?',
        content: 'Our system collects feedback through multiple channels including SMS, email, QR codes, and in-app surveys. All responses are aggregated in real-time and displayed on your dashboard with sentiment analysis.',
      },
      {
        _key: '2',
        title: 'Can I customize the survey questions?',
        content: 'Yes, you have full control over your survey questions. You can create custom questions, use our templates, or combine both approaches.',
      },
      {
        _key: '3',
        title: 'How quickly do I see the results?',
        content: 'Results are available in real-time. As soon as a guest submits feedback, it appears on your dashboard within seconds.',
      },
    ],
    theme: 'light',
    expandFirst: true,
  },
};

// With heading
export const WithHeading: Story = {
  args: {
    heading: {
      eyebrow: 'Support',
      title: 'Frequently Asked Questions',
      theme: 'dark',
      textAlignment: 'CENTER',
      eyebrowStyle: 'red',
      headingType: 'h2',
      displayType: 'h2',
    },
    items: [
      {
        _key: '1',
        title: 'How do I get started?',
        content: 'Getting started is easy! Sign up for a free account, follow our quick setup wizard, and you will be collecting guest feedback within minutes.',
      },
      {
        _key: '2',
        title: 'What integrations are available?',
        content: 'We integrate with popular POS systems, reservation platforms, CRM tools, and more. Check our integrations page for the full list.',
      },
      {
        _key: '3',
        title: 'Is my data secure?',
        content: 'Absolutely. We use bank-level encryption, comply with GDPR and CCPA, and never share your data with third parties.',
      },
      {
        _key: '4',
        title: 'Can I export my data?',
        content: 'Yes, you can export all your data at any time in CSV, Excel, or PDF format. We believe your data belongs to you.',
      },
    ],
    theme: 'light',
    expandFirst: false,
  },
};

// Many FAQs
export const ManyItems: Story = {
  args: {
    items: [
      { _key: '1', title: 'Question 1: What is the setup process?', content: 'The setup process is straightforward and typically takes about 15 minutes.' },
      { _key: '2', title: 'Question 2: Do you offer training?', content: 'Yes, we provide comprehensive onboarding and training resources.' },
      { _key: '3', title: 'Question 3: Is there mobile app support?', content: 'Yes, our mobile apps are available for iOS and Android.' },
      { _key: '4', title: 'Question 4: What languages are supported?', content: 'We support over 30 languages for surveys and the dashboard.' },
      { _key: '5', title: 'Question 5: Can multiple locations use one account?', content: 'Yes, our platform supports multi-location management from a single dashboard.' },
      { _key: '6', title: 'Question 6: How is pricing calculated?', content: 'Pricing is based on the number of locations and monthly feedback volume.' },
    ],
    theme: 'light',
    expandFirst: false,
  },
};
