import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { FeaturesLandingPage, Feature } from "../types";

export async function getFeaturesLandingPage(request?: Request) {
  return await loadQuery<FeaturesLandingPage | null>({
    query: groq`*[_type == "featuresLandingPage"][0]{
      _id,
      _updatedAt,
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
            _type == 'featuresDetail' => {
              _type,
              _key,
              content {
                eyebrow,
                title,
                text
              },
              features[]{
                _key,
                icon,
                iconAsImage{ asset->{ _ref, url } },
                image{ asset->{ _ref, url, metadata{ dimensions } }, alt },
                title,
                text,
                linkLabel,
                link {
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              styles {
                layout,
                contentLayout,
                spacing {
                  marginBottom
                }
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
            _type == 'featuresDetail' => {
              _type,
              _key,
              content {
                eyebrow,
                title,
                text
              },
              features[]{
                _key,
                icon,
                iconAsImage{ asset->{ _ref, url } },
                image{ asset->{ _ref, url, metadata{ dimensions } }, alt },
                title,
                text,
                linkLabel,
                link {
                  href,
                  openInNewTab,
                  noFollow
                }
              },
              styles {
                layout,
                contentLayout,
                spacing {
                  marginBottom
                }
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
            _type == 'advancedImage' => {
              _type,
              _key,
              image{ asset->{ _ref, url, metadata{ dimensions } } },
              alt,
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
                }
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
                }
              }
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
      headerTheme,
      announcementBar
    }`,
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
                animationFile{ asset->{ url } }, 
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
                animationFile{ asset->{ url } }, 
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
      },
      announcementBar
    }`,
    params: { slug },
    request,
  });
}

