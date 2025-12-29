import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { loadQuery } from "./loadQuery";

export async function getHomepage(request?: Request) {
  return await loadQuery<Homepage | null>({
    query: groq`*[_type == "homepage"][0]{
      _id,
      _updatedAt,
      title,
      sections[]{
        ...,
        _type == 'columnsBlock' => {
          _type,
          _key,
          layout,
          backgroundColor,
          customBackgroundColor,
          backgroundImage{ asset-> },
          backgroundPosition,
          backgroundSize,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          column1[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column2[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          }
        },
        _type == 'divider' => {
          _type,
          _key,
          showDivider,
          dividerType,
          background,
          darkBackgroundColor
        }
      }
    }`,
    request,
  });
}

export async function getGetStartedPage(request?: Request) {
  return await loadQuery<GetStartedPage | null>({
    query: groq`*[_type == "getStartedPage"][0]{
      _id,
      _updatedAt,
      title,
      seoTitle,
      seoDescription,
      sections[]{
        ...,
        _type == 'columnsBlock' => {
          _type,
          _key,
          layout,
          backgroundColor,
          customBackgroundColor,
          backgroundImage{ asset-> },
          backgroundPosition,
          backgroundSize,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          column1[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column2[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttonList[]{
                _key,
                buttonSettings{
                  modalTrigger,
                  modalTriggerVideo,
                  formId,
                  videoId,
                  btnLabel,
                  buttonLink{
                    href,
                    openInNewTab,
                    noFollow
                  }
                },
                btnIcon{
                  iconFieldSvg,
                  iconPosition
                },
                buttonStyles{
                  bgKind
                }
              },
              styles{
                layout{
                  spacing{
                    marginTop,
                    marginBottom,
                    marginLeft,
                    marginRight
                  },
                  alignment
                },
                animation{
                  type
                }
              }
            },
            _type == 'button' => {
              _type,
              _key,
              settings{
                buttonText,
                link{
                  href,
                  urlType,
                  openInNewTab,
                  noFollow
                }
              },
              btnIcon{
                iconFieldSvg,
                iconPosition
              },
              styles{
                background{
                  bgKind
                },
                alignment{
                  horizontalAlign,
                  buttonWidth
                },
                animation{
                  type
                }
              }
            },
            _type == 'logoSet' => {
              _type,
              _key,
              customTitle,
              amerLogos[]{ _key, image{ asset-> }, alt },
              apacLogos[]{ _key, image{ asset-> }, alt },
              emeaLogos[]{ _key, image{ asset-> }, alt },
              ukLogos[]{ _key, image{ asset-> }, alt },
              theme,
              textAlignment,
              showDivider
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                blurb,
                stats,
                horizontalLayout
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                badges[]{ _key, image{ asset-> }, alt, link },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                testimonials[]{ 
                  _key, 
                  content, 
                  author, 
                  position, 
                  logo{ asset-> },
                  link{ href, openInNewTab, noFollow }
                }
              }
            },
            _type == 'featuresStackedContent' => {
              _type,
              _key,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              items[]{
                _key,
                eyebrow,
                title,
                text,
                image{ asset-> },
                imageAlt,
                imagePosition,
                imageRatio,
                showStats,
                statsNumber,
                statsText,
                statsIcon,
                showQuote,
                quoteText,
                quoteAuthor,
                quoteAuthorTitle,
                quoteImageType,
                quoteImage{ asset-> },
                quoteImageAlt,
                showCta,
                ctaText,
                ctaLink,
                ctaOpenInNewTab,
                ctaIcon,
                ctaIconPosition,
                ctaKind
              }
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          }
        },
        _type == 'divider' => {
          _type,
          _key,
          showDivider,
          dividerType,
          background,
          darkBackgroundColor
        }
      }
    }`,
    request,
  });
}

