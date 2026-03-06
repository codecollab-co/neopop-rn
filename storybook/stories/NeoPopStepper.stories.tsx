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

interface StepperProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  label?: string;
}

const Stepper: React.FC<StepperProps> = ({
  value = 1,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  onChange,
  label,
}) => {
  const [val, setVal] = useState(value);

  const decrement = () => {
    if (val - step >= min) {
      const next = val - step;
      setVal(next);
      onChange?.(next);
    }
  };

  const increment = () => {
    if (val + step <= max) {
      const next = val + step;
      setVal(next);
      onChange?.(next);
    }
  };

  const atMin = val - step < min;
  const atMax = val + step > max;

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 40,
    height: 40,
    background: disabled ? 'rgba(255,255,255,0.05)' : '#ffffff',
    color: disabled ? 'rgba(255,255,255,0.2)' : '#000000',
    border: 'none',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: disabled ? 'none' : '3px 3px 0 0 rgba(175,175,175,0.8)',
    userSelect: 'none',
    transition: 'background 0.1s ease',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
        <button style={btnStyle(atMin)} onClick={decrement} disabled={atMin}>−</button>
        <div style={{
          width: 64,
          height: 40,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1rem',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.04em',
          fontVariantNumeric: 'tabular-nums',
          userSelect: 'none',
        }}>
          {val}
        </div>
        <button style={btnStyle(atMax)} onClick={increment} disabled={atMax}>+</button>
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopStepper
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Increment/decrement control with +/– buttons
    </p>

    <p style={S.sectionTitle}>Default (value: 1)</p>
    <Stepper value={1} label="Quantity" />
    <pre style={S.code}>{`<NeoPopStepper
  value={1}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>With Bounds (min: 0, max: 10)</p>
    <Stepper value={5} min={0} max={10} label="Rating (0–10)" />
    <pre style={S.code}>{`<NeoPopStepper
  value={5}
  min={0}
  max={10}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>At Minimum Bound</p>
    <Stepper value={0} min={0} max={10} label="At Min (0)" />

    <p style={S.sectionTitle}>At Maximum Bound</p>
    <Stepper value={10} min={0} max={10} label="At Max (10)" />

    <p style={S.sectionTitle}>Large Value</p>
    <Stepper value={1000} step={100} label="Amount (step 100)" />
    <pre style={S.code}>{`<NeoPopStepper
  value={1000}
  step={100}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>Custom Step</p>
    <Stepper value={5} min={0} max={50} step={5} label="Step 5" />

    <p style={S.sectionTitle}>In Context — Cart Item</p>
    <CartItemDemo />
  </div>
);

const CartItemDemo: React.FC = () => {
  const [qty, setQty] = useState(2);
  const price = 299;
  return (
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem', maxWidth: 340, display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>CRED Store Item</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>₹{price} each</div>
      </div>
      <Stepper value={qty} min={0} max={9} onChange={setQty} />
      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0066FF', minWidth: 60, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        ₹{qty * price}
      </div>
    </div>
  );
};

interface PlaygroundProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ value = 1, min = 0, max = 10, step = 1 }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Stepper value={value} min={min} max={max} step={step} label="Stepper" />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopStepper',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    value: { control: 'number' },
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
      <Stepper value={1} label="Quantity" />
    </div>
  ),
};

export const WithBounds: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stepper value={5} min={0} max={10} label="Rating (0–10)" />
    </div>
  ),
};

export const LargeValue: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stepper value={1500} step={100} label="Amount (step 100)" />
    </div>
  ),
};

export const Playground: Story = {
  args: { value: 1, min: 0, max: 10, step: 1 },
};
