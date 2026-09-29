import type { Meta, StoryObj } from 'astrobook';
import StandaloneTwoColumnVariantGrid from '@components/standaloneTwoColumn/StandaloneTwoColumnVariantGrid.astro';
import {
  STANDALONE_TWO_COLUMN_BACKGROUNDS,
  STANDALONE_TWO_COLUMN_BODY_SIZES,
  STANDALONE_TWO_COLUMN_BUTTON_STYLES,
  STANDALONE_TWO_COLUMN_EYEBROW_COLORS,
  STANDALONE_TWO_COLUMN_HEADING_SIZES,
  STANDALONE_TWO_COLUMN_LAYOUTS,
  STANDALONE_TWO_COLUMN_MEDIA_SIDES,
  STANDALONE_TWO_COLUMN_TEXT_COLORS,
  STANDALONE_TWO_COLUMN_THEMES,
  defaultStandaloneTwoColumnBackground,
  defaultStandaloneTwoColumnEyebrowColor,
  defaultStandaloneTwoColumnTextColor,
  type StandaloneTwoColumnProps,
  type StandaloneTwoColumnTheme,
} from '@components/standaloneTwoColumn/variants';
import { baseStandaloneTwoColumnProps } from './standaloneTwoColumn/fixtures';

const meta: Meta<typeof StandaloneTwoColumnVariantGrid> = {
  title: 'Standalone Two Column Block/Variations',
  component: StandaloneTwoColumnVariantGrid,
};

export default meta;
type Story = StoryObj<typeof StandaloneTwoColumnVariantGrid>;

function itemsFrom<T extends { title: string; value: string }>(
  options: readonly T[],
  apply: (option: T) => StandaloneTwoColumnProps,
) {
  return options.map((option) => ({
    label: option.title,
    props: apply(option),
  }));
}

export const ButtonStyles: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_BUTTON_STYLES, (style) => ({
      ...baseStandaloneTwoColumnProps,
      heading: { text: `Button: ${style.title}`, size: 'normal' },
      buttons: [{ label: 'Learn more', style: style.value, link: { href: '#' } }],
    })),
  },
};

export const Themes: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_THEMES, (option) => {
      const theme = option.value as StandaloneTwoColumnTheme;
      return {
        ...baseStandaloneTwoColumnProps,
        theme,
        background: defaultStandaloneTwoColumnBackground(theme),
        textColor: defaultStandaloneTwoColumnTextColor(theme),
        eyebrow: {
          text: `${option.title} theme`,
          color: defaultStandaloneTwoColumnEyebrowColor(theme),
        },
        heading: { text: `${option.title} theme text colour`, size: 'normal' },
        buttons: [
          {
            label: 'Learn more',
            style: theme === 'dark' ? 'outlined' : 'transparentRedArrow',
            link: { href: '#' },
          },
        ],
      };
    }),
  },
};

export const Backgrounds: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_BACKGROUNDS, (background) => ({
      ...baseStandaloneTwoColumnProps,
      theme: background.theme,
      background: background.value,
      textColor: defaultStandaloneTwoColumnTextColor(background.theme),
      eyebrow: {
        text: 'Background',
        color: defaultStandaloneTwoColumnEyebrowColor(background.theme),
      },
      heading: { text: background.title, size: 'normal' },
      buttons: [
        {
          label: 'Learn more',
          style: background.theme === 'dark' ? 'outlined' : 'transparentRedArrow',
          link: { href: '#' },
        },
      ],
    })),
  },
};

export const TextColors: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_TEXT_COLORS, (color) => {
      const theme = (color.themes[0] ?? 'light') as StandaloneTwoColumnTheme;
      return {
        ...baseStandaloneTwoColumnProps,
        theme,
        background: defaultStandaloneTwoColumnBackground(theme),
        textColor: color.value,
        eyebrow: {
          text: `${color.title} text`,
          color: defaultStandaloneTwoColumnEyebrowColor(theme),
        },
        heading: { text: `${color.title} heading and body`, size: 'normal' },
        buttons: [
          {
            label: 'Learn more',
            style: theme === 'dark' ? 'outlined' : 'transparentRedArrow',
            link: { href: '#' },
          },
        ],
      };
    }),
  },
};

export const HeadingSizes: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_HEADING_SIZES, (size) => ({
      ...baseStandaloneTwoColumnProps,
      heading: { text: `${size.title} heading size`, size: size.value },
    })),
  },
};

export const BodySizes: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_BODY_SIZES, (size) => ({
      ...baseStandaloneTwoColumnProps,
      heading: { text: `${size.title} paragraph size`, size: 'normal' },
      bodySize: size.value,
    })),
  },
};

export const EyebrowColors: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_EYEBROW_COLORS, (color) => {
      const theme = (
        color.themes.includes('light') ? 'light' : 'dark'
      ) as StandaloneTwoColumnTheme;
      return {
        ...baseStandaloneTwoColumnProps,
        theme,
        background: defaultStandaloneTwoColumnBackground(theme),
        textColor: defaultStandaloneTwoColumnTextColor(theme),
        eyebrow: { text: `${color.title} eyebrow`, color: color.value },
        heading: { text: 'Eyebrow colour', size: 'normal' },
      };
    }),
  },
};

export const Layouts: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_LAYOUTS, (option) => ({
      ...baseStandaloneTwoColumnProps,
      layout: option.value,
      rowMode: 'single',
      mediaSide: 'right',
      heading: { text: option.title, size: 'big' },
    })),
  },
};

export const MediaSides: Story = {
  args: {
    items: itemsFrom(STANDALONE_TWO_COLUMN_MEDIA_SIDES, (side) => ({
      ...baseStandaloneTwoColumnProps,
      mediaSide: side.value,
      mediaOnTopMobile: side.value === 'left',
      heading: { text: `Media on the ${side.title.toLowerCase()}`, size: 'normal' },
    })),
  },
};
