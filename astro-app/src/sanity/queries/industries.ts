import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { IndustriesLandingPage, Industry } from "../types";

export async function getIndustriesLandingPage(request?: Request) {
  return await loadQuery<IndustriesLandingPage | null>({
    query: groq`*[_type == "industriesLandingPage" && !(_id in path("drafts.**"))][0]{
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
              }
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
                  position,
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
                  contentReference->{
                    _id,
                    _type,
                    title,
                    slug{ current }
                  },
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
              pageTitle,
              centerPageTitle,
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
              headerImage{ asset->{ _ref, url }, alt },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile{ asset->{ _ref, url } }, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations,
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow }
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
              }
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
                  position,
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
                  contentReference->{
                    _id,
                    _type,
                    title,
                    slug{ current }
                  },
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
              pageTitle,
              centerPageTitle,
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
              headerImage{ asset->{ _ref, url }, alt },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile{ asset->{ _ref, url } }, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations,
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow }
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
              }
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
                  position,
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
                  contentReference->{
                    _id,
                    _type,
                    title,
                    slug{ current }
                  },
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
              pageTitle,
              centerPageTitle,
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
              headerImage{ asset->{ _ref, url }, alt },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile{ asset->{ _ref, url } }, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations,
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow }
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
              }
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
                  position,
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
                  contentReference->{
                    _id,
                    _type,
                    title,
                    slug{ current }
                  },
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
              pageTitle,
              centerPageTitle,
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
              headerImage{ asset->{ _ref, url }, alt },
              headerImageAlt,
              industries[]{ 
                _key, 
                icon, 
                animationFile{ asset->{ _ref, url } }, 
                title, 
                link{ href, openInNewTab, noFollow } 
              },
              theme,
              useAnimations,
              ctaLabel,
              ctaLink{ href, openInNewTab, noFollow }
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
      },
      announcementBar
    }`,
    request,
    queryType: 'page',
  });
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
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
                animationFile{ asset->{ url } },
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
                animationFile{ asset->{ url } },
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
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
                animationFile{ asset->{ url } },
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
                animationFile{ asset->{ url } },
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
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
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile{ asset->{ url } },
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
              addBorderLine,
              experimentActive,
              variants[]{
                _key,
                variantLabel,
                targetRegions,
                eyebrow,
                title,
                text
              }
            },
            _type == 'resultsList' => {
              _type,
              _key,
              items[]{
                _key,
                icon,
                animationFile{ asset->{ url } },
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
      },
      announcementBar
    }`,
    params: { slug },
    request,
    queryType: 'page',
  });
}

