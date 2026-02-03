import type { Meta, StoryObj } from 'astrobook';
import TestimonialSlider from '../components/blocks/TestimonialSlider.astro';

const meta: Meta<typeof TestimonialSlider> = {
  title: 'Components/TestimonialSlider',
  component: TestimonialSlider,
};

export default meta;
type Story = StoryObj<typeof TestimonialSlider>;

// Note: TestimonialSlider is a horizontal scrolling slider
// Navigation buttons appear on desktop (768px+)
// Cards can be scrolled/swiped on mobile

// Basic slider with multiple testimonials
export const BasicSlider: Story = {
  args: {
    id: 'testimonial-basic',
    slides: [
      {
        _key: '1',
        content: '<p><strong>Incredible platform</strong> that has transformed how we manage our venue. The real-time analytics have been a game-changer for our operations team.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=Logo+1',
        logoAlt: 'Company 1 Logo',
        buttonText: 'Read case study',
        link: { href: '/case-studies/company-1', openInNewTab: false },
      },
      {
        _key: '2',
        content: '<p>We saw a <strong>40% increase</strong> in online bookings within the first month. The customer support team has been exceptional throughout our journey.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=Logo+2',
        logoAlt: 'Company 2 Logo',
        buttonText: 'Learn more',
        link: { href: '/case-studies/company-2', openInNewTab: false },
      },
      {
        _key: '3',
        content: '<p>The <strong>GX Score feature</strong> has helped us identify and fix issues we never knew existed. Our guest satisfaction is at an all-time high.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=Logo+3',
        logoAlt: 'Company 3 Logo',
        buttonText: 'See results',
        link: { href: '/case-studies/company-3', openInNewTab: false },
      },
      {
        _key: '4',
        content: '<p>Implementation was <strong>smooth and fast</strong>. We were up and running in less than a week with full training for our staff.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=Logo+4',
        logoAlt: 'Company 4 Logo',
        buttonText: 'Read story',
        link: { href: '/case-studies/company-4', openInNewTab: false },
      },
    ],
  },
};

// Many slides for scrolling demo
export const ManySlides: Story = {
  args: {
    id: 'testimonial-many',
    slides: [
      {
        _key: '1',
        content: '<p><strong>Best decision</strong> we made for our theme park. Revenue is up 25% since switching to this platform.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=Park+1',
        logoAlt: 'Theme Park 1',
        buttonText: 'Read more',
        link: { href: '/case-studies/theme-park-1', openInNewTab: false },
      },
      {
        _key: '2',
        content: '<p>Our water park has never been <strong>more efficient</strong>. Queue times are down and guest satisfaction is through the roof.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=Park+2',
        logoAlt: 'Water Park',
        buttonText: 'See how',
        link: { href: '/case-studies/water-park', openInNewTab: false },
      },
      {
        _key: '3',
        content: '<p>The <strong>mobile app integration</strong> has been fantastic for our guests. They love the convenience.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=FEC+1',
        logoAlt: 'FEC 1',
        buttonText: 'Learn more',
        link: { href: '/case-studies/fec-1', openInNewTab: false },
      },
      {
        _key: '4',
        content: '<p>Managing multiple locations has never been <strong>easier</strong>. One dashboard for everything.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=Chain+1',
        logoAlt: 'Venue Chain',
        buttonText: 'View case study',
        link: { href: '/case-studies/venue-chain', openInNewTab: false },
      },
      {
        _key: '5',
        content: '<p>Our museum has seen <strong>record attendance</strong> since implementing online ticketing and timed entry.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=Museum',
        logoAlt: 'Museum',
        buttonText: 'Read story',
        link: { href: '/case-studies/museum', openInNewTab: false },
      },
      {
        _key: '6',
        content: '<p>The <strong>reporting tools</strong> give us insights we never had before. Data-driven decisions are now easy.</p>',
        logoUrl: 'https://placehold.co/80x44/0960F6/white/png?text=Zoo',
        logoAlt: 'Zoo',
        buttonText: 'Discover more',
        link: { href: '/case-studies/zoo', openInNewTab: false },
      },
    ],
  },
};

