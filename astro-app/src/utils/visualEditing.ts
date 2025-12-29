/**
 * Visual Editing Utilities for Sanity Presentation Mode
 * 
 * These utilities help generate proper data-sanity attributes for nested content
 * to enable click-to-edit functionality in Sanity's Presentation tool.
 * 
 * Key concepts:
 * - Stega encoding: Invisible Unicode characters embedded in string content that
 *   carry path information for visual editing. Should be PRESERVED in visible text.
 * - data-sanity attributes: HTML attributes that explicitly mark elements as 
 *   editable and specify the path to their content in the Sanity document.
 */

export interface SanityEditInfo {
  id: string;           // Document _id (base ID without drafts. prefix)
  type: string;         // Document _type
  path: string;         // Path to the field within the document
}

/**
 * Normalize a document ID by removing the 'drafts.' prefix if present.
 * This ensures consistent IDs when creating Studio links, regardless of
 * whether we fetched the draft or published version.
 * The Presentation tool will automatically resolve to the correct version.
 */
export function normalizeDocumentId(id: string): string {
  if (!id) return '';
  return id.replace(/^drafts\./, '');
}

/**
 * Get the draft document ID from a base ID
 */
export function getDraftId(id: string): string {
  const baseId = normalizeDocumentId(id);
  return `drafts.${baseId}`;
}

/**
 * Check if a document ID is a draft ID
 */
export function isDraftId(id: string): boolean {
  return id?.startsWith('drafts.');
}

/**
 * Creates a data-sanity attribute value for a given path in a document.
 * This enables click-to-edit for elements that might not have stega-encoded text.
 * 
 * @param documentId - The Sanity document _id
 * @param documentType - The Sanity document _type  
 * @param path - The path to the field (e.g., "sections[_key=='abc123'].column1[_key=='xyz789'].title")
 */
export function createEditPath(
  documentId: string,
  documentType: string,
  path: string
): string {
  // The data-sanity format expected by the visual editing overlays
  return JSON.stringify({
    origin: 'sanity.io',
    href: `sanity://structure/${documentType};${documentId}/${encodeURIComponent(path)}`,
    data: { id: documentId, type: documentType, path }
  });
}

/**
 * Creates the path string for an array item by key
 */
export function createArrayPath(basePath: string, key: string | undefined): string {
  if (!key) return basePath;
  return `${basePath}[_key=="${key}"]`;
}

/**
 * Creates path for nested content within columns
 * Example: sections[_key=="abc"].column1[_key=="xyz"]
 */
export function createNestedPath(
  sectionKey: string | undefined,
  columnName: string,
  itemKey: string | undefined
): string {
  let path = 'sections';
  if (sectionKey) {
    path += `[_key=="${sectionKey}"]`;
  }
  path += `.${columnName}`;
  if (itemKey) {
    path += `[_key=="${itemKey}"]`;
  }
  return path;
}

/**
 * Creates the full edit info for a content block.
 * The document ID is normalized (drafts. prefix removed) to ensure
 * the Presentation tool can resolve to the correct version.
 */
export function createBlockEditInfo(
  documentId: string,
  documentType: string,
  sectionKey: string | undefined,
  columnName?: string,
  itemKey?: string
): SanityEditInfo {
  let path = 'sections';
  
  if (sectionKey) {
    path += `[_key=="${sectionKey}"]`;
  }
  
  if (columnName) {
    path += `.${columnName}`;
  }
  
  if (itemKey) {
    path += `[_key=="${itemKey}"]`;
  }
  
  // Normalize the document ID to ensure consistent behavior
  // The Presentation tool will resolve to the correct version (draft or published)
  const normalizedId = normalizeDocumentId(documentId);
  
  return { id: normalizedId, type: documentType, path };
}

/**
 * Helper to generate data attribute object for visual editing
 * Use with Astro's spread syntax: {...createDataSanityAttrs(editInfo)}
 */
export function createDataSanityAttrs(editInfo: SanityEditInfo | null | undefined): Record<string, string> {
  if (!editInfo) return {};
  
  return {
    'data-sanity-edit-target': '',
    'data-sanity-edit-info': JSON.stringify(editInfo)
  };
}

/**
 * Helper to check if visual editing is enabled in the current context
 */
export function isVisualEditingEnabled(): boolean {
  return String(import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED) === 'true';
}

