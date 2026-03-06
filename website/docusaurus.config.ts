import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'neopop-rn',
  tagline: 'NeoPop design system for React Native — 3D, tactile, animated UI components',
  favicon: 'img/favicon.svg',

  url: 'https://codecollab-co.github.io',
  baseUrl: '/neopop-rn/',

  organizationName: 'codecollab-co',
  projectName: 'neopop-rn',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/codecollab-co/neopop-rn/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/neopop-social.png',
    navbar: {
      title: 'neopop-rn',
      logo: {
        alt: 'NeoPop Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://codecollab-co.github.io/neopop-rn/storybook/index.html',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://github.com/codecollab-co/neopop-rn',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@codecollab.co/neopop-rn',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'Theming', to: '/docs/theming'},
            {label: 'Design Tokens', to: '/docs/tokens'},
            {label: 'Migration Guide', to: '/docs/migration'},
          ],
        },
        {
          title: 'Components',
          items: [
            {label: 'NeoPopButton', to: '/docs/components/NeoPopButton'},
            {label: 'NeoPopCard', to: '/docs/components/NeoPopCard'},
            {label: 'NeoPopBottomSheet', to: '/docs/components/NeoPopBottomSheet'},
            {label: 'All Components →', to: '/docs/components/NeoPopButton'},
          ],
        },
        {
          title: 'Playground',
          items: [
            {label: 'Component Playground', href: 'https://codecollab-co.github.io/neopop-rn/storybook/index.html'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/codecollab-co/neopop-rn'},
            {label: 'npm', href: 'https://www.npmjs.com/package/@codecollab.co/neopop-rn'},
            {label: 'Contributing', to: '/docs/contributing'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CodeCollab Co. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'tsx', 'json'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
