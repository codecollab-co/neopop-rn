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
    marginBottom: '1.25rem',
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
    marginBottom: '0.4rem',
  } as React.CSSProperties,
  row: {
    marginBottom: '2.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    paddingBottom: '2rem',
  } as React.CSSProperties,
};

const FONT_TYPES = [
  {
    type: 'HEADING',
    sample: 'The quick brown fox',
    fontSize: '2.75rem',
    fontWeight: 900,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    description: 'Large display headings — uppercase, heavy weight',
  },
  {
    type: 'CAPS',
    sample: 'Section Label',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    description: 'All-caps micro labels — wide tracking',
  },
  {
    type: 'BODY',
    sample: 'The quick brown fox jumps over the lazy dog.',
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    textTransform: 'none' as const,
    description: 'Body copy — comfortable reading weight',
  },
  {
    type: 'SERIF',
    sample: 'Elegant serif headline',
    fontSize: '2rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'none' as const,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    description: 'Serif accent — editorial headlines',
  },
];

const FONT_WEIGHTS: Array<{ weight: number; name: string }> = [
  { weight: 100, name: 'THIN' },
  { weight: 300, name: 'LIGHT' },
  { weight: 400, name: 'REGULAR' },
  { weight: 500, name: 'MEDIUM' },
  { weight: 600, name: 'SEMIBOLD' },
  { weight: 700, name: 'BOLD' },
  { weight: 800, name: 'EXTRABOLD' },
];

const TypeScaleComponent: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      Typography
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Font: Outfit · Type scale and weights
    </p>

    <p style={S.sectionTitle}>Type Scale — FontType Values</p>

    {FONT_TYPES.map(ft => (
      <div key={ft.type} style={S.row}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0066FF',
            background: 'rgba(0,102,255,0.09)',
            border: '1px solid rgba(0,102,255,0.25)',
            padding: '0.2rem 0.5rem',
            whiteSpace: 'nowrap',
          }}>
            {ft.type}
          </span>
          <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
            {ft.description}
          </span>
        </div>
        <div
          style={{
            fontFamily: ft.fontFamily ?? "'Outfit', sans-serif",
            fontSize: ft.fontSize,
            fontWeight: ft.fontWeight,
            letterSpacing: ft.letterSpacing,
            textTransform: ft.textTransform,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          {ft.sample}
        </div>
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem' }}>
          <span style={S.metaLabel}>size: {ft.fontSize}</span>
          <span style={S.metaLabel}>weight: {ft.fontWeight}</span>
          <span style={S.metaLabel}>tracking: {ft.letterSpacing}</span>
        </div>
      </div>
    ))}
  </div>
);

const FontWeightsComponent: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      Font Weights
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      BODY text across all FontWeight values
    </p>

    <p style={S.sectionTitle}>FontWeight Variants</p>

    {FONT_WEIGHTS.map(fw => (
      <div key={fw.name} style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 80px',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '1.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span style={{
          fontSize: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#0066FF',
          background: 'rgba(0,102,255,0.09)',
          border: '1px solid rgba(0,102,255,0.25)',
          padding: '0.2rem 0.5rem',
          width: 'fit-content',
        }}>
          {fw.name}
        </span>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1rem',
            fontWeight: fw.weight,
            letterSpacing: '0.02em',
            color: '#ffffff',
          }}
        >
          The quick brown fox jumps over the lazy dog.
        </div>
        <span style={S.metaLabel}>{fw.weight}</span>
      </div>
    ))}

    <div style={{ marginTop: '3rem', padding: '2rem', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ ...S.metaLabel, marginBottom: '1rem' }}>Combined Display</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'baseline' }}>
        {FONT_WEIGHTS.map(fw => (
          <span key={fw.name} style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: fw.weight,
            fontSize: '2rem',
            color: '#ffffff',
            letterSpacing: '0.04em',
          }}>
            Aa
          </span>
        ))}
      </div>
      <p style={{ marginTop: '0.5rem', fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        100 · 300 · 400 · 500 · 600 · 700 · 800
      </p>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const TypeScale: Story = {
  render: () => <TypeScaleComponent />,
};

export const FontWeights: Story = {
  render: () => <FontWeightsComponent />,
};
