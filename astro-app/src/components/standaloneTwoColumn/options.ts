/**
 * Single source of truth for Standalone Two Column Block options.
 *
 * The Astro component, Storybook stories, and the Sanity schema all read
 * these lists. Add a button style / background / size here and:
 *   1. Storybook galleries pick it up automatically
 *   2. TypeScript flags any story or field that is now invalid
 *   3. Studio dropdowns stay in sync
 *
 * Add matching CSS in StandaloneTwoColumnBlock.astro (class names use the
 * `value`, e.g. `.s2c-btn--green` or `.s2c--bg-green`).
 *
 * Theme is the parent colour system. Light theme only offers dark-on-light
 * colours; dark theme only offers light-on-dark colours. Heading and body
 * share one text colour — they are not picked separately.
 */

export const STANDALONE_TWO_COLUMN_THEMES = [
  { title: 'Light', value: 'light' },
  { title: 'Dark', value: 'dark' },
] as const;

export const STANDALONE_TWO_COLUMN_BACKGROUNDS = [
  { title: 'White', value: 'white', theme: 'light' },
  { title: 'Light blue', value: 'lightBlue', theme: 'light' },
  { title: 'Navy', value: 'navy', theme: 'dark' },
  { title: 'Dark blue', value: 'darkBlue', theme: 'dark' },
] as const;

export const STANDALONE_TWO_COLUMN_TEXT_COLORS = [
  { title: 'Navy', value: 'navy', themes: ['light'] },
  { title: 'Dark', value: 'dark', themes: ['light'] },
  { title: 'White', value: 'white', themes: ['dark'] },
  { title: 'Light blue', value: 'lightBlue', themes: ['dark'] },
] as const;

export const STANDALONE_TWO_COLUMN_MEDIA_SIDES = [
  { title: 'Left', value: 'left' },
  { title: 'Right', value: 'right' },
] as const;

export const STANDALONE_TWO_COLUMN_MEDIA_TYPES = [
  { title: 'Image', value: 'image' },
  { title: 'Wistia video', value: 'wistia' },
] as const;

export const STANDALONE_TWO_COLUMN_IMAGE_LOADING = [
  { title: 'Lazy', value: 'lazy' },
  { title: 'Eager', value: 'eager' },
] as const;

export const STANDALONE_TWO_COLUMN_STAT_PLACEMENTS = [
  { title: 'In the content column', value: 'content' },
  { title: 'Overlay on media', value: 'mediaOverlay' },
] as const;

export const STANDALONE_TWO_COLUMN_EYEBROW_COLORS = [
  { title: 'Red', value: 'red', themes: ['light', 'dark'] },
  { title: 'Blue', value: 'blue', themes: ['light'] },
  { title: 'Navy', value: 'navy', themes: ['light'] },
  { title: 'Dark', value: 'dark', themes: ['light'] },
  { title: 'Light blue', value: 'lightBlue', themes: ['light', 'dark'] },
  { title: 'Gradient', value: 'gradient', themes: ['light', 'dark'] },
  { title: 'White', value: 'white', themes: ['dark'] },
] as const;

export const STANDALONE_TWO_COLUMN_HEADING_SIZES = [
  { title: 'Normal', value: 'normal' },
  { title: 'Big', value: 'big' },
  { title: 'Bigger', value: 'bigger' },
] as const;

export const STANDALONE_TWO_COLUMN_BODY_SIZES = [
  { title: 'Small', value: 'small' },
  { title: 'Normal', value: 'normal' },
  { title: 'Large', value: 'large' },
] as const;

export const STANDALONE_TWO_COLUMN_LAYOUTS = [
  { title: 'Equal columns', value: 'equal' },
  { title: 'Bigger left column', value: 'biggerLeft' },
] as const;

export const STANDALONE_TWO_COLUMN_ROW_MODES = [
  { title: 'Single', value: 'single' },
  { title: 'Column loop', value: 'loop' },
] as const;

export const STANDALONE_TWO_COLUMN_BUTTON_STYLES = [
  { title: 'Transparent with red arrow', value: 'transparentRedArrow', kind: 'arrow' },
  { title: 'Transparent with blue arrow', value: 'transparentBlueArrow', kind: 'arrow' },
  { title: 'Red', value: 'red', kind: 'pill' },
  { title: 'Blue', value: 'blue', kind: 'pill' },
  { title: 'Outlined', value: 'outlined', kind: 'pill' },
] as const;

export const STANDALONE_TWO_COLUMN_DEFAULTS = {
  theme: 'light',
  background: 'white',
  textColor: 'navy',
  layout: 'equal',
  rowMode: 'single',
  mediaSide: 'left',
  mediaType: 'image',
  headingSize: 'normal',
  bodySize: 'normal',
  eyebrowColor: 'red',
  imageLoading: 'lazy',
  statPlacement: 'content',
  buttonStyle: 'transparentRedArrow',
} as const;

