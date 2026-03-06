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

interface CheckboxProps {
  isChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (v: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked = false,
  disabled = false,
  label,
  onChange,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        userSelect: 'none',
      }}
      onClick={toggle}
    >
      <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
        <div
          style={{
            width: 22,
            height: 22,
            background: checked ? '#0066FF' : 'transparent',
            border: `2px solid ${checked ? '#0066FF' : 'rgba(255,255,255,0.4)'}`,
            boxShadow: `3px 3px 0 0 ${checked ? 'rgba(0,60,175,0.9)' : 'rgba(255,255,255,0.15)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
        >
          {checked && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          )}
        </div>
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
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopCheckbox
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      3D checkbox — consistent depth language with button and card
    </p>

    <p style={S.sectionTitle}>Unchecked</p>
    <Checkbox isChecked={false} />
    <pre style={S.code}>{`<NeoPopCheckbox
  isChecked={false}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>Checked</p>
    <Checkbox isChecked={true} />
    <pre style={S.code}>{`<NeoPopCheckbox
  isChecked={true}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>With Label</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox isChecked={false} label="I agree to the terms and conditions" />
      <Checkbox isChecked={true} label="Subscribe to newsletter" />
      <Checkbox isChecked={false} label="Enable notifications" />
    </div>
    <pre style={S.code}>{`<NeoPopCheckbox
  isChecked={false}
  label="I agree to terms and conditions"
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>Disabled</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox isChecked={false} disabled label="Disabled unchecked" />
      <Checkbox isChecked={true} disabled label="Disabled checked" />
    </div>
    <pre style={S.code}>{`<NeoPopCheckbox
  isChecked={false}
  disabled
  label="Disabled"
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>Interactive Group</p>
    <InteractiveGroup />
  </div>
);

const InteractiveGroup: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['option1']));

  const toggle = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const options = [
    { key: 'option1', label: 'Dark mode interface' },
    { key: 'option2', label: 'Haptic feedback on press' },
    { key: 'option3', label: 'Auto-save progress' },
    { key: 'option4', label: 'Analytics and crash reports' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {options.map(o => (
        <Checkbox
          key={o.key}
          isChecked={selected.has(o.key)}
          label={o.label}
          onChange={() => toggle(o.key)}
        />
      ))}
    </div>
  );
};

interface PlaygroundProps {
  isChecked?: boolean;
  disabled?: boolean;
  label?: string;
}

const PlaygroundComponent: React.FC<PlaygroundProps> = ({ isChecked = false, disabled = false, label = 'Checkbox label' }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Checkbox isChecked={isChecked} disabled={disabled} label={label} />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopCheckbox',
  component: PlaygroundComponent,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    isChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Unchecked: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
      <Checkbox isChecked={false} label="Unchecked option" />
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
      <Checkbox isChecked={true} label="Checked option" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '1.25rem', padding: '3rem' }}>
      <Checkbox isChecked={false} label="Option A" />
      <Checkbox isChecked={true} label="Option B" />
      <Checkbox isChecked={false} label="Option C" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    isChecked: false,
    disabled: false,
    label: 'Checkbox label',
  },
};
