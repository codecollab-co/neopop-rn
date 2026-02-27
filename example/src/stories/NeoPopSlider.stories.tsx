import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopSlider, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopSlider> = {
  title: 'Components/NeoPopSlider',
  component: NeoPopSlider,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopSlider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <View style={{ gap: 12 }}>
        <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#888888">
          VALUE: {value}
        </NeoPopTypography>
        <NeoPopSlider value={value} onValueChange={setValue} minimumValue={0} maximumValue={100} />
      </View>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(20);
    return (
      <View style={{ gap: 12 }}>
        <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#888888">
          STEP VALUE: {value}
        </NeoPopTypography>
        <NeoPopSlider value={value} onValueChange={setValue} minimumValue={0} maximumValue={100} step={10} />
      </View>
    );
  },
};

export const CustomColors: Story = {
  render: () => {
    const [value, setValue] = useState(65);
    return (
      <View style={{ gap: 12 }}>
        <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#888888">
          VALUE: {value}
        </NeoPopTypography>
        <NeoPopSlider value={value} onValueChange={setValue} minimumValue={0} maximumValue={100} minimumTrackTintColor="#06C270" maximumTrackTintColor="#333333" thumbTintColor="#06C270" />
      </View>
    );
  },
};
