import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert, View } from 'react-native';
import { NeoPopTiltedButton, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const Label = ({ text, color = '#0d0d0d' }: { text: string; color?: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color={color}>
    {text}
  </NeoPopTypography>
);

const meta: Meta<typeof NeoPopTiltedButton> = {
  title: 'Components/NeoPopTiltedButton',
  component: NeoPopTiltedButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopTiltedButton>;

export const Default: Story = {
  args: { colorConfig: { color: '#ffffff' }, onPress: () => Alert.alert('Tilted button pressed') },
  render: (args) => (
    <NeoPopTiltedButton {...args}>
      <Label text="TILTED BUTTON" />
    </NeoPopTiltedButton>
  ),
};

export const Floating: Story = {
  args: {
    colorConfig: { color: '#EAB308' },
    floating: true,
    onPress: () => Alert.alert('Floating tilted pressed'),
  },
  render: (args) => (
    <NeoPopTiltedButton {...args}>
      <Label text="FLOATING TILTED" color="#0d0d0d" />
    </NeoPopTiltedButton>
  ),
};
