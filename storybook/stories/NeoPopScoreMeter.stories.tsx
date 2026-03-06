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

interface ScoreMeterProps {
  reading: number;
  lowerLimit?: number;
  upperLimit?: number;
  size?: number;
  label?: string;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({
  reading,
  lowerLimit = 300,
  upperLimit = 900,
  size = 200,
  label,
}) => {
  const pct = Math.min(1, Math.max(0, (reading - lowerLimit) / (upperLimit - lowerLimit)));
  const strokeWidth = 14;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // Semi-circle: from 180deg to 360deg (bottom half excluded)
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const arcLength = Math.PI * r; // half circumference
  const fullCircumference = 2 * Math.PI * r;

  const scoreAngle = startAngle + pct * Math.PI;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  // Track arc (semi-circle)
  const trackD = `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;

  // Fill arc
  const fillX2 = cx + r * Math.cos(scoreAngle);
  const fillY2 = cy + r * Math.sin(scoreAngle);
  const largeArc = pct > 0.5 ? 1 : 0;
  const fillD = pct === 0
    ? ''
    : pct >= 1
    ? `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2 + 0.001} ${y2}`
    : `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${fillX2} ${fillY2}`;

  const color = pct < 0.3 ? '#EE4D37' : pct < 0.6 ? '#F5A623' : '#06C270';

  const label_ = pct < 0.3 ? 'Poor' : pct < 0.6 ? 'Average' : pct < 0.85 ? 'Good' : 'Excellent';

  // Needle
  const needleAngle = startAngle + pct * Math.PI;
  const needleX = cx + (r - 20) * Math.cos(needleAngle);
  const needleY = cy + (r - 20) * Math.sin(needleAngle);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ position: 'relative', width: size, height: size / 2 + 30, overflow: 'hidden' }}>
        <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Track */}
          <path d={trackD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} strokeLinecap="butt" />
          {/* Fill */}
          {fillD && (
            <path d={fillD} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="butt" />
          )}
          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="square"
          />
          <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
        </svg>
      </div>

      <div style={{ textAlign: 'center', marginTop: '-10px' }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: 900,
          color,
          letterSpacing: '0.04em',
          lineHeight: 1,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {reading}
        </div>
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: color,
          marginTop: '0.25rem',
        }}>
          {label_}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Poor', color: '#EE4D37', range: '300–500' },
          { label: 'Average', color: '#F5A623', range: '500–650' },
          { label: 'Good', color: '#0066FF', range: '650–750' },
          { label: 'Excellent', color: '#06C270', range: '750–900' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ width: 8, height: 8, background: l.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {label && (
        <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          {label}
        </span>
      )}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopScoreMeter
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Semi-circular arc gauge — credit score visualization
    </p>

    <p style={S.sectionTitle}>Score Levels</p>
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      <ScoreMeter reading={380} label="Poor" />
      <ScoreMeter reading={560} label="Average" />
      <ScoreMeter reading={765} label="Excellent" />
    </div>
    <pre style={S.code}>{`<NeoPopScoreMeter
  reading={765}
  lowerLimit={300}
  upperLimit={900}
/>`}</pre>

    <p style={S.sectionTitle}>Full Range</p>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {[300, 420, 550, 680, 780, 900].map(r => (
        <ScoreMeter key={r} reading={r} size={140} />
      ))}
    </div>
  </div>
);

interface PlaygroundProps {
  reading?: number;
  lowerLimit?: number;
  upperLimit?: number;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ reading = 650, lowerLimit = 300, upperLimit = 900 }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ScoreMeter reading={reading} lowerLimit={lowerLimit} upperLimit={upperLimit} />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopScoreMeter',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    reading: { control: { type: 'range', min: 300, max: 900 } },
    lowerLimit: { control: 'number' },
    upperLimit: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Poor: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ScoreMeter reading={380} label="Poor (20%)" />
    </div>
  ),
};

export const Average: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ScoreMeter reading={560} label="Average (55%)" />
    </div>
  ),
};

export const Excellent: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ScoreMeter reading={800} label="Excellent (85%)" />
    </div>
  ),
};

export const Playground: Story = {
  args: { reading: 650, lowerLimit: 300, upperLimit: 900 },
};
