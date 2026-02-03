import type { Meta, StoryObj } from 'astrobook';
import ImageVideoModal from '../components/blocks/ImageVideoModal.astro';

const meta: Meta<typeof ImageVideoModal> = {
  title: 'Components/ImageVideoModal',
  component: ImageVideoModal,
};

export default meta;
type Story = StoryObj<typeof ImageVideoModal>;

// Note: ImageVideoModal displays a thumbnail image with a play button overlay
// Clicking opens a Wistia video in a popover modal
// The videoId should be a valid Wistia video ID for the video to play

// Basic video modal
export const Basic: Story = {
  args: {
    id: 'video-modal-basic',
    thumbnail: {
      src: 'https://placehold.co/548x310/033180/white/png?text=Video+Thumbnail',
      alt: 'Watch our product demo video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'abc123xyz', // Replace with actual Wistia video ID
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// With border
export const WithBorder: Story = {
  args: {
    id: 'video-modal-border',
    thumbnail: {
      src: 'https://placehold.co/548x310/0960F6/white/png?text=Product+Demo',
      alt: 'Product demonstration video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'demo123',
    style: {
      border: true,
      lightBackgroundShadow: false,
    },
  },
};

// With light background shadow
export const LightBackgroundShadow: Story = {
  args: {
    id: 'video-modal-shadow-light',
    thumbnail: {
      src: 'https://placehold.co/548x310/ffffff/033180/png?text=Customer+Story',
      alt: 'Customer success story video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'customer456',
    style: {
      border: false,
      lightBackgroundShadow: true,
    },
  },
};

// With both border and light shadow
export const BorderAndShadow: Story = {
  args: {
    id: 'video-modal-both',
    thumbnail: {
      src: 'https://placehold.co/548x310/f0f5ff/033180/png?text=Feature+Tour',
      alt: 'Platform feature tour video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'tour789',
    style: {
      border: true,
      lightBackgroundShadow: true,
    },
  },
};

// Eager loading (above the fold)
export const EagerLoading: Story = {
  args: {
    id: 'video-modal-eager',
    thumbnail: {
      src: 'https://placehold.co/548x310/FF290C/white/png?text=Hero+Video',
      alt: 'Watch our introduction video',
      loading: 'eager',
      width: 548,
      height: 310,
    },
    videoId: 'hero101',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// Custom dimensions - smaller
export const SmallSize: Story = {
  args: {
    id: 'video-modal-small',
    thumbnail: {
      src: 'https://placehold.co/400x225/603FF5/white/png?text=Quick+Tip',
      alt: 'Quick tip video',
      loading: 'lazy',
      width: 400,
      height: 225,
    },
    videoId: 'tip202',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// Custom dimensions - larger
export const LargeSize: Story = {
  args: {
    id: 'video-modal-large',
    thumbnail: {
      src: 'https://placehold.co/800x450/011840/white/png?text=Full+Webinar',
      alt: 'Full webinar recording',
      loading: 'lazy',
      width: 800,
      height: 450,
    },
    videoId: 'webinar303',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// Dark theme thumbnail
export const DarkThumbnail: Story = {
  args: {
    id: 'video-modal-dark',
    thumbnail: {
      src: 'https://placehold.co/548x310/1a1a1a/ffffff/png?text=Case+Study',
      alt: 'Customer case study video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'case404',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// Testimonial video
export const TestimonialVideo: Story = {
  args: {
    id: 'video-modal-testimonial',
    thumbnail: {
      src: 'https://placehold.co/548x310/18F273/033180/png?text=Customer+Review',
      alt: 'Customer testimonial video',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'testimonial505',
    style: {
      border: true,
      lightBackgroundShadow: true,
    },
  },
};

// Product tour video
export const ProductTour: Story = {
  args: {
    id: 'video-modal-tour',
    thumbnail: {
      src: 'https://placehold.co/548x310/0960F6/ffffff/png?text=Platform+Tour',
      alt: 'Take a tour of our platform',
      loading: 'lazy',
      width: 548,
      height: 310,
    },
    videoId: 'platformtour606',
    style: {
      border: false,
      lightBackgroundShadow: true,
    },
  },
};

// Square aspect ratio
export const SquareAspect: Story = {
  args: {
    id: 'video-modal-square',
    thumbnail: {
      src: 'https://placehold.co/400x400/033180/white/png?text=Social+Video',
      alt: 'Social media video clip',
      loading: 'lazy',
      width: 400,
      height: 400,
    },
    videoId: 'social707',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};

// Wide aspect ratio (21:9)
export const WideAspect: Story = {
  args: {
    id: 'video-modal-wide',
    thumbnail: {
      src: 'https://placehold.co/700x300/033180/white/png?text=Cinematic+View',
      alt: 'Cinematic venue showcase',
      loading: 'lazy',
      width: 700,
      height: 300,
    },
    videoId: 'cinematic808',
    style: {
      border: false,
      lightBackgroundShadow: false,
    },
  },
};
