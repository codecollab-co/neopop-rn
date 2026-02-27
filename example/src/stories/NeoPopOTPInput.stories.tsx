import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopOTPInput } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopOTPInput> = {
  title: 'Components/NeoPopOTPInput',
  component: NeoPopOTPInput,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopOTPInput>;

export const Default: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    return <NeoPopOTPInput value={otp} onChangeText={setOtp} length={6} />;
  },
};

export const FourBox: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    return <NeoPopOTPInput value={otp} onChangeText={setOtp} length={4} />;
  },
};

export const WithError: Story = {
  render: () => {
    const [otp, setOtp] = useState('123456');
    return <NeoPopOTPInput value={otp} onChangeText={setOtp} length={6} hasError errorMessage="Invalid OTP. Please try again." />;
  },
};

export const Masked: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    return <NeoPopOTPInput value={otp} onChangeText={setOtp} length={6} secureTextEntry />;
  },
};
