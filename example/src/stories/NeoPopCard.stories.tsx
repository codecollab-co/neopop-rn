import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert, View } from 'react-native';
import { NeoPopCard, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopCard> = {
  title: 'Components/NeoPopCard',
  component: NeoPopCard,
  args: {
    color: '#161616',
    depth: 3,
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopCard>;

export const Default: Story = {
  args: { color: '#161616' },
  render: (args) => (
    <NeoPopCard {...args} style={{ padding: 24, width: 280 }}>
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#ffffff">
        DEFAULT CARD
      </NeoPopTypography>
    </NeoPopCard>
  ),
};

export const WithEdges: Story = {
  args: { color: '#1a1a2e', depth: 4, edges: ['bottom', 'right'] },
  render: (args) => (
    <NeoPopCard {...args} style={{ padding: 24, width: 280 }}>
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#ffffff">
        WITH EDGES
      </NeoPopTypography>
    </NeoPopCard>
  ),
};

export const Pressable: Story = {
  args: { color: '#06C270', depth: 3, onPress: () => Alert.alert('Card Pressed!') },
  render: (args) => (
    <NeoPopCard {...args} style={{ padding: 24, width: 280 }}>
      <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#ffffff">
        PRESSABLE CARD
      </NeoPopTypography>
    </NeoPopCard>
  ),
};
