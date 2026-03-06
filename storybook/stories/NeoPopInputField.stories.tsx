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
    maxWidth: 420,
    marginTop: '1rem',
  } as React.CSSProperties,
};

interface InputFieldProps {
  placeholder?: string;
  error?: string;
  showCharacterCount?: boolean;
  maxLength?: number;
  multiline?: boolean;
  defaultValue?: string;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = 'Enter value...',
  error,
  showCharacterCount = false,
  maxLength = 100,
  multiline = false,
  defaultValue = '',
  label,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? '#EE4D37'
    : focused
    ? '#0066FF'
    : 'rgba(255,255,255,0.15)';

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: '#0a0a0a',
    border: `1px solid ${borderColor}`,
    borderBottom: `2px solid ${borderColor}`,
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    padding: '0.85rem 1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
    resize: multiline ? 'vertical' : 'none',
  };

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.55rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: focused ? '#0066FF' : 'rgba(255,255,255,0.4)',
          marginBottom: '0.5rem',
          transition: 'color 0.15s ease',
        }}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          style={{ ...baseStyle, display: 'block' }}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{ ...baseStyle, display: 'block' }}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
        {error ? (
          <span style={{ fontSize: '0.65rem', color: '#EE4D37', letterSpacing: '0.03em' }}>{error}</span>
        ) : (
          <span />
        )}
        {showCharacterCount && (
          <span style={{
            fontSize: '0.6rem',
            color: value.length >= maxLength ? '#EE4D37' : 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopInputField
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Text input with animated border — focus/error/char-count states
    </p>

    <p style={S.sectionTitle}>Default</p>
    <InputField placeholder="Enter your name" label="Full Name" />
    <pre style={S.code}>{`<NeoPopInputField
  placeholder="Enter your name"
  label="Full Name"
  onChangeText={setText}
/>`}</pre>

    <p style={S.sectionTitle}>With Value</p>
    <InputField placeholder="Enter amount" label="Amount" defaultValue="₹10,000" />
    <pre style={S.code}>{`<NeoPopInputField
  placeholder="Enter amount"
  label="Amount"
  value={amount}
  onChangeText={setAmount}
/>`}</pre>

    <p style={S.sectionTitle}>With Error</p>
    <InputField
      placeholder="Enter email"
      label="Email Address"
      defaultValue="invalid-email"
      error="Please enter a valid email address"
    />
    <pre style={S.code}>{`<NeoPopInputField
  placeholder="Enter email"
  label="Email"
  value={email}
  error="Please enter a valid email"
  onChangeText={setEmail}
/>`}</pre>

    <p style={S.sectionTitle}>With Character Count</p>
    <InputField
      placeholder="Write your message..."
      label="Message"
      showCharacterCount
      maxLength={80}
      defaultValue="Hello, world!"
    />
    <pre style={S.code}>{`<NeoPopInputField
  placeholder="Write your message"
  label="Message"
  showCharacterCount
  maxLength={80}
  value={msg}
  onChangeText={setMsg}
/>`}</pre>

    <p style={S.sectionTitle}>Multiline</p>
    <InputField
      placeholder="Enter description..."
      label="Description"
      multiline
      maxLength={300}
      showCharacterCount
    />
    <pre style={S.code}>{`<NeoPopInputField
  placeholder="Enter description"
  label="Description"
  multiline
  numberOfLines={4}
  maxLength={300}
  showCharacterCount
  value={desc}
  onChangeText={setDesc}
/>`}</pre>
  </div>
);

interface PlaygroundProps {
  placeholder?: string;
  error?: string;
  showCharacterCount?: boolean;
  maxLength?: number;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({
  placeholder = 'Enter value...',
  error = '',
  showCharacterCount = false,
  maxLength = 100,
}) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <InputField
      placeholder={placeholder}
      error={error || undefined}
      showCharacterCount={showCharacterCount}
      maxLength={maxLength}
      label="Field Label"
    />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopInputField',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'text' },
    showCharacterCount: { control: 'boolean' },
    maxLength: { control: 'number' },
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
      <InputField placeholder="Enter your name" label="Full Name" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <InputField placeholder="Enter amount" label="Amount" defaultValue="₹10,000" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <InputField
        placeholder="Enter email"
        label="Email"
        defaultValue="bad@"
        error="Please enter a valid email address"
      />
    </div>
  ),
};

export const WithCharCount: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <InputField
        placeholder="Write here..."
        label="Message"
        showCharacterCount
        maxLength={60}
        defaultValue="Start typing..."
      />
    </div>
  ),
};

export const Multiline: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <InputField
        placeholder="Enter description..."
        label="Description"
        multiline
        showCharacterCount
        maxLength={200}
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    placeholder: 'Enter value...',
    error: '',
    showCharacterCount: false,
    maxLength: 100,
  },
};
