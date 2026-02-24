/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  interface Locals {
    abTest?: import('./utils/experiments').AbTestData;
    abTestHeadingComposition?: import('./utils/experiments').ComponentAbTestData;
    geo?: import('./utils/experiments').GeoData;
  }
}
