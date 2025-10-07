import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { sanityClient } from "sanity:client";

const builder = imageUrlBuilder(sanityClient);

/**
 * Check if an image has been fully uploaded and processed.
 * Images with _upload property are still being processed.
 */
export function isImageReady(source: any): source is Image {
  if (!source || typeof source !== 'object') {
    return false;
  }

  // If image is still uploading, it's not ready
  if ('_upload' in source) {
    return false;
  }

  // Image needs either an asset reference or _ref
  return !!(source.asset || source._ref);
}

export function urlFor(source: Image) {
  return builder.image(source);
}