export async function getPage(slug: string, request?: Request) {
  return await loadQuery<Page | null>({
    query: groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      sections[]{
        ...,
        _type == 'columnsBlock' => {
          _type,
          _key,
          layout,
          backgroundColor,
          customBackgroundColor,
          backgroundImage{ asset-> },
          backgroundPosition,
          backgroundSize,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          column1[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column2[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
            _type == 'imageVideoModal' => { ..., thumbnail{ ..., asset-> } },
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
              caption,
              loading,
              fetchpriority,
              responsiveBehavior,
              maxWidth,
              customWidth,
              customHeight,
              aspectRatio,
              showButton,
              buttonLink,
              buttonText,
              buttonOpenInNewTab,
              alignment,
              borderRadius,
              shadow,
              objectFit
            },
            _type == 'headingComposition' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType
            },
            _type == 'statsSet' => {
              _type,
              _key,
              stats[]{ _key, tag, statsNumber, statsText },
              theme,
              textType,
              spacingStyle
            },
            _type == 'quoteBlock' => {
              _type,
              _key,
              quoteText,
              quoteAuthor,
              quoteTitle,
              customerStoryLink{
                href,
                openInNewTab,
                noFollow
              },
              linkLabel,
              imageType,
              avatar{ asset->{ _ref, url } },
              avatarAlt,
              logo{ asset->{ _ref, url } },
              logoAlt,
              theme,
              styleVariant
            },
            _type == 'trustedPartner' => {
              _type,
              _key,
              eyebrow,
              title,
              text,
              theme,
              textAlignment,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              userReviews->{
                _id,
                _type,
                badges[]{ _key, image{ asset-> }, alt, link }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset-> },
              backgroundPosition,
              backgroundSize,
              cardPadding,
              borderRadius
            },
            _type == 'hubspotFormReference' => {
              _type,
              _key,
              form->{
                _id,
                _type,
                name,
                portalId,
                formId,
                region
              },
              theme
            }
          }
        },
        _type == 'reference' => @->{
          _type,
          _id,
          title,
          slug,
          excerpt,
          mainImage{
            asset->,
            alt
          }
        }
      }
    }`,
    params: { slug },
    request,
  });
}

export async function getPosts(request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt
    }`,
    request,
  });
}

export async function getPost(slug: string, request?: Request) {
  return await loadQuery<Post>({
    query: groq`*[_type == "post" && slug.current == $slug][0]`,
    params: { slug },
    request,
  });
}

// Column content types
export interface TextBlock {
  _type: "textBlock";
  _key?: string;
  label?: string;
  content?: PortableTextBlock[];
}

export interface RotatingTextBlock {
  _type: "rotatingTextBlock";
  _key?: string;
  label?: string;
  eyebrow?: string;
  title: string;
  rotatingText?: { _key?: string; rotatingTextItem: string }[];
  text?: string;
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: '' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  rotatingTextLength?: number;
}

export interface ImageVideoModal {
  _type: "imageVideoModal";
  _key?: string;
  label?: string;
  thumbnail?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  videoId: string;
  border?: boolean;
  lightBackgroundShadow?: boolean;
}

export interface ImageBlock {
  _type: "image";
  _key?: string;
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

export interface AdvancedImage {
  _type: "advancedImage";
  _key?: string;
  // Image
  image?: {
    asset?: { _ref?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } };
  };
  alt?: string;
  caption?: string;
  // Performance
  loading?: 'lazy' | 'eager';
  fetchpriority?: boolean;
  // Dimensions
  responsiveBehavior?: 'fluid' | 'fixed';
  maxWidth?: number;
  customWidth?: number;
  customHeight?: number;
  aspectRatio?: 'original' | '16/9' | '4/3' | '1/1' | '3/2' | '21/9';
  // Button overlay
  showButton?: boolean;
  buttonLink?: string;
  buttonText?: string;
  buttonOpenInNewTab?: boolean;
  // Style
  alignment?: 'left' | 'center' | 'right';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'blue-light' | 'blue-dark';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
}

