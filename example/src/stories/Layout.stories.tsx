import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import {
  Row,
  Column,
  HorizontalDivider,
  VerticalSpacer,
  HorizontalSpacer,
  PageContainer,
  NeoPopTypography,
  FontType,
  FontWeight,
} from '@codecollab.co/neopop-rn';

const Box = ({ color = '#333333', label }: { color?: string; label: string }) => (
  <View style={{ backgroundColor: color, padding: 12, alignItems: 'center', justifyContent: 'center' }}>
    <NeoPopTypography fontType={FontType.CAPS} fontWeight={FontWeight.MEDIUM} fontSize={10} color="#ffffff">
      {label}
    </NeoPopTypography>
  </View>
);

const meta: Meta = {
  title: 'Layout',
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: '#0d0d0d', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const RowExample: Story = {
  render: () => (
    <Row style={{ gap: 8 }}>
      <Box color="#1e3a5f" label="LEFT" />
      <Box color="#1e3a5f" label="CENTER" />
      <Box color="#1e3a5f" label="RIGHT" />
    </Row>
  ),
};

export const ColumnExample: Story = {
  render: () => (
    <Column style={{ gap: 8 }}>
      <Box color="#3a1e5f" label="TOP" />
      <Box color="#3a1e5f" label="MIDDLE" />
      <Box color="#3a1e5f" label="BOTTOM" />
    </Column>
  ),
};

export const Divider: Story = {
  render: () => (
    <Column>
      <Box color="#1e3a5f" label="SECTION A" />
      <VerticalSpacer height={12} />
      <HorizontalDivider color="#333333" />
      <VerticalSpacer height={12} />
      <Box color="#1e3a5f" label="SECTION B" />
    </Column>
  ),
};

export const Spacers: Story = {
  render: () => (
    <PageContainer style={{ backgroundColor: '#111111', padding: 16 }}>
      <Row style={{ alignItems: 'center' }}>
        <Box color="#5f1e1e" label="A" />
        <HorizontalSpacer width={24} />
        <Box color="#5f1e1e" label="B" />
        <HorizontalSpacer width={48} />
        <Box color="#5f1e1e" label="C" />
      </Row>
    </PageContainer>
  ),
};
