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

const ShimmerKeyframes = () => (
  <style>{`
    @keyframes shimmerMove {
      0%   { transform: translateX(-100%) skewX(-12deg); }
      100% { transform: translateX(250%) skewX(-12deg); }
    }
    .shimmer-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255,255,255,0.12) 50%,
        transparent 70%
      );
      animation: shimmerMove 1.6s ease-in-out infinite;
    }
  `}</style>
);

interface ShimmerBoxProps {
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
}

const ShimmerBox: React.FC<ShimmerBoxProps> = ({ width = 200, height = 16, style }) => (
  <div style={{ position: 'relative', overflow: 'hidden', width, height, background: 'rgba(255,255,255,0.07)', ...style }}>
    <div className="shimmer-overlay" />
  </div>
);

const ShimmerTextBlock: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <ShimmerBox width="80%" height={12} />
    <ShimmerBox width="100%" height={12} />
    <ShimmerBox width="65%" height={12} />
    <ShimmerBox width="90%" height={12} />
  </div>
);

const ShimmerCardBlock: React.FC = () => (
  <div style={{
    background: '#0a0a0a',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1.25rem',
    width: 280,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
      <ShimmerBox width={42} height={42} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <ShimmerBox width="60%" height={12} />
        <ShimmerBox width="40%" height={10} />
      </div>
    </div>
    <ShimmerBox width="100%" height={10} style={{ marginBottom: '0.4rem' }} />
    <ShimmerBox width="85%" height={10} style={{ marginBottom: '0.4rem' }} />
    <ShimmerBox width="70%" height={10} style={{ marginBottom: '1rem' }} />
    <ShimmerBox width="100%" height={36} />
  </div>
);

const ShimmerListItem: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  }}>
    <ShimmerBox width={48} height={48} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <ShimmerBox width="55%" height={12} />
      <ShimmerBox width="35%" height={10} />
    </div>
    <ShimmerBox width={60} height={24} />
  </div>
);

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <ShimmerKeyframes />
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopShimmer
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Diagonal sweep shimmer — loading skeleton placeholder
    </p>

    <p style={S.sectionTitle}>Shimmer Block</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <ShimmerBox width={320} height={20} />
      <ShimmerBox width={240} height={80} />
      <ShimmerBox width={160} height={160} />
    </div>
    <pre style={S.code}>{`<NeoPopShimmer width={320} height={20} />`}</pre>

    <p style={S.sectionTitle}>Shimmer Text</p>
    <div style={{ width: 320, marginBottom: '1.5rem' }}>
      <ShimmerTextBlock />
    </div>
    <pre style={S.code}>{`<NeoPopShimmerText lines={4} />`}</pre>

    <p style={S.sectionTitle}>Shimmer Card</p>
    <ShimmerCardBlock />
    <pre style={S.code}>{`<NeoPopShimmerCard />`}</pre>

    <p style={S.sectionTitle}>Shimmer List</p>
    <div style={{ maxWidth: 400, marginBottom: '1.5rem' }}>
      {[1, 2, 3, 4].map(i => <ShimmerListItem key={i} />)}
    </div>
    <pre style={S.code}>{`<NeoPopShimmerList itemCount={4} />`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopShimmer',
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

export const ShimmerBlock: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem', gap: '1rem' }}>
      <ShimmerKeyframes />
      <ShimmerBox width={300} height={24} />
      <ShimmerBox width={220} height={100} />
      <ShimmerBox width={140} height={140} />
    </div>
  ),
};

export const ShimmerText: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ShimmerKeyframes />
      <div style={{ width: 320 }}>
        <ShimmerTextBlock />
      </div>
    </div>
  ),
};

export const ShimmerCard: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ShimmerKeyframes />
      <ShimmerCardBlock />
    </div>
  ),
};