export interface HeadingComposition {
  _type: "headingComposition";
  _key?: string;
  // Content
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
  // Styles
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

// HubSpot Form types
export interface HubspotForm {
  _type: "hubspotForm";
  _id?: string;
  name?: string;
  portalId?: string;
  formId?: string;
  region?: string;
  description?: string;
}

export interface HubspotFormReference {
  _type: "hubspotFormReference";
  _key?: string;
  form?: HubspotForm;
  theme?: 'light' | 'dark';
}

export type ColumnContent = TextBlock | RotatingTextBlock | ImageVideoModal | ImageBlock | AdvancedImage | ButtonStack | SingleButton | LogoSet | StatsSet | QuoteBlock | WidgetStatsReference | WidgetUserReviewsReference | TestimonialCarouselReference | FeaturesStackedContent | HeadingComposition | TrustedPartner | HubspotFormReference;

// Button Stack types
export interface ButtonLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface ButtonSettings {
  modalTrigger?: boolean;
  modalTriggerVideo?: boolean;
  formId?: string;
  videoId?: string;
  btnLabel?: string;
  buttonLink?: ButtonLink;
}

export interface ButtonIcon {
  iconFieldSvg?: string;
  iconPosition?: 'left' | 'right';
}

export interface ButtonStyles {
  bgKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'primary-inverted' | 'gx_score' | 'gx_score_inverted' | 'industry_report';
}

export interface Button {
  _key?: string;
  buttonSettings?: ButtonSettings;
  btnIcon?: ButtonIcon;
  buttonStyles?: ButtonStyles;
}

export interface ButtonStackStyles {
  layout?: {
    spacing?: {
      marginTop?: string;
      marginBottom?: string;
      marginLeft?: string;
      marginRight?: string;
    };
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  };
  animation?: {
    type?: 'none' | 'pulse';
  };
}

export interface ButtonStack {
  _type: "buttonStack";
  _key?: string;
  buttonList?: Button[];
  styles?: ButtonStackStyles;
}

// Single Button types (matching HubSpot button.module)
export interface SingleButtonLink {
  href?: string;
  urlType?: 'EXTERNAL' | 'EMAIL_ADDRESS' | 'CONTENT' | 'FILE';
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface SingleButtonSettings {
  buttonText?: string;
  link?: SingleButtonLink;
}

export interface SingleButtonIcon {
  iconFieldSvg?: string;
  iconPosition?: 'left' | 'right';
}

export interface SingleButtonBackground {
  bgKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'gx_score' | 'iris' | 'alternative' | 'bright_blue' | 'transparent';
}

export interface SingleButtonAlignment {
  horizontalAlign?: 'LEFT' | 'CENTER' | 'RIGHT';
  buttonWidth?: 'auto' | 'full';
}

export interface SingleButtonAnimation {
  type?: 'none' | 'pulse' | 'scrollto';
}

export interface SingleButtonStyles {
  background?: SingleButtonBackground;
  alignment?: SingleButtonAlignment;
  animation?: SingleButtonAnimation;
}

export interface SingleButton {
  _type: "button";
  _key?: string;
  settings?: SingleButtonSettings;
  btnIcon?: SingleButtonIcon;
  styles?: SingleButtonStyles;
}

// Divider types
export interface Divider {
  _type: "divider";
  _key?: string;
  showDivider?: boolean;
  dividerType?: 'tall' | 'short';
  background?: 'light' | 'dark';
  darkBackgroundColor?: string;
}

// LogoSet types
export interface LogoItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  alt?: string;
}

export interface LogoSet {
  _type: "logoSet";
  _key?: string;
  customTitle?: string;
  amerLogos?: LogoItem[];
  apacLogos?: LogoItem[];
  emeaLogos?: LogoItem[];
  ukLogos?: LogoItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
}

// StatsSet types
export interface StatItemData {
  _key?: string;
  tag?: string;
  statsNumber?: string;
  statsText?: string;
}

export interface StatsSet {
  _type: "statsSet";
  _key?: string;
  stats?: StatItemData[];
  theme?: 'light' | 'dark';
  textType?: '2xl' | 'xl' | 'base' | 'sm' | 'xs';
  spacingStyle?: 'default' | 'small';
}

// QuoteBlock types
export interface QuoteBlockLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface QuoteBlock {
  _type: "quoteBlock";
  _key?: string;
  quoteText?: string;
  quoteAuthor?: string;
  quoteTitle?: string;
  customerStoryLink?: QuoteBlockLink;
  linkLabel?: string;
  imageType?: 'none' | 'avatar' | 'logo';
  avatar?: {
    asset?: { _ref?: string; url?: string };
  };
  avatarAlt?: string;
  logo?: {
    asset?: { _ref?: string; url?: string };
  };
  logoAlt?: string;
  theme?: 'light' | 'dark' | 'gxscore';
  styleVariant?: 'extrabold' | 'regular';
}

// Widget Stats types
export interface StatItem {
  _key?: string;
  icon?: string;
  value?: string;
  label?: string;
}

export interface WidgetStats {
  _type: "widgetStats";
  _id?: string;
  eyebrow?: string;
  title?: string;
  blurb?: string;
  stats?: StatItem[];
  horizontalLayout?: boolean;
}

export interface WidgetStatsReference {
  _type: "widgetStatsReference";
  _key?: string;
  reference?: WidgetStats;
}

// Widget User Reviews types
export interface BadgeItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  alt?: string;
  link?: string;
}

