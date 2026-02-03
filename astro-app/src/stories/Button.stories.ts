import type { Meta, StoryObj } from 'astrobook';
import Button from '../components/blocks/Button.astro';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary button - default style
export const Primary: Story = {
  args: {
    settings: {
      buttonText: 'Primary Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'primary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Secondary button - red/orange style
export const Secondary: Story = {
  args: {
    settings: {
      buttonText: 'Secondary Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'secondary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Tertiary button - outlined style
export const Tertiary: Story = {
  args: {
    settings: {
      buttonText: 'Tertiary Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'tertiary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Ghost button - transparent style
export const Ghost: Story = {
  args: {
    settings: {
      buttonText: 'Ghost Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'ghost',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Iris/GX Score button - purple style
export const Iris: Story = {
  args: {
    settings: {
      buttonText: 'Iris Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'iris',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Alternative button style
export const Alternative: Story = {
  args: {
    settings: {
      buttonText: 'Alternative Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'alternative',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Bright blue button style
export const BrightBlue: Story = {
  args: {
    settings: {
      buttonText: 'Bright Blue Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'bright_blue',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Center aligned button
export const CenterAligned: Story = {
  args: {
    settings: {
      buttonText: 'Centered Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'primary',
      },
      alignment: {
        horizontalAlign: 'CENTER',
        buttonWidth: 'auto',
      },
    },
  },
};

// Full width button
export const FullWidth: Story = {
  args: {
    settings: {
      buttonText: 'Full Width Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'secondary',
      },
      alignment: {
        horizontalAlign: 'CENTER',
        buttonWidth: 'full',
      },
    },
  },
};

// Button with pulse animation
export const WithPulseAnimation: Story = {
  args: {
    settings: {
      buttonText: 'Pulsing Button',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    styles: {
      background: {
        bgKind: 'secondary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
      animation: {
        type: 'pulse',
      },
    },
  },
};

// Button with icon on left
export const WithLeftIcon: Story = {
  args: {
    settings: {
      buttonText: 'Button with Icon',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    btnIcon: {
      iconFieldSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
      iconPosition: 'left',
    },
    styles: {
      background: {
        bgKind: 'primary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};

// Button with icon on right
export const WithRightIcon: Story = {
  args: {
    settings: {
      buttonText: 'Button with Icon',
      link: {
        href: '#',
        urlType: 'EXTERNAL',
      },
    },
    btnIcon: {
      iconFieldSvg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
      iconPosition: 'right',
    },
    styles: {
      background: {
        bgKind: 'primary',
      },
      alignment: {
        horizontalAlign: 'LEFT',
        buttonWidth: 'auto',
      },
    },
  },
};
