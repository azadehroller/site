import type { Meta, StoryObj } from 'astrobook';
import AdvancedImage from '../components/blocks/AdvancedImage.astro';

const meta: Meta<typeof AdvancedImage> = {
  title: 'Components/AdvancedImage',
  component: AdvancedImage,
};

export default meta;
type Story = StoryObj<typeof AdvancedImage>;

// Note: AdvancedImage requires a Sanity image object to render properly
// Without a valid Sanity image, it shows a placeholder state
// These stories demonstrate the various configuration options

// The component will show placeholder without a valid Sanity image
// This is expected behavior - in production, images come from Sanity CMS

// Placeholder state (no image provided)
export const Placeholder: Story = {
  args: {
    alt: 'Sample image',
    alignment: 'center',
  },
};

// With alignment left
export const AlignLeft: Story = {
  args: {
    alt: 'Left aligned image',
    alignment: 'left',
  },
};

// With alignment right
export const AlignRight: Story = {
  args: {
    alt: 'Right aligned image',
    alignment: 'right',
  },
};

// Fluid responsive behavior (default)
export const FluidResponsive: Story = {
  args: {
    alt: 'Fluid responsive image',
    responsiveBehavior: 'fluid',
    maxWidth: 800,
    alignment: 'center',
  },
};

// Fixed dimensions
export const FixedDimensions: Story = {
  args: {
    alt: 'Fixed size image',
    responsiveBehavior: 'fixed',
    customWidth: 400,
    customHeight: 300,
    alignment: 'center',
  },
};

// 16:9 aspect ratio
export const AspectRatio16x9: Story = {
  args: {
    alt: 'Widescreen image',
    aspectRatio: '16/9',
    alignment: 'center',
  },
};

// Square 1:1 aspect ratio
export const AspectRatioSquare: Story = {
  args: {
    alt: 'Square image',
    aspectRatio: '1/1',
    alignment: 'center',
  },
};

// With small border radius
export const BorderRadiusSmall: Story = {
  args: {
    alt: 'Rounded image',
    borderRadius: 'sm',
    alignment: 'center',
  },
};

// With large border radius
export const BorderRadiusLarge: Story = {
  args: {
    alt: 'Large rounded image',
    borderRadius: 'lg',
    alignment: 'center',
  },
};

// With full border radius (circular)
export const BorderRadiusFull: Story = {
  args: {
    alt: 'Circular image',
    borderRadius: 'full',
    aspectRatio: '1/1',
    alignment: 'center',
  },
};

// With small shadow
export const ShadowSmall: Story = {
  args: {
    alt: 'Image with shadow',
    shadow: 'sm',
    alignment: 'center',
  },
};

// With large shadow
export const ShadowLarge: Story = {
  args: {
    alt: 'Image with large shadow',
    shadow: 'lg',
    borderRadius: 'md',
    alignment: 'center',
  },
};

// With blue light shadow
export const ShadowBlueLight: Story = {
  args: {
    alt: 'Image with blue shadow',
    shadow: 'blue-light',
    borderRadius: 'lg',
    alignment: 'center',
  },
};

// With button overlay
export const WithButtonOverlay: Story = {
  args: {
    alt: 'Image with button',
    showButton: true,
    buttonText: 'Learn More',
    buttonLink: '/learn-more',
    buttonOpenInNewTab: false,
    borderRadius: 'md',
    alignment: 'center',
  },
};

// With caption
export const WithCaption: Story = {
  args: {
    alt: 'Image with caption',
    caption: 'This is a sample caption for the image',
    borderRadius: 'sm',
    alignment: 'center',
  },
};

// Eager loading (above the fold)
export const EagerLoading: Story = {
  args: {
    alt: 'Eager loaded image',
    loading: 'eager',
    fetchpriority: true,
    alignment: 'center',
  },
};

// Object fit cover
export const ObjectFitCover: Story = {
  args: {
    alt: 'Cover fit image',
    objectFit: 'cover',
    aspectRatio: '16/9',
    alignment: 'center',
  },
};
