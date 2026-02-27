import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Chevron, Cross, Pointer, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const Label = ({ text }: { text: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={10} color="#888888">
    {text}
  </NeoPopTypography>
);

const IconBox = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <View style={{ alignItems: 'center', gap: 8, padding: 16, backgroundColor: '#1a1a1a', borderRadius: 4 }}>
    {children}
    <Label text={label} />
  </View>
);

const meta: Meta = {
  title: 'Icons',
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const ChevronDirections: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
      <IconBox label="UP"><Chevron direction="up" color="#ffffff" size={24} /></IconBox>
      <IconBox label="DOWN"><Chevron direction="down" color="#ffffff" size={24} /></IconBox>
      <IconBox label="LEFT"><Chevron direction="left" color="#ffffff" size={24} /></IconBox>
      <IconBox label="RIGHT"><Chevron direction="right" color="#ffffff" size={24} /></IconBox>
    </View>
  ),
};

export const CrossIcon: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <IconBox label="SMALL"><Cross color="#ffffff" size={16} /></IconBox>
      <IconBox label="MEDIUM"><Cross color="#EF4444" size={24} /></IconBox>
      <IconBox label="LARGE"><Cross color="#06C270" size={32} /></IconBox>
    </View>
  ),
};

export const PointerIcon: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <IconBox label="DEFAULT"><Pointer color="#ffffff" size={24} /></IconBox>
      <IconBox label="ACCENT"><Pointer color="#06C270" size={32} /></IconBox>
    </View>
  ),
};
