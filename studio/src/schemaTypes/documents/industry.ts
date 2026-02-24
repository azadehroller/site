import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {seoFields, seoGroup} from '../objects/seoFields'

/**
 * Industry document type - For industry-specific pages
 */

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: () => '🏢', // Building/office icon - better for industry pages
  initialValue: {
    isTemplate: false,
    sections: [

      // ── 1: Hero — 2/3 (heading + CTA) | 1/3 (image) ──────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-hero',
        layout: '3/1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'hero-heading',
            eyebrow: '[INDUSTRY] SOFTWARE',
            eyebrowType: 'h1',
            eyebrowStyle: 'red',
            title: 'Your headline here',
            theme: 'dark',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h1',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
          },
          {
            _type: 'buttonStack',
            _key: 'hero-cta',
            buttonList: [
              {
                _key: 'btn-primary',
                buttonSettings: {
                  modalTrigger: false,
                  modalTriggerVideo: false,
                  btnLabel: 'Get started',
                  position: 'left',
                  buttonLink: {
                    href: '/get-started',
                    newTab: false,
                  },
                },
              },
            ],
          },
        ],
        column2: [
          {
            _type: 'advancedImage',
            _key: 'hero-image',
            altText: 'Hero image',
          },
        ],
      },
      // ── 2: Logo set (full width) ──────────────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-logos',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '56px',
        paddingBottom: '56px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'logoSetReference',
            _key: 'logo-ref',
            reference: {
              _type: 'reference',
              _ref: 'logoSetGlobal',
            },
          },
        ],
      },

      //  create a contents block wiht blue-99 backgroundwith one column and having a heading coposition that has the content of this html:<section class="heading-composition custom-text-wrapper flex flex-col gap-4 text-left text-primary-50" id="xzfmisgs4cppjvtpocnvs" data-astro-cid-dieygfh3="" data-astro-source-file="/Users/azadeh.faramarzi/Documents/Frontend/site/astro-app/src/components/blocks/HeadingComposition.astro" data-astro-source-loc="173:2">  <div data-astro-cid-dieygfh3="" data-astro-source-file="/Users/azadeh.faramarzi/Documents/Frontend/site/astro-app/src/components/blocks/HeadingComposition.astro" data-astro-source-loc="190:10"> <h3 data-astro-cid-dieygfh3="" class="h2-heading my-0">Grow your business with ROLLER​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌‍‍‌‌‍﻿﻿​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‍​‌‍﻿﻿‌﻿​﻿‌﻿‌​​﻿‍‍​﻿​﻿​﻿​﻿​﻿​﻿​﻿​﻿​‍﻿﻿‌‍‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​‍﻿﻿‌‍﻿‌‌‍﻿﻿‌‍‌​‌‍‌‌​﻿﻿‌‌﻿​​‌﻿​‍‌‍‌‌‌﻿​﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌‍​‌‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌‍‍‌‌‍‌​​﻿﻿‌​﻿‌﻿​﻿​‌​﻿​​‌‍​﻿​﻿​‌‌‍​‌​﻿‌﻿​﻿‍​​‍﻿‌​﻿‍​​﻿​‌​﻿‌​‌‍‌‌​‍﻿‌​﻿‌​‌‍​‌​﻿​​​﻿​​​‍﻿‌​﻿‍‌‌‍​﻿​﻿​‍‌‍‌​​‍﻿‌​﻿‍​​﻿‍‌​﻿‍‌​﻿​‌​﻿‌‍​﻿​​​﻿‌﻿​﻿‌‌​﻿‍​​﻿​​‌‍​﻿‌‍‌​​﻿‍﻿‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍‌‌‍﻿‍‌‍‌​‌﻿‌‌‌﻿​﻿‌﻿‌​‌﻿​‍‌﻿‍‌​﻿‍﻿‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‌​‌﻿​​‌‍​﻿​﻿​​‌‍﻿​‌‍​‌​﻿‌‌​﻿‌‍‌‍﻿‍‌‍‍﻿‌‍‌‌‌‍﻿﻿‌‍‌﻿​﻿​‍​﻿​﻿‌﻿‍​‌‍﻿‌‌﻿‌‍‌‍‍​‌‍​‌​﻿​​‌‍‌‍​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿​‌﻿‌‌‌‍﻿‌‌‍﻿‍​﻿​‌​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‍​‌﻿‍‍‌‍‌‍‌‍﻿‌‌‍‍‌‌﻿​﻿‌‍‌﻿‌﻿​﻿​﻿‌​‌‍​﻿‌﻿​​‌﻿​​‌‍‍‍‌﻿‌‍‌﻿‌​‌﻿​​‌‍﻿﻿‌‍​﻿‌‍﻿‍‌﻿‌‍‌﻿​﻿​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‍‌‌﻿‌​‌‍﻿​‌‍‌‌​﻿﻿﻿‌‍​‍‌‍​‌‌﻿​﻿‌‍‌‌‌‌‌‌‌﻿​‍‌‍﻿​​﻿﻿‌‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​​‍‌‌​﻿​﻿‌​​‌​‍‌‌​﻿​‍‌​‌‍​‍‌‌​﻿​‍‌​‌‍‌‍﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‍​‌‍﻿﻿‌﻿​﻿‌﻿‌​​‍‌‌​﻿​﻿‌​​‌​﻿​﻿​﻿​﻿​﻿​﻿​﻿​﻿​‍‌‍‌‍‍‌‌‍‌​​﻿﻿‌​﻿‌﻿​﻿​‌​﻿​​‌‍​﻿​﻿​‌‌‍​‌​﻿‌﻿​﻿‍​​‍﻿‌​﻿‍​​﻿​‌​﻿‌​‌‍‌‌​‍﻿‌​﻿‌​‌‍​‌​﻿​​​﻿​​​‍﻿‌​﻿‍‌‌‍​﻿​﻿​‍‌‍‌​​‍﻿‌​﻿‍​​﻿‍‌​﻿‍‌​﻿​‌​﻿‌‍​﻿​​​﻿‌﻿​﻿‌‌​﻿‍​​﻿​​‌‍​﻿‌‍‌​​‍‌‍‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍‌‌‍﻿‍‌‍‌​‌﻿‌‌‌﻿​﻿‌﻿‌​‌﻿​‍‌﻿‍‌​‍‌‍‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‌​‌﻿​​‌‍​﻿​﻿​​‌‍﻿​‌‍​‌​﻿‌‌​﻿‌‍‌‍﻿‍‌‍‍﻿‌‍‌‌‌‍﻿﻿‌‍‌﻿​﻿​‍​﻿​﻿‌﻿‍​‌‍﻿‌‌﻿‌‍‌‍‍​‌‍​‌​﻿​​‌‍‌‍​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿​‌﻿‌‌‌‍﻿‌‌‍﻿‍​﻿​‌​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‍​‌﻿‍‍‌‍‌‍‌‍﻿‌‌‍‍‌‌﻿​﻿‌‍‌﻿‌﻿​﻿​﻿‌​‌‍​﻿‌﻿​​‌﻿​​‌‍‍‍‌﻿‌‍‌﻿‌​‌﻿​​‌‍﻿﻿‌‍​﻿‌‍﻿‍‌﻿‌‍‌﻿​﻿​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‍‌‌﻿‌​‌‍﻿​‌‍‌‌​‍​‍‌﻿﻿‌</h3> </div> <div class="text-base portable-text" data-astro-cid-dieygfh3="" data-astro-source-file="/Users/azadeh.faramarzi/Documents/Frontend/site/astro-app/src/components/blocks/HeadingComposition.astro" data-astro-source-loc="204:51"> <p data-astro-source-file="/Users/azadeh.faramarzi/Documents/Frontend/site/node_modules/astro-portabletext/components/Block.astro" data-astro-source-loc="32:20">ROLLER is the global leader in trampoline park software - we've helped elevate the experience at over 700 trampoline parks around the world.​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌‍‍‌‌‍﻿﻿​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​​﻿‍‍​‍﻿﻿​‍﻿﻿‌‍﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‍​‌‍﻿﻿‌﻿​﻿‌﻿‌​​﻿‍‍​﻿​﻿​﻿​﻿​﻿​﻿​﻿​﻿​‍﻿﻿‌‍‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​‍﻿﻿‌‍﻿‌‌‍﻿﻿‌‍‌​‌‍‌‌​﻿﻿‌‌﻿​​‌﻿​‍‌‍‌‌‌﻿​﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌‍​‌‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌‍‍‌‌‍‌​​﻿﻿‌​﻿‌﻿​﻿​‌​﻿​​‌‍​﻿​﻿​‌‌‍​‌​﻿‌﻿​﻿‍​​‍﻿‌​﻿‍​​﻿​‌​﻿‌​‌‍‌‌​‍﻿‌​﻿‌​‌‍​‌​﻿​​​﻿​​​‍﻿‌​﻿‍‌‌‍​﻿​﻿​‍‌‍‌​​‍﻿‌​﻿‍​​﻿‍‌​﻿‍‌​﻿​‌​﻿‌‍​﻿​​​﻿‌﻿​﻿‌‌​﻿‍​​﻿​​‌‍​﻿‌‍‌​​﻿‍﻿‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍‌‌‍﻿‍‌‍‌​‌﻿‌‌‌﻿​﻿‌﻿‌​‌﻿​‍‌﻿‍‌​﻿‍﻿‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‌​‌﻿​​‌‍​﻿​﻿​​‌‍﻿​‌‍​‌​﻿‌‌​﻿‌‍‌‍﻿‍‌‍‍﻿‌‍‌‌‌‍﻿﻿‌‍‌﻿​﻿​‍​﻿​﻿‌﻿‍​‌‍﻿‌‌﻿‌‍‌‍‍​‌‍​‌​﻿​​‌‍‌‍​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿​‌﻿‌‌‌‍﻿‌‌‍﻿‍​﻿​‌​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‍​‌﻿‍‍‌‍‌‍‌‍﻿‌‌‍‍‌‌﻿​﻿‌‍‌﻿‌﻿​﻿​﻿‌​‌‍​﻿‌﻿​​‌﻿​​‌‍‍‍‌﻿‌‍‌﻿‌​‌﻿​​‌‍﻿﻿‌‍​﻿‌‍﻿‍‌﻿‌‍‌﻿​﻿​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍​﻿‍​‌‍﻿﻿‌‍‍‌‌﻿​‌​﻿‌​​﻿‌‌‌‍﻿‍‌﻿‍‍‌﻿‌​​﻿​﻿‌﻿‌‌‌‍​‍‌‍‍‌‌﻿‍​‌﻿​​‌‍​‌‌‍﻿‌​﻿​‍​﻿‌​‌﻿​‌‌‍﻿​​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍‍​‌‍‍‌‌‍﻿​‌‍‌​‌﻿​‍‌‍‌‌‌‍﻿‍​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌‍﻿‌​﻿‌​‌‍‌​‌﻿‌‌‌﻿‌‍‌﻿‍​​﻿‍‌‌‍‌​‌‍​‌‌‍‍﻿‌﻿‌‍​﻿‌‌‌‍​﻿‌﻿‍‍‌﻿‍​‌﻿​﻿‌‍﻿‍​﻿​​‌‍​‍‌﻿‌‌​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‌‌‌﻿‍​‌﻿‌​​﻿﻿﻿‌‍​‍‌‍​‌‌﻿​﻿‌‍‌‌‌‌‌‌‌﻿​‍‌‍﻿​​﻿﻿‌‌‍‍​‌﻿‌​‌﻿‌​‌﻿​​​‍‌‌​﻿​﻿‌​​‌​‍‌‌​﻿​‍‌​‌‍​‍‌‌​﻿​‍‌​‌‍‌‍﻿​‌‍﻿﻿‌‍​﻿‌‍​‌‌‍﻿​‌‍‍​‌‍﻿﻿‌﻿​﻿‌﻿‌​​‍‌‌​﻿​﻿‌​​‌​﻿​﻿​﻿​﻿​﻿​﻿​﻿​﻿​‍‌‍‌‍‍‌‌‍‌​​﻿﻿‌​﻿‌﻿​﻿​‌​﻿​​‌‍​﻿​﻿​‌‌‍​‌​﻿‌﻿​﻿‍​​‍﻿‌​﻿‍​​﻿​‌​﻿‌​‌‍‌‌​‍﻿‌​﻿‌​‌‍​‌​﻿​​​﻿​​​‍﻿‌​﻿‍‌‌‍​﻿​﻿​‍‌‍‌​​‍﻿‌​﻿‍​​﻿‍‌​﻿‍‌​﻿​‌​﻿‌‍​﻿​​​﻿‌﻿​﻿‌‌​﻿‍​​﻿​​‌‍​﻿‌‍‌​​‍‌‍‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌‍‍‌‌‍﻿‍‌‍‌​‌﻿‌‌‌﻿​﻿‌﻿‌​‌﻿​‍‌﻿‍‌​‍‌‍‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌﻿​﻿‌‍‌‌‌‍​﻿‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍‌﻿​﻿​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‌​‌﻿​​‌‍​﻿​﻿​​‌‍﻿​‌‍​‌​﻿‌‌​﻿‌‍‌‍﻿‍‌‍‍﻿‌‍‌‌‌‍﻿﻿‌‍‌﻿​﻿​‍​﻿​﻿‌﻿‍​‌‍﻿‌‌﻿‌‍‌‍‍​‌‍​‌​﻿​​‌‍‌‍​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍﻿﻿‌‍﻿​‌﻿‌‌‌‍﻿‌‌‍﻿‍​﻿​‌​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌﻿‍​‌﻿‍‍‌‍‌‍‌‍﻿‌‌‍‍‌‌﻿​﻿‌‍‌﻿‌﻿​﻿​﻿‌​‌‍​﻿‌﻿​​‌﻿​​‌‍‍‍‌﻿‌‍‌﻿‌​‌﻿​​‌‍﻿﻿‌‍​﻿‌‍﻿‍‌﻿‌‍‌﻿​﻿​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍​﻿‍​‌‍﻿﻿‌‍‍‌‌﻿​‌​﻿‌​​﻿‌‌‌‍﻿‍‌﻿‍‍‌﻿‌​​﻿​﻿‌﻿‌‌‌‍​‍‌‍‍‌‌﻿‍​‌﻿​​‌‍​‌‌‍﻿‌​﻿​‍​﻿‌​‌﻿​‌‌‍﻿​​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍​﻿‌‍‍​‌‍‍‌‌‍﻿​‌‍‌​‌﻿​‍‌‍‌‌‌‍﻿‍​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌‍﻿‌​﻿‌​‌‍‌​‌﻿‌‌‌﻿‌‍‌﻿‍​​﻿‍‌‌‍‌​‌‍​‌‌‍‍﻿‌﻿‌‍​﻿‌‌‌‍​﻿‌﻿‍‍‌﻿‍​‌﻿​﻿‌‍﻿‍​﻿​​‌‍​‍‌﻿‌‌​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌﻿‌​‌‍‌‌‌﻿‍​‌﻿‌​​‍​‍‌﻿﻿‌</p> </div> </section>
      {
        _type: 'columnsBlock',
        _key: 'section-business-growth',
        layout: '1',
        backgroundColor: 'blue-99',
        backgroundGradient: 'none',
        paddingTop: '56px',
        paddingBottom: '56px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'business-growth-heading',
            title: 'Grow your business with ROLLER',
            theme: 'light',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h2',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
            description: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: "ROLLER is the global leader in trampoline park software - we've helped elevate the experience at over 700 trampoline parks around the world.",
                  },
                ],
              },
            ],
          },
        ],
      },
      // ── 3: Section heading (standalone) ──────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-heading-1',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '0px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'heading-1-block',
            title: 'Section heading',
            theme: 'dark',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h2',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
          },
        ],
      },
      // ── 4: Testimonials — 2 equal columns of quote blocks ─────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-quotes',
        layout: '2',
        backgroundColor: 'blue-99',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'quoteBlock',
            _key: 'quote-1',
            quoteText: 'Add your customer quote here.',
            quoteAuthor: 'Author Name',
            quoteTitle: 'Role, Company',
            customerStoryLink: {
              href: '/blog/',
              openInNewTab: false,
              noFollow: false,
            },
            linkLabel: 'Read the full story',
            imageType: 'logo',
            theme: 'dark',
            styleVariant: 'extrabold',
          },
        ],
        column2: [
          {
            _type: 'quoteBlock',
            _key: 'quote-2',
            quoteText: 'Add your customer quote here.',
            quoteAuthor: 'Author Name',
            quoteTitle: 'Role, Company',
            customerStoryLink: {
              href: '/blog/',
              openInNewTab: false,
              noFollow: false,
            },
            linkLabel: 'Read the full story',
            imageType: 'logo',
            theme: 'dark',
            styleVariant: 'extrabold',
          },
        ],
      },
      // ── 5: Widget User Reviews (global reference) ─────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-reviews',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'widgetUserReviewsReference',
            _key: 'reviews-ref',
            reference: {
              _type: 'reference',
              _ref: 'widgetUserReviews',
            },
          },
        ],
      },
      // ── 6: Heading + Results List ─────────────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-heading-2',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'heading-2-block',
            title: 'Section heading',
            theme: 'dark',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h2',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
          },
          {
            _type: 'resultsList',
            _key: 'results-list-block',
            theme: 'dark',
          },
        ],
      },
      // ── 7: Features Stacked Content ───────────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-features-stacked',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'featuresStackedContent',
            _key: 'features-stacked-block',
          },
        ],
      },
      // ── 8: Heading + Comparison Table ────────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-heading-3',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'heading-3-block',
            title: 'Section heading',
            theme: 'dark',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h2',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
          },
          {
            _type: 'comparisonTable',
            _key: 'comparison-table-block',
          },
        ],
      },
      // ── 9: Features Selector (global reference) ──────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-features-selector',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'featuresSelectorGlobalReference',
            _key: 'features-selector-ref',
            reference: {
              _type: 'reference',
              _ref: 'featuresSelectorGlobal',
            },
          },
        ],
      },
      // ── 10: FAQs ──────────────────────────────────────────────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-faqs',
        layout: '1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'faqs',
            _key: 'faqs-block',
            theme: 'dark',
          },
        ],
      },
      // ── 11: Bottom CTA — 3/4 (heading) | 1/4 (button) ───────────────────
      {
        _type: 'columnsBlock',
        _key: 'section-cta',
        layout: '4/1',
        backgroundColor: 'none',
        backgroundGradient: 'none',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTopMobile: '48px',
        paddingBottomMobile: '48px',
        paddingLeftMobile: '0px',
        paddingRightMobile: '0px',
        column1PaddingBottomMobile: '32px',
        column2PaddingBottomMobile: '32px',
        column1: [
          {
            _type: 'headingComposition',
            _key: 'cta-heading',
            title: 'Ready to get started?',
            theme: 'dark',
            textAlignment: 'LEFT',
            headingType: 'h2',
            displayType: 'h2',
            textType: 'lg',
            addBorderLine: false,
            experimentActive: false,
          },
        ],
        column2: [
          {
            _type: 'button',
            _key: 'cta-button',
          },
        ],
      },
    ],
  },
  orderings: [
    orderRankOrdering,
    {
      title: 'Templates First',
      name: 'templatesFirst',
      by: [
        // Sort by isTemplate descending: true values first (templates at top)
        // This should work regardless of draft/published status
        {field: 'isTemplate', direction: 'desc'},
        // Then by _id to ensure consistent ordering (published vs drafts)
        {field: '_id', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
    seoGroup,
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    // Order rank for drag-and-drop ordering
    orderRankField({type: 'industry', newItemPosition: 'before'}),
    defineField({
      name: 'isTemplate',
      title: 'Is Template',
      type: 'boolean',
      description: 'Mark this industry page as a template. Templates will appear at the top of the industries list.',
      initialValue: false,
      group: 'settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'columnsBlock',
        },
        {
          type: 'divider',
        },
      ],
    }),
    // Settings
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'announcementBarSettings',
      group: 'settings',
    }),
    // SEO
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isTemplate: 'isTemplate',
    },
    prepare({title, slug, isTemplate}) {
      return {
        title: isTemplate ? `📋 ${title || 'Untitled Industry'} (Template)` : title || 'Untitled Industry',
        subtitle: `/industries/${slug}`,
      }
    },
  },
})
