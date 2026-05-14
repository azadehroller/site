import React from 'react'
import {
  VisualEditing,
  type HistoryUpdate,
  type VisualEditingOptions,
} from '@sanity/visual-editing/react'

type HistoryAdapter = NonNullable<VisualEditingOptions['history']>
type HistoryNavigate = Parameters<HistoryAdapter['subscribe']>[0]

/**
 * Custom Visual Editing client. Replaces the default `@sanity/astro/visual-editing`
 * wrapper so we can pass `onPerspectiveChange` — which the upstream Astro wrapper
 * still doesn't expose.
 *
 * Why we need it: when an editor toggles the perspective in Studio (e.g.
 * published → drafts → a content release), the iframe must refetch its SSR
 * content with the matching perspective. Otherwise the data-sanity attributes
 * encode paths from a different projection than the one Studio mounts, and
 * click-to-edit silently fails until the document pane remounts.
 *
 * The history sync logic mirrors @sanity/astro's internal wrapper so URL
 * navigations inside the iframe stay in sync with Studio's URL bar.
 */

function getPresentationUrl(location: {pathname: string; search: string; hash: string}): string {
  return `${location.pathname}${location.search}${location.hash}`
}

function shouldPublishUrl(nextUrl: string, previousUrl: string): boolean {
  return nextUrl !== previousUrl
}

function applyHistoryUpdate(
  update: Pick<HistoryUpdate, 'type' | 'url'>,
  currentHref: string,
): void {
  switch (update.type) {
    case 'push':
      if (currentHref !== update.url) window.location.assign(update.url)
      return
    case 'replace':
      if (currentHref !== update.url) window.location.replace(update.url)
      return
    case 'pop':
      window.history.back()
      return
  }
}

const PERSPECTIVE_COOKIE = 'sanity-preview-perspective'

function serializePerspective(perspective: unknown): string {
  if (typeof perspective === 'string') return perspective
  if (Array.isArray(perspective)) return JSON.stringify(perspective)
  return 'drafts'
}

function writePerspectiveCookie(perspective: unknown): boolean {
  const value = serializePerspective(perspective)
  // Mirror the enable endpoint's cookie attributes so the SSR fetch can read it.
  const isSecure = window.location.protocol === 'https:'
  const sameSite = isSecure ? 'None' : 'Lax'
  const cookieParts = [
    `${PERSPECTIVE_COOKIE}=${encodeURIComponent(value)}`,
    'path=/',
    `SameSite=${sameSite}`,
  ]
  if (isSecure) cookieParts.push('Secure')

  // Read current value to avoid pointless reloads if Studio re-emits the same perspective.
  const match = document.cookie.match(/(?:^|;\s*)sanity-preview-perspective=([^;]+)/)
  const current = match ? decodeURIComponent(match[1]) : undefined
  if (current === value) return false

  document.cookie = cookieParts.join('; ')
  return true
}

interface Props {
  zIndex?: number
}

export default function SanityVisualEditing({zIndex = 1000}: Props) {
  const navigateRef = React.useRef<HistoryNavigate | undefined>(undefined)
  const lastUrlRef = React.useRef('')
  const optimisticUrlRef = React.useRef<string | undefined>(undefined)
  const optimisticUntilRef = React.useRef(0)
  const clearNavigateTimeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    const publishUrl = (url: string, force = false) => {
      const navigate = navigateRef.current
      if (!navigate) return
      const now = Date.now()
      const optimisticUrl = optimisticUrlRef.current
      const optimisticWindowOpen = now < optimisticUntilRef.current
      if (!force && optimisticUrl && optimisticWindowOpen && url !== optimisticUrl) return
      if (optimisticUrl && url === optimisticUrl) {
        optimisticUrlRef.current = undefined
        optimisticUntilRef.current = 0
      }
      if (!force && !shouldPublishUrl(url, lastUrlRef.current)) return
      lastUrlRef.current = url
      navigate({type: 'push', title: document.title, url})
    }

    const syncCurrentUrl = () => publishUrl(getPresentationUrl(window.location))

    const publishClickedLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target && anchor.target !== '_self') return
      let targetUrl: URL
      try {
        targetUrl = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      if (targetUrl.origin !== window.location.origin) return
      const url = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
      optimisticUrlRef.current = url
      optimisticUntilRef.current = Date.now() + 1_500
      publishUrl(url, true)
    }

    syncCurrentUrl()
    window.addEventListener('popstate', syncCurrentUrl)
    window.addEventListener('hashchange', syncCurrentUrl)
    document.addEventListener('click', publishClickedLink, true)

    const nativePushState = window.history.pushState
    const nativeReplaceState = window.history.replaceState
    window.history.pushState = function (...args) {
      nativePushState.apply(window.history, args)
      syncCurrentUrl()
    }
    window.history.replaceState = function (...args) {
      nativeReplaceState.apply(window.history, args)
      syncCurrentUrl()
    }

    return () => {
      window.removeEventListener('popstate', syncCurrentUrl)
      window.removeEventListener('hashchange', syncCurrentUrl)
      document.removeEventListener('click', publishClickedLink, true)
      window.history.pushState = nativePushState
      window.history.replaceState = nativeReplaceState
    }
  }, [])

  const history = React.useMemo<HistoryAdapter>(
    () => ({
      subscribe: (navigate) => {
        window.clearTimeout(clearNavigateTimeoutRef.current)
        navigateRef.current = navigate
        lastUrlRef.current = getPresentationUrl(window.location)
        return () => {
          clearNavigateTimeoutRef.current = window.setTimeout(() => {
            if (navigateRef.current === navigate) navigateRef.current = undefined
          }, 200)
        }
      },
      update: (update) => applyHistoryUpdate(update, window.location.href),
    }),
    [],
  )

  return (
    <VisualEditing
      portal
      history={history}
      zIndex={zIndex}
      onPerspectiveChange={(perspective) => {
        if (writePerspectiveCookie(perspective)) {
          window.location.reload()
        }
      }}
      refresh={() =>
        new Promise<void>((resolve) => {
          window.location.reload()
          resolve()
        })
      }
    />
  )
}
