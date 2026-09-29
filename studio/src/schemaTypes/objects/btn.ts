import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'btn',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'urlType',
          title: 'URL Type',
          type: 'string',
          options: {
            list: [
              {title: 'External', value: 'EXTERNAL'},
              {title: 'Email Address', value: 'EMAIL_ADDRESS'},
              {title: 'Content', value: 'CONTENT'},
              {title: 'File', value: 'FILE'},
            ],
            layout: 'dropdown',
          },
          initialValue: 'EXTERNAL',
        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          hidden: ({parent}) => parent?.urlType === 'CONTENT',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const urlType = (context.parent as any)?.urlType
              if (urlType === 'CONTENT') return true
              if (!value) return 'URL is required'
              return true
            }),
        }),
        defineField({
          name: 'contentReference',
          title: 'Content',
          type: 'reference',
          description: 'Search and select a page or content item',
          hidden: ({parent}) => parent?.urlType !== 'CONTENT',
          to: [
            {type: 'page'},
            {type: 'feature'},
            {type: 'productPage'},
            {type: 'industry'},
            {type: 'post'},
            {type: 'solution'},
            {type: 'partner'},
            {type: 'competitor'},
            {type: 'landingPage'},
            {type: 'rawHtmlPage'},
            {type: 'homepage'},
            {type: 'getStartedPage'},
            {type: 'industriesLandingPage'},
            {type: 'featuresLandingPage'},
            {type: 'productLandingPage'},
            {type: 'blogLandingPage'},
            {type: 'pricingPage'},
            {type: 'partnersLandingPage'},
            {type: 'competitorsLandingPage'},
          ],
          options: {
            filter: '!(_id in path("drafts.**"))',
          },
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'noFollow',
          title: 'No Follow',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'hasIcon',
      title: 'Has Icon',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          {title: 'Inside (arrow in button)', value: 'inside'},
          {title: 'Outside (circle beside button)', value: 'outside'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => !parent?.hasIcon,
    }),
    defineField({
      name: 'styleDefault',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Navy', value: 'navy'},
          {title: 'Red', value: 'red'},
          {title: 'Light blue', value: 'lightBlue'},
          {title: 'Iris', value: 'iris'},
          {title: 'Transparent light', value: 'transparentLight'},
          {title: 'Transparent dark', value: 'transparentDark'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.hasIcon === true,
      initialValue: 'navy',
    }),
    defineField({
      name: 'styleWithIcon',
      title: 'Style (with icon)',
      type: 'string',
      options: {
        list: [
          {title: 'Transparent light', value: 'transparentLight'},
          {title: 'Transparent dark', value: 'transparentDark'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => !parent?.hasIcon,
      initialValue: 'transparentDark',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      hasIcon: 'hasIcon',
      iconType: 'iconType',
    },
    prepare({label, hasIcon, iconType}) {
      const subtitle = hasIcon ? `Icon: ${iconType || 'not set'}` : 'No icon'
      return {
        title: label || 'Button',
        subtitle,
      }
    },
  },
})
