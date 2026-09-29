import {defineType, defineField, defineArrayMember} from 'sanity'

// theme lives on the twoColumnSection block (document.sections[].theme).
// Since this is a reusable object, we search the document's sections array
// to find the enclosing block and read its theme.
function getBlockTheme(document: any): string | undefined {
  const sections = document?.sections || []
  const block = sections.find((s: any) => s._type === 'twoColumnSection')
  return block?.theme
}

export default defineType({
  name: 'richTextBlock',
  title: 'Text Content',
  type: 'object',
  // No field groups: eyebrow/title/body are shown together so the Presentation
  // "Open in Studio" deep-link can focus any of them. Group tabs would hide the
  // non-default fields (title, body), and the cold-load focus can't switch tabs,
  // so clicking the title/body in the frontend would land on the Eyebrow tab.
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'colourStyleLight',
          title: 'Colour (light theme)',
          type: 'string',
          options: {
            list: [
              {title: 'Red', value: 'red'},
              {title: 'Navy', value: 'navy'},
              {title: 'Dark', value: 'dark'},
              {title: 'Light blue', value: 'lightBlue'},
              {title: 'Gradient', value: 'gradient'},
            ],
            layout: 'dropdown',
          },
          hidden: ({document}) => getBlockTheme(document) === 'dark',
        }),
        defineField({
          name: 'colourStyleDark',
          title: 'Colour (dark theme)',
          type: 'string',
          options: {
            list: [
              {title: 'White', value: 'white'},
              {title: 'Light blue', value: 'lightBlue'},
              {title: 'Orange', value: 'orange'},
              {title: 'Gradient', value: 'gradient'},
            ],
            layout: 'dropdown',
          },
          hidden: ({document}) => getBlockTheme(document) !== 'dark',
        }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'object',
      // collapsed:false so the heading is expanded when "Open in Studio"
      // focuses it — matches eyebrow. A collapsed heading object isn't
      // auto-expanded by the cold-load deep-link, so the field stays hidden.
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'headingSize',
          title: 'Size',
          type: 'string',
          options: {
            list: [
              {title: 'Medium', value: 'medium'},
              {title: 'Big', value: 'big'},
            ],
            layout: 'radio',
          },
          initialValue: 'medium',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({name: 'href', title: 'URL', type: 'url'}),
                  defineField({name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false}),
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      titleText: 'title.text',
      eyebrowText: 'eyebrow.text',
    },
    prepare({titleText, eyebrowText}) {
      return {
        title: titleText || 'Text Content',
        subtitle: eyebrowText ? `Eyebrow: ${eyebrowText}` : '',
      }
    },
  },
})
