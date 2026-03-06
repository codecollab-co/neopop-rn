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

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  disabled?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  disabled = false,
  defaultOpen = false,
  defaultValue = '',
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState(defaultValue);

  const select = (opt: string) => {
    setValue(opt);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.55rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '0.5rem',
        }}>
          {label}
        </label>
      )}
      <div
        style={{
          background: '#0a0a0a',
          border: `1px solid ${open ? '#0066FF' : 'rgba(255,255,255,0.15)'}`,
          borderBottom: `2px solid ${open ? '#0066FF' : 'rgba(255,255,255,0.15)'}`,
          padding: '0.85rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          userSelect: 'none',
          transition: 'border-color 0.15s ease',
        }}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span style={{
          fontSize: '0.9rem',
          color: value ? '#ffffff' : 'rgba(255,255,255,0.3)',
          letterSpacing: '0.02em',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {value || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        >
          <path d="M3 5.5L8 10.5L13 5.5" stroke={open ? '#0066FF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {open && !disabled && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderTop: 'none',
          zIndex: 100,
          maxHeight: 200,
          overflowY: 'auto',
        }}>
          {options.map((opt, i) => (
            <div
              key={opt}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                color: value === opt ? '#0066FF' : '#ffffff',
                background: value === opt ? 'rgba(0,102,255,0.09)' : 'transparent',
                borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.1s ease',
              }}
              onClick={() => select(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopDropdown
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Pressable trigger with animated chevron and options list
    </p>

    <p style={S.sectionTitle}>Closed</p>
    <Dropdown label="Select Category" placeholder="Choose a category" />
    <pre style={S.code}>{`<NeoPopDropdown
  label="Select Category"
  placeholder="Choose a category"
  options={categories}
  onSelect={setCategory}
/>`}</pre>

    <p style={S.sectionTitle} style={{ marginTop: '6rem' }}>Open</p>
    <Dropdown
      label="Payment Method"
      placeholder="Choose payment method"
      options={['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Wallet']}
      defaultOpen
    />
    <pre style={{ ...S.code, marginTop: '14rem' }}>{`<NeoPopDropdown
  label="Payment Method"
  options={paymentMethods}
  isOpen={true}
  onSelect={setMethod}
/>`}</pre>

    <p style={S.sectionTitle}>With Value</p>
    <Dropdown
      label="State"
      placeholder="Select state"
      options={['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat']}
      defaultValue="Karnataka"
    />
    <pre style={S.code}>{`<NeoPopDropdown
  label="State"
  value="Karnataka"
  options={states}
  onSelect={setState}
/>`}</pre>

    <p style={S.sectionTitle}>Disabled</p>
    <Dropdown label="Disabled Field" placeholder="Not available" disabled />
    <pre style={S.code}>{`<NeoPopDropdown
  label="Disabled Field"
  disabled
  placeholder="Not available"
/>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopDropdown',
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

export const Closed: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Dropdown label="Select Option" placeholder="Choose..." />
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Dropdown label="Select Option" defaultOpen options={['Alpha', 'Beta', 'Gamma', 'Delta']} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Dropdown label="Category" defaultValue="Option 2" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <Dropdown label="Disabled" disabled />
    </div>
  ),
};
