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

const Keyframes = () => (
  <style>{`
    @keyframes levitate {
      0%, 100% { transform: translateY(0px); box-shadow: 4px 8px 0 0 rgba(0,40,140,0.7); }
      50%       { transform: translateY(-8px); box-shadow: 4px 16px 0 0 rgba(0,40,140,0.4); }
    }
    @keyframes levitateCircle {
      0%, 100% { transform: translateY(0px); box-shadow: 0 8px 0 0 rgba(0,40,140,0.7); }
      50%       { transform: translateY(-8px); box-shadow: 0 16px 0 0 rgba(0,40,140,0.4); }
    }
    @keyframes floatShimmer {
      0%   { transform: translateX(-100%) skewX(-12deg) translateY(0px); }
      50%  { transform: translateX(200%) skewX(-12deg) translateY(-6px); }
      100% { transform: translateX(-100%) skewX(-12deg) translateY(0px); }
    }
  `}</style>
);

interface FloatBtnProps {
  label: string;
  shape?: 'rectangle' | 'pill' | 'circle';
  faceColor?: string;
  textColor?: string;
  withShimmer?: boolean;
  animate?: boolean;
}

const FloatingBtn: React.FC<FloatBtnProps> = ({
  label,
  shape = 'rectangle',
  faceColor = '#0066FF',
  textColor = '#ffffff',
  withShimmer = false,
  animate = true,
}) => {
  const borderRadius = shape === 'pill' ? 50 : shape === 'circle' ? '50%' : 0;
  const isCircle = shape === 'circle';

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: withShimmer ? 'hidden' : 'visible',
        background: faceColor,
        color: textColor,
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: isCircle ? '0' : '0.75rem 2rem',
        width: isCircle ? 60 : 'auto',
        height: isCircle ? 60 : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius,
        cursor: 'pointer',
        userSelect: 'none',
        animation: animate ? (isCircle ? 'levitateCircle 2.2s ease-in-out infinite' : 'levitate 2.2s ease-in-out infinite') : 'none',
        boxShadow: `4px 8px 0 0 rgba(0,40,140,0.7)`,
      }}
    >
      {label}
      {withShimmer && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
          animation: 'floatShimmer 2.5s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <Keyframes />
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopFloatingButton
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Levitating button with CSS keyframe bob animation and shadow depth
    </p>

    <p style={S.sectionTitle}>Rectangle</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem 0', marginBottom: '1.5rem' }}>
      <FloatingBtn label="Pay Now" shape="rectangle" faceColor="#0066FF" />
      <FloatingBtn label="Claim" shape="rectangle" faceColor="#06C270" textColor="#000000" />
      <FloatingBtn label="Alert" shape="rectangle" faceColor="#EE4D37" />
    </div>
    <pre style={S.code}>{`<NeoPopFloatingButton
  shape="rectangle"
  label="Pay Now"
  color="#0066FF"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Pill (border-radius: 50px)</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem 0', marginBottom: '1.5rem' }}>
      <FloatingBtn label="Continue" shape="pill" faceColor="#0066FF" />
      <FloatingBtn label="Subscribe" shape="pill" faceColor="#7C5CFC" />
    </div>
    <pre style={S.code}>{`<NeoPopFloatingButton
  shape="pill"
  label="Continue"
  color="#0066FF"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Circle (border-radius: 50%)</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem 0', marginBottom: '1.5rem', alignItems: 'center' }}>
      <FloatingBtn label="+" shape="circle" faceColor="#0066FF" />
      <FloatingBtn label="★" shape="circle" faceColor="#F5A623" textColor="#000000" />
      <FloatingBtn label="✓" shape="circle" faceColor="#06C270" textColor="#000000" />
    </div>
    <pre style={S.code}>{`<NeoPopFloatingButton
  shape="circle"
  icon={<PlusIcon />}
  color="#0066FF"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>With Shimmer</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '2rem 0', marginBottom: '1.5rem' }}>
      <FloatingBtn label="Get Offer" shape="rectangle" faceColor="#06C270" textColor="#000000" withShimmer />
      <FloatingBtn label="Unlock" shape="pill" faceColor="#0066FF" withShimmer />
    </div>
    <pre style={S.code}>{`<NeoPopFloatingButton
  label="Get Offer"
  showShimmer
  color="#06C270"
  onPress={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Static (No Animation)</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <FloatingBtn label="Static" shape="rectangle" animate={false} />
      <FloatingBtn label="Static Pill" shape="pill" animate={false} />
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopFloatingButton',
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

export const Rectangle: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Keyframes />
      <FloatingBtn label="Pay Now" shape="rectangle" />
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Keyframes />
      <FloatingBtn label="Continue" shape="pill" />
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Keyframes />
      <FloatingBtn label="+" shape="circle" />
    </div>
  ),
};

export const WithShimmer: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <Keyframes />
      <FloatingBtn label="Get Offer" faceColor="#06C270" textColor="#000000" withShimmer />
    </div>
  ),
};
