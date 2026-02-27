import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert, View } from 'react-native';
import { NeoPopFloatingButton, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const Label = ({ text }: { text: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#0d0d0d">
    {text}
  </NeoPopTypography>
);

const meta: Meta<typeof NeoPopFloatingButton> = {
  title: 'Components/NeoPopFloatingButton',
  component: NeoPopFloatingButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopFloatingButton>;

export const Default: Story = {
  args: { colorConfig: { color: '#ffffff' }, onPress: () => Alert.alert('Floating button pressed') },
  render: (args) => (
    <NeoPopFloatingButton {...args}>
      <Label text="FLOATING" />
    </NeoPopFloatingButton>
  ),
};

export const WithShimmer: Story = {
  args: {
    colorConfig: { color: '#06C270' },
    shimmerConfig: { enabled: true, color: 'rgba(255,255,255,0.4)', duration: 1500 },
    onPress: () => Alert.alert('Floating button pressed'),
  },
  render: (args) => (
    <NeoPopFloatingButton {...args}>
      <Label text="SHIMMER FLOAT" />
    </NeoPopFloatingButton>
  ),
};
