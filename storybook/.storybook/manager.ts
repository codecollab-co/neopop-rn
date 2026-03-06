import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'neopop-rn',
    brandUrl: 'https://codecollab-co.github.io/neopop-rn/',

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
