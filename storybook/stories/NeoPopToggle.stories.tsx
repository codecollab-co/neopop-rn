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

interface ToggleProps {
  value?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value = false, label, disabled = false, onChange }) => {
  const [on, setOn] = useState(value);

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <>
      <style>{`
        .neo-toggle-thumb {
          transition: transform 0.22s cubic-bezier(0.4,0,0.2,1), background 0.22s ease;
        }
        .neo-toggle-track {
          transition: background 0.22s ease;
        }
      `}</style>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.85rem',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          userSelect: 'none',
        }}
        onClick={toggle}
      >
        <div
          className="neo-toggle-track"
          style={{
            width: 48,
            height: 26,
            background: on ? '#0066FF' : 'rgba(255,255,255,0.15)',
            border: `1px solid ${on ? '#0066FF' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: 0,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div
            className="neo-toggle-thumb"
            style={{
              position: 'absolute',
              top: 3,
              left: on ? 24 : 3,
              width: 18,
              height: 18,
              background: '#ffffff',
              boxShadow: '1px 1px 0 0 rgba(0,0,0,0.3)',
            }}
          />
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
    </>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopToggle
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Pill track with square thumb — smooth CSS transition
    </p>

    <p style={S.sectionTitle}>Off State</p>
    <Toggle value={false} />
    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
      Gray track, thumb positioned left
    </p>
    <pre style={S.code}>{`<NeoPopToggle
  value={false}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>On State</p>
    <Toggle value={true} />
    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
      Blue track, thumb positioned right
    </p>
    <pre style={S.code}>{`<NeoPopToggle
  value={true}
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>With Label</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Toggle value={false} label="Dark mode" />
      <Toggle value={true} label="Push notifications" />
      <Toggle value={false} label="Auto-save" />
      <Toggle value={true} label="Analytics sharing" />
    </div>
    <pre style={S.code}>{`<NeoPopToggle
  value={isDarkMode}
  label="Dark mode"
  onValueChange={setDarkMode}
/>`}</pre>

    <p style={S.sectionTitle}>Disabled</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toggle value={false} disabled label="Disabled off" />
      <Toggle value={true} disabled label="Disabled on" />
    </div>
    <pre style={S.code}>{`<NeoPopToggle
  value={false}
  disabled
  label="Disabled"
  onValueChange={(v) => console.log(v)}
/>`}</pre>

    <p style={S.sectionTitle}>Interactive Demo</p>
    <InteractiveSettings />
  </div>
);

const InteractiveSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: false,
    haptics: true,
    analytics: false,
  });

  return (
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', maxWidth: 340 }}>
      <p style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
        Settings
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(settings).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em', textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <Toggle
              value={val}
              onChange={(v) => setSettings(prev => ({ ...prev, [key]: v }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface PlaygroundProps {
  value?: boolean;
}

const PlaygroundComp: React.FC<PlaygroundProps> = ({ value = false }) => (
  <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Toggle value={value} label="Toggle option" />
  </div>
);

const meta: Meta<PlaygroundProps> = {
  title: 'Components/NeoPopToggle',
  component: PlaygroundComp,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    value: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Off: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Toggle value={false} label="Toggle off" />
    </div>
  ),
};

export const On: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Toggle value={true} label="Toggle on" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '3rem', gap: '1.25rem' }}>
      <Toggle value={false} label="Enable dark mode" />
      <Toggle value={true} label="Enable notifications" />
    </div>
  ),
};

export const Playground: Story = {
  args: { value: false },
};
