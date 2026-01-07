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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
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
      headerTheme,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
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

export async function getFeature(slug: string, request?: Request) {
  return await loadQuery<Feature | null>({
    query: groq`*[_type == "feature" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1PaddingBottomMobile,
          column2PaddingBottomMobile,
          column3PaddingBottomMobile,
          column4PaddingBottomMobile,
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
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
                image{ asset->{ _id, url } },
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
                quoteImage{ asset->{ _id, url } },
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
              textType,
              addBorderLine
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading {
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
              headerImage{ asset-> },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading {
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
              items[]{ _key, title, content },
              theme,
              expandFirst
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
                image{ asset->{ _id, url } },
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
                quoteImage{ asset->{ _id, url } },
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
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
        }
      }
    }`,
    params: { slug },
    request,
  });
}

export async function getPosts(request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      updatedAt,
      metaDescription,
      tags,
      hubspotId,
      "topics": topics[]->{ _id, name, slug, hubspotId },
      "author": author->{ _id, name, slug, bio, avatar, hubspotId }
    }`,
    request,
  });
}

export async function getPost(slug: string, request?: Request) {
  return await loadQuery<Post>({
    query: groq`*[_type == "post" && slug.current == $slug][0]{
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      updatedAt,
      body,
      metaDescription,
      tags,
      hubspotId,
      hubspotUrl,
      "topics": topics[]->{ _id, name, slug, hubspotId },
      "author": author->{ _id, name, slug, bio, avatar, email, website, twitter, linkedin, facebook, hubspotId }
    }`,
    params: { slug },
    request,
  });
}

// Get related posts by topics
export async function getRelatedPosts(topicIds: string[], currentPostId: string, limit: number = 3, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post" 
      && defined(slug.current) 
      && _id != $currentPostId
      && count((topics[]->_id)[@ in $topicIds]) > 0
    ] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { topicIds, currentPostId, limit },
    request,
  });
}

// Get all blog topics
export async function getBlogTopics(request?: Request) {
  return await loadQuery<BlogTopic[]>({
    query: groq`*[_type == "blogTopic"] | order(name asc) {
      _id,
      _type,
      name,
      slug,
      description,
      hubspotId,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`,
    request,
  });
}

// Get posts by topic slug
export async function getPostsByTopic(topicSlug: string, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post" 
      && defined(slug.current)
      && $topicSlug in topics[]->slug.current
    ] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { topicSlug },
    request,
  });
}

// Get a single topic by slug
export async function getTopic(slug: string, request?: Request) {
  return await loadQuery<{ _id: string; name: string; slug: { current: string }; description?: string }>({
    query: groq`*[_type == "blogTopic" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      description
    }`,
    params: { slug },
    request,
  });
}

// Get a single author by slug
export async function getAuthor(slug: string, request?: Request) {
  return await loadQuery<{
    _id: string;
    name: string;
    slug: { current: string };
    bio?: string;
    avatar?: { url: string; alt?: string };
    website?: string;
    twitter?: string;
    linkedin?: string;
  }>({
    query: groq`*[_type == "blogAuthor" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      bio,
      avatar,
      website,
      twitter,
      linkedin
    }`,
    params: { slug },
    request,
  });
}

// Get posts by author ID
export async function getPostsByAuthor(authorId: string, request?: Request) {
  return await loadQuery<Post[]>({
    query: groq`*[
      _type == "post" 
      && defined(slug.current)
      && author._ref == $authorId
    ] | order(coalesce(publishedAt, _createdAt) desc) {
      _type,
      _id,
      _createdAt,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      "topics": topics[]->{ _id, name, slug }
    }`,
    params: { authorId },
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
  addBorderLine?: boolean;
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

// IndustrySelector types
export interface IndustryLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface IndustryItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: IndustryLink;
}

export interface IndustrySelector {
  _type: "industrySelector";
  _key?: string;
  // Heading - uses HeadingComposition type
  heading?: HeadingComposition;
  // Industries
  industries?: IndustryItem[];
  // CTA
  ctaLabel?: string;
  ctaLink?: IndustryLink;
}

// FAQsSelector types
export interface FaqItem {
  _key?: string;
  title?: string;
  content?: string;
}

// Embedded heading data for FAQs (same structure as HeadingComposition but without _type)
export interface FaqsHeadingData {
  eyebrow?: string;
  title?: string;
  text?: PortableTextBlock[];
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise' | 'industry_report' | 'industry_report_onlight';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  eyebrowStyle?: 'none' | 'red' | 'bright_blue' | 'blue' | 'iris' | 'iris_light' | 'gradient';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export interface FAQs {
  _type: "faqs";
  _key?: string;
  // Embedded HeadingComposition for header
  heading?: FaqsHeadingData;
  // FAQ items
  items?: FaqItem[];
  // FAQ-specific styles (separate from heading styles)
  theme?: 'light' | 'dark';
  expandFirst?: boolean;
}

// Results List types
export interface ResultItem {
  _key?: string;
  icon?: string;
  animationFile?: string;
  title?: string;
  content?: string;
  linkLabel?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
}

export interface ResultsList {
  _type: "resultsList";
  _key?: string;
  // Items
  items?: ResultItem[];
  // Optional side image
  image?: {
    asset?: { _ref?: string; url?: string };
  };
  imageAlt?: string;
  // Style options
  theme?: 'light' | 'dark' | 'gxscore';
  // Settings
  useAnimations?: boolean;
}

// Comparison Table types
export interface ComparisonItem {
  _key?: string;
  text?: string;
}

export interface ComparisonColumn {
  _key?: string;
  isCompetitor?: boolean;
  title?: string;
  items?: ComparisonItem[];
}

export interface ComparisonTable {
  _type: "comparisonTable";
  _key?: string;
  columns?: ComparisonColumn[];
}

// Features Pricing Card types
export interface FeaturesPricingFeatureItem {
  _key?: string;
  text?: string;
  tooltip?: string;
}

export interface FeaturesPricingButtonLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface FeaturesPricingCardItem {
  _key?: string;
  title?: string;
  subtitle?: string;
  showDivider?: boolean;
  featuresHeading?: string;
  features?: FeaturesPricingFeatureItem[];
  buttonLabel?: string;
  buttonLink?: FeaturesPricingButtonLink;
}

export interface FeaturesPricingCard {
  _type: "featuresPricingCard";
  _key?: string;
  cards?: FeaturesPricingCardItem[];
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  buttonStyle?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
}

// Features Horizontal Slider types
export interface FeaturesHorizontalSliderSlide {
  _key?: string;
  title?: string;
  content?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  linkLabel?: string;
  link?: {
    href?: string;
    openInNewTab?: boolean;
    noFollow?: boolean;
  };
}

export interface FeaturesHorizontalSlider {
  _type: "featuresHorizontalSlider";
  _key?: string;
  slides?: FeaturesHorizontalSliderSlide[];
  theme?: 'light' | 'dark' | 'gxscore';
  autoplayDelay?: number;
}

// Card Segmentation types
export interface CardSegmentationLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface CardSegmentationItem {
  _key?: string;
  image?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  title?: string;
  content?: string;
  linkLabel?: string;
  link?: CardSegmentationLink;
}

export interface CardSegmentation {
  _type: "cardSegmentation";
  _key?: string;
  cards?: CardSegmentationItem[];
  theme?: 'light' | 'dark' | 'gxscore' | 'smb' | 'enterprise';
}

// Industry Selector Global types
export interface IndustrySelectorGlobalLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface IndustrySelectorGlobalItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: IndustrySelectorGlobalLink;
}

export interface IndustrySelectorGlobal {
  _type: "industrySelectorGlobal";
  _key?: string;
  heading?: HeadingComposition;
  industries?: IndustrySelectorGlobalItem[];
  ctaLabel?: string;
  ctaLink?: IndustrySelectorGlobalLink;
  theme?: 'light' | 'dark';
}

// Industry Selector Global Reference types (references the global document)
export interface IndustrySelectorGlobalDoc {
  _id: string;
  _type: "industrySelectorGlobalDoc";
  heading?: HeadingComposition;
  industries?: IndustrySelectorGlobalItem[];
  ctaLabel?: string;
  ctaLink?: IndustrySelectorGlobalLink;
  theme?: 'light' | 'dark';
}

export interface IndustrySelectorGlobalReference {
  _type: "industrySelectorGlobalReference";
  _key?: string;
  reference?: IndustrySelectorGlobalDoc;
}

// Stats Set Stacked Global types
export interface StatsSetStackedGlobalItem {
  _key?: string;
  statsNumber?: string;
  statsText?: string;
}

export interface StatsSetStackedGlobalDoc {
  _id: string;
  _type: "statsSetStackedGlobalDoc";
  stats?: StatsSetStackedGlobalItem[];
  theme?: 'light' | 'dark';
  numberColor?: string;
  dividerColor?: 'navy-80' | 'white' | 'navy-40';
}

export interface StatsSetStackedGlobalReference {
  _type: "statsSetStackedGlobalReference";
  _key?: string;
  statsSetStackedGlobal?: StatsSetStackedGlobalDoc;
}

// Widget User Review Card types
export interface WidgetUserReviewCardBadge {
  _key?: string;
  image?: {
    asset?: { _ref?: string; _id?: string; url?: string };
  };
  alt?: string;
  link?: string;
}

export interface WidgetUserReviewCard {
  _type: "widgetUserReviewCard";
  _key?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  badges?: WidgetUserReviewCardBadge[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
  eyebrowType?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  displayType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's8';
  textType?: 'xs' | 'sm' | 'base' | 'lg' | '2xl';
}

export type ColumnContent = TextBlock | RotatingTextBlock | ImageVideoModal | ImageBlock | AdvancedImage | ButtonStack | SingleButton | LogoSet | LogoSetReference | StatsSet | QuoteBlock | WidgetStatsReference | WidgetUserReviewsReference | TestimonialCarouselReference | FeaturesStackedContent | HeadingComposition | TrustedPartner | HubspotFormReference | IndustrySelector | FeaturesSelectorGlobalReference | FAQs | ResultsList | ComparisonTable | FeaturesPricingCard | FeaturesHorizontalSlider | CardSegmentation | IndustrySelectorGlobal | IndustrySelectorGlobalReference | WidgetUserReviewCard | StatsSetStackedGlobalReference;

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

// LogoSetGlobal - Global document for Logo Set
export interface LogoSetGlobal {
  _type: "logoSetGlobal";
  _id?: string;
  customTitle?: string;
  amerLogos?: LogoItem[];
  apacLogos?: LogoItem[];
  emeaLogos?: LogoItem[];
  ukLogos?: LogoItem[];
  theme?: 'light' | 'dark' | 'gxscore';
  textAlignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
}

// LogoSetReference - Reference to global LogoSet document
export interface LogoSetReference {
  _type: "logoSetReference";
  _key?: string;
  reference?: LogoSetGlobal;
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

// Features Selector Global types
export interface FeatureSelectorLink {
  href?: string;
  openInNewTab?: boolean;
  noFollow?: boolean;
}

export interface FeatureSelectorItem {
  _key?: string;
  icon?: string;
  title?: string;
  link?: FeatureSelectorLink;
}

export interface FeaturesSelectorGlobal {
  _type: "featuresSelectorGlobal";
  _id?: string;
  heading?: HeadingComposition;
  features?: FeatureSelectorItem[];
  ctaLabel?: string;
  ctaLink?: FeatureSelectorLink;
}

export interface FeaturesSelectorGlobalReference {
  _type: "featuresSelectorGlobalReference";
  _key?: string;
  reference?: FeaturesSelectorGlobal;
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
  // Background gradient
  backgroundGradient?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
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
  headerTheme?: "default" | "dark" | "light" | "industry_report";
  sections?: (ColumnsBlock | Divider | Post)[];
}

export interface Feature {
  _type: "feature";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface Industry {
  _type: "industry";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export async function getIndustry(slug: string, request?: Request) {
  return await loadQuery<Industry | null>({
    query: groq`*[_type == "industry" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1PaddingBottomMobile,
          column2PaddingBottomMobile,
          column3PaddingBottomMobile,
          column4PaddingBottomMobile,
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
              textType,
              addBorderLine
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
                eyebrow,
                title,
                blurb,
                horizontalLayout,
                stats[]{ _key, statsNumber, statsText }
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                eyebrow,
                title,
                text,
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType,
                badges[]{
                  _key,
                  image{ asset->{ _ref, url } },
                  alt
                }
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                eyebrow,
                testimonials[]{
                  _key,
                  quoteText,
                  quoteAuthor,
                  quoteTitle,
                  avatar{ asset->{ _ref, url } }
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
                image{ asset->{ _id, url } },
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
                quoteImage{ asset->{ _id, url } },
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                customTitle,
                amerLogos[]{ alt, image{ asset->{ _ref, url } } },
                apacLogos[]{ alt, image{ asset->{ _ref, url } } },
                emeaLogos[]{ alt, image{ asset->{ _ref, url } } },
                ukLogos[]{ alt, image{ asset->{ _ref, url } } },
                theme,
                textAlignment,
                showDivider
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
              userReviews{
                badges[]{
                  _key,
                  image{ asset->{ _ref, url } },
                  alt
                }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset->{ _ref, url } },
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
                name,
                portalId,
                formId,
                region
              },
              theme
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading{
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
              headerImage{ asset->{ _ref, url } },
              headerImageAlt,
              industries[]{
                _key,
                icon,
                animationFile,
                title,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading{
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
              items[]{
                _key,
                title,
                content
              },
              theme,
              expandFirst
            },
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile,
                title,
                content,
                linkLabel,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              image{ asset->{ _ref, url } },
              imageAlt,
              theme,
              useAnimations
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
              textType,
              addBorderLine
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
                eyebrow,
                title,
                blurb,
                horizontalLayout,
                stats[]{ _key, statsNumber, statsText }
              }
            },
            _type == 'widgetUserReviewsReference' => {
              _type,
              _key,
              reference->{
                _id,
                eyebrow,
                title,
                text,
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType,
                badges[]{
                  _key,
                  image{ asset->{ _ref, url } },
                  alt
                }
              }
            },
            _type == 'testimonialCarouselReference' => {
              _type,
              _key,
              reference->{
                _id,
                eyebrow,
                testimonials[]{
                  _key,
                  quoteText,
                  quoteAuthor,
                  quoteTitle,
                  avatar{ asset->{ _ref, url } }
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
                image{ asset->{ _id, url } },
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
                quoteImage{ asset->{ _id, url } },
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
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                customTitle,
                amerLogos[]{ alt, image{ asset->{ _ref, url } } },
                apacLogos[]{ alt, image{ asset->{ _ref, url } } },
                emeaLogos[]{ alt, image{ asset->{ _ref, url } } },
                ukLogos[]{ alt, image{ asset->{ _ref, url } } },
                theme,
                textAlignment,
                showDivider
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
              userReviews{
                badges[]{
                  _key,
                  image{ asset->{ _ref, url } },
                  alt
                }
              },
              backgroundColor,
              customBackgroundColor,
              backgroundImage{ asset->{ _ref, url } },
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
                name,
                portalId,
                formId,
                region
              },
              theme
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading{
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
              headerImage{ asset->{ _ref, url } },
              headerImageAlt,
              industries[]{
                _key,
                icon,
                animationFile,
                title,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              theme,
              useAnimations
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                features[]{ 
                  _key, 
                  icon, 
                  title, 
                  link{ href, openInNewTab, noFollow } 
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow }
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading{
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
              items[]{
                _key,
                title,
                content
              },
              theme,
              expandFirst
            },
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile,
                title,
                content,
                linkLabel,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              image{ asset->{ _ref, url } },
              imageAlt,
              theme,
              useAnimations
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
              textType,
              addBorderLine
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
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile,
                title,
                content,
                linkLabel,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              image{ asset->{ _ref, url } },
              imageAlt,
              theme,
              useAnimations
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
              textType,
              addBorderLine
            },
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile,
                title,
                content,
                linkLabel,
                link{
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              image{ asset->{ _ref, url } },
              imageAlt,
              theme,
              useAnimations
            }
          }
        },
        _type == 'divider' => {
          _type,
          _key,
          size,
          sizeMobile
        }
      }
    }`,
    params: { slug },
    request,
  });
}

export interface Partner {
  _type: "partner";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface PartnersLandingPage {
  _type: "partnersLandingPage";
  _id: string;
  title?: string;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface Competitor {
  _type: "competitor";
  _id: string;
  title?: string;
  slug: Slug;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export interface CompetitorsLandingPage {
  _type: "competitorsLandingPage";
  _id: string;
  title?: string;
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

// Blog Topic interface
export interface BlogTopic {
  _type: "blogTopic";
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  hubspotId?: string;
}

// Blog Author interface
export interface BlogAuthor {
  _type: "blogAuthor";
  _id: string;
  name: string;
  slug: Slug;
  email?: string;
  bio?: string;
  avatar?: { url?: string; alt?: string };
  website?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  hubspotId?: string;
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
  updatedAt?: string;
  body?: PortableTextBlock[];
  // New fields for HubSpot compatibility
  topics?: BlogTopic[];
  author?: BlogAuthor;
  tags?: string[];
  metaDescription?: string;
  hubspotId?: string;
  hubspotUrl?: string;
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
 * Fetch a single partner by slug
 */
export async function getPartner(slug: string, request?: Request) {
  return await loadQuery<Partner | null>({
    query: groq`*[_type == "partner" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
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
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          }
        }
      }
    }`,
    params: { slug },
    request,
  });
}

/**
 * Fetch partners landing page
 */
export async function getPartnersLandingPage(request?: Request) {
  return await loadQuery<PartnersLandingPage | null>({
    query: groq`*[_type == "partnersLandingPage"][0]{
      _id,
      title,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column2[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          }
        }
      }
    }`,
    request,
  });
}

/**
 * Fetch a single competitor by slug
 */
export async function getCompetitor(slug: string, request?: Request) {
  return await loadQuery<Competitor | null>({
    query: groq`*[_type == "competitor" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
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
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          }
        }
      }
    }`,
    params: { slug },
    request,
  });
}

/**
 * Fetch competitors landing page
 */
export async function getCompetitorsLandingPage(request?: Request) {
  return await loadQuery<CompetitorsLandingPage | null>({
    query: groq`*[_type == "competitorsLandingPage"][0]{
      _id,
      title,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column2[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
            }
          }
        }
      }
    }`,
    request,
  });
}

// Header types
export interface HeaderNavItem {
  _key?: string;
  label: string;
  href?: string;
  hasMegaMenu?: boolean;
}

export interface HeaderMegaMenuItem {
  _key?: string;
  title: string;
  description?: string;
  icon?: string;
  link?: {
    href: string;
    openInNewTab?: boolean;
  };
  topFeatures?: Array<{
    title: string;
    link?: string;
  }>;
}

export interface HeaderMegaFeaturedItem {
  _key?: string;
  title: string;
  label?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  link?: {
    href: string;
    openInNewTab?: boolean;
  };
}

export interface HeaderSubIntro {
  _key?: string;
  title: string;
}

export interface HeaderMegaMenu {
  _key?: string;
  parentLabel: string;
  menuType?: 'why_roller' | 'features' | 'industries' | 'solutions';
  useAlternateLayout?: boolean;
  subIntros?: HeaderSubIntro[];
  introTitle?: string;
  introDescription?: string;
  items?: HeaderMegaMenuItem[];
  featuredLabel?: string;
  featuredItems?: HeaderMegaFeaturedItem[];
  ctaLabel?: string;
  ctaLink?: string;
}

export interface HeaderButton {
  _key?: string;
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
  openInNewTab?: boolean;
}

export interface HeaderGlobal {
  _type: "headerGlobal";
  _id: string;
  logo?: {
    asset?: {
      url: string;
    };
  };
  logoDark?: {
    asset?: {
      url: string;
    };
  };
  logoAlt?: string;
  logoLink?: string;
  navItems?: HeaderNavItem[];
  megaMenus?: HeaderMegaMenu[];
  buttons?: HeaderButton[];
}

/**
 * Fetch header global settings
 * Returns the header configuration from Sanity
 */
export async function getHeader(request?: Request) {
  return await loadQuery<HeaderGlobal | null>({
    query: groq`*[_type == "headerGlobal"][0]{
      _id,
      _type,
      logo{ asset->{ url } },
      logoDark{ asset->{ url } },
      logoAlt,
      logoLink,
      navItems[]{
        _key,
        label,
        href,
        hasMegaMenu
      },
      megaMenus[]{
        _key,
        parentLabel,
        menuType,
        useAlternateLayout,
        subIntros[]{ _key, title },
        introTitle,
        introDescription,
        items[]{
          _key,
          title,
          description,
          icon,
          link{
            href,
            openInNewTab
          },
          topFeatures[]{
            title,
            link
          }
        },
        featuredLabel,
        featuredItems[]{
          _key,
          title,
          label,
          image{ asset->{ url } },
          link{
            href,
            openInNewTab
          }
        },
        ctaLabel,
        ctaLink
      },
      buttons[]{
        _key,
        label,
        href,
        variant,
        openInNewTab
      }
    }`,
    request,
  });
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

/**
 * Fetch Features Selector Global
 * Returns the global features selector configuration from Sanity
 */
export async function getFeaturesSelectorGlobal(request?: Request) {
  return await loadQuery<FeaturesSelectorGlobal | null>({
    query: groq`*[_type == "featuresSelectorGlobal"][0]{
      _id,
      _type,
      eyebrow,
      title,
      text,
      features[]{
        _key,
        icon,
        title,
        link{
          href,
          openInNewTab,
          noFollow
        }
      },
      ctaLabel,
      ctaLink{
        href,
        openInNewTab,
        noFollow
      },
      theme,
      textAlignment,
      eyebrowType,
      headingType,
      displayType,
      textType
    }`,
    request,
  });
}

// Landing Page type for root-level landing pages
export interface LandingPage {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getLandingPage(slug: string, request?: Request) {
  return await loadQuery<LandingPage | null>({
    query: groq`*[_type == "landingPage" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1PaddingBottomMobile,
          column2PaddingBottomMobile,
          column3PaddingBottomMobile,
          column4PaddingBottomMobile,
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
              textType,
              addBorderLine
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
              image{ asset->{ _ref, url } },
              theme,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              textAlignment
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                title,
                stats[]{ _key, value, label, prefix, suffix },
                theme
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
                badges[]{ _key, image{ asset->{ _ref, url } }, alt, link },
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
                title,
                testimonials[]{
                  _key,
                  text,
                  author,
                  role,
                  venue,
                  avatar{ asset->{ _ref, url } },
                  logo{ asset->{ _ref, url } }
                },
                theme
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading,
              industries[]{
                _key,
                name,
                icon,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                features[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading,
              description,
              items[]{ _key, question, answer },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'resultsList' => {
              _type,
              _key,
              heading,
              results[]{
                _key,
                title,
                description,
                image{ asset->{ _ref, url } }
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'comparisonTable' => {
              _type,
              _key,
              heading,
              rollerColumnHeading,
              competitorColumnHeading,
              rows[]{
                _key,
                feature,
                rollerSupport,
                competitorSupport
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'featuresPricingCard' => {
              _type,
              _key,
              cards[]{
                _key,
                title,
                subtitle,
                showDivider,
                featuresHeading,
                features[]{
                  _key,
                  text,
                  tooltip
                },
                buttonLabel,
                buttonLink
              },
              alignment,
              buttonStyle
            },
            _type == 'featuresHorizontalSlider' => {
              _type,
              _key,
              slides[]{
                _key,
                title,
                content,
                image{ asset->{ _ref, url }, alt },
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme,
              autoplayDelay
            },
            _type == 'cardSegmentation' => {
              _type,
              _key,
              cards[]{
                _key,
                image{ asset->{ _ref, url }, alt },
                title,
                content,
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'industrySelectorGlobal' => {
              _type,
              _key,
              heading {
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
                addBorderLine
              },
              industries[]{
                _key,
                icon,
                title,
                link{ href, openInNewTab, noFollow }
              },
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow },
              theme
            },
            _type == 'industrySelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                  addBorderLine
                },
                industries[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme
              }
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
              textType,
              addBorderLine
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
              image{ asset->{ _ref, url } },
              theme,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              textAlignment
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                title,
                stats[]{ _key, value, label, prefix, suffix },
                theme
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
                badges[]{ _key, image{ asset->{ _ref, url } }, alt, link },
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
                title,
                testimonials[]{
                  _key,
                  text,
                  author,
                  role,
                  venue,
                  avatar{ asset->{ _ref, url } },
                  logo{ asset->{ _ref, url } }
                },
                theme
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading,
              industries[]{
                _key,
                name,
                icon,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                features[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading,
              description,
              items[]{ _key, question, answer },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'resultsList' => {
              _type,
              _key,
              heading,
              results[]{
                _key,
                title,
                description,
                image{ asset->{ _ref, url } }
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'comparisonTable' => {
              _type,
              _key,
              heading,
              rollerColumnHeading,
              competitorColumnHeading,
              rows[]{
                _key,
                feature,
                rollerSupport,
                competitorSupport
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'featuresPricingCard' => {
              _type,
              _key,
              cards[]{
                _key,
                title,
                subtitle,
                showDivider,
                featuresHeading,
                features[]{
                  _key,
                  text,
                  tooltip
                },
                buttonLabel,
                buttonLink
              },
              alignment,
              buttonStyle
            },
            _type == 'featuresHorizontalSlider' => {
              _type,
              _key,
              slides[]{
                _key,
                title,
                content,
                image{ asset->{ _ref, url }, alt },
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme,
              autoplayDelay
            },
            _type == 'cardSegmentation' => {
              _type,
              _key,
              cards[]{
                _key,
                image{ asset->{ _ref, url }, alt },
                title,
                content,
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'industrySelectorGlobal' => {
              _type,
              _key,
              heading {
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
                addBorderLine
              },
              industries[]{
                _key,
                icon,
                title,
                link{ href, openInNewTab, noFollow }
              },
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow },
              theme
            },
            _type == 'industrySelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                  addBorderLine
                },
                industries[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme
              }
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            }
          },
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            }
          }
        },
        _type == 'divider' => {
          _type,
          _key,
          style,
          marginTop,
          marginBottom
        }
      }
    }`,
    params: { slug },
    request,
  });
}

// Solution type for solution pages
export interface Solution {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  sections?: (ColumnsBlock | Divider)[];
}

export async function getSolution(slug: string, request?: Request) {
  return await loadQuery<Solution | null>({
    query: groq`*[_type == "solution" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
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
          backgroundGradient,
          gradientColorStart,
          gradientColorEnd,
          paddingTop,
          paddingTopMobile,
          paddingBottom,
          paddingBottomMobile,
          paddingLeft,
          paddingLeftMobile,
          paddingRight,
          paddingRightMobile,
          column1PaddingBottomMobile,
          column2PaddingBottomMobile,
          column3PaddingBottomMobile,
          column4PaddingBottomMobile,
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
              textType,
              addBorderLine
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
              image{ asset->{ _ref, url } },
              theme,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              textAlignment
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                title,
                stats[]{ _key, value, label, prefix, suffix },
                theme
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
                badges[]{ _key, image{ asset->{ _ref, url } }, alt, link },
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
                title,
                testimonials[]{
                  _key,
                  text,
                  author,
                  role,
                  venue,
                  avatar{ asset->{ _ref, url } },
                  logo{ asset->{ _ref, url } }
                },
                theme
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading,
              industries[]{
                _key,
                name,
                icon,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                features[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'industrySelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                  addBorderLine
                },
                industries[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading,
              description,
              items[]{ _key, question, answer },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'resultsList' => {
              _type,
              _key,
              heading,
              results[]{
                _key,
                title,
                description,
                image{ asset->{ _ref, url } }
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'comparisonTable' => {
              _type,
              _key,
              heading,
              rollerColumnHeading,
              competitorColumnHeading,
              rows[]{
                _key,
                feature,
                rollerSupport,
                competitorSupport
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'featuresPricingCard' => {
              _type,
              _key,
              cards[]{
                _key,
                title,
                subtitle,
                showDivider,
                featuresHeading,
                features[]{
                  _key,
                  text,
                  tooltip
                },
                buttonLabel,
                buttonLink
              },
              alignment,
              buttonStyle
            },
            _type == 'featuresHorizontalSlider' => {
              _type,
              _key,
              slides[]{
                _key,
                title,
                content,
                image{ asset->{ _ref, url }, alt },
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme,
              autoplayDelay
            },
            _type == 'cardSegmentation' => {
              _type,
              _key,
              cards[]{
                _key,
                image{ asset->{ _ref, url }, alt },
                title,
                content,
                linkLabel,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
            },
            _type == 'statsSetStackedGlobalReference' => {
              _type,
              _key,
              statsSetStackedGlobal->{
                _id,
                _type,
                stats[]{ _key, statsNumber, statsText },
                theme,
                numberColor,
                dividerColor
              }
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
              textType,
              addBorderLine
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
              image{ asset->{ _ref, url } },
              theme,
              eyebrowType,
              eyebrowStyle,
              headingType,
              displayType,
              textType,
              textAlignment
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            },
            _type == 'logoSetReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                customTitle,
                amerLogos[]{ _key, image{ asset-> }, alt },
                apacLogos[]{ _key, image{ asset-> }, alt },
                emeaLogos[]{ _key, image{ asset-> }, alt },
                ukLogos[]{ _key, image{ asset-> }, alt },
                theme,
                textAlignment,
                showDivider
              }
            },
            _type == 'widgetStatsReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                title,
                stats[]{ _key, value, label, prefix, suffix },
                theme
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
                badges[]{ _key, image{ asset->{ _ref, url } }, alt, link },
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
                title,
                testimonials[]{
                  _key,
                  text,
                  author,
                  role,
                  venue,
                  avatar{ asset->{ _ref, url } },
                  logo{ asset->{ _ref, url } }
                },
                theme
              }
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
            },
            _type == 'industrySelector' => {
              _type,
              _key,
              heading,
              industries[]{
                _key,
                name,
                icon,
                link{ href, openInNewTab, noFollow }
              },
              theme
            },
            _type == 'featuresSelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                eyebrow,
                title,
                text,
                features[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme,
                textAlignment,
                eyebrowType,
                headingType,
                displayType,
                textType
              }
            },
            _type == 'industrySelectorGlobalReference' => {
              _type,
              _key,
              reference->{
                _id,
                _type,
                heading {
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
                  addBorderLine
                },
                industries[]{
                  _key,
                  icon,
                  title,
                  link{ href, openInNewTab, noFollow }
                },
                ctaLabel,
                ctaLink{ href, openInNewTab, noFollow },
                theme
              }
            },
            _type == 'faqs' => {
              _type,
              _key,
              heading,
              description,
              items[]{ _key, question, answer },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'resultsList' => {
              _type,
              _key,
              heading,
              results[]{
                _key,
                title,
                description,
                image{ asset->{ _ref, url } }
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'comparisonTable' => {
              _type,
              _key,
              heading,
              rollerColumnHeading,
              competitorColumnHeading,
              rows[]{
                _key,
                feature,
                rollerSupport,
                competitorSupport
              },
              theme,
              backgroundColor,
              darkBackgroundColor
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
            },
            _type == 'statsSetStackedGlobalReference' => {
              _type,
              _key,
              statsSetStackedGlobal->{
                _id,
                _type,
                stats[]{ _key, statsNumber, statsText },
                theme,
                numberColor,
                dividerColor
              }
            }
          },
          column3[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            },
            _type == 'widgetUserReviewCard' => {
              _type,
              _key,
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
          column4[]{
            ...,
            _type == 'image' => { ..., asset-> },
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
              textType,
              addBorderLine
            },
            _type == 'buttonStack' => {
              _type,
              _key,
              buttons[]{
                _key,
                text,
                link,
                variant,
                buttonSize,
                hasIcon,
                icon,
                mobileFullWidth
              },
              alignment,
              stackDirection,
              gap
            }
          }
        },
        _type == 'divider' => {
          _type,
          _key,
          style,
          marginTop,
          marginBottom
        }
      }
    }`,
    params: { slug },
    request,
  });
}
