import {useEffect, useMemo, useRef} from 'react'
import {set, useFormValue, type StringInputProps} from 'sanity'
import {
  defaultStandaloneTwoColumnBackground,
  defaultStandaloneTwoColumnEyebrowColor,
  defaultStandaloneTwoColumnTextColor,
  resolveStandaloneTwoColumnTheme,
  STANDALONE_TWO_COLUMN_BACKGROUNDS,
  STANDALONE_TWO_COLUMN_EYEBROW_COLORS,
  STANDALONE_TWO_COLUMN_TEXT_COLORS,
  standaloneTwoColumnOptionsForTheme,
  toSanityList,
  type StandaloneTwoColumnThemedOption,
  type StandaloneTwoColumnTheme,
} from '../../../astro-app/src/components/standaloneTwoColumn/options'

function createThemeAwareOptionsInput(
  allOptions: readonly StandaloneTwoColumnThemedOption[],
  fallbackForTheme: (theme: StandaloneTwoColumnTheme) => string,
  levelsToBlock = 1,
) {
  return function ThemeAwareOptionsInput(props: StringInputProps) {
    const blockPath = props.path.slice(0, -levelsToBlock)
    const rawTheme = useFormValue([...blockPath, 'theme']) as string | undefined
    const rawBackground = useFormValue([...blockPath, 'background']) as string | undefined
    const theme = resolveStandaloneTwoColumnTheme(rawTheme, rawBackground)
    const onChange = props.onChange

    const list = useMemo(
      () => toSanityList(standaloneTwoColumnOptionsForTheme(allOptions, theme)),
      [theme],
    )

    const fallback = fallbackForTheme(theme)
    const current = typeof props.value === 'string' ? props.value : undefined
    const lastTheme = useRef(theme)

    useEffect(() => {
      if (lastTheme.current === theme) return
      lastTheme.current = theme
      if (current && !list.some((item) => item.value === current)) {
        onChange(set(fallback))
      }
    }, [theme, current, fallback, list, onChange])

    return props.renderDefault({
      ...props,
      schemaType: {
        ...props.schemaType,
        options: {
          ...props.schemaType.options,
          list,
        },
      },
    })
  }
}

export const ThemeAwareBackgroundInput = createThemeAwareOptionsInput(
  STANDALONE_TWO_COLUMN_BACKGROUNDS,
  defaultStandaloneTwoColumnBackground,
)

export const ThemeAwareTextColorInput = createThemeAwareOptionsInput(
  STANDALONE_TWO_COLUMN_TEXT_COLORS,
  defaultStandaloneTwoColumnTextColor,
)

export const ThemeAwareEyebrowColorInput = createThemeAwareOptionsInput(
  STANDALONE_TWO_COLUMN_EYEBROW_COLORS,
  defaultStandaloneTwoColumnEyebrowColor,
  2,
)
