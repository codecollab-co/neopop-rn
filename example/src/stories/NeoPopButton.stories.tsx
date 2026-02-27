import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopButton, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopButton> = {
  title: 'Components/NeoPopButton',
  component: NeoPopButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'stroke'],
    },
    size: {
      control: 'select',
      options: ['big', 'medium', 'small'],
    },
    disabled:     { control: 'boolean' },
    enableHaptics: { control: 'boolean' },
    fullWidth:    { control: 'boolean' },
    depth:        { control: { type: 'range', min: 0, max: 8, step: 1 } },
  },
  args: {
    variant:      'elevated',
    size:         'medium',
    disabled:     false,
    enableHaptics: false,
    fullWidth:    false,
    depth:        3,
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', paddingVertical: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopButton>;

const Label = ({ text, color = '#0d0d0d' }: { text: string; color?: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color={color}>
    {text}
  </NeoPopTypography>
);

export const Elevated: Story = {
  args: { variant: 'elevated', colorConfig: { color: '#ffffff' } },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="ELEVATED BUTTON" />
    </NeoPopButton>
  ),
};

export const Flat: Story = {
  args: { variant: 'flat', colorConfig: { color: '#ffffff' } },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="FLAT BUTTON" />
    </NeoPopButton>
  ),
};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
    colorConfig: { color: 'transparent', borderColor: '#ffffff' },
  },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="STROKE BUTTON" color="#ffffff" />
    </NeoPopButton>
  ),
};

export const WithShimmer: Story = {
  args: {
    variant: 'elevated',
    colorConfig: { color: '#06C270' },
    shimmerConfig: { enabled: true, color: 'rgba(255,255,255,0.4)', duration: 1500 },
  },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="SHIMMER BUTTON" color="#ffffff" />
    </NeoPopButton>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, colorConfig: { color: '#ffffff' } },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="DISABLED BUTTON" />
    </NeoPopButton>
  ),
};

export const Big: Story = {
  args: { size: 'big', fullWidth: true, colorConfig: { color: '#ffffff' } },
  render: (args) => (
    <NeoPopButton {...args}>
      <Label text="BIG FULL WIDTH" />
    </NeoPopButton>
  ),
};

export const AdjacentButtons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 0 }}>
      <NeoPopButton
        variant="elevated"
        size="medium"
        colorConfig={{ color: '#ffffff' }}
        adjacentRight
        style={{ flex: 1 }}
      >
        <Label text="LEFT" />
      </NeoPopButton>
      <NeoPopButton
        variant="elevated"
        size="medium"
        colorConfig={{ color: '#06C270' }}
        adjacentLeft
        style={{ flex: 1 }}
      >
        <Label text="RIGHT" color="#ffffff" />
      </NeoPopButton>
    </View>
  ),
};
