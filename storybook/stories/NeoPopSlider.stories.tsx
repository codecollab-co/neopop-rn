import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  showSteps?: boolean;
  label?: string;
  onChange?: (v: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  showSteps = false,
  label,
  onChange,
}) => {
  const [val, setVal] = useState(value);
  const pct = ((val - min) / (max - min)) * 100;

  const steps = showSteps && step > 1
    ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
    : [];

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            {label}
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#0066FF', letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>
            {val}
          </span>
        </div>
      )}
      <div style={{ position: 'relative', paddingBottom: showSteps ? '1.5rem' : 0 }}>
        <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.1)', marginBottom: 0 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: '#0066FF' }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={e => {
            const v = Number(e.target.value);
            setVal(v);
            onChange?.(v);
          }}
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            width: '100%',
            opacity: 0,
            height: 24,
            cursor: 'pointer',
            margin: 0,
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -7,
            left: `calc(${pct}% - 9px)`,
            width: 18,
            height: 18,
            background: '#0066FF',
            boxShadow: '2px 2px 0 0 rgba(0,40,140,0.8)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {showSteps && steps.length > 0 && (
          <div style={{ position: 'absolute', top: 8, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
            {steps.map(s => {
              const sp = ((s - min) / (max - min)) * 100;
              return (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', left: `${sp}%`, transform: 'translateX(-50%)' }}>
                  <div style={{ width: 1, height: 6, background: 'rgba(255,255,255,0.2)', marginBottom: 2 }} />
                  <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{s}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>{min}</span>
        <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>{max}</span>
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopSlider
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Horizontal track with square thumb — styled HTML range input
    </p>

    <p style={S.sectionTitle}>Default (50%)</p>
    <Slider value={50} label="Volume" />
    <pre style={S.code}>{`<NeoPopSlider
  value={50}
  minimumValue={0}
  maximumValue={100}
  onValueChange={setValue}
/>`}</pre>

    <p style={S.sectionTitle}>Min Value (0%)</p>
    <Slider value={0} label="Brightness" />

    <p style={S.sectionTitle}>Max Value (100%)</p>
    <Slider value={100} label="Speed" />

    <p style={S.sectionTitle}>Custom Range</p>
    <Slider value={25} min={0} max={50} label="Amount (₹0 – ₹50)" />
    <pre style={S.code}>{`<NeoPopSlider
  value={25}
  minimumValue={0}
  maximumValue={50}
  onValueChange={setValue}
/>`}</pre>

    <p style={S.sectionTitle}>With Steps</p>
    <Slider value={4} min={0} max={10} step={2} showSteps label="Step Size 2" />
    <pre style={S.code}>{`<NeoPopSlider
  value={4}
  minimumValue={0}
  maximumValue={10}
  step={2}
  showStepMarkers
  onValueChange={setValue}
/>`}</pre>
  </div>
);

interface PlaygroundProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ value = 50, min = 0, max = 100, step = 1 }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Slider value={value} min={min} max={max} step={step} label="Slider" />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopSlider',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Default: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider value={50} label="Slider (50%)" />
    </div>
  ),
};

export const MinValue: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider value={0} label="Min Value (0%)" />
    </div>
  ),
};

export const MaxValue: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider value={100} label="Max Value (100%)" />
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider value={6} min={0} max={10} step={2} showSteps label="With Step Markers" />
    </div>
  ),
};

export const Playground: Story = {
  args: { value: 50, min: 0, max: 100, step: 1 },
};