// Without links
export const WithoutLinks: Story = {
  args: {
    id: 'testimonial-no-links',
    slides: [
      {
        _key: '1',
        content: '<p><strong>Amazing product</strong> that has exceeded all our expectations. Highly recommended for any venue.</p>',
        logoUrl: 'https://placehold.co/80x44/603FF5/white/png?text=Venue+A',
        logoAlt: 'Venue A Logo',
        buttonText: 'Coming soon',
      },
      {
        _key: '2',
        content: '<p>The platform is <strong>intuitive and powerful</strong>. Our staff picked it up immediately.</p>',
        logoUrl: 'https://placehold.co/80x44/603FF5/white/png?text=Venue+B',
        logoAlt: 'Venue B Logo',
        buttonText: 'Coming soon',
      },
      {
        _key: '3',
        content: '<p><strong>Outstanding support</strong> whenever we need it. The team really cares about our success.</p>',
        logoUrl: 'https://placehold.co/80x44/603FF5/white/png?text=Venue+C',
        logoAlt: 'Venue C Logo',
        buttonText: 'Coming soon',
      },
    ],
  },
};

// Without logos (shows placeholder)
export const WithoutLogos: Story = {
  args: {
    id: 'testimonial-no-logos',
    slides: [
      {
        _key: '1',
        content: '<p>We have been using this platform for over <strong>3 years</strong> and it just keeps getting better.</p>',
        buttonText: 'Read more',
        link: { href: '/testimonials/1', openInNewTab: false },
      },
      {
        _key: '2',
        content: '<p>The <strong>ROI</strong> has been incredible. Paid for itself within the first quarter.</p>',
        buttonText: 'Learn more',
        link: { href: '/testimonials/2', openInNewTab: false },
      },
      {
        _key: '3',
        content: '<p>Switching from our old system was <strong>seamless</strong>. The migration team handled everything.</p>',
        buttonText: 'See details',
        link: { href: '/testimonials/3', openInNewTab: false },
      },
    ],
  },
};

// Long testimonial content
export const LongContent: Story = {
  args: {
    id: 'testimonial-long',
    slides: [
      {
        _key: '1',
        content: '<p>After evaluating multiple platforms, we chose this solution for our family entertainment center. <strong>The decision has paid dividends</strong>. Our operations are streamlined, our guests are happier, and our revenue has increased significantly. The implementation team was professional and thorough.</p>',
        logoUrl: 'https://placehold.co/80x44/FF290C/white/png?text=FEC',
        logoAlt: 'Family Entertainment Center',
        buttonText: 'Full story',
        link: { href: '/case-studies/fec-success', openInNewTab: false },
      },
      {
        _key: '2',
        content: '<p>Managing a zoo with over <strong>500,000 annual visitors</strong> requires robust technology. This platform handles our ticketing, memberships, donations, and retail all in one place. The reporting capabilities have transformed how our leadership team makes decisions.</p>',
        logoUrl: 'https://placehold.co/80x44/FF290C/white/png?text=Zoo',
        logoAlt: 'City Zoo',
        buttonText: 'Read case study',
        link: { href: '/case-studies/zoo-success', openInNewTab: false },
      },
    ],
  },
};

// External links
export const ExternalLinks: Story = {
  args: {
    id: 'testimonial-external',
    slides: [
      {
        _key: '1',
        content: '<p>Featured in <strong>industry publications</strong> for our digital transformation journey powered by this platform.</p>',
        logoUrl: 'https://placehold.co/80x44/18F273/033180/png?text=Press',
        logoAlt: 'Press Feature',
        buttonText: 'Read article',
        link: { href: 'https://example.com/press/feature-1', openInNewTab: true, noFollow: true },
      },
      {
        _key: '2',
        content: '<p>Our success story was <strong>highlighted</strong> at the annual attractions industry conference.</p>',
        logoUrl: 'https://placehold.co/80x44/18F273/033180/png?text=Event',
        logoAlt: 'Conference',
        buttonText: 'Watch video',
        link: { href: 'https://example.com/conference/video', openInNewTab: true, noFollow: true },
      },
    ],
  },
};

// Two slides only
export const TwoSlides: Story = {
  args: {
    id: 'testimonial-two',
    slides: [
      {
        _key: '1',
        content: '<p><strong>Exceptional platform</strong> for managing our aquarium. The timed entry feature has eliminated overcrowding.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=Aquarium',
        logoAlt: 'Aquarium Logo',
        buttonText: 'Read more',
        link: { href: '/case-studies/aquarium', openInNewTab: false },
      },
      {
        _key: '2',
        content: '<p>Our trampoline park has seen <strong>50% growth</strong> in birthday party bookings thanks to the online booking system.</p>',
        logoUrl: 'https://placehold.co/80x44/033180/white/png?text=TrampolinePark',
        logoAlt: 'Trampoline Park Logo',
        buttonText: 'See results',
        link: { href: '/case-studies/trampoline-park', openInNewTab: false },
      },
    ],
  },
};
