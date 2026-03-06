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
  box: {
    background: 'rgba(0,102,255,0.1)',
    border: '1px solid rgba(0,102,255,0.3)',
    padding: '0.75rem 1rem',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#0066FF',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
};

// Layout primitives

interface RowProps {
  children: React.ReactNode;
  gap?: number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
}

const Row: React.FC<RowProps> = ({
  children,
  gap = 16,
  align = 'center',
  justify = 'flex-start',
  wrap = false,
}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
  }}>
    {children}
  </div>
);

interface ColProps {
  children: React.ReactNode;
  gap?: number;
  align?: React.CSSProperties['alignItems'];
}

const Column: React.FC<ColProps> = ({ children, gap = 16, align = 'flex-start' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap,
    alignItems: align,
  }}>
    {children}
  </div>
);

interface PageContainerProps {
  children: React.ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
  maxWidth?: number;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  paddingHorizontal = 24,
  paddingVertical = 24,
  maxWidth = 480,
}) => (
  <div style={{
    width: '100%',
    maxWidth,
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
    boxSizing: 'border-box',
    background: '#0a0a0a',
    border: '1px solid rgba(255,255,255,0.07)',
  }}>
    {children}
  </div>
);

interface HorizontalDividerProps {
  color?: string;
  thickness?: number;
  margin?: number;
}

const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  color = 'rgba(255,255,255,0.07)',
  thickness = 1,
  margin = 16,
}) => (
  <div style={{
    width: '100%',
    height: thickness,
    background: color,
    margin: `${margin}px 0`,
  }} />
);

interface SpacerProps {
  size?: number;
}

const HorizontalSpacer: React.FC<SpacerProps> = ({ size = 16 }) => (
  <div style={{ width: size, height: 1, flexShrink: 0 }} />
);

const VerticalSpacer: React.FC<SpacerProps> = ({ size = 16 }) => (
  <div style={{ height: size, width: '100%', flexShrink: 0 }} />
);

