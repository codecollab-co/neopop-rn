import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopDropdown } from '@codecollab.co/neopop-rn';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

const meta: Meta<typeof NeoPopDropdown> = {
  title: 'Components/NeoPopDropdown',
  component: NeoPopDropdown,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'flex-start', padding: 24, paddingTop: 64 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopDropdown>;

export const Closed: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <NeoPopDropdown options={OPTIONS} value={selected} onChange={setSelected} placeholder="Select an option" />
    );
  },
};

export const Open: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <NeoPopDropdown options={OPTIONS} value={selected} onChange={setSelected} placeholder="Select an option" defaultOpen />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <NeoPopDropdown options={OPTIONS} value="1" onChange={() => {}} placeholder="Select an option" disabled />
  ),
};
