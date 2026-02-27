import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert, View } from 'react-native';
import { NeoPopBack, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopBack> = {
  title: 'Components/NeoPopBack',
  component: NeoPopBack,
  args: {
    heading: 'Back',
    onPress: () => Alert.alert('Back pressed'),
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopBack>;

export const Default: Story = {
  args: { heading: 'Go Back', onPress: () => Alert.alert('Back pressed') },
  render: (args) => <NeoPopBack {...args} />,
};

export const WithRightElement: Story = {
  args: { heading: 'Settings', onPress: () => Alert.alert('Back pressed') },
  render: (args) => (
    <NeoPopBack
      {...args}
      rightElement={
        <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={12} color="#06C270">
          DONE
        </NeoPopTypography>
      }
    />
  ),
};

export const ColorModeDark: Story = {
  args: { heading: 'Dark Mode', onPress: () => Alert.alert('Back pressed'), colorMode: 'dark' },
  render: (args) => (
    <View style={{ backgroundColor: '#ffffff', padding: 16 }}>
      <NeoPopBack {...args} />
    </View>
  ),
};
