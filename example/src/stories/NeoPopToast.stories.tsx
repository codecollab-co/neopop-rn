import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopButton, NeoPopTypography, FontType, FontWeight, ToastProvider, useToast } from '@codecollab.co/neopop-rn';

const Label = ({ text }: { text: string }) => (
  <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.BOLD} fontSize={14} color="#0d0d0d">
    {text}
  </NeoPopTypography>
);

const ToastTrigger = ({ type, label, message }: { type: string; label: string; message: string }) => {
  const { showToast } = useToast();
  return (
    <NeoPopButton variant="elevated" size="medium" colorConfig={{ color: '#ffffff' }} onPress={() => showToast({ message, type: type as any })}>
      <Label text={label} />
    </NeoPopButton>
  );
};

const meta: Meta = {
  title: 'Components/NeoPopToast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Story />
        </View>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => <ToastTrigger type="success" label="SHOW SUCCESS" message="Operation completed successfully!" />,
};

export const Error: Story = {
  render: () => <ToastTrigger type="error" label="SHOW ERROR" message="Something went wrong. Please try again." />,
};

export const Warning: Story = {
  render: () => <ToastTrigger type="warning" label="SHOW WARNING" message="Please review before proceeding." />,
};

export const Custom: Story = {
  render: () => <ToastTrigger type="info" label="SHOW CUSTOM" message="This is a custom informational toast." />,
};
