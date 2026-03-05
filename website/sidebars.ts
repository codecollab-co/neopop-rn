import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'theming',
      label: 'Theming',
    },
    {
      type: 'doc',
      id: 'tokens',
      label: 'Design Tokens',
    },
    {
      type: 'doc',
      id: 'contributing',
      label: 'Contributing',
    },
    {
      type: 'doc',
      id: 'migration',
      label: 'Migration Guide',
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/NeoPopButton',
        'components/NeoPopCard',
        'components/NeoPopShimmer',
        'components/NeoPopTypography',
        'components/NeoPopToast',
        'components/NeoPopBack',
        'components/NeoPopHeader',
        'components/NeoPopTags',
        'components/NeoPopCheckbox',
        'components/NeoPopRadio',
        'components/NeoPopToggle',
        'components/NeoPopInputField',
        'components/NeoPopDropdown',
        'components/NeoPopBottomSheet',
        'components/NeoPopSlider',
        'components/NeoPopFloatingButton',
        'components/NeoPopTiltedButton',
        'components/NeoPopScoreMeter',
        'components/NeoPopOTPInput',
        'components/NeoPopProgressBar',
        'components/NeoPopAccordion',
        'components/NeoPopStepper',
        'components/NeoPopSwipeRow',
        'components/NeoPopCarousel',
        'components/NeoPopDatePicker',
      ],
    },
    {
      type: 'category',
      label: 'Layout Helpers',
      collapsed: true,
      items: [
        'components/Row',
        'components/Column',
        'components/PageContainer',
      ],
    },
    {
      type: 'category',
      label: 'Icons',
      collapsed: true,
      items: [
        'components/Chevron',
        'components/Cross',
        'components/Pointer',
      ],
    },
  ],
};

export default sidebars;
