import type { Meta, StoryObj } from 'astrobook';
import Columns from '../components/blocks/Columns.astro';

const meta: Meta<typeof Columns> = {
  title: 'Components/Columns',
  component: Columns,
};

export default meta;
type Story = StoryObj<typeof Columns>;

// Note: Columns uses named slots (col1, col2, col3, col4) for content
// In Astrobook, slot content would be passed via children
// These stories demonstrate the layout configurations

// Single column (full width)
export const SingleColumn: Story = {
  args: {
    layout: '1',
    backgroundColor: 'var(--blue-10)',
    paddingTop: '48px',
    paddingBottom: '48px',
  },
};

// Two equal columns
export const TwoColumns: Story = {
  args: {
    layout: '2',
    backgroundColor: 'var(--neutral-white)',
    paddingTop: '64px',
    paddingBottom: '64px',
  },
};

// Three equal columns
export const ThreeColumns: Story = {
  args: {
    layout: '3',
    backgroundColor: 'var(--blue-10)',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

// Four equal columns
export const FourColumns: Story = {
  args: {
    layout: '4',
    backgroundColor: 'var(--neutral-white)',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

// 1/3 split (narrow left, wide right)
export const OneThirdSplit: Story = {
  args: {
    layout: '1/3',
    backgroundColor: 'var(--primary-50)',
    paddingTop: '64px',
    paddingBottom: '64px',
  },
};

// 3/1 split (wide left, narrow right)
export const ThreeOneSplit: Story = {
  args: {
    layout: '3/1',
    backgroundColor: 'var(--neutral-10)',
    paddingTop: '64px',
    paddingBottom: '64px',
  },
};

// With custom background color
export const CustomBackgroundColor: Story = {
  args: {
    layout: '2',
    backgroundColor: 'custom',
    customBackgroundColor: '#f0f5ff',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

// With gradient background
export const GradientBackground: Story = {
  args: {
    layout: '1',
    backgroundGradient: 'custom',
    gradientColorStart: '#033180',
    gradientColorEnd: '#0960F6',
    paddingTop: '100px',
    paddingBottom: '100px',
  },
};

// With asymmetric padding
export const AsymmetricPadding: Story = {
  args: {
    layout: '2',
    backgroundColor: 'var(--blue-10)',
    paddingTop: '120px',
    paddingTopMobile: '60px',
    paddingBottom: '40px',
    paddingBottomMobile: '24px',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
};

// Mobile-optimized padding
export const MobileOptimized: Story = {
  args: {
    layout: '3',
    backgroundColor: 'var(--neutral-white)',
    paddingTop: '80px',
    paddingTopMobile: '32px',
    paddingBottom: '80px',
    paddingBottomMobile: '32px',
    column1PaddingBottomMobile: '24px',
    column2PaddingBottomMobile: '24px',
    column3PaddingBottomMobile: '0px',
  },
};
