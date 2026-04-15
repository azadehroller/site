/**
 * chat-formatter.ts
 * Pure formatting utilities for the ChatWidget.
 * No DOM side-effects — only createElement for HTML escaping.
 */

export interface Source {
  title: string;
  url?: string;
}

/** Escapes HTML special characters to prevent XSS from AI-generated content. */
export const escapeHtml = (text: string): string => {
  const node = document.createElement('span');
  node.textContent = text;
  return node.innerHTML;
};

// Matches Markdown inline links: [text](https://example.com)
// Only http/https URLs are matched to prevent javascript: injection.
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

// CDN/internal hosts and placeholder paths that should never be rendered as links.
const BAD_URL_RE = /cdn\.rollerdigital\.com|cdn\.sanity\.io|\/invalid-link/i;

/**
 * Escapes HTML and converts Markdown inline links [text](url) → <a> elements.
 * Links pointing to CDN/internal hosts are rendered as plain text only.
 */
const renderInline = (text: string): string => {
  let result    = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MARKDOWN_LINK_RE.lastIndex = 0;
  while ((match = MARKDOWN_LINK_RE.exec(text)) !== null) {
    result += escapeHtml(text.slice(lastIndex, match.index));
    const linkText = escapeHtml(match[1]);
    const linkUrl  = match[2];

    if (BAD_URL_RE.test(linkUrl)) {
      // Internal/CDN URL — render text only, no anchor
      result += linkText;
    } else {
      result += `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="chat-inline-link">${linkText}</a>`;
    }
    lastIndex = match.index + match[0].length;
  }
  result += escapeHtml(text.slice(lastIndex));
  return result;
};

/**
 * Converts plain-text AI output into safe HTML.
 * Detects bullet lists, numbered lists (≥2 consecutive items), and section headers.
 */
export const formatMessageContent = (
  content: string,
  messageType: 'bot' | 'user',
): string => {
  const lines       = content.split('\n');
  const isUser      = messageType === 'user';
  const paraClass   = isUser ? 'chat-paragraph chat-paragraph-user' : 'chat-paragraph';
  const headerClass = isUser
    ? 'chat-section-header chat-section-header-user'
    : 'chat-section-header';

  let html            = '';
  let inOrderedList   = false;
  let inUnorderedList = false;

  // First pass: find runs of ≥2 consecutive numbered lines (= a real ordered list)
  const numberedGroups: number[][] = [];
  let currentGroup: number[]       = [];
  lines.forEach((line, i) => {
    if (/^\d+\.\s+.+$/.test(line.trim())) {
      currentGroup.push(i);
    } else if (currentGroup.length > 0) {
      if (currentGroup.length > 1) numberedGroups.push(currentGroup);
      currentGroup = [];
    }
  });
  if (currentGroup.length > 1) numberedGroups.push(currentGroup);

  const isInNumberedGroup = (idx: number) =>
    numberedGroups.some((g) => g.includes(idx));

  // Second pass: emit escaped HTML
  lines.forEach((line, i) => {
    const t            = line.trim();
    const numberedMatch = t.match(/^(\d+)\.\s+(.+)$/);
    const bulletMatch   = t.match(/^[-*•]\s+(.+)$/);
    const isHeader      =
      t.endsWith(':') && t.length < 100 && !numberedMatch && !bulletMatch;

    if (numberedMatch && isInNumberedGroup(i)) {
      if (!inOrderedList) {
        if (inUnorderedList) { html += '</ul>'; inUnorderedList = false; }
        html += '<ol class="chat-ordered-list">';
        inOrderedList = true;
      }
      html += `<li>${renderInline(numberedMatch[2])}</li>`;
    } else if (bulletMatch) {
      if (!inUnorderedList) {
        if (inOrderedList) { html += '</ol>'; inOrderedList = false; }
        html += '<ul class="chat-unordered-list">';
        inUnorderedList = true;
      }
      html += `<li>${renderInline(bulletMatch[1])}</li>`;
    } else {
      if (inOrderedList)   { html += '</ol>';  inOrderedList   = false; }
      if (inUnorderedList) { html += '</ul>';  inUnorderedList = false; }
      if (t) {
        html += isHeader
          ? `<h3 class="${headerClass}">${renderInline(t)}</h3>`
          : `<p class="${paraClass}">${renderInline(t)}</p>`;
      }
    }
  });

  if (inOrderedList)   html += '</ol>';
  if (inUnorderedList) html += '</ul>';
  return html;
};

/** Builds a single source link wrapped in a <div>. */
export const createSourceLink = (source: Source): HTMLDivElement => {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '0.25rem';
  const el = document.createElement(source.url ? 'a' : 'span') as HTMLAnchorElement;
  el.className   = 'chat-source-link';
  el.textContent = `→ ${source.title}`;
  if (source.url) {
    el.href   = source.url;
    el.target = '_blank';
    el.rel    = 'noopener noreferrer';
  }
  wrapper.appendChild(el);
  return wrapper;
};

/** Appends a "Sources:" block (separator + links) to a chat bubble element. */
export const appendSources = (bubbleEl: HTMLElement, sources: Source[]): void => {
  if (!sources?.length) return;
  const sourcesEl = document.createElement('div');
  sourcesEl.className = 'chat-sources';
  const sep = document.createElement('hr');
  sep.className = 'chat-sources-separator';
  sourcesEl.appendChild(sep);
  const title = document.createElement('p');
  title.className   = 'chat-sources-title';
  title.textContent = 'Sources:';
  sourcesEl.appendChild(title);
  sources.forEach((s) => sourcesEl.appendChild(createSourceLink(s)));
  bubbleEl.appendChild(sourcesEl);
};
