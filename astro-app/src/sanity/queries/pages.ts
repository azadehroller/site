import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { Page, LandingPage, ColumnsBlock, Post } from "../types";

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
      },
      headerTheme,
      announcementBar
    }`,
    params: { slug },
    request,
  });
}
