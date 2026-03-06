import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const S = {
  page: {
    fontFamily: "'Outfit', sans-serif",
    background: '#000000',
    minHeight: '100vh',
    padding: '3rem',
    color: '#ffffff',
  } as React.CSSProperties,
  heading: {
    fontSize: '0.6rem',
    fontWeight: 700 as const,
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    color: '#0066FF',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '0.55rem',
    fontWeight: 700 as const,
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
    marginBottom: '1.25rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    marginTop: '2rem',
  } as React.CSSProperties,
  code: {
    background: '#0a0a0a',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '1rem 1.25rem',
    fontFamily: "'Courier New', monospace",
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.7,
    whiteSpace: 'pre' as const,
    overflowX: 'auto' as const,
    maxWidth: 400,
    marginTop: '1rem',
  } as React.CSSProperties,
};

interface HeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  maxWidth?: number | string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  showBack = false,
  rightElement,
  maxWidth = 480,
}) => (
  <div
    style={{
      background: '#000000',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '1rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      maxWidth,
      width: '100%',
    }}
  >
    {showBack && (
      <button
        style={{
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        fontSize: '1rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: '#ffffff',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {title}
      </div>
      {description && (
        <div style={{
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.03em',
          marginTop: '0.2rem',
        }}>
          {description}
        </div>
      )}
    </div>
    {rightElement && (
      <div style={{ flexShrink: 0 }}>
        {rightElement}
      </div>
    )}
  </div>
);

const ChipButton: React.FC<{ label: string }> = ({ label }) => (
  <div style={{
    background: '#0066FF',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '0.3rem 0.75rem',
    boxShadow: '2px 2px 0 0 rgba(0,40,140,0.8)',
    cursor: 'pointer',
  }}>
    {label}
  </div>
);

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopHeader
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Page header row — title, back button, description, right element
    </p>

    <p style={S.sectionTitle}>Default (Title Only)</p>
    <Header title="My Account" />
    <pre style={S.code}>{`<NeoPopHeader title="My Account" />`}</pre>

    <p style={S.sectionTitle}>With Back Button</p>
    <Header title="Payment Details" showBack />
    <pre style={S.code}>{`<NeoPopHeader
  title="Payment Details"
  showBackButton
  onBackPress={() => navigation.goBack()}
/>`}</pre>

    <p style={S.sectionTitle}>With Description</p>
    <Header
      title="CRED Rewards"
      description="Earn coins on every payment"
      showBack
    />
    <pre style={S.code}>{`<NeoPopHeader
  title="CRED Rewards"
  description="Earn coins on every payment"
  showBackButton
/>`}</pre>

    <p style={S.sectionTitle}>With Right Element</p>
    <Header
      title="Transactions"
      showBack
      rightElement={<ChipButton label="Filter" />}
    />
    <pre style={S.code}>{`<NeoPopHeader
  title="Transactions"
  showBackButton
  rightElement={
    <NeoPopChip label="Filter" onPress={openFilter} />
  }
/>`}</pre>

    <p style={S.sectionTitle}>Full Composition</p>
    <Header
      title="CRED Pay"
      description="Unified payments dashboard"
      showBack
      rightElement={
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ChipButton label="Help" />
          <ChipButton label="Settings" />
        </div>
      }
    />

    <p style={S.sectionTitle}>In Page Context</p>
    <div style={{ maxWidth: 480, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }}>
      <Header
        title="Bill Payments"
        showBack
        rightElement={<ChipButton label="History" />}
        maxWidth="100%"
      />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Page body content appears here below the header.
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopHeader',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Default: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Header title="My Account" />
    </div>
  ),
};

export const WithBack: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Header title="Payment Details" showBack />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Header title="CRED Rewards" description="Earn coins on every payment" showBack />
    </div>
  ),
};

export const WithRightElement: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Header title="Transactions" showBack rightElement={<ChipButton label="Filter" />} />
    </div>
  ),
};
