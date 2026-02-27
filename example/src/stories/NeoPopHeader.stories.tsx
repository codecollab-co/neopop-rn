import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert, View } from 'react-native';
import { NeoPopHeader } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopHeader> = {
  title: 'Components/NeoPopHeader',
  component: NeoPopHeader,
  args: {
    heading: 'Page Title',
    onBackPress: () => Alert.alert('Back pressed'),
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'flex-start', paddingTop: 48, paddingHorizontal: 0 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopHeader>;

export const Default: Story = {
  args: { heading: 'My Page', onBackPress: () => Alert.alert('Back pressed') },
  render: (args) => <NeoPopHeader {...args} />,
};

export const WithDescription: Story = {
  args: {
    heading: 'Checkout',
    description: 'Review your order before payment',
    onBackPress: () => Alert.alert('Back pressed'),
  },
  render: (args) => <NeoPopHeader {...args} />,
};

export const NoBack: Story = {
  args: { heading: 'Home', onBackPress: undefined },
  render: (args) => <NeoPopHeader {...args} />,
};
