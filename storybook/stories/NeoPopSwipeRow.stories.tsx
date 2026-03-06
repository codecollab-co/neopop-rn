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

interface SwipeRowProps {
  title: string;
  subtitle?: string;
  leftAction?: { label: string; color: string };
  rightAction?: { label: string; color: string };
  swipeHint?: boolean;
}

const SwipeRow: React.FC<SwipeRowProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  swipeHint = false,
}) => {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = React.useRef(0);

  const ACTION_WIDTH = 80;
  const maxLeft = leftAction ? ACTION_WIDTH : 0;
  const maxRight = rightAction ? -ACTION_WIDTH : 0;

  const clamp = (v: number) => Math.min(maxLeft, Math.max(maxRight, v));

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.clientX - offset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const raw = e.clientX - startX.current;
    setOffset(clamp(raw));
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (offset > ACTION_WIDTH / 2 && leftAction) {
      setOffset(ACTION_WIDTH);
    } else if (offset < -(ACTION_WIDTH / 2) && rightAction) {
      setOffset(-ACTION_WIDTH);
    } else {
      setOffset(0);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 440,
        cursor: 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left action panel */}
      {leftAction && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: ACTION_WIDTH,
          background: leftAction.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#000000',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {leftAction.label}
        </div>
      )}

      {/* Right action panel */}
      {rightAction && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: ACTION_WIDTH,
          background: rightAction.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#ffffff',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {rightAction.label}
        </div>
      )}

      {/* Main row */}
      <div
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          transform: `translateX(${offset}px)`,
          transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: 36, height: 36, background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '0.7rem', color: '#0066FF' }}>₹</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>
              {subtitle}
            </div>
          )}
        </div>
        {swipeHint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
            {leftAction && <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>←</span>}
            {rightAction && <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>→</span>}
          </div>
        )}
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
          ₹5,000
        </div>
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopSwipeRow
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Swipeable list row — drag left/right to reveal action panels
    </p>

    <p style={S.sectionTitle}>Default (drag hint)</p>
    <SwipeRow
      title="HDFC Credit Card"
      subtitle="Due in 5 days"
      leftAction={{ label: 'Pay', color: '#06C270' }}
      rightAction={{ label: 'Delete', color: '#EE4D37' }}
      swipeHint
    />
    <pre style={S.code}>{`<NeoPopSwipeRow
  leftActions={[{ label: 'Pay', color: '#06C270', onPress }]}
  rightActions={[{ label: 'Delete', color: '#EE4D37', onPress }]}
>
  <RowContent />
</NeoPopSwipeRow>`}</pre>

    <p style={S.sectionTitle}>With Left Action (Archive)</p>
    <SwipeRow
      title="Axis Bank Statement"
      subtitle="Monthly summary"
      leftAction={{ label: 'Archive', color: '#06C270' }}
    />

    <p style={S.sectionTitle}>With Right Action (Delete)</p>
    <SwipeRow
      title="ICICI Credit Card"
      subtitle="Linked account"
      rightAction={{ label: 'Remove', color: '#EE4D37' }}
    />

    <p style={S.sectionTitle}>Both Actions</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', maxWidth: 440 }}>
      {[
        { title: 'HDFC Credit Card', subtitle: 'Bill due 12th Mar' },
        { title: 'Amazon Pay Card', subtitle: 'Bill due 18th Mar' },
        { title: 'Kotak Mahindra', subtitle: 'Bill due 25th Mar' },
      ].map(item => (
        <SwipeRow
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          leftAction={{ label: 'Pay', color: '#06C270' }}
          rightAction={{ label: 'Snooze', color: '#F5A623' }}
        />
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopSwipeRow',
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

export const Default: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SwipeRow
        title="HDFC Credit Card"
        subtitle="Due in 5 days"
        leftAction={{ label: 'Pay', color: '#06C270' }}
        rightAction={{ label: 'Delete', color: '#EE4D37' }}
        swipeHint
      />
    </div>
  ),
};

export const WithLeftAction: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SwipeRow
        title="Archive this item"
        subtitle="Drag right to archive"
        leftAction={{ label: 'Archive', color: '#06C270' }}
      />
    </div>
  ),
};

export const WithRightAction: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SwipeRow
        title="Delete this item"
        subtitle="Drag left to delete"
        rightAction={{ label: 'Delete', color: '#EE4D37' }}
      />
    </div>
  ),
};
