import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopTags } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopTags> = {
  title: 'Components/NeoPopTags',
  component: NeoPopTags,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopTags>;

export const Success: Story = {
  args: { type: 'success', label: 'Success' },
  render: (args) => <NeoPopTags {...args} />,
};

export const Error: Story = {
  args: { type: 'error', label: 'Error' },
  render: (args) => <NeoPopTags {...args} />,
};

export const Warning: Story = {
  args: { type: 'warning', label: 'Warning' },
  render: (args) => <NeoPopTags {...args} />,
};

export const Info: Story = {
  args: { type: 'info', label: 'Info' },
  render: (args) => <NeoPopTags {...args} />,
};

export const Custom: Story = {
  args: { label: 'Custom Tag', backgroundColor: '#6200ea', textColor: '#ffffff' },
  render: (args) => <NeoPopTags {...args} />,
};
