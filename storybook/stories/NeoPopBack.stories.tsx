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

interface BackRowProps {
  heading?: string;
  rightElement?: React.ReactNode;
  maxWidth?: number | string;
}

const BackRow: React.FC<BackRowProps> = ({ heading, rightElement, maxWidth = 480 }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1.25rem',
    background: '#000000',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    maxWidth,
    width: '100%',
    cursor: 'pointer',
    userSelect: 'none',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 4L6 10L12 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      <span style={{
        fontSize: '0.6rem',
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#ffffff',
      }}>
        Back
      </span>
    </div>
    {heading && (
      <>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{
          flex: 1,
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.7)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {heading}
        </span>
      </>
    )}
    {rightElement && (
      <div style={{ flexShrink: 0, marginLeft: 'auto' }}>
        {rightElement}
      </div>
    )}
  </div>
);

const ChipBtn: React.FC<{ label: string }> = ({ label }) => (
  <div style={{
    background: '#0066FF',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.5rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '0.25rem 0.65rem',
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
      NeoPopBack
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Back navigation row — arrow, label, optional heading and right element
    </p>

    <p style={S.sectionTitle}>Default (Arrow Only)</p>
    <BackRow />
    <pre style={S.code}>{`<NeoPopBack onPress={() => navigation.goBack()} />`}</pre>

    <p style={S.sectionTitle}>With Heading</p>
    <BackRow heading="Payment Details" />
    <pre style={S.code}>{`<NeoPopBack
  heading="Payment Details"
  onPress={() => navigation.goBack()}
/>`}</pre>

    <p style={S.sectionTitle}>With Right Element</p>
    <BackRow rightElement={<ChipBtn label="Skip" />} />
    <pre style={S.code}>{`<NeoPopBack
  rightElement={<SkipButton />}
  onPress={() => navigation.goBack()}
/>`}</pre>

    <p style={S.sectionTitle}>Full Composition</p>
    <BackRow heading="CRED Rewards" rightElement={<ChipBtn label="Info" />} />

    <p style={S.sectionTitle}>In Page Context</p>
    <div style={{ maxWidth: 480, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }}>
      <BackRow heading="Bill Payments" rightElement={<ChipBtn label="History" />} maxWidth="100%" />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          Select a Bill
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Choose from your linked utility accounts.
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopBack',
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
      <BackRow />
    </div>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <BackRow heading="Payment Details" />
    </div>
  ),
};

export const WithRightElement: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <BackRow heading="Settings" rightElement={<ChipBtn label="Help" />} />
    </div>
  ),
};
