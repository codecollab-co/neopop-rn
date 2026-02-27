import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopCheckbox, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopCheckbox> = {
  title: 'Components/NeoPopCheckbox',
  component: NeoPopCheckbox,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopCheckbox>;

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <NeoPopCheckbox checked={checked} onPress={() => setChecked((v) => !v)} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <NeoPopCheckbox checked={checked} onPress={() => setChecked((v) => !v)} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <NeoPopCheckbox checked={checked} onPress={() => setChecked((v) => !v)} />
        <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={14} color="#ffffff">
          I agree to the terms and conditions
        </NeoPopTypography>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => <NeoPopCheckbox checked={false} onPress={() => {}} disabled />,
};