// Demo box
const Box: React.FC<{ label: string; w?: number; h?: number }> = ({ label, w = 80, h = 40 }) => (
  <div style={{ ...S.box, width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {label}
  </div>
);

const AllLayouts: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      Layout Helpers
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Row · Column · PageContainer · Dividers · Spacers
    </p>

    {/* Row */}
    <p style={S.sectionTitle}>Row (horizontal flex)</p>
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem', maxWidth: 500, marginBottom: '0.5rem' }}>
      <Row gap={12}>
        <Box label="A" />
        <Box label="B" />
        <Box label="C" />
        <Box label="D" />
      </Row>
    </div>
    <pre style={S.code}>{`<Row gap={12} align="center">
  <BoxA />
  <BoxB />
  <BoxC />
</Row>`}</pre>

    {/* Row variants */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1rem', maxWidth: 500 }}>
        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>justify: space-between</span>
        <Row gap={8} justify="space-between">
          <Box label="Left" />
          <Box label="Right" />
        </Row>
      </div>
      <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1rem', maxWidth: 500 }}>
        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>justify: center</span>
        <Row gap={8} justify="center">
          <Box label="A" />
          <Box label="B" />
        </Row>
      </div>
    </div>

    {/* Column */}
    <p style={S.sectionTitle}>Column (vertical flex)</p>
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem', maxWidth: 200, marginBottom: '0.5rem' }}>
      <Column gap={8}>
        <Box label="Item 1" w={140} />
        <Box label="Item 2" w={140} />
        <Box label="Item 3" w={140} />
      </Column>
    </div>
    <pre style={S.code}>{`<Column gap={8}>
  <ItemA />
  <ItemB />
  <ItemC />
</Column>`}</pre>

    {/* PageContainer */}
    <p style={S.sectionTitle}>PageContainer (padded wrapper)</p>
    <PageContainer paddingHorizontal={24} paddingVertical={24} maxWidth={400}>
      <div style={{ fontSize: '0.55rem', color: '#0066FF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        paddingH: 24 · paddingV: 24
      </div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
        Content inside the PageContainer is padded and constrained to maxWidth.
      </div>
    </PageContainer>
    <pre style={S.code}>{`<PageContainer
  paddingHorizontal={24}
  paddingVertical={24}
  maxWidth={480}
>
  <Content />
</PageContainer>`}</pre>

    {/* HorizontalDivider */}
    <p style={S.sectionTitle}>HorizontalDivider</p>
    <div style={{ maxWidth: 400 }}>
      <Box label="Section A" w={200} />
      <HorizontalDivider margin={12} />
      <Box label="Section B" w={200} />
      <HorizontalDivider color="rgba(0,102,255,0.3)" thickness={2} margin={12} />
      <Box label="Section C" w={200} />
    </div>
    <pre style={S.code}>{`<HorizontalDivider />
<HorizontalDivider
  color="rgba(0,102,255,0.3)"
  thickness={2}
/>`}</pre>

    {/* HorizontalSpacer */}
    <p style={S.sectionTitle}>HorizontalSpacer</p>
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1rem', maxWidth: 500, marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box label="Left" w={80} />
        <HorizontalSpacer size={32} />
        <div style={{ ...S.box, background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>32</div>
        <HorizontalSpacer size={32} />
        <Box label="Right" w={80} />
      </div>
    </div>
    <pre style={S.code}>{`<Row>
  <LeftContent />
  <HorizontalSpacer size={32} />
  <RightContent />
</Row>`}</pre>

    {/* VerticalSpacer */}
    <p style={S.sectionTitle}>VerticalSpacer</p>
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1rem', maxWidth: 200, marginBottom: '0.5rem' }}>
      <Box label="Top" w={140} />
      <VerticalSpacer size={32} />
      <div style={{ ...S.box, background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', color: '#F5A623', height: 32, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>
        32px gap
      </div>
      <VerticalSpacer size={32} />
      <Box label="Bottom" w={140} />
    </div>
    <pre style={S.code}>{`<Column>
  <TopContent />
  <VerticalSpacer size={32} />
  <BottomContent />
</Column>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Foundation/Layout',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj;

export const AllLayoutsStory: Story = {
  name: 'All Layouts',
  render: () => <AllLayouts />,
};

export const RowLayout: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem' }}>
      <p style={S.heading}>Row — Horizontal Flex</p>
      <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem' }}>
        <Row gap={16}>
          <Box label="A" />
          <Box label="B" />
          <Box label="C" />
        </Row>
      </div>
      <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem' }}>
        <Row gap={16} justify="space-between">
          <Box label="Left" w={100} />
          <Box label="Center" w={100} />
          <Box label="Right" w={100} />
        </Row>
      </div>
    </div>
  ),
};

export const ColumnLayout: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', gap: '3rem', padding: '3rem', alignItems: 'flex-start' }}>
      <div>
        <p style={S.heading}>Column — Vertical Flex</p>
        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem' }}>
          <Column gap={12}>
            <Box label="Item 1" w={160} />
            <Box label="Item 2" w={160} />
            <Box label="Item 3" w={160} />
            <Box label="Item 4" w={160} />
          </Column>
        </div>
      </div>
    </div>
  ),
};

export const Spacers: Story = {
  render: () => (
    <div style={{ ...S.page, padding: '3rem' }}>
      <p style={S.heading}>Spacers & Dividers</p>
      <div style={{ maxWidth: 400 }}>
        <Box label="Content A" w={300} />
        <VerticalSpacer size={16} />
        <HorizontalDivider />
        <VerticalSpacer size={16} />
        <Box label="Content B" w={300} />
        <VerticalSpacer size={32} />
        <Box label="Content C" w={300} />
        <HorizontalDivider color="rgba(0,102,255,0.4)" thickness={2} />
        <Box label="Content D" w={300} />
      </div>
    </div>
  ),
};