export interface WidgetUserReviews {
  _type: "widgetUserReviews";
  _id?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  badges?: BadgeItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: string;
  headingType?: string;
  displayType?: string;
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export interface WidgetUserReviewsReference {
  _type: "widgetUserReviewsReference";
  _key?: string;
  reference?: WidgetUserReviews;
}

// Testimonial Carousel types
export interface TestimonialLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface TestimonialItem {
  _key?: string;
  content?: string;
  author?: string;
  position?: string;
  logo?: {
    asset?: { _ref?: string; url?: string };
  };
  link?: TestimonialLink;
}

export interface TestimonialCarousel {
  _type: "testimonialCarousel";
  _id?: string;
  eyebrow?: string;
  testimonials?: TestimonialItem[];
}

export interface TestimonialCarouselReference {
  _type: "testimonialCarouselReference";
  _key?: string;
  reference?: TestimonialCarousel;
}

// Features Stacked Content types
export interface FeatureItem {
  _key?: string;
  // Text content
  eyebrow?: string;
  title?: string;
  text?: string;
  // Image
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  imageRatio?: 'aspect-square' | 'aspect-video';
  // Stats
  showStats?: boolean;
  statsNumber?: string;
  statsText?: string;
  statsIcon?: string;
  // Quote
  showQuote?: boolean;
  quoteText?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  quoteImageType?: 'avatar' | 'logo';
  quoteImage?: {
    asset?: { _ref?: string; url?: string };
  };
  quoteImageAlt?: string;
  // CTA
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
  ctaOpenInNewTab?: boolean;
  ctaIcon?: string;
  ctaIconPosition?: 'left' | 'right';
  ctaKind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'gx_score';
}

export interface FeaturesStackedContent {
  _type: "featuresStackedContent";
  _key?: string;
  items?: FeatureItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: string;
  eyebrowStyle?: 'red' | 'gradient';
  headingType?: string;
  displayType?: string;
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export interface ColumnsBlock {
  _type: "columnsBlock";
  _key?: string;
  layout: '1' | '2' | '3' | '4' | '1/3' | '3/1';
  column1?: ColumnContent[];
  column2?: ColumnContent[];
  column3?: ColumnContent[];
  column4?: ColumnContent[];
  // Background settings
  backgroundColor?: string;
  customBackgroundColor?: string;
  backgroundImage?: {
    asset?: { _ref?: string; url?: string };
  };
  backgroundPosition?: string;
  backgroundSize?: string;
  // Spacing settings
  paddingTop?: string;
  paddingTopMobile?: string;
  paddingBottom?: string;
  paddingBottomMobile?: string;
}

// Trusted Partner types
export interface TrustedPartner {
  _type: "trustedPartner";
  _key?: string;
  // Content (HeadingComposition fields)
  eyebrow?: string;
  title?: string;
  text?: string;
  // Styles (same as HeadingComposition)
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
  // Widget User Reviews reference
  userReviews?: WidgetUserReviews;
  // Background settings
  backgroundColor?: string;
  customBackgroundColor?: string;
  backgroundImage?: {
    asset?: { _ref?: string; url?: string };
  };
  backgroundPosition?: string;
  backgroundSize?: string;
  // Card spacing
  cardPadding?: string;
  borderRadius?: string;
}

export interface Homepage {
  _type: "homepage";
  _id: string;
  _updatedAt?: string;
  title?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface GetStartedPage {
  _type: "getStartedPage";
  _id: string;
  _updatedAt?: string;
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface Page {
  _type: "page";
  _id: string;
  title?: string;
  slug: Slug;
  sections?: (ColumnsBlock | Divider | Post)[];
}

export interface Post {
  _type: "post";
  _id: string;
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  featuredImage?: { url?: string; alt?: string };
  publishedAt?: string;
  body?: PortableTextBlock[];
}

// Footer Global Types
export interface FooterLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface QuickLink extends FooterLink {
  icon?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'linkedin' | 'youtube' | 'facebook' | 'twitter' | 'instagram';
  url: string;
  icon?: string;
}

export interface FooterGlobal {
  _type: "footerGlobal";
  _id: string;
  // Newsletter section
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterButtonText?: string;
  newsletterPlaceholder?: string;
  // Quick links
  quickLinks?: QuickLink[];
  // Navigation columns
  columns?: FooterColumn[];
  // Bottom bar
  copyrightText?: string;
  legalLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  socialText?: string;
  // Floating button
  showFloatingButton?: boolean;
  floatingButtonUrl?: string;
  floatingButtonPrimaryText?: string;
  floatingButtonSecondaryText?: string;
}

/**
 * Fetch footer global settings
 * Returns the footer configuration from Sanity
 */
export async function getFooter(request?: Request) {
  return await loadQuery<FooterGlobal | null>({
    query: groq`*[_type == "footerGlobal"][0]{
      _id,
      _type,
      newsletterTitle,
      newsletterDescription,
      newsletterButtonText,
      newsletterPlaceholder,
      quickLinks[]{
        label,
        url,
        icon,
        isExternal
      },
      columns[]{
        title,
        links[]{
          label,
          url,
          isExternal
        }
      },
      copyrightText,
      legalLinks[]{
        label,
        url,
        isExternal
      },
      socialLinks[]{
        platform,
        url,
        icon
      },
      socialText,
      showFloatingButton,
      floatingButtonUrl,
      floatingButtonPrimaryText,
      floatingButtonSecondaryText
    }`,
    request,
  });
}
