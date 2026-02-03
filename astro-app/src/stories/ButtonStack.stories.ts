import type { Meta, StoryObj } from 'astrobook';
import ButtonStack from '../components/blocks/ButtonStack.astro';

const meta: Meta<typeof ButtonStack> = {
  title: 'Components/ButtonStack',
  component: ButtonStack,
};

export default meta;
type Story = StoryObj<typeof ButtonStack>;

// Single primary button
export const SinglePrimary: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Get Started',
          buttonLink: {
            href: '/get-started',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Primary and secondary buttons
export const PrimaryAndSecondary: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Book a Demo',
          buttonLink: {
            href: '/demo',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Learn More',
          buttonLink: {
            href: '/learn-more',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'secondary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Primary and tertiary (outline) buttons
export const PrimaryAndTertiary: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Start Free Trial',
          buttonLink: {
            href: '/trial',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Watch Demo',
          buttonLink: {
            href: '/watch-demo',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'tertiary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Ghost button
export const GhostButton: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Read More',
          buttonLink: {
            href: '/read-more',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'ghost',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'LEFT',
      },
    },
  },
};

// GX Score themed buttons
export const GxScoreButtons: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Check Your GX Score',
          buttonLink: {
            href: '/gx-score',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'gx_score',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Learn About GX Score',
          buttonLink: {
            href: '/about-gx-score',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'gx_score_inverted',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Left aligned buttons
export const LeftAligned: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Primary Action',
          buttonLink: {
            href: '/action',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Secondary Action',
          buttonLink: {
            href: '/secondary',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'tertiary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'LEFT',
      },
    },
  },
};

// Right aligned buttons
export const RightAligned: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Contact Us',
          buttonLink: {
            href: '/contact',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'RIGHT',
      },
    },
  },
};

// With pulse animation
export const WithPulseAnimation: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Limited Time Offer',
          buttonLink: {
            href: '/offer',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'secondary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
      animation: {
        type: 'pulse',
      },
    },
  },
};

// With custom spacing
export const WithCustomSpacing: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Sign Up Now',
          buttonLink: {
            href: '/signup',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'View Plans',
          buttonLink: {
            href: '/plans',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'tertiary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
        spacing: {
          marginTop: '24px',
          marginBottom: '24px',
        },
      },
    },
  },
};

// External link (opens in new tab)
export const ExternalLink: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Visit Our Blog',
          buttonLink: {
            href: 'https://blog.example.com',
            openInNewTab: true,
            noFollow: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Three buttons
export const ThreeButtons: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Primary CTA',
          buttonLink: {
            href: '/primary',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Secondary CTA',
          buttonLink: {
            href: '/secondary',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'secondary',
        },
      },
      {
        buttonSettings: {
          btnLabel: 'Tertiary CTA',
          buttonLink: {
            href: '/tertiary',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'tertiary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// Inverted style (for dark backgrounds)
export const InvertedStyle: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Get Started',
          buttonLink: {
            href: '/start',
            openInNewTab: false,
          },
        },
        buttonStyles: {
          bgKind: 'primary-inverted',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// With icon (SVG)
export const WithIcon: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Download Now',
          buttonLink: {
            href: '/download',
            openInNewTab: false,
          },
        },
        btnIcon: {
          iconFieldSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
          iconPosition: 'left',
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};

// With icon on right
export const WithIconRight: Story = {
  args: {
    buttonList: [
      {
        buttonSettings: {
          btnLabel: 'Next Step',
          buttonLink: {
            href: '/next',
            openInNewTab: false,
          },
        },
        btnIcon: {
          iconFieldSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
          iconPosition: 'right',
        },
        buttonStyles: {
          bgKind: 'primary',
        },
      },
    ],
    styles: {
      layout: {
        alignment: 'CENTER',
      },
    },
  },
};
