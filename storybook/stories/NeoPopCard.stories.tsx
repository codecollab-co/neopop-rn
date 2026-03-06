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
  variantLabel: {
    fontSize: '0.5rem',
    fontWeight: 700 as const,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
    marginBottom: '0.75rem',
    display: 'block',
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

interface NeoPopCardProps {
  children?: React.ReactNode;
  disabled?: boolean;
  faceColor?: string;
  width?: number | string;
  height?: number | string;
}

const NeoPopCardComponent: React.FC<NeoPopCardProps> = ({
  children,
  disabled = false,
  faceColor = '#0a0a0a',
  width = 260,
  height = 'auto',
}) => (
  <div
    style={{
      display: 'inline-block',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
  >
    <div
      style={{
        background: faceColor,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '4px 4px 0 0 rgba(255,255,255,0.12)',
        width,
        height,
        padding: '1.5rem',
        fontFamily: "'Outfit', sans-serif",
        color: '#ffffff',
        position: 'relative',
      }}
    >
      {children}
    </div>
  </div>
);

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopCard
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      3D surface container — same depth language as NeoPopButton
    </p>

    <p style={S.sectionTitle}>Default</p>
    <span style={S.variantLabel}>Empty card surface</span>
    <NeoPopCardComponent width={260} height={120} />
    <pre style={S.code}>{`<NeoPopCard
  backgroundColor="#0a0a0a"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>With Content</p>
    <span style={S.variantLabel}>Heading + body text</span>
    <NeoPopCardComponent width={320}>
      <div style={{
        fontSize: '0.5rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#0066FF',
        marginBottom: '0.75rem',
      }}>
        Card Tag
      </div>
      <div style={{
        fontSize: '1.1rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        marginBottom: '0.6rem',
        lineHeight: 1.2,
      }}>
        Card Heading
      </div>
      <div style={{
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.6,
        letterSpacing: '0.02em',
        marginBottom: '1.25rem',
      }}>
        A surface container that carries the NeoPop 3D depth language.
        Use it to group related content with tactile weight.
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          View Details
        </span>
        <span style={{ color: '#0066FF', fontSize: '0.8rem' }}>→</span>
      </div>
    </NeoPopCardComponent>
    <pre style={S.code}>{`<NeoPopCard
  backgroundColor="#0a0a0a"
  onPress={() => {}}
>
  <Typography type="CAPS">Card Tag</Typography>
  <Typography type="HEADING">Card Heading</Typography>
  <Typography>Card body content here.</Typography>
</NeoPopCard>`}</pre>

    <p style={S.sectionTitle}>Colored Face</p>
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <NeoPopCardComponent faceColor="#0066FF" width={200} height={100}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Blue Card</div>
      </NeoPopCardComponent>
      <NeoPopCardComponent faceColor="#06C270" width={200} height={100}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#000' }}>Success Card</div>
      </NeoPopCardComponent>
      <NeoPopCardComponent faceColor="#EE4D37" width={200} height={100}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Error Card</div>
      </NeoPopCardComponent>
    </div>

    <p style={S.sectionTitle}>Disabled</p>
    <span style={S.variantLabel}>opacity: 0.4, pointer-events: none</span>
    <NeoPopCardComponent width={260} disabled>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Disabled Card</div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
        This card is not interactive in its current state.
      </div>
    </NeoPopCardComponent>
    <pre style={S.code}>{`<NeoPopCard
  backgroundColor="#0a0a0a"
  disabled
  onPress={() => {}}
>
  <Typography>Disabled Card</Typography>
</NeoPopCard>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopCard',
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
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <NeoPopCardComponent width={280} height={140} />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <NeoPopCardComponent width={320}>
        <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Card Title</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Card body content with supporting information and details.
        </div>
      </NeoPopCardComponent>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <NeoPopCardComponent width={280} disabled>
        <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Disabled Card</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Not interactive in current state.
        </div>
      </NeoPopCardComponent>
    </div>
  ),
};
