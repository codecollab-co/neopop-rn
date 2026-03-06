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
    marginBottom: '1.5rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    marginTop: '2rem',
  } as React.CSSProperties,
  metaLabel: {
    fontSize: '0.5rem',
    fontWeight: 600 as const,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
  } as React.CSSProperties,
};

const SPACING = [
  { name: 'XS', value: 4 },
  { name: 'SM', value: 8 },
  { name: 'MD', value: 16 },
  { name: 'LG', value: 24 },
  { name: 'XL', value: 32 },
  { name: 'XXL', value: 48 },
  { name: 'XXXL', value: 64 },
];

const OPACITY = [
  { name: 'DISABLED_OPACITY', value: 0.4, label: '40%' },
  { name: 'FULL_OPACITY', value: 1.0, label: '100%' },
];

const ScaleComponent: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      Spacing & Opacity
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Layout spacing constants and opacity tokens
    </p>

    <p style={S.sectionTitle}>Spacing Scale</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 600 }}>
      {SPACING.map(sp => (
        <div key={sp.name} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 60px', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0066FF',
          }}>
            {sp.name}
          </span>
          <div style={{ position: 'relative', height: 20 }}>
            <div
              style={{
                height: '100%',
                width: sp.value * 4,
                background: 'linear-gradient(90deg, #0066FF 0%, rgba(0,102,255,0.4) 100%)',
                border: '1px solid rgba(0,102,255,0.4)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ ...S.metaLabel, textAlign: 'right' as const }}>{sp.value}px</span>
        </div>
      ))}
    </div>

    <div style={{ marginTop: '2.5rem', padding: '2rem', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', maxWidth: 600 }}>
      <p style={{ ...S.metaLabel, marginBottom: '1.5rem' }}>Visual comparison — all bars to scale (1px = 1px)</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
        {SPACING.map(sp => (
          <div key={sp.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{sp.value}</span>
            <div style={{ width: sp.value, height: sp.value, background: '#0066FF', border: '1px solid rgba(0,102,255,0.6)' }} />
          </div>
        ))}
      </div>
    </div>

    <p style={S.sectionTitle}>Opacity Scale</p>

    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {OPACITY.map(op => (
        <div key={op.name} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0066FF',
          }}>
            {op.name}
          </span>
          <div
            style={{
              width: 120,
              height: 60,
              background: '#0066FF',
              opacity: op.value,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={S.metaLabel}>{op.value}</span>
            <span style={{ ...S.metaLabel, color: 'rgba(255,255,255,0.4)' }}>{op.label}</span>
          </div>
          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', maxWidth: 160, lineHeight: 1.6 }}>
            {op.name === 'DISABLED_OPACITY'
              ? 'Applied to disabled interactive elements'
              : 'Full visible state for active elements'}
          </p>
        </div>
      ))}
    </div>

    <div style={{ marginTop: '3rem', padding: '2rem', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', maxWidth: 600 }}>
      <p style={{ ...S.metaLabel, marginBottom: '1.25rem' }}>Disabled vs Enabled Comparison</p>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{
          padding: '0.75rem 1.75rem',
          background: '#ffffff',
          color: '#000000',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.4,
          cursor: 'not-allowed',
        }}>
          Disabled
        </div>
        <div style={{
          padding: '0.75rem 1.75rem',
          background: '#ffffff',
          color: '#000000',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Enabled
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundation/Spacing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <ScaleComponent />,
};
