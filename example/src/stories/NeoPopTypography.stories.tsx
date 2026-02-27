import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { NeoPopTypography, FontType, FontWeight, TextOverflow } from '@codecollab.co/neopop-rn';

const meta: Meta<typeof NeoPopTypography> = {
  title: 'Components/NeoPopTypography',
  component: NeoPopTypography,
  args: {
    color: '#ffffff',
    fontSize: 16,
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
type Story = StoryObj<typeof NeoPopTypography>;

export const Heading: Story = {
  render: () => (
    <NeoPopTypography fontType={FontType.HEADING} fontWeight={FontWeight.BOLD} fontSize={28} color="#ffffff">
      Heading Bold
    </NeoPopTypography>
  ),
};

export const Caps: Story = {
  render: () => (
    <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={14} color="#06C270">
      CAPS MEDIUM TEXT
    </NeoPopTypography>
  ),
};

export const Body: Story = {
  render: () => (
    <NeoPopTypography fontType={FontType.BODY} fontWeight={FontWeight.REGULAR} fontSize={16} color="#cccccc">
      This is regular body text used for paragraphs and descriptions.
    </NeoPopTypography>
  ),
};

export const SerifHeading: Story = {
  render: () => (
    <NeoPopTypography fontType={FontType.SERIF} fontWeight={FontWeight.BOLD} fontSize={32} color="#ffffff">
      Serif Heading
    </NeoPopTypography>
  ),
};

export const WithOverflow: Story = {
  render: () => (
    <View style={{ width: 200 }}>
      <NeoPopTypography
        fontType={FontType.BODY}
        fontWeight={FontWeight.REGULAR}
        fontSize={14}
        color="#ffffff"
        textOverflow={TextOverflow.ELLIPSIS}
        numberOfLines={1}
      >
        This text is very long and will be truncated with an ellipsis at the end.
      </NeoPopTypography>
    </View>
  ),
};
