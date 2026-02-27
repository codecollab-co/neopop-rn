import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopRadio, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopRadio> = {
  title: 'Components/NeoPopRadio',
  component: NeoPopRadio,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopRadio>;

export const Unchecked: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return <NeoPopRadio selected={selected} onPress={() => setSelected((v) => !v)} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [selected, setSelected] = useState(true);
    return <NeoPopRadio selected={selected} onPress={() => setSelected((v) => !v)} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const options = ['Option A', 'Option B', 'Option C'];
    return (
      <View style={{ gap: 16 }}>
        {options.map((opt) => (
          <View key={opt} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <NeoPopRadio selected={value === opt} onPress={() => setValue(opt)} />
            <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={14} color="#ffffff">
              {opt}
            </NeoPopTypography>
          </View>
        ))}
      </View>
    );
  },
};
