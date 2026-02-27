import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopInputField } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopInputField> = {
  title: 'Components/NeoPopInputField',
  component: NeoPopInputField,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopInputField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <NeoPopInputField value={value} onChangeText={setValue} placeholder="Enter text..." label="Label" />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('invalid input');
    return (
      <NeoPopInputField value={value} onChangeText={setValue} label="Email" placeholder="email@example.com" errorMessage="Please enter a valid email address." />
    );
  },
};

export const CharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <NeoPopInputField value={value} onChangeText={setValue} label="Bio" placeholder="Tell us about yourself..." maxLength={100} showCharacterCount />
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <NeoPopInputField value={value} onChangeText={setValue} label="Notes" placeholder="Add your notes here..." multiline numberOfLines={4} />
    );
  },
};
