import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopBottomSheet, NeoPopButton, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const Label = ({ text }: { text: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#0d0d0d">
    {text}
  </NeoPopTypography>
);

const meta: Meta = {
  title: 'Components/NeoPopBottomSheet',
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

export const Default: Story = {
  render: () => {
    const ref = useRef<any>(null);
    return (
      <>
        <NeoPopButton variant="elevated" size="medium" colorConfig={{ color: '#ffffff' }} onPress={() => ref.current?.open()}>
          <Label text="OPEN SHEET" />
        </NeoPopButton>
        <NeoPopBottomSheet ref={ref}>
          <View style={{ padding: 24 }}>
            <NeoPopTypography fontType={FontType.HEADING} fontWeight={FontWeight.BOLD} fontSize={20} color="#ffffff">
              Bottom Sheet
            </NeoPopTypography>
          </View>
        </NeoPopBottomSheet>
      </>
    );
  },
};

export const WithNotch: Story = {
  render: () => {
    const ref = useRef<any>(null);
    return (
      <>
        <NeoPopButton variant="elevated" size="medium" colorConfig={{ color: '#ffffff' }} onPress={() => ref.current?.open()}>
          <Label text="OPEN WITH NOTCH" />
        </NeoPopButton>
        <NeoPopBottomSheet ref={ref} showNotch>
          <View style={{ padding: 24 }}>
            <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={16} color="#ffffff">
              Sheet with a notch indicator at the top.
            </NeoPopTypography>
          </View>
        </NeoPopBottomSheet>
      </>
    );
  },
};

export const Blocking: Story = {
  render: () => {
    const ref = useRef<any>(null);
    return (
      <>
        <NeoPopButton variant="elevated" size="medium" colorConfig={{ color: '#EF4444' }} onPress={() => ref.current?.open()}>
          <Label text="OPEN BLOCKING" />
        </NeoPopButton>
        <NeoPopBottomSheet ref={ref} blocking>
          <View style={{ padding: 24 }}>
            <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={16} color="#ffffff">
              This sheet cannot be dismissed by tapping outside.
            </NeoPopTypography>
          </View>
        </NeoPopBottomSheet>
      </>
    );
  },
};
