import type { Meta, StoryObj } from 'astrobook';
import Divider from '../components/blocks/Divider.astro';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Short divider (visible) - default
export const ShortVisible: Story = {
  args: {
    showDivider: true,
    dividerType: 'short',
    background: 'light',
  },
};

// Tall divider (visible)
export const TallVisible: Story = {
  args: {
    showDivider: true,
    dividerType: 'tall',
    background: 'light',
  },
};

// Short divider on dark background
export const ShortDark: Story = {
  args: {
    showDivider: true,
    dividerType: 'short',
    background: 'dark',
  },
};

// Tall divider on dark background
export const TallDark: Story = {
  args: {
    showDivider: true,
    dividerType: 'tall',
    background: 'dark',
  },
};

// Hidden divider (spacing only)
export const HiddenShort: Story = {
  args: {
    showDivider: false,
    dividerType: 'short',
    background: 'light',
  },
};

// Hidden tall divider (larger spacing)
export const HiddenTall: Story = {
  args: {
    showDivider: false,
    dividerType: 'tall',
    background: 'light',
  },
};
