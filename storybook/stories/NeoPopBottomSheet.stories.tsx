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

interface MockPhoneProps {
  sheetOpen?: boolean;
  sheetContent?: React.ReactNode;
}

const MockPhone: React.FC<MockPhoneProps> = ({ sheetOpen = false, sheetContent }) => (
  <div style={{
    width: 320,
    height: 560,
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Phone screen content */}
    <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Screen Content</div>
      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
        This represents the main app screen behind the bottom sheet.
      </div>
    </div>

    {/* Overlay */}
    {sheetOpen && (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        transition: 'opacity 0.3s ease',
      }} />
    )}

    {/* Bottom Sheet */}
    <div
      style={{
        position: 'absolute',
        bottom: sheetOpen ? 0 : '-100%',
        left: 0,
        right: 0,
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        transition: 'bottom 0.35s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 10,
        padding: '0.75rem 1.25rem 1.25rem',
      }}
    >
      {/* Notch */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{
          width: 36,
          height: 4,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
        }} />
      </div>
      {sheetContent || (
        <>
          <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
            Bottom Sheet Title
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Sheet content goes here. This slides up from the bottom of the screen.
          </div>
          <div style={{
            background: '#0066FF',
            color: '#ffffff',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.65rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 0 rgba(0,40,140,0.8)',
            cursor: 'pointer',
          }}>
            Confirm
          </div>
        </>
      )}
    </div>
  </div>
);

const InteractiveSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: '#0066FF',
          color: '#ffffff',
          border: 'none',
          padding: '0.6rem 1.5rem',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          boxShadow: '3px 3px 0 0 rgba(0,40,140,0.8)',
        }}
      >
        {open ? 'Close Sheet' : 'Open Sheet'}
      </button>
      <MockPhone sheetOpen={open} />
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopBottomSheet
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Modal bottom sheet — notch bar, overlay, slide-up animation
    </p>

    <p style={S.sectionTitle}>Closed State</p>
    <MockPhone sheetOpen={false} />
    <pre style={S.code}>{`<NeoPopBottomSheet
  isVisible={false}
  onClose={() => setVisible(false)}
>
  <SheetContent />
</NeoPopBottomSheet>`}</pre>

    <p style={S.sectionTitle}>Open State</p>
    <MockPhone sheetOpen={true} />
    <pre style={S.code}>{`<NeoPopBottomSheet
  isVisible={true}
  onClose={() => setVisible(false)}
>
  <SheetContent />
</NeoPopBottomSheet>`}</pre>

    <p style={S.sectionTitle}>Interactive Demo</p>
    <InteractiveSheet />
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopBottomSheet',
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
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MockPhone sheetOpen={false} />
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MockPhone sheetOpen={true} />
    </div>
  ),
};
