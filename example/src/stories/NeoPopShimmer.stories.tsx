import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopShimmer } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopShimmer> = {
  title: 'Components/NeoPopShimmer',
  component: NeoPopShimmer,
  args: {
    enabled: true,
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopShimmer>;

export const Default: Story = {
  args: { enabled: true },
  render: (args) => (
    <NeoPopShimmer {...args}>
      <View style={{ width: 280, height: 80, backgroundColor: '#333333', borderRadius: 4 }} />
    </NeoPopShimmer>
  ),
};

export const Disabled: Story = {
  args: { enabled: false },
  render: (args) => (
    <NeoPopShimmer {...args}>
      <View style={{ width: 280, height: 80, backgroundColor: '#333333', borderRadius: 4 }} />
    </NeoPopShimmer>
  ),
};

export const CustomColor: Story = {
  args: { enabled: true, color: 'rgba(6,194,112,0.5)', duration: 1000 },
  render: (args) => (
    <NeoPopShimmer {...args}>
      <View style={{ width: 280, height: 80, backgroundColor: '#1a1a2e', borderRadius: 4 }} />
    </NeoPopShimmer>
  ),
};
