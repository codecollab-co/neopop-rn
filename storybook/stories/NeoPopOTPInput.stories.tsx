import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';

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

interface OTPInputProps {
  length?: number;
  masked?: boolean;
  hasError?: boolean;
  defaultValues?: string[];
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  masked = false,
  hasError = false,
  defaultValues = [],
}) => {
  const [values, setValues] = useState<string[]>(
    Array.from({ length }, (_, i) => defaultValues[i] ?? '')
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[i] = digit;
    setValues(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const borderColor = hasError ? '#EE4D37' : 'rgba(255,255,255,0.2)';
  const focusBorderColor = hasError ? '#EE4D37' : '#0066FF';

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type={masked ? 'password' : 'text'}
            maxLength={1}
            value={values[i]}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            inputMode="numeric"
            style={{
              width: 52,
              height: 58,
              background: '#0a0a0a',
              border: `1px solid ${values[i] ? focusBorderColor : borderColor}`,
              borderBottom: `3px solid ${values[i] ? focusBorderColor : borderColor}`,
              color: '#ffffff',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              textAlign: 'center',
              outline: 'none',
              letterSpacing: 0,
              transition: 'border-color 0.15s ease',
              boxSizing: 'border-box',
            }}
            onFocus={e => {
              e.target.style.borderColor = focusBorderColor;
              e.target.style.borderBottomColor = focusBorderColor;
            }}
            onBlur={e => {
              const c = values[i] ? focusBorderColor : borderColor;
              e.target.style.borderColor = c;
              e.target.style.borderBottomColor = c;
            }}
          />
        ))}
      </div>
      {hasError && (
        <p style={{ fontSize: '0.65rem', color: '#EE4D37', letterSpacing: '0.03em', marginTop: '0.5rem' }}>
          Invalid OTP. Please try again.
        </p>
      )}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopOTPInput
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Multi-box PIN / OTP entry — 4-digit and 6-digit variants
    </p>

    <p style={S.sectionTitle}>4-Digit OTP</p>
    <OTPInput length={4} />
    <pre style={S.code}>{`<NeoPopOTPInput
  length={4}
  onComplete={(otp) => verify(otp)}
/>`}</pre>

    <p style={S.sectionTitle}>6-Digit OTP</p>
    <OTPInput length={6} />
    <pre style={S.code}>{`<NeoPopOTPInput
  length={6}
  onComplete={(otp) => verify(otp)}
/>`}</pre>

    <p style={S.sectionTitle}>With Pre-filled Values</p>
    <OTPInput length={4} defaultValues={['1', '2', '3', '4']} />
    <OTPInput length={6} defaultValues={['7', '8', '3', '4', '5', '6']} />

    <p style={S.sectionTitle}>With Error</p>
    <OTPInput length={4} defaultValues={['9', '9', '9', '9']} hasError />
    <pre style={S.code}>{`<NeoPopOTPInput
  length={4}
  hasError={true}
  errorMessage="Invalid OTP. Please try again."
  onComplete={(otp) => verify(otp)}
/>`}</pre>

    <p style={S.sectionTitle}>Masked (dots)</p>
    <OTPInput length={4} masked defaultValues={['1', '2', '3', '4']} />
    <pre style={S.code}>{`<NeoPopOTPInput
  length={4}
  masked
  onComplete={(otp) => verify(otp)}
/>`}</pre>
  </div>
);

interface PlaygroundProps {
  length?: 4 | 6;
  masked?: boolean;
  hasError?: boolean;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ length = 4, masked = false, hasError = false }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <OTPInput length={length} masked={masked} hasError={hasError} />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopOTPInput',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    length: { control: { type: 'select' }, options: [4, 6] },
    masked: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const FourDigit: Story = {
  name: '4-Digit',
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <OTPInput length={4} />
    </div>
  ),
};

export const SixDigit: Story = {
  name: '6-Digit',
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <OTPInput length={6} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <OTPInput length={4} defaultValues={['9', '9', '9', '9']} hasError />
    </div>
  ),
};

export const Masked: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <OTPInput length={4} masked defaultValues={['1', '2', '3', '4']} />
    </div>
  ),
};

export const Playground: Story = {
  args: { length: 4, masked: false, hasError: false },
};
