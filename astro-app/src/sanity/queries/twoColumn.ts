import groq from 'groq'

// ── Reusable fragments ────────────────────────────────────────────────────────

export const mediaFields = groq`
  mediaType,
  mediaType == "image" => {
    image {
      asset->{ _id, url },
      alt
    }
  },
  mediaType == "wistia" => {
    wistiaId,
    posterImage {
      asset->{ _id, url },
      alt
    }
  }
`

export const richTextBlockFields = groq`
  eyebrow {
    text,
    colourStyleLight,
    colourStyleDark
  },
  title {
    text,
    headingSize
  },
  body[] {
    ...,
    _type == "block" => {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          href,
          openInNewTab
        }
      }
    }
  }
`

export const quoteFields = groq`
  quoteText,
  quoterName,
  quoterPosition,
  quoterLogo {
    asset->{ _id, url },
    alt
  }
`

export const statsFields = groq`
  number,
  label
`

export const btnFields = groq`
  _key,
  label,
  link {
    urlType,
    href,
    contentReference->{
      _type,
      title,
      slug { current }
    },
    openInNewTab,
    noFollow
  },
  hasIcon,
  iconType,
  styleDefault,
  styleWithIcon
`

// ── Block projection ──────────────────────────────────────────────────────────

export const twoColumnSectionFields = groq`
  _type,
  _key,
  theme,
  columnLayout,
  background {
    type,
    colourOptionLight,
    colourOptionDark,
    imageOption
  },
  cards[] {
    _key,
    media {
      ${mediaFields}
    },
    mediaSide,
    mediaOnTopMobile,
    defined(richTextBlock) => {
      richTextBlock {
        ${richTextBlockFields}
      }
    },
    defined(stats) => {
      stats {
        ${statsFields}
      }
    },
    defined(quote) => {
      quote {
        ${quoteFields}
      }
    },
    buttons[] {
      ${btnFields}
    }
  }
`
