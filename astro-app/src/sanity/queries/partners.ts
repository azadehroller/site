import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { Partner, PartnersLandingPage } from "../types";
import { standaloneTwoColumnFields } from "./standaloneTwoColumn";

export async function getPartner(slug: string, request?: Request) {
  return await loadQuery<Partner | null>({
    query: groq`*[_type == "partner" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      sections[]{
        ...,
        _type == 'standaloneTwoColumnBlock' => {
          ${standaloneTwoColumnFields}
        },
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
      },
        _type == 'twoColumnSection' => {
          _type, _key, theme, columnLayout,
          background { type, colourOptionLight, colourOptionDark, imageOption },
          cards[] {
            _key, mediaSide, mediaOnTopMobile,
            media {
              mediaType,
              image { asset->{ _id, url }, alt },
              wistiaId,
              posterImage { asset->{ _id, url }, alt }
            },
            richTextBlock {
              eyebrow { text, colourStyleLight, colourStyleDark },
              title { text, headingSize },
              body[]{ ..., markDefs[]{ ..., _type == 'link' => { href, openInNewTab } } }
            },
            stats { number, label },
            quote {
              quoteText, quoterName, quoterPosition,
              quoterLogo { asset->{ _id, url }, alt }
            },
            buttons[] {
              _key, label, hasIcon, iconType, styleDefault, styleWithIcon,
              link {
                urlType, href, openInNewTab, noFollow,
                contentReference->{ _type, title, slug{ current } }
              }
            }
          }
        },
      announcementBar
    }`,
    params: { slug },
    request,
    queryType: 'page',
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
        _type == 'standaloneTwoColumnBlock' => {
          ${standaloneTwoColumnFields}
        },
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
      },
      headerTheme,
      announcementBar
    }`,
    request,
    queryType: 'page',
  });
}

/**
 * Fetch a single competitor by slug
 */
