import groq from "groq";
import { loadQuery } from "../../utils/loadQuery";
import type { HeaderGlobal, FooterGlobal, ChatbotConfig, FeaturesSelectorGlobal } from "../types";

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
 * Fetch all layout data (header, footer, chatbot) in a single query
 * This reduces 3 API calls to 1, improving performance by ~150-250ms
 * Uses 'global' cache type for 30-minute caching (vs 5 minutes for default)
 * @param request - Optional request object for SSR context
 */
export async function getLayoutData(request?: Request) {
  return await loadQuery<{
    header: HeaderGlobal | null;
    footer: FooterGlobal | null;
    chatbot: ChatbotConfig | null;
  }>({
    query: groq`{
      "header": *[_type == "headerGlobal"][0]{
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
      },
      "footer": *[_type == "footerGlobal"][0]{
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
      },
      "chatbot": *[_type == "chatbotConfig" && _id == "chatbotConfig"][0]{
        enabled,
        displayName,
        welcomeMessage,
        systemPrompt,
        fallbackMessage,
        errorMessage,
        maxChunks,
        similarityThreshold,
        maxTokens
      }
    }`,
    request,
    queryType: 'global',
  });
}

/** Result of {@link getLayoutData}; pages can fetch in parallel with `Promise.all` and pass this into Layout */
export type LayoutSanityResult = Awaited<ReturnType<typeof getLayoutData>>;

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
