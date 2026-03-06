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

interface ProgressBarProps {
  progress: number;
  color?: string;
  label?: string;
}

const HorizontalBar: React.FC<ProgressBarProps> = ({ progress, color = '#0066FF', label }) => (
  <div style={{ width: '100%', maxWidth: 420 }}>
    {label && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color, letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>
          {progress}%
        </span>
      </div>
    )}
    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${Math.min(100, Math.max(0, progress))}%`,
          background: color,
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  </div>
);

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#0066FF',
  label,
}) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color, letterSpacing: '0.02em', fontFamily: "'Outfit', sans-serif" }}>
            {progress}%
          </span>
        </div>
      </div>
      {label && (
        <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          {label}
        </span>
      )}
    </div>
  );
};

const PROGRESS_VALUES = [0, 25, 50, 75, 100];

const colorForProgress = (p: number) => {
  if (p <= 25) return '#EE4D37';
  if (p <= 60) return '#F5A623';
  if (p < 100) return '#0066FF';
  return '#06C270';
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopProgressBar
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Horizontal filled bar and circular SVG arc variants
    </p>

    <p style={S.sectionTitle}>Horizontal — All Progress Values</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1rem' }}>
      {PROGRESS_VALUES.map(p => (
        <HorizontalBar key={p} progress={p} color={colorForProgress(p)} label={`${p}%`} />
      ))}
    </div>
    <pre style={S.code}>{`<NeoPopProgressBar
  variant="horizontal"
  progress={75}
  color="#0066FF"
/>`}</pre>

    <p style={S.sectionTitle}>Horizontal — Custom Colors</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1rem' }}>
      <HorizontalBar progress={40} color="#EE4D37" label="Error State" />
      <HorizontalBar progress={65} color="#F5A623" label="Warning State" />
      <HorizontalBar progress={88} color="#06C270" label="Success State" />
    </div>

    <p style={S.sectionTitle}>Circular Arc</p>
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      {PROGRESS_VALUES.map(p => (
        <CircularProgress key={p} progress={p} color={colorForProgress(p)} label={`${p}%`} />
      ))}
    </div>
    <pre style={S.code}>{`<NeoPopProgressBar
  variant="circular"
  progress={75}
  color="#0066FF"
  size={120}
/>`}</pre>

    <p style={S.sectionTitle}>Circular — Animated</p>
    <AnimatedCircular />
  </div>
);

const AnimatedCircular: React.FC = () => {
  const [prog, setProgress] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 1));
    }, 60);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
      <CircularProgress progress={prog} color="#0066FF" label="Loading" />
      <CircularProgress progress={prog} color="#06C270" size={80} strokeWidth={6} label="Upload" />
      <CircularProgress progress={prog} color="#7C5CFC" size={60} strokeWidth={5} label="Sync" />
    </div>
  );
};

interface PlaygroundProps {
  progress?: number;
  variant?: 'horizontal' | 'circular';
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ progress = 50, variant = 'horizontal' }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '2rem' }}>
    {variant === 'horizontal'
      ? <HorizontalBar progress={progress} label="Progress" />
      : <CircularProgress progress={progress} label="Progress" />
    }
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopProgressBar',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: { type: 'select' }, options: ['horizontal', 'circular'] },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem', gap: '2rem' }}>
      {PROGRESS_VALUES.map(p => <HorizontalBar key={p} progress={p} color={colorForProgress(p)} label={`${p}%`} />)}
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
      {PROGRESS_VALUES.map(p => <CircularProgress key={p} progress={p} color={colorForProgress(p)} label={`${p}%`} />)}
    </div>
  ),
};

export const Playground: Story = {
  args: { progress: 50, variant: 'horizontal' },
};
