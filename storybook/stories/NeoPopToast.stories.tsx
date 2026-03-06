import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const S = {
  page: {
    fontFamily: "'Outfit', sans-serif",
    background: '#000000',
    minHeight: '100vh',
    padding: '3rem',
    color: '#ffffff',
    position: 'relative' as const,
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

type ToastType = 'success' | 'error' | 'warning' | 'info';

const TOAST_CONFIG: Record<ToastType, { accent: string; icon: string; title: string; message: string }> = {
  success: { accent: '#06C270', icon: '✓', title: 'Payment Successful', message: 'Your transaction of ₹5,000 has been processed.' },
  error:   { accent: '#EE4D37', icon: '✕', title: 'Transaction Failed', message: 'Unable to process payment. Please try again.' },
  warning: { accent: '#F5A623', icon: '!', title: 'Action Required',    message: 'Your KYC documents need to be updated.' },
  info:    { accent: '#2196F3', icon: 'i', title: 'Update Available',    message: 'A new version of the app is ready to install.' },
};

interface ToastProps {
  type?: ToastType;
  showIcon?: boolean;
  showClose?: boolean;
  position?: 'static' | 'bottom';
}

const Toast: React.FC<ToastProps> = ({
  type = 'info',
  showIcon = true,
  showClose = true,
  position = 'static',
}) => {
  const cfg = TOAST_CONFIG[type];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem',
        background: '#111111',
        borderLeft: `3px solid ${cfg.accent}`,
        border: `1px solid rgba(255,255,255,0.08)`,
        borderLeft: `3px solid ${cfg.accent}`,
        padding: '0.85rem 1rem',
        maxWidth: 380,
        boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)',
        ...(position === 'bottom' ? {
          position: 'fixed' as const,
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          width: '90%',
          maxWidth: 400,
        } : {}),
      }}
    >
      {showIcon && (
        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: cfg.accent,
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontWeight: 900,
          flexShrink: 0,
        }}>
          {cfg.icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: '#ffffff',
          marginBottom: '0.25rem',
        }}>
          {cfg.title}
        </div>
        <div style={{
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.02em',
          lineHeight: 1.5,
        }}>
          {cfg.message}
        </div>
      </div>
      {showClose && (
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.3)',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            padding: 0,
            flexShrink: 0,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

const TYPES: ToastType[] = ['success', 'error', 'warning', 'info'];

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopToast
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Slide-in notification — colored left border accent
    </p>

    <p style={S.sectionTitle}>All Types</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {TYPES.map(t => <Toast key={t} type={t} />)}
    </div>
    <pre style={S.code}>{`showToast({
  type: 'success',
  title: 'Payment Successful',
  message: 'Your transaction has been processed.',
});`}</pre>

    <p style={S.sectionTitle}>Without Icon</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {TYPES.map(t => <Toast key={t} type={t} showIcon={false} />)}
    </div>

    <p style={S.sectionTitle}>Without Close Button</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      <Toast type="info" showClose={false} />
      <Toast type="success" showClose={false} />
    </div>

    <p style={S.sectionTitle}>Auto Close (label only)</p>
    <AutoCloseToast />

    <p style={S.sectionTitle}>Usage Code</p>
    <pre style={S.code}>{`// In your app entry / global context:
import { NeoPopToastProvider, useToast } from 'neopop-rn';

// Inside component:
const { showToast } = useToast();

showToast({
  type: 'error',
  title: 'Transaction Failed',
  message: 'Please try again.',
  duration: 4000,
  position: 'bottom',
});`}</pre>
  </div>
);

const AutoCloseToast: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { setVisible(false); clearInterval(interval); return 0; }
        return p - 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [visible]);

  const reset = () => { setVisible(true); setProgress(100); };

  if (!visible) {
    return (
      <div>
        <button
          onClick={reset}
          style={{
            background: '#0066FF',
            color: '#ffffff',
            border: 'none',
            padding: '0.5rem 1.25rem',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '3px 3px 0 0 rgba(0,40,140,0.8)',
          }}
        >
          Show Toast Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 380 }}>
      <Toast type="success" showClose={false} />
      <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', marginTop: 0 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#06C270', transition: 'width 0.08s linear' }} />
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Components/NeoPopToast',
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

export const Success: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Toast type="success" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Toast type="error" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem', gap: '1rem' }}>
      {TYPES.map(t => <Toast key={t} type={t} showIcon />)}
    </div>
  ),
};

export const AutoClose: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AutoCloseToast />
    </div>
  ),
};