type OptionValue<T extends readonly { value: string }[]> = T[number]['value'];

export type StandaloneTwoColumnTheme = OptionValue<typeof STANDALONE_TWO_COLUMN_THEMES>;
export type StandaloneTwoColumnBackground = OptionValue<typeof STANDALONE_TWO_COLUMN_BACKGROUNDS>;
export type StandaloneTwoColumnTextColor = OptionValue<typeof STANDALONE_TWO_COLUMN_TEXT_COLORS>;
export type StandaloneTwoColumnLayout = OptionValue<typeof STANDALONE_TWO_COLUMN_LAYOUTS>;
export type StandaloneTwoColumnRowMode = OptionValue<typeof STANDALONE_TWO_COLUMN_ROW_MODES>;
export type StandaloneTwoColumnMediaSide = OptionValue<typeof STANDALONE_TWO_COLUMN_MEDIA_SIDES>;
export type StandaloneTwoColumnMediaType = OptionValue<typeof STANDALONE_TWO_COLUMN_MEDIA_TYPES>;
export type StandaloneTwoColumnImageLoading = OptionValue<typeof STANDALONE_TWO_COLUMN_IMAGE_LOADING>;
export type StandaloneTwoColumnStatPlacement = OptionValue<typeof STANDALONE_TWO_COLUMN_STAT_PLACEMENTS>;
export type StandaloneTwoColumnEyebrowColor = OptionValue<typeof STANDALONE_TWO_COLUMN_EYEBROW_COLORS>;
export type StandaloneTwoColumnHeadingSize = OptionValue<typeof STANDALONE_TWO_COLUMN_HEADING_SIZES>;
export type StandaloneTwoColumnBodySize = OptionValue<typeof STANDALONE_TWO_COLUMN_BODY_SIZES>;
export type StandaloneTwoColumnButtonStyle = OptionValue<typeof STANDALONE_TWO_COLUMN_BUTTON_STYLES>;
export type StandaloneTwoColumnButtonKind = (typeof STANDALONE_TWO_COLUMN_BUTTON_STYLES)[number]['kind'];

export type StandaloneTwoColumnThemedOption = {
  title: string;
  value: string;
  theme?: string;
  themes?: readonly string[];
};

/** `{ title, value }` lists for Sanity `options.list`. */
export function toSanityList<T extends readonly { title: string; value: string }[]>(
  options: T,
): { title: string; value: T[number]['value'] }[] {
  return options.map(({ title, value }) => ({ title, value }));
}

export function standaloneTwoColumnOptionMatchesTheme(
  option: StandaloneTwoColumnThemedOption,
  theme: StandaloneTwoColumnTheme,
): boolean {
  if (option.themes) return option.themes.includes(theme);
  if (option.theme) return option.theme === theme;
  return true;
}

export function standaloneTwoColumnOptionsForTheme<T extends StandaloneTwoColumnThemedOption>(
  options: readonly T[],
  theme: StandaloneTwoColumnTheme,
): T[] {
  return options.filter((option) => standaloneTwoColumnOptionMatchesTheme(option, theme));
}

export function defaultStandaloneTwoColumnBackground(
  theme: StandaloneTwoColumnTheme,
): StandaloneTwoColumnBackground {
  return theme === 'dark' ? 'navy' : 'white';
}

export function defaultStandaloneTwoColumnTextColor(
  theme: StandaloneTwoColumnTheme,
): StandaloneTwoColumnTextColor {
  return theme === 'dark' ? 'white' : 'navy';
}

export function defaultStandaloneTwoColumnEyebrowColor(
  theme: StandaloneTwoColumnTheme,
): StandaloneTwoColumnEyebrowColor {
  return theme === 'dark' ? 'white' : 'red';
}

function resolveOption<T extends readonly { value: string }[]>(
  options: T,
  raw: string | undefined,
  fallback: T[number]['value'],
): T[number]['value'] {
  return options.some((option) => option.value === raw) ? (raw as T[number]['value']) : fallback;
}

export function resolveStandaloneTwoColumnTheme(
  rawTheme: string | undefined,
  rawBackground?: string,
): StandaloneTwoColumnTheme {
  if (STANDALONE_TWO_COLUMN_THEMES.some((option) => option.value === rawTheme)) {
    return rawTheme as StandaloneTwoColumnTheme;
  }
  if (
    STANDALONE_TWO_COLUMN_BACKGROUNDS.some(
      (option) => option.value === rawBackground && option.theme === 'dark',
    )
  ) {
    return 'dark';
  }
  return STANDALONE_TWO_COLUMN_DEFAULTS.theme;
}

