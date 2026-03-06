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

interface TiltedBtnProps {
  label: string;
  faceColor?: string;
  textColor?: string;
  disabled?: boolean;
  floating?: boolean;
  skewDeg?: number;
}

const TiltedBtn: React.FC<TiltedBtnProps> = ({
  label,
  faceColor = '#ffffff',
  textColor = '#000000',
  disabled = false,
  floating = false,
  skewDeg = -12,
}) => {
  const darken = (hex: string, amount: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <style>{`
        @keyframes tiltedBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        style={{
          display: 'inline-block',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          animation: floating && !disabled ? 'tiltedBob 2s ease-in-out infinite' : 'none',
        }}
      >
        <div
          style={{
            transform: `skewX(${skewDeg}deg)`,
            background: faceColor,
            boxShadow: `4px 4px 0 0 ${darken(faceColor, 70)}`,
            display: 'inline-block',
          }}
        >
          <div
            style={{
              transform: `skewX(${-skewDeg}deg)`,
              color: textColor,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.75rem 2.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopTiltedButton
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Parallelogram-shaped button using CSS skewX transform
    </p>

    <p style={S.sectionTitle}>Default</p>
    <span style={S.variantLabel}>skewX(-12deg) with 3D shadow</span>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
      <TiltedBtn label="Pay Now" faceColor="#ffffff" textColor="#000000" />
      <TiltedBtn label="Explore" faceColor="#0066FF" textColor="#ffffff" />
      <TiltedBtn label="Success" faceColor="#06C270" textColor="#000000" />
    </div>
    <pre style={S.code}>{`<NeoPopTiltedButton
  label="Pay Now"
  backgroundColor="#ffffff"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>With Floating Animation</p>
    <span style={S.variantLabel}>Subtle bounce CSS keyframe animation</span>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
      <TiltedBtn label="Floating" faceColor="#7C5CFC" textColor="#ffffff" floating />
      <TiltedBtn label="Hover Me" faceColor="#F5A623" textColor="#000000" floating />
    </div>
    <pre style={S.code}>{`<NeoPopTiltedButton
  label="Floating"
  backgroundColor="#7C5CFC"
  isFloating
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Disabled</p>
    <span style={S.variantLabel}>opacity: 0.4, cursor: not-allowed</span>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
      <TiltedBtn label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
    </div>
    <pre style={S.code}>{`<NeoPopTiltedButton
  label="Disabled"
  backgroundColor="#ffffff"
  disabled
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Skew Variants</p>
    <span style={S.variantLabel}>Different skew angles</span>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingLeft: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>-8deg</span>
        <TiltedBtn label="Light Tilt" faceColor="#0066FF" textColor="#ffffff" skewDeg={-8} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>-12deg</span>
        <TiltedBtn label="Standard" faceColor="#0066FF" textColor="#ffffff" skewDeg={-12} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>-18deg</span>
        <TiltedBtn label="Bold Tilt" faceColor="#0066FF" textColor="#ffffff" skewDeg={-18} />
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopTiltedButton',
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
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
      <TiltedBtn label="Pay Now" faceColor="#ffffff" textColor="#000000" />
      <TiltedBtn label="Continue" faceColor="#0066FF" textColor="#ffffff" />
    </div>
  ),
};

export const WithFloating: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
      <TiltedBtn label="Floating Button" faceColor="#7C5CFC" textColor="#ffffff" floating />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TiltedBtn label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
    </div>
  ),
};
