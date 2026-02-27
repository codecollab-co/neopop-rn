import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopToggle, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopToggle> = {
  title: 'Components/NeoPopToggle',
  component: NeoPopToggle,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopToggle>;

export const Off: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <NeoPopToggle value={on} onValueChange={setOn} />;
  },
};

export const On: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return <NeoPopToggle value={on} onValueChange={setOn} />;
  },
};

export const WithHaptics: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <NeoPopToggle value={on} onValueChange={setOn} enableHaptics />
        <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={14} color="#ffffff">
          {on ? 'Enabled' : 'Disabled'}
        </NeoPopTypography>
      </View>
    );
  },
};