export function resolveStandaloneTwoColumnBackground(
  raw: string | undefined,
  theme?: StandaloneTwoColumnTheme,
): StandaloneTwoColumnBackground {
  const allowed = theme
    ? standaloneTwoColumnOptionsForTheme(STANDALONE_TWO_COLUMN_BACKGROUNDS, theme)
    : [...STANDALONE_TWO_COLUMN_BACKGROUNDS];
  const fallback = theme
    ? defaultStandaloneTwoColumnBackground(theme)
    : STANDALONE_TWO_COLUMN_DEFAULTS.background;
  return resolveOption(allowed, raw, fallback);
}

export function resolveStandaloneTwoColumnTextColor(
  raw: string | undefined,
  theme: StandaloneTwoColumnTheme = STANDALONE_TWO_COLUMN_DEFAULTS.theme,
): StandaloneTwoColumnTextColor {
  return resolveOption(
    standaloneTwoColumnOptionsForTheme(STANDALONE_TWO_COLUMN_TEXT_COLORS, theme),
    raw,
    defaultStandaloneTwoColumnTextColor(theme),
  );
}

export function resolveStandaloneTwoColumnLayout(
  raw: string | undefined,
): StandaloneTwoColumnLayout {
  return resolveOption(
    STANDALONE_TWO_COLUMN_LAYOUTS,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.layout,
  );
}

export function resolveStandaloneTwoColumnRowMode(
  raw: string | undefined,
): StandaloneTwoColumnRowMode {
  return resolveOption(
    STANDALONE_TWO_COLUMN_ROW_MODES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.rowMode,
  );
}

export function isStandaloneTwoColumnLoop(
  layout: StandaloneTwoColumnLayout,
  rowMode: StandaloneTwoColumnRowMode,
): boolean {
  return layout === 'biggerLeft' && rowMode === 'loop';
}

export function resolveStandaloneTwoColumnMediaSide(
  raw: string | undefined,
): StandaloneTwoColumnMediaSide {
  return resolveOption(
    STANDALONE_TWO_COLUMN_MEDIA_SIDES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.mediaSide,
  );
}

export function resolveStandaloneTwoColumnMediaType(
  raw: string | undefined,
): StandaloneTwoColumnMediaType {
  return resolveOption(
    STANDALONE_TWO_COLUMN_MEDIA_TYPES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.mediaType,
  );
}

export function resolveStandaloneTwoColumnImageLoading(
  raw: string | undefined,
): StandaloneTwoColumnImageLoading {
  return resolveOption(
    STANDALONE_TWO_COLUMN_IMAGE_LOADING,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.imageLoading,
  );
}

export function resolveStandaloneTwoColumnStatPlacement(
  raw: string | undefined,
): StandaloneTwoColumnStatPlacement {
  return resolveOption(
    STANDALONE_TWO_COLUMN_STAT_PLACEMENTS,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.statPlacement,
  );
}

export function resolveStandaloneTwoColumnEyebrowColor(
  raw: string | undefined,
  theme: StandaloneTwoColumnTheme = STANDALONE_TWO_COLUMN_DEFAULTS.theme,
): StandaloneTwoColumnEyebrowColor {
  return resolveOption(
    standaloneTwoColumnOptionsForTheme(STANDALONE_TWO_COLUMN_EYEBROW_COLORS, theme),
    raw,
    defaultStandaloneTwoColumnEyebrowColor(theme),
  );
}

export function resolveStandaloneTwoColumnHeadingSize(
  raw: string | undefined,
): StandaloneTwoColumnHeadingSize {
  return resolveOption(
    STANDALONE_TWO_COLUMN_HEADING_SIZES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.headingSize,
  );
}

export function resolveStandaloneTwoColumnBodySize(
  raw: string | undefined,
): StandaloneTwoColumnBodySize {
  return resolveOption(
    STANDALONE_TWO_COLUMN_BODY_SIZES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.bodySize,
  );
}

export function resolveStandaloneTwoColumnButtonStyle(
  raw: string | undefined,
): StandaloneTwoColumnButtonStyle {
  return resolveOption(
    STANDALONE_TWO_COLUMN_BUTTON_STYLES,
    raw,
    STANDALONE_TWO_COLUMN_DEFAULTS.buttonStyle,
  );
}

export function isStandaloneTwoColumnDarkBackground(
  background: StandaloneTwoColumnBackground,
): boolean {
  return STANDALONE_TWO_COLUMN_BACKGROUNDS.some(
    (option) => option.value === background && option.theme === 'dark',
  );
}

export function isStandaloneTwoColumnDarkTheme(theme: StandaloneTwoColumnTheme): boolean {
  return theme === 'dark';
}

export function isStandaloneTwoColumnArrowButton(
  style: StandaloneTwoColumnButtonStyle,
): boolean {
  return STANDALONE_TWO_COLUMN_BUTTON_STYLES.some(
    (option) => option.value === style && option.kind === 'arrow',
  );
}
