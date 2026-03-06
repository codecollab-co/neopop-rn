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

type TagType = 'success' | 'error' | 'warning' | 'info' | 'custom';

const TAG_COLORS: Record<TagType, { bg: string; border: string; text: string; dot: string }> = {
  success: { bg: 'rgba(6,194,112,0.1)', border: 'rgba(6,194,112,0.35)', text: '#06C270', dot: '#06C270' },
  error:   { bg: 'rgba(238,77,55,0.1)',  border: 'rgba(238,77,55,0.35)',  text: '#EE4D37', dot: '#EE4D37' },
  warning: { bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.35)', text: '#F5A623', dot: '#F5A623' },
  info:    { bg: 'rgba(33,150,243,0.1)', border: 'rgba(33,150,243,0.35)', text: '#2196F3', dot: '#2196F3' },
  custom:  { bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.35)', text: '#7C5CFC', dot: '#7C5CFC' },
};

const TYPE_ICONS: Record<TagType, string> = {
  success: '✓',
  error:   '✕',
  warning: '!',
  info:    'i',
  custom:  '★',
};

interface TagProps {
  type?: TagType;
  label?: string;
  showIcon?: boolean;
}

const Tag: React.FC<TagProps> = ({ type = 'info', label = 'Label', showIcon = false }) => {
  const colors = TAG_COLORS[type];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      padding: '0.25rem 0.65rem',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: colors.text,
      whiteSpace: 'nowrap',
    }}>
      {showIcon && (
        <span style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: colors.dot,
          color: '#000',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.5rem',
          fontWeight: 900,
          flexShrink: 0,
        }}>
          {TYPE_ICONS[type]}
        </span>
      )}
      {label}
    </div>
  );
};

const TagWithDot: React.FC<TagProps> = ({ type = 'info', label = 'Label' }) => {
  const colors = TAG_COLORS[type];
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: colors.text,
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      padding: '0.25rem 0.65rem',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.dot, flexShrink: 0 }} />
      {label}
    </div>
  );
};

const ALL_TYPES: TagType[] = ['success', 'error', 'warning', 'info', 'custom'];
const TAG_LABELS: Record<TagType, string> = {
  success: 'Payment Successful',
  error: 'Transaction Failed',
  warning: 'Action Required',
  info: 'Processing',
  custom: 'Premium',
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopTags
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Semantic pill badges — success, error, warning, info, custom
    </p>

    <p style={S.sectionTitle}>All Types — Without Icon</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {ALL_TYPES.map(t => <Tag key={t} type={t} label={TAG_LABELS[t]} />)}
    </div>
    <pre style={S.code}>{`<NeoPopTag
  type="success"
  label="Payment Successful"
/>`}</pre>

    <p style={S.sectionTitle}>All Types — With Icon</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {ALL_TYPES.map(t => <Tag key={t} type={t} label={TAG_LABELS[t]} showIcon />)}
    </div>
    <pre style={S.code}>{`<NeoPopTag
  type="error"
  label="Transaction Failed"
  showIcon
/>`}</pre>

    <p style={S.sectionTitle}>With Status Dot</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {ALL_TYPES.map(t => <TagWithDot key={t} type={t} label={TAG_LABELS[t]} />)}
    </div>

    <p style={S.sectionTitle}>In Context</p>
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', maxWidth: 380 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.25rem' }}>HDFC Bank</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Savings Account</div>
        </div>
        <Tag type="success" label="Active" showIcon />
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag type="info" label="KYC Verified" />
        <Tag type="warning" label="Limit Warning" />
      </div>
    </div>
  </div>
);

interface PlaygroundProps {
  type?: TagType;
  label?: string;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ type = 'info', label = 'Tag Label' }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
    <Tag type={type} label={label} />
    <Tag type={type} label={label} showIcon />
    <TagWithDot type={type} label={label} />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopTags',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    type: { control: { type: 'select' }, options: ALL_TYPES },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Success: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      <Tag type="success" label="Payment Successful" />
      <Tag type="success" label="Payment Successful" showIcon />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      <Tag type="error" label="Transaction Failed" />
      <Tag type="error" label="Transaction Failed" showIcon />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
      {ALL_TYPES.map(t => <Tag key={t} type={t} label={TAG_LABELS[t]} showIcon />)}
    </div>
  ),
};

export const Playground: Story = {
  args: { type: 'info', label: 'Tag Label' },
};
