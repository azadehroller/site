import {defineField} from 'sanity'

/**
 * Announcement Bar Field
 * A simple dropdown field that can be added to page schemas
 * Editors select from predefined announcement bar options
 */

// Define the available announcement bars as constants
// These are hardcoded - editors cannot create new ones
export const ANNOUNCEMENT_BARS = [
  {
    value: 'none',
    title: 'None',
  },
  {
    value: 'pulse_report_2025',
    title: 'Pulse Report 2025',
    config: {
      text: 'The 2025 Attractions Industry Pulse Report is here!',
      ctaText: 'Download now',
      link: {
        href: '/pulse-report-2025',
        openInNewTab: false,
        noFollow: false,
      },
      theme: 'new_design',
    },
  },
  {
    value: 'industry_report',
    title: 'Industry Report',
    config: {
      text: 'Discover the latest industry insights and trends',
      ctaText: 'Read the report',
      link: {
        href: '/industry-report',
        openInNewTab: false,
        noFollow: false,
      },
      theme: 'industry_report',
    },
  },
  {
    value: 'product_launch',
    title: 'Product Launch',
    config: {
      text: 'Introducing our newest features!',
      ctaText: 'Learn more',
      link: {
        href: '/features',
        openInNewTab: false,
        noFollow: false,
      },
      theme: 'product_launch',
    },
  },
  {
    value: 'default_promo',
    title: 'Default Promotion',
    config: {
      text: 'Get started with ROLLER today',
      ctaText: 'Start free trial',
      link: {
        href: '/get-started',
        openInNewTab: false,
        noFollow: false,
      },
      theme: 'default',
    },
  },
] as const

// Create the dropdown field definition
export const announcementBarField = defineField({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'string',
  description: 'Select an announcement bar to display above the header on this page',
  options: {
    list: ANNOUNCEMENT_BARS.map(bar => ({
      title: bar.title,
      value: bar.value,
    })),
    layout: 'dropdown',
  },
  initialValue: 'none',
})

// Helper function to get announcement config by value
export function getAnnouncementConfig(value: string | undefined) {
  if (!value || value === 'none') return null
  const bar = ANNOUNCEMENT_BARS.find(b => b.value === value)
  return bar && 'config' in bar ? bar.config : null
}
