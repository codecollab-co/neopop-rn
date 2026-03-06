import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'neopop-rn',
    brandUrl: 'https://codecollab-co.github.io/neopop-rn/',
    brandImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32"%3E%3Crect x="4" y="4" width="32" height="32" fill="%230066FF"/%3E%3Cpolygon points="36,4 44,12 44,44 36,36" fill="%230047b3"/%3E%3Cpolygon points="4,36 36,36 44,44 12,44" fill="%23003a94"/%3E%3Ctext x="8" y="28" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="%23ffffff"%3EN%3C/text%3E%3C/svg%3E',
    brandTarget: '_self',

    // Pure black canvas — matches CRED
    colorPrimary: '#0066FF',
    colorSecondary: '#0066FF',

    // UI
    appBg: '#000000',
    appContentBg: '#000000',
    appBorderColor: 'rgba(255,255,255,0.07)',
    appBorderRadius: 0,

    // Typography — Outfit (Gilroy alternative)
    fontBase: '"Outfit", sans-serif',
    fontCode: '"SF Mono", "Fira Code", monospace',

    // Text colors
    textColor: '#ffffff',
    textInverseColor: '#000000',
    textMutedColor: 'rgba(255,255,255,0.4)',

    // Toolbar
    barTextColor: 'rgba(255,255,255,0.5)',
    barSelectedColor: '#0066FF',
    barBg: '#000000',
    barHoverColor: '#0066FF',

    // Form
    inputBg: '#0a0a0a',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputTextColor: '#ffffff',
    inputBorderRadius: 0,
  }),
});
