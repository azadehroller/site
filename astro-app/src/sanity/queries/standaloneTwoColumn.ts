import groq from 'groq'

export const standaloneTwoColumnFields = groq`
  _type,
  _key,
  theme,
  background,
  textColor,
  layout,
  rowMode,
  columnLoop[] {
    _key,
    heading,
    body,
    image {
      asset->{ _id, url },
      alt
    }
  },
  mediaSide,
  mediaOnTopMobile,
  mediaType,
  image {
    asset->{ _id, url },
    alt
  },
  imageLoading,
  wistiaId,
  posterImage {
    asset->{ _id, url },
    alt
  },
  stat {
    number,
    label,
    placement
  },
  eyebrow {
    text,
    color
  },
  heading {
    text,
    size
  },
  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "link" => {
        href,
        openInNewTab
      }
    }
  },
  bodySize,
  quote {
    quoteText,
    quoterName,
    quoterPosition,
    quoterLogo {
      asset->{ _id, url },
      alt
    }
  },
  buttons[] {
    _key,
    label,
    style,
    link {
      urlType,
      href,
      openInNewTab,
      noFollow,
      contentReference->{
        _type,
        title,
        slug { current }
      }
    }
  }
`
