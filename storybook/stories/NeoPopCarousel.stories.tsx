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

interface CarouselCard {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
}

const CARDS: CarouselCard[] = [
  { id: 1, title: 'CRED Pay', subtitle: 'Pay bills, earn coins', color: '#0a0a1a', accent: '#0066FF' },
  { id: 2, title: 'CRED Store', subtitle: 'Exclusive rewards', color: '#0a1a0a', accent: '#06C270' },
  { id: 3, title: 'CRED Travel', subtitle: 'Premium stays', color: '#1a0a0a', accent: '#EE4D37' },
  { id: 4, title: 'CRED Mint', subtitle: 'Fixed deposits', color: '#1a1a0a', accent: '#F5A623' },
  { id: 5, title: 'CRED Cash', subtitle: 'Instant credit', color: '#0a1a1a', accent: '#7C5CFC' },
];

interface CarouselProps {
  items?: CarouselCard[];
  showDots?: boolean;
  cardWidth?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  items = CARDS,
  showDots = true,
  cardWidth = 220,
}) => {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => Math.max(0, a - 1));
  const next = () => setActive(a => Math.min(items.length - 1, a + 1));

  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      {/* Cards row */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            transform: `translateX(calc(-${active * (cardWidth + 16)}px))`,
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {items.map((card, i) => (
            <div
              key={card.id}
              style={{
                flexShrink: 0,
                width: cardWidth,
                height: 140,
                background: card.color,
                border: `1px solid ${active === i ? card.accent : 'rgba(255,255,255,0.06)'}`,
                borderBottom: `3px solid ${active === i ? card.accent : 'rgba(255,255,255,0.06)'}`,
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
                opacity: Math.abs(i - active) > 1 ? 0.4 : 1,
              }}
              onClick={() => setActive(i)}
            >
              <div style={{
                fontSize: '0.5rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: card.accent,
                marginBottom: '0.5rem',
              }}>
                CRED
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '0.3rem',
              }}>
                {card.title}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.02em',
              }}>
                {card.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={prev}
          disabled={active === 0}
          style={{
            background: active === 0 ? 'rgba(255,255,255,0.05)' : '#ffffff',
            color: active === 0 ? 'rgba(255,255,255,0.2)' : '#000000',
            border: 'none',
            width: 32,
            height: 32,
            cursor: active === 0 ? 'not-allowed' : 'pointer',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: active === 0 ? 'none' : '2px 2px 0 0 rgba(175,175,175,0.7)',
          }}
        >
          ←
        </button>

        {showDots && (
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {items.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 20 : 6,
                  height: 6,
                  background: active === i ? '#0066FF' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'width 0.25s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>
        )}

        <button
          onClick={next}
          disabled={active === items.length - 1}
          style={{
            background: active === items.length - 1 ? 'rgba(255,255,255,0.05)' : '#ffffff',
            color: active === items.length - 1 ? 'rgba(255,255,255,0.2)' : '#000000',
            border: 'none',
            width: 32,
            height: 32,
            cursor: active === items.length - 1 ? 'not-allowed' : 'pointer',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: active === items.length - 1 ? 'none' : '2px 2px 0 0 rgba(175,175,175,0.7)',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopCarousel
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Horizontal card carousel with dot indicators and prev/next controls
    </p>

    <p style={S.sectionTitle}>Default (with dots)</p>
    <Carousel />
    <pre style={S.code}>{`<NeoPopCarousel
  data={cards}
  renderItem={({ item }) => <Card {...item} />}
  showDots
/>`}</pre>

    <p style={S.sectionTitle}>Without Dots</p>
    <Carousel showDots={false} />

    <p style={S.sectionTitle}>Single Item</p>
    <Carousel items={[CARDS[0]]} showDots={false} cardWidth={280} />
    <pre style={S.code}>{`<NeoPopCarousel
  data={[singleCard]}
  renderItem={({ item }) => <Card {...item} />}
/>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopCarousel',
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
      <Carousel />
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Carousel showDots />
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Carousel items={[CARDS[2]]} showDots={false} cardWidth={300} />
    </div>
  ),
};
