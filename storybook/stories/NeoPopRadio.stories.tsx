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
    maxWidth: 380,
    marginTop: '1rem',
  } as React.CSSProperties,
};

interface RadioProps {
  isChecked?: boolean;
  label?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

const Radio: React.FC<RadioProps> = ({ isChecked = false, label, disabled = false, onSelect }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      userSelect: 'none',
    }}
    onClick={() => !disabled && onSelect?.()}
  >
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: `2px solid ${isChecked ? '#0066FF' : 'rgba(255,255,255,0.4)'}`,
        boxShadow: isChecked ? '0 0 0 1px rgba(0,102,255,0.4)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'border-color 0.15s ease',
        background: 'transparent',
      }}
    >
      {isChecked && (
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#0066FF',
            transition: 'transform 0.15s ease',
          }}
        />
      )}
    </div>
    {label && (
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.85rem',
        fontWeight: 500,
        color: '#ffffff',
        letterSpacing: '0.02em',
      }}>
        {label}
      </span>
    )}
  </div>
);

const RadioGroup: React.FC<{ options: string[]; defaultIndex?: number }> = ({ options, defaultIndex = 0 }) => {
  const [selected, setSelected] = useState(defaultIndex);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {options.map((opt, i) => (
        <Radio
          key={opt}
          isChecked={selected === i}
          label={opt}
          onSelect={() => setSelected(i)}
        />
      ))}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopRadio
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Circular ring with inner dot — single-select control
    </p>

    <p style={S.sectionTitle}>Unchecked</p>
    <Radio isChecked={false} />
    <pre style={S.code}>{`<NeoPopRadio
  isChecked={false}
  onSelect={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>Checked</p>
    <Radio isChecked={true} />
    <pre style={S.code}>{`<NeoPopRadio
  isChecked={true}
  onSelect={() => {}}
/>`}</pre>

    <p style={S.sectionTitle}>With Label</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio isChecked={true} label="Option selected" />
      <Radio isChecked={false} label="Option unselected" />
    </div>
    <pre style={S.code}>{`<NeoPopRadio
  isChecked={false}
  label="Option A"
  onSelect={() => setSelected('A')}
/>`}</pre>

    <p style={S.sectionTitle}>Group (interactive)</p>
    <RadioGroup
      options={[
        'Standard Delivery (3-5 days)',
        'Express Delivery (1-2 days)',
        'Same-Day Delivery',
      ]}
      defaultIndex={0}
    />
    <pre style={S.code}>{`<NeoPopRadioGroup
  options={deliveryOptions}
  value={selected}
  onChange={setSelected}
/>`}</pre>

    <p style={S.sectionTitle}>Disabled</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio isChecked={false} disabled label="Disabled unchecked" />
      <Radio isChecked={true} disabled label="Disabled checked" />
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopRadio',
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

export const Unchecked: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Radio isChecked={false} label="Unchecked radio" />
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Radio isChecked={true} label="Checked radio" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem' }}>
      <RadioGroup
        options={['Option Alpha', 'Option Beta', 'Option Gamma']}
        defaultIndex={1}
      />
    </div>
  ),
};
