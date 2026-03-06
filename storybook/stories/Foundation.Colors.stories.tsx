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
  label: {
    fontSize: '0.55rem',
    fontWeight: 700 as const,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
    marginBottom: '2rem',
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
  } as React.CSSProperties,
  grid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1.5rem',
    marginBottom: '2.5rem',
  } as React.CSSProperties,
  swatchWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: '0.5rem',
    width: 80,
  } as React.CSSProperties,
  swatchName: {
    fontSize: '0.52rem',
    fontWeight: 700 as const,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.5)',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
  swatchHex: {
    fontSize: '0.5rem',
    fontWeight: 400 as const,
    letterSpacing: '0.05em',
    color: 'rgba(255,255,255,0.28)',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
};

interface SwatchProps {
  name: string;
  hex: string;
  width?: number;
  height?: number;
}

const Swatch: React.FC<SwatchProps> = ({ name, hex, width = 80, height = 80 }) => (
  <div style={S.swatchWrap}>
    <span style={S.swatchName}>{name}</span>
    <div
      style={{
        width,
        height,
        background: hex,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    />
    <span style={S.swatchHex}>{hex}</span>
  </div>
);

const PRIMARY = [
  { name: 'POP_BLACK', hex: '#000000' },
  { name: 'POP_WHITE', hex: '#FFFFFF' },
];

const SEMANTIC = [
  { name: 'SUCCESS', hex: '#06C270' },
  { name: 'ERROR', hex: '#EE4D37' },
  { name: 'WARNING', hex: '#F5A623' },
  { name: 'INFO', hex: '#2196F3' },
];

const PURPLE = [
  { name: 'PURPLE_500', hex: '#7C5CFC' },
  { name: 'PURPLE_400', hex: '#9B82FD' },
  { name: 'PURPLE_300', hex: '#B9A8FE' },
  { name: 'PURPLE_200', hex: '#D7CFFE' },
  { name: 'PURPLE_100', hex: '#EDE9FF' },
];

const SEMANTIC_SUCCESS = [
  { name: 'SUCCESS_500', hex: '#06C270' },
  { name: 'SUCCESS_400', hex: '#38D08E' },
  { name: 'SUCCESS_300', hex: '#6ADEAD' },
  { name: 'SUCCESS_200', hex: '#9CECCC' },
  { name: 'SUCCESS_100', hex: '#D0F9EA' },
];

const SEMANTIC_ERROR = [
  { name: 'ERROR_500', hex: '#EE4D37' },
  { name: 'ERROR_400', hex: '#F2705F' },
  { name: 'ERROR_300', hex: '#F59387' },
  { name: 'ERROR_200', hex: '#F9B5AF' },
  { name: 'ERROR_100', hex: '#FCD8D5' },
];

const ACCENT = [
  { name: 'ACCENT_500', hex: '#0066FF' },
  { name: 'ACCENT_400', hex: '#3385FF' },
  { name: 'ACCENT_300', hex: '#66A3FF' },
  { name: 'ACCENT_200', hex: '#99C2FF' },
  { name: 'ACCENT_100', hex: '#CCE0FF' },
];

const PaletteComponent: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
      Color Palette
    </h2>

    <p style={S.sectionTitle}>Primary</p>
    <div style={S.grid}>
      {PRIMARY.map(c => <Swatch key={c.hex} {...c} />)}
    </div>

    <p style={S.sectionTitle}>Semantic</p>
    <div style={S.grid}>
      {SEMANTIC.map(c => <Swatch key={c.hex} {...c} />)}
    </div>

    <p style={S.sectionTitle}>Purple Scale</p>
    <div style={S.grid}>
      {PURPLE.map(c => <Swatch key={c.hex} {...c} />)}
    </div>

    <p style={S.sectionTitle}>Accent / Blue Scale</p>
    <div style={S.grid}>
      {ACCENT.map(c => <Swatch key={c.hex} {...c} />)}
    </div>

    <p style={S.sectionTitle}>Semantic Success Palette</p>
    <div style={S.grid}>
      {SEMANTIC_SUCCESS.map(c => <Swatch key={c.hex} {...c} />)}
    </div>

    <p style={S.sectionTitle}>Semantic Error Palette</p>
    <div style={S.grid}>
      {SEMANTIC_ERROR.map(c => <Swatch key={c.hex} {...c} />)}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundation/Colors',
  component: PaletteComponent,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => <PaletteComponent />,
};
