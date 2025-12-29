import {defineType, defineField} from 'sanity'

/**
 * Columns Block - a reusable layout component for pages
 * Supports 1, 2, 3, 4 column layouts plus 1/3 and 3/1 asymmetric layouts
 */

export default defineType({
  name: 'columnsBlock',
  title: 'Columns',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'layout', title: 'Layout'},
    {name: 'background', title: 'Background'},
    {name: 'spacing', title: 'Spacing'},
  ],
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description: 'Choose the column layout',
      group: 'layout',
      options: {
        list: [
          {title: '1 Column (Full Width)', value: '1'},
          {title: '2 Columns (Equal)', value: '2'},
          {title: '3 Columns (Equal)', value: '3'},
          {title: '4 Columns (Equal)', value: '4'},
          {title: '2 Columns (1/3 + 2/3)', value: '1/3'},
          {title: '2 Columns (2/3 + 1/3)', value: '3/1'},
          {title: '2 Columns (1/4 + 3/4)', value: '1/4'},
          {title: '2 Columns (3/4 + 1/4)', value: '4/1'},
        ],
        layout: 'radio',
      },
      initialValue: '2',
      validation: (Rule) => Rule.required(),
    }),
    // Background Settings
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Set the background color for this section',
      group: 'background',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Blue 10 (#011840)', value: 'var(--blue-10)'},
          {title: 'Blue 30 (#033180)', value: 'var(--blue-30)'},
          {title: 'Blue 90 (#CEDFFD)', value: 'var(--blue-90)'},
          {title: 'Blue 95 (#EBF2FE)', value: 'var(--blue-95)'},
          {title: 'Blue 99 (#f5f8ff)', value: 'var(--blue-99)'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Enter a custom hex color (e.g., #ff5500)',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      description: 'Position of the background image',
      group: 'background',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Top Left', value: 'top left'},
          {title: 'Top Right', value: 'top right'},
          {title: 'Bottom Left', value: 'bottom left'},
          {title: 'Bottom Right', value: 'bottom right'},
        ],
      },
      initialValue: 'center',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    defineField({
      name: 'backgroundSize',
      title: 'Background Size',
      type: 'string',
      description: 'How the background image should be sized',
      group: 'background',
      options: {
        list: [
          {title: 'Cover (fill entire area)', value: 'cover'},
          {title: 'Contain (fit within area)', value: 'contain'},
          {title: 'Natural Size (auto)', value: 'auto'},
        ],
      },
      initialValue: 'cover',
      hidden: ({parent}) => !parent?.backgroundImage,
    }),
    // Spacing Settings
    defineField({
      name: 'paddingTop',
      title: 'Padding Top (Desktop)',
      type: 'string',
      description: 'Top padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '80px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingTopMobile',
      title: 'Padding Top (Mobile)',
      type: 'string',
      description: 'Top padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '48px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom (Desktop)',
      type: 'string',
      description: 'Bottom padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingBottomMobile',
      title: 'Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingLeft',
      title: 'Padding Left (Desktop)',
      type: 'string',
      description: 'Left padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingLeftMobile',
      title: 'Padding Left (Mobile)',
      type: 'string',
      description: 'Left padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingRight',
      title: 'Padding Right (Desktop)',
      type: 'string',
      description: 'Right padding for desktop (768px and above)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paddingRightMobile',
      title: 'Padding Right (Mobile)',
      type: 'string',
      description: 'Right padding for mobile (below 768px)',
      group: 'spacing',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '0px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock', title: 'Text Block'},
        {type: 'headingComposition', title: 'Heading and Text Block'},
        {type: 'rotatingTextBlock', title: 'Rotating Text'},
        {type: 'imageVideoModal', title: 'Image Video Modal'},
        {type: 'image', title: 'Image'},
        {type: 'advancedImage', title: 'Advanced Image'},
        {type: 'buttonStack', title: 'Button Stack'},
        {type: 'button', title: 'Button'},
        {type: 'logoSet', title: 'Logo Set'},
        {type: 'statsSet', title: 'Stats Set'},
        {type: 'quoteBlock', title: 'Quote'},
        {type: 'widgetStatsReference', title: 'Widget Stats'},
        {type: 'widgetUserReviewsReference', title: 'Widget User Reviews'},
        {type: 'testimonialCarouselReference', title: 'Testimonial Carousel'},
        {type: 'featuresStackedContent', title: 'Features Stacked Content'},
        {type: 'trustedPartner', title: 'Trusted Partner'},
        {type: 'hubspotFormReference', title: 'HubSpot Form'},
      ],
      description: 'Add content blocks to this column',
    }),
    defineField({
      name: 'column1PaddingBottomMobile',
      title: 'Column 1 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 1 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock', title: 'Text Block'},
        {type: 'headingComposition', title: 'Heading and Text Block'},
        {type: 'rotatingTextBlock', title: 'Rotating Text'},
        {type: 'imageVideoModal', title: 'Image Video Modal'},
        {type: 'image', title: 'Image'},
        {type: 'advancedImage', title: 'Advanced Image'},
        {type: 'buttonStack', title: 'Button Stack'},
        {type: 'button', title: 'Button'},
        {type: 'logoSet', title: 'Logo Set'},
        {type: 'statsSet', title: 'Stats Set'},
        {type: 'quoteBlock', title: 'Quote'},
        {type: 'widgetStatsReference', title: 'Widget Stats'},
        {type: 'widgetUserReviewsReference', title: 'Widget User Reviews'},
        {type: 'testimonialCarouselReference', title: 'Testimonial Carousel'},
        {type: 'featuresStackedContent', title: 'Features Stacked Content'},
        {type: 'trustedPartner', title: 'Trusted Partner'},
        {type: 'hubspotFormReference', title: 'HubSpot Form'},
      ],
      description: 'Add content blocks to this column',
      hidden: ({parent}) => parent?.layout === '1',
    }),
    defineField({
      name: 'column2PaddingBottomMobile',
      title: 'Column 2 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 2 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => parent?.layout === '1',
    }),
    defineField({
      name: 'column3',
      title: 'Column 3',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock', title: 'Text Block'},
        {type: 'headingComposition', title: 'Heading and Text Block'},
        {type: 'rotatingTextBlock', title: 'Rotating Text'},
        {type: 'imageVideoModal', title: 'Image Video Modal'},
        {type: 'image', title: 'Image'},
        {type: 'advancedImage', title: 'Advanced Image'},
        {type: 'buttonStack', title: 'Button Stack'},
        {type: 'button', title: 'Button'},
        {type: 'logoSet', title: 'Logo Set'},
        {type: 'statsSet', title: 'Stats Set'},
        {type: 'quoteBlock', title: 'Quote'},
        {type: 'widgetStatsReference', title: 'Widget Stats'},
        {type: 'widgetUserReviewsReference', title: 'Widget User Reviews'},
        {type: 'testimonialCarouselReference', title: 'Testimonial Carousel'},
        {type: 'featuresStackedContent', title: 'Features Stacked Content'},
        {type: 'trustedPartner', title: 'Trusted Partner'},
        {type: 'hubspotFormReference', title: 'HubSpot Form'},
      ],
      description: 'Add content blocks to this column',
      hidden: ({parent}) => !['3', '4'].includes(parent?.layout),
    }),
    defineField({
      name: 'column3PaddingBottomMobile',
      title: 'Column 3 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 3 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => !['3', '4'].includes(parent?.layout),
    }),
    defineField({
      name: 'column4',
      title: 'Column 4',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock', title: 'Text Block'},
        {type: 'headingComposition', title: 'Heading and Text Block'},
        {type: 'rotatingTextBlock', title: 'Rotating Text'},
        {type: 'imageVideoModal', title: 'Image Video Modal'},
        {type: 'image', title: 'Image'},
        {type: 'advancedImage', title: 'Advanced Image'},
        {type: 'buttonStack', title: 'Button Stack'},
        {type: 'button', title: 'Button'},
        {type: 'logoSet', title: 'Logo Set'},
        {type: 'statsSet', title: 'Stats Set'},
        {type: 'quoteBlock', title: 'Quote'},
        {type: 'widgetStatsReference', title: 'Widget Stats'},
        {type: 'widgetUserReviewsReference', title: 'Widget User Reviews'},
        {type: 'testimonialCarouselReference', title: 'Testimonial Carousel'},
        {type: 'featuresStackedContent', title: 'Features Stacked Content'},
        {type: 'trustedPartner', title: 'Trusted Partner'},
        {type: 'hubspotFormReference', title: 'HubSpot Form'},
      ],
      description: 'Add content blocks to this column',
      hidden: ({parent}) => parent?.layout !== '4',
    }),
    defineField({
      name: 'column4PaddingBottomMobile',
      title: 'Column 4 Padding Bottom (Mobile)',
      type: 'string',
      description: 'Bottom padding for Column 4 on mobile',
      group: 'content',
      options: {
        list: [
          {title: '0px', value: '0px'},
          {title: '24px', value: '24px'},
          {title: '32px', value: '32px'},
          {title: '48px', value: '48px'},
          {title: '56px', value: '56px'},
          {title: '80px', value: '80px'},
          {title: '160px', value: '160px'},
        ],
        layout: 'radio',
      },
      initialValue: '32px',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => parent?.layout !== '4',
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      column1: 'column1',
      column2: 'column2',
      column3: 'column3',
      column4: 'column4',
    },
    prepare({layout, column1, column2, column3, column4}) {
      // Map block types to human-readable labels
      const blockTypeLabels: Record<string, string> = {
        textBlock: 'Text Block',
        headingComposition: 'Heading Composition',
        rotatingTextBlock: 'Rotating Text',
        imageVideoModal: 'Image Video Modal',
        image: 'Image',
        advancedImage: 'Advanced Image',
        buttonStack: 'Button Stack',
        button: 'Button',
        logoSet: 'Logo Set',
        statsSet: 'Stats Set',
        quoteBlock: 'Quote',
        widgetStatsReference: 'Widget Stats',
        widgetUserReviewsReference: 'Widget User Reviews',
        testimonialCarouselReference: 'Testimonial Carousel',
        featuresStackedContent: 'Features Stacked Content',
        trustedPartner: 'Trusted Partner',
        hubspotFormReference: 'HubSpot Form',
      }

      // Helper to get block labels from a column array
      const getColumnBlockLabels = (columnBlocks: Array<{_type: string}> | undefined): string => {
        if (!columnBlocks || columnBlocks.length === 0) return 'Empty'
        return columnBlocks
          .map((block) => blockTypeLabels[block._type] || block._type)
          .join(', ')
      }

      // Build the title based on which columns have content
      const isSingleColumn = layout === '1'

      // For single column layout, just show the block names without "Column 1:" prefix
      if (isSingleColumn) {
        const title = column1 && column1.length > 0 
          ? getColumnBlockLabels(column1) 
          : 'Columns Block (Empty)'
        
        return {
          title,
          subtitle: '1 Column',
        }
      }

      // For multi-column layouts, show "Column X:" prefix
      const columnLabels: string[] = []

      if (column1 && column1.length > 0) {
        columnLabels.push(`Column 1: ${getColumnBlockLabels(column1)}`)
      }
      if (column2 && column2.length > 0) {
        columnLabels.push(`Column 2: ${getColumnBlockLabels(column2)}`)
      }
      if (column3 && column3.length > 0 && ['3', '4'].includes(layout)) {
        columnLabels.push(`Column 3: ${getColumnBlockLabels(column3)}`)
      }
      if (column4 && column4.length > 0 && layout === '4') {
        columnLabels.push(`Column 4: ${getColumnBlockLabels(column4)}`)
      }

      const title = columnLabels.length > 0 ? columnLabels.join(' + ') : 'Columns Block (Empty)'

      const layoutLabels: Record<string, string> = {
        '1': '1 Column',
        '2': '2 Columns',
        '3': '3 Columns',
        '4': '4 Columns',
        '1/3': '2 Columns (1/3 + 2/3)',
        '3/1': '2 Columns (2/3 + 1/3)',
        '1/4': '2 Columns (1/4 + 3/4)',
        '4/1': '2 Columns (3/4 + 1/4)',
      }

      return {
        title,
        subtitle: layoutLabels[layout] || layout,
      }
    },
  },
})

