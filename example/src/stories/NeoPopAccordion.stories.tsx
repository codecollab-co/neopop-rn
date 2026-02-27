import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopAccordion, NeoPopTypography, FontType, FontWeight } from '@codecollab.co/neopop-rn';

const BodyText = ({ text }: { text: string }) => (
  <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={14} color="#cccccc">
    {text}
  </NeoPopTypography>
);

const meta: Meta<typeof NeoPopAccordion> = {
  title: 'Components/NeoPopAccordion',
  component: NeoPopAccordion,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'flex-start', padding: 24, paddingTop: 48 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NeoPopAccordion>;

export const Default: Story = {
  args: { title: 'What is NeoPop?' },
  render: (args) => (
    <NeoPopAccordion {...args}>
      <BodyText text="NeoPop is a design system that blends bold, distinctive styling with practical UI components for React Native applications." />
    </NeoPopAccordion>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {['What is NeoPop?', 'How do I install it?', 'Is it customizable?'].map((title, i) => (
        <NeoPopAccordion key={i} title={title}>
          <BodyText text={`Content for: ${title}. Tap to collapse this section.`} />
        </NeoPopAccordion>
      ))}
    </View>
  ),
};

export const WithRightElement: Story = {
  args: { title: 'Account Settings' },
  render: (args) => (
    <NeoPopAccordion
      {...args}
      rightElement={
        <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={10} color="#06C270">
          NEW
        </NeoPopTypography>
      }
    >
      <BodyText text="Manage your account settings, notifications, and privacy preferences here." />
    </NeoPopAccordion>
  ),
};
