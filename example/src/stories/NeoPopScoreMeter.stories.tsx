import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopScoreMeter } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopScoreMeter> = {
  title: 'Components/NeoPopScoreMeter',
  component: NeoPopScoreMeter,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopScoreMeter>;

export const Excellent: Story = {
  args: { score: 800, minScore: 300, maxScore: 900, label: 'Excellent' },
  render: (args) => <NeoPopScoreMeter {...args} />,
};

export const Average: Story = {
  args: { score: 600, minScore: 300, maxScore: 900, label: 'Average' },
  render: (args) => <NeoPopScoreMeter {...args} />,
};

export const Poor: Story = {
  args: { score: 380, minScore: 300, maxScore: 900, label: 'Poor' },
  render: (args) => <NeoPopScoreMeter {...args} />,
};
