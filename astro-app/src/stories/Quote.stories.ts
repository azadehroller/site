import type { Meta, StoryObj } from 'astrobook';
import Quote from '../components/blocks/Quote.astro';

const meta: Meta<typeof Quote> = {
  title: 'Components/Quote',
  component: Quote,
};

export default meta;
type Story = StoryObj<typeof Quote>;

// Basic quote - dark theme (on light background)
export const BasicDark: Story = {
  args: {
    quoteText: '"This platform has transformed how we manage our venue operations. The insights we get are invaluable."',
    quoteAuthor: 'John Smith',
    quoteTitle: 'Operations Manager, Example Venue',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// Light theme quote (on dark background)
export const LightTheme: Story = {
  args: {
    quoteText: '"The customer support team is exceptional. They helped us get up and running in no time."',
    quoteAuthor: 'Sarah Johnson',
    quoteTitle: 'CEO, Tech Startup Inc.',
    theme: 'light',
    styleVariant: 'extrabold',
  },
};

// GX Score theme (purple)
export const GxScoreTheme: Story = {
  args: {
    quoteText: '"Our GX Score improved by 40% within the first quarter of implementation."',
    quoteAuthor: 'Michael Chen',
    quoteTitle: 'Director of Guest Experience',
    theme: 'gxscore',
    styleVariant: 'extrabold',
  },
};

// Regular style variant (smaller text)
export const RegularStyle: Story = {
  args: {
    quoteText: '"A great tool for any venue looking to improve their guest experience metrics."',
    quoteAuthor: 'Emily Davis',
    quoteTitle: 'Marketing Director',
    theme: 'dark',
    styleVariant: 'regular',
  },
};

// With customer story link
export const WithLink: Story = {
  args: {
    quoteText: '"We saw a 25% increase in customer satisfaction after implementing this solution."',
    quoteAuthor: 'Robert Wilson',
    quoteTitle: 'General Manager, Grand Hotel',
    customerStoryLink: {
      href: '/case-studies/grand-hotel',
      openInNewTab: false,
    },
    linkLabel: 'Read the full story',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// With external link (opens in new tab)
export const WithExternalLink: Story = {
  args: {
    quoteText: '"An essential tool for modern venue management."',
    quoteAuthor: 'Amanda Lee',
    quoteTitle: 'VP of Operations',
    customerStoryLink: {
      href: 'https://example.com/case-study',
      openInNewTab: true,
      noFollow: true,
    },
    linkLabel: 'View case study',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// Long quote text
export const LongQuote: Story = {
  args: {
    quoteText: '"Implementing this platform was one of the best decisions we made for our business. The real-time analytics, guest feedback integration, and actionable insights have helped us improve every aspect of our operations. Our staff is more engaged, our guests are happier, and our bottom line has never looked better."',
    quoteAuthor: 'David Thompson',
    quoteTitle: 'Owner & Founder, Thompson Hospitality Group',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// With avatar - extrabold style (image at top)
export const WithAvatarExtrabold: Story = {
  args: {
    quoteText: '"The guest experience platform has revolutionized how we connect with our visitors. Highly recommend!"',
    quoteAuthor: 'Jessica Martinez',
    quoteTitle: 'Head of Customer Success, Adventure Park',
    imageType: 'avatar',
    avatar: {
      asset: {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=72&h=72&fit=crop&crop=face',
      },
    },
    avatarAlt: 'Jessica Martinez headshot',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// With avatar - regular style (image next to author)
export const WithAvatarRegular: Story = {
  args: {
    quoteText: '"Simple, effective, and exactly what our team needed to improve our service quality."',
    quoteAuthor: 'Marcus Johnson',
    quoteTitle: 'Operations Director',
    imageType: 'avatar',
    avatar: {
      asset: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&crop=face',
      },
    },
    avatarAlt: 'Marcus Johnson headshot',
    theme: 'dark',
    styleVariant: 'regular',
  },
};

// With company logo - extrabold style
export const WithLogoExtrabold: Story = {
  args: {
    quoteText: '"Our partnership has helped us achieve a 35% increase in guest satisfaction scores across all our locations."',
    quoteAuthor: 'Lisa Chen',
    quoteTitle: 'VP of Operations, Entertainment Group',
    imageType: 'logo',
    logo: {
      asset: {
        url: 'https://www.roller.software/hubfs/ROLLER%20Logo.svg',
      },
    },
    logoAlt: 'ROLLER Logo',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// With company logo - regular style
export const WithLogoRegular: Story = {
  args: {
    quoteText: '"The analytics dashboard alone has paid for itself many times over."',
    quoteAuthor: 'Tom Bradley',
    quoteTitle: 'CEO, Family Fun Center',
    imageType: 'logo',
    logo: {
      asset: {
        url: 'https://www.roller.software/hubfs/ROLLER%20Logo.svg',
      },
    },
    logoAlt: 'Company Logo',
    theme: 'dark',
    styleVariant: 'regular',
  },
};

// With avatar on light theme
export const WithAvatarLightTheme: Story = {
  args: {
    quoteText: '"Outstanding platform that has transformed our guest engagement strategy."',
    quoteAuthor: 'Rachel Kim',
    quoteTitle: 'Marketing Manager, Theme Park Resort',
    imageType: 'avatar',
    avatar: {
      asset: {
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop&crop=face',
      },
    },
    avatarAlt: 'Rachel Kim headshot',
    theme: 'light',
    styleVariant: 'extrabold',
  },
};

// With avatar on GX Score theme
export const WithAvatarGxScore: Story = {
  args: {
    quoteText: '"Our GX Score went from 72 to 91 in just three months. The team is thrilled!"',
    quoteAuthor: 'Daniel Park',
    quoteTitle: 'Guest Experience Lead',
    imageType: 'avatar',
    avatar: {
      asset: {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=72&h=72&fit=crop&crop=face',
      },
    },
    avatarAlt: 'Daniel Park headshot',
    theme: 'gxscore',
    styleVariant: 'extrabold',
  },
};

// With avatar and customer story link
export const WithAvatarAndLink: Story = {
  args: {
    quoteText: '"From day one, the implementation was smooth and the results were immediate. Our team loves it."',
    quoteAuthor: 'Samantha Wells',
    quoteTitle: 'General Manager, Water World',
    imageType: 'avatar',
    avatar: {
      asset: {
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=72&h=72&fit=crop&crop=face',
      },
    },
    avatarAlt: 'Samantha Wells headshot',
    customerStoryLink: {
      href: '/case-studies/water-world',
      openInNewTab: false,
    },
    linkLabel: 'Read their success story',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};

// With logo and customer story link
export const WithLogoAndLink: Story = {
  args: {
    quoteText: '"A game-changer for our multi-venue operations. The centralized dashboard saves us hours every week."',
    quoteAuthor: 'Chris Anderson',
    quoteTitle: 'COO, Leisure Group International',
    imageType: 'logo',
    logo: {
      asset: {
        url: 'https://www.roller.software/hubfs/ROLLER%20Logo.svg',
      },
    },
    logoAlt: 'Leisure Group Logo',
    customerStoryLink: {
      href: '/case-studies/leisure-group',
      openInNewTab: false,
    },
    linkLabel: 'See how they did it',
    theme: 'dark',
    styleVariant: 'extrabold',
  },
};
