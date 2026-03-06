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
  iconWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.6rem',
    padding: '1.25rem',
    background: '#0a0a0a',
    border: '1px solid rgba(255,255,255,0.07)',
    width: 100,
  } as React.CSSProperties,
  iconLabel: {
    fontSize: '0.45rem',
    fontWeight: 700 as const,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center' as const,
  } as React.CSSProperties,
};

type Direction = 'up' | 'down' | 'left' | 'right';

const CHEVRON_TRANSFORMS: Record<Direction, string> = {
  up: 'rotate(0deg)',
  down: 'rotate(180deg)',
  left: 'rotate(-90deg)',
  right: 'rotate(90deg)',
};

interface ChevronProps {
  direction?: Direction;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const ChevronIcon: React.FC<ChevronProps> = ({
  direction = 'down',
  size = 24,
  color = '#ffffff',
  strokeWidth = 1.5,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: CHEVRON_TRANSFORMS[direction], transition: 'transform 0.2s ease' }}
  >
    <path
      d="M5 8L12 15L19 8"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

interface CrossProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CrossIcon: React.FC<CrossProps> = ({ size = 24, color = '#ffffff', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 5L19 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" />
    <path d="M19 5L5 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" />
  </svg>
);

interface PointerProps {
  size?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const PointerIcon: React.FC<PointerProps> = ({ size = 24, color = '#ffffff', direction = 'right' }) => {
  const transform = {
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
    left: 'rotate(180deg)',
    right: 'rotate(0deg)',
  }[direction];

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform }}>
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];
const SIZES = [16, 20, 24, 32, 40];
const COLORS = ['#ffffff', '#0066FF', '#06C270', '#EE4D37', '#F5A623', '#7C5CFC'];

const AllIcons: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      Skia Icon Primitives
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Chevron · Cross · Pointer — rendered as inline SVG
    </p>

    <p style={S.sectionTitle}>Chevron — All Directions</p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {DIRECTIONS.map(dir => (
        <div key={dir} style={S.iconWrap}>
          <ChevronIcon direction={dir} size={28} />
          <span style={S.iconLabel}>Chevron {dir}</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Cross (X)</p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {[16, 20, 24, 32].map(s => (
        <div key={s} style={S.iconWrap}>
          <CrossIcon size={s} />
          <span style={S.iconLabel}>{s}px</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Pointer / Arrow</p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {DIRECTIONS.map(dir => (
        <div key={dir} style={S.iconWrap}>
          <PointerIcon direction={dir} size={28} />
          <span style={S.iconLabel}>Pointer {dir}</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Size Scale</p>
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {SIZES.map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronIcon size={s} />
          <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{s}px</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Color Variants</p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {COLORS.map(c => (
        <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <ChevronIcon color={c} size={20} direction="right" />
            <CrossIcon color={c} size={20} />
            <PointerIcon color={c} size={20} />
          </div>
          <div style={{ width: 16, height: 16, background: c }} />
          <span style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>{c}</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Stroke Width Variants</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {[0.75, 1, 1.5, 2, 2.5].map(w => (
        <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronIcon strokeWidth={w} size={28} />
          <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{w}px</span>
        </div>
      ))}
    </div>

    <p style={S.sectionTitle}>Combined Usage Example</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', maxWidth: 300 }}>
      {['Account Settings', 'Linked Cards', 'Transaction History', 'Help & Support'].map(item => (
        <div key={item} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1rem',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
          <ChevronIcon direction="right" size={16} color="rgba(255,255,255,0.3)" />
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const AllIconsStory: Story = {
  name: 'All Icons',
  render: () => <AllIcons />,
};

export const Chevron: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {DIRECTIONS.map(dir => (
        <div key={dir} style={S.iconWrap}>
          <ChevronIcon direction={dir} size={32} />
          <span style={S.iconLabel}>Chevron {dir}</span>
        </div>
      ))}
    </div>
  ),
};

export const Cross: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {[16, 24, 32, 40].map(s => (
        <div key={s} style={S.iconWrap}>
          <CrossIcon size={s} />
          <span style={S.iconLabel}>{s}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Pointer: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {DIRECTIONS.map(dir => (
        <div key={dir} style={S.iconWrap}>
          <PointerIcon direction={dir} size={32} />
          <span style={S.iconLabel}>Pointer {dir}</span>
        </div>
      ))}
    </div>
  ),
};
