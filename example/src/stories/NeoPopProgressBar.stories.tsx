import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopProgressBar, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopProgressBar> = {
  title: 'Components/NeoPopProgressBar',
  component: NeoPopProgressBar,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopProgressBar>;

export const Horizontal: Story = {
  args: { progress: 0.65, variant: 'horizontal' },
  render: (args) => (
    <View style={{ width: '100%', gap: 8 }}>
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#888888">
        65% COMPLETE
      </NeoPopTypography>
      <NeoPopProgressBar {...args} />
    </View>
  ),
};

export const Circular: Story = {
  args: { progress: 0.75, variant: 'circular', size: 100 },
  render: (args) => (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <NeoPopProgressBar {...args} />
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#888888">
        75%
      </NeoPopTypography>
    </View>
  ),
};

export const WithLabel: Story = {
  args: { progress: 0.4, variant: 'horizontal', showLabel: true, label: '40%' },
  render: (args) => (
    <View style={{ width: '100%' }}>
      <NeoPopProgressBar {...args} />
    </View>
  ),
};
