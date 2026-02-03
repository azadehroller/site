import type { Meta, StoryObj } from 'astrobook';
import RotatingText from '../components/blocks/RotatingText.astro';

const meta: Meta<typeof RotatingText> = {
  title: 'Components/RotatingText',
  component: RotatingText,
};

export default meta;
type Story = StoryObj<typeof RotatingText>;

// Note: The rotating text animation runs on a 3.5 second interval.
// Wait a few seconds to see the text rotate through all items.
// Each story uses a unique ID to ensure the animation script runs correctly.

// Basic with rotating text items - dark theme
export const BasicDark: Story = {
  args: {
    id: 'rotating-basic-dark',
    content: {
      title: 'Transform your',
      rotatingText: [
        { rotatingTextItem: 'guest experience management' },
        { rotatingTextItem: 'venue operations workflow' },
        { rotatingTextItem: 'online booking system' },
        { rotatingTextItem: 'revenue growth strategy' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 80,
    },
  },
};

// Light theme
export const LightTheme: Story = {
  args: {
    id: 'rotating-light-theme',
    content: {
      title: 'Elevate your',
      rotatingText: [
        { rotatingTextItem: 'customer service quality' },
        { rotatingTextItem: 'team productivity levels' },
        { rotatingTextItem: 'business intelligence insights' },
      ],
    },
    styles: {
      theme: 'light',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 80,
    },
  },
};

// GX Score theme (purple)
export const GxScoreTheme: Story = {
  args: {
    id: 'rotating-gxscore',
    content: {
      title: 'Improve your',
      rotatingText: [
        { rotatingTextItem: 'GX Score performance metrics' },
        { rotatingTextItem: 'guest satisfaction ratings' },
        { rotatingTextItem: 'customer loyalty programs' },
      ],
    },
    styles: {
      theme: 'gxscore',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 80,
    },
  },
};

// With eyebrow text
export const WithEyebrow: Story = {
  args: {
    id: 'rotating-eyebrow',
    content: {
      eyebrow: 'INTRODUCING THE FUTURE',
      title: 'The next generation of',
      rotatingText: [
        { rotatingTextItem: 'venue management software' },
        { rotatingTextItem: 'guest analytics platforms' },
        { rotatingTextItem: 'digital ticketing solutions' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h1',
      displayType: 'h1',
      eyebrowType: 'div',
      rotatingTextLength: 85,
    },
  },
};

// With description text
export const WithDescriptionText: Story = {
  args: {
    id: 'rotating-description',
    content: {
      title: 'The all-in-one platform for',
      text: '<p>Join thousands of venues using our platform to deliver exceptional guest experiences every single day.</p>',
      rotatingText: [
        { rotatingTextItem: 'world-class attractions' },
        { rotatingTextItem: 'theme parks and resorts' },
        { rotatingTextItem: 'water parks and aquariums' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      textType: 'lg',
      rotatingTextLength: 80,
    },
  },
};

// Left aligned
export const LeftAligned: Story = {
  args: {
    id: 'rotating-left',
    content: {
      eyebrow: 'OUR PLATFORM',
      title: 'Purpose-built for',
      rotatingText: [
        { rotatingTextItem: 'enterprise scalability' },
        { rotatingTextItem: 'maximum reliability' },
        { rotatingTextItem: 'peak performance' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'LEFT',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 70,
    },
  },
};

// H1 heading size - large prominent text
export const LargeHeading: Story = {
  args: {
    id: 'rotating-large',
    content: {
      title: 'Welcome to',
      rotatingText: [
        { rotatingTextItem: 'the future of hospitality' },
        { rotatingTextItem: 'better business insights' },
        { rotatingTextItem: 'seamless guest operations' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h1',
      displayType: 'h1',
      rotatingTextLength: 85,
    },
  },
};

// H3 heading size
export const SmallerHeading: Story = {
  args: {
    id: 'rotating-small',
    content: {
      title: 'Designed for',
      rotatingText: [
        { rotatingTextItem: 'small venue operators' },
        { rotatingTextItem: 'enterprise organizations' },
        { rotatingTextItem: 'fast-growing teams' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h3',
      displayType: 'h3',
      rotatingTextLength: 75,
    },
  },
};

// Without rotating text (static heading)
export const StaticHeading: Story = {
  args: {
    id: 'rotating-static',
    content: {
      eyebrow: 'ABOUT OUR COMPANY',
      title: 'We help venues succeed worldwide',
      text: '<p>Our platform powers thousands of attractions across the globe, delivering exceptional guest experiences.</p>',
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      textType: 'base',
    },
  },
};

// Full featured example
export const FullFeatured: Story = {
  args: {
    id: 'rotating-full',
    content: {
      eyebrow: 'TRUSTED BY 3,000+ VENUES WORLDWIDE',
      title: 'The #1 platform for',
      text: '<p>Discover why leading venues choose our comprehensive solution for all their guest experience needs.</p>',
      rotatingText: [
        { rotatingTextItem: 'theme parks and resorts' },
        { rotatingTextItem: 'water parks and attractions' },
        { rotatingTextItem: 'family entertainment centers' },
        { rotatingTextItem: 'zoos, aquariums and museums' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h1',
      displayType: 'h1',
      eyebrowType: 'div',
      textType: 'lg',
      rotatingTextLength: 90,
    },
  },
};

// Two rotating items only
export const TwoRotatingItems: Story = {
  args: {
    id: 'rotating-two',
    content: {
      title: 'Built for',
      rotatingText: [
        { rotatingTextItem: 'operational excellence' },
        { rotatingTextItem: 'guest satisfaction' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 75,
    },
  },
};

// Many rotating items
export const ManyRotatingItems: Story = {
  args: {
    id: 'rotating-many',
    content: {
      title: 'Perfect for',
      rotatingText: [
        { rotatingTextItem: 'amusement parks worldwide' },
        { rotatingTextItem: 'water parks and resorts' },
        { rotatingTextItem: 'museums and galleries' },
        { rotatingTextItem: 'zoos and wildlife parks' },
        { rotatingTextItem: 'aquariums and marine centers' },
        { rotatingTextItem: 'family entertainment centers' },
        { rotatingTextItem: 'tourist attractions' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 80,
    },
  },
};

// Right aligned
export const RightAligned: Story = {
  args: {
    id: 'rotating-right',
    content: {
      eyebrow: 'INNOVATION',
      title: 'Leading the way in',
      rotatingText: [
        { rotatingTextItem: 'digital transformation' },
        { rotatingTextItem: 'guest experience design' },
        { rotatingTextItem: 'operational efficiency' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'RIGHT',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 75,
    },
  },
};

// With longer rotating text items
export const LongRotatingText: Story = {
  args: {
    id: 'rotating-long',
    content: {
      title: 'Empowering venues with',
      rotatingText: [
        { rotatingTextItem: 'real-time guest analytics and insights' },
        { rotatingTextItem: 'seamless ticketing and booking systems' },
        { rotatingTextItem: 'comprehensive operations management' },
      ],
    },
    styles: {
      theme: 'dark',
      textAlignment: 'CENTER',
      headingType: 'h2',
      displayType: 'h2',
      rotatingTextLength: 100,
    },
  },
};
