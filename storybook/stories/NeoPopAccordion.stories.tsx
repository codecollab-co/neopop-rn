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

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle?: () => void;
  number?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen = false,
  onToggle,
  number,
}) => (
  <div
    style={{
      border: '1px solid rgba(255,255,255,0.08)',
      borderTop: isOpen ? `2px solid #0066FF` : '1px solid rgba(255,255,255,0.08)',
      background: isOpen ? 'rgba(0,102,255,0.04)' : '#0a0a0a',
      transition: 'border-color 0.15s ease, background 0.15s ease',
      marginBottom: '1px',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        cursor: 'pointer',
        userSelect: 'none',
        gap: '1rem',
      }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {number !== undefined && (
          <span style={{
            width: 22,
            height: 22,
            background: isOpen ? '#0066FF' : 'rgba(255,255,255,0.1)',
            color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            fontWeight: 700,
            flexShrink: 0,
            transition: 'background 0.15s ease',
          }}>
            {number}
          </span>
        )}
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.7)',
          transition: 'color 0.15s ease',
        }}>
          {title}
        </span>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
        }}
      >
        <path d="M3 5.5L8 10.5L13 5.5" stroke={isOpen ? '#0066FF' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </div>
    <div
      style={{
        overflow: 'hidden',
        maxHeight: isOpen ? 500 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{
        padding: '0 1.25rem 1rem',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.75,
        letterSpacing: '0.02em',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '0.75rem',
      }}>
        {content}
      </div>
    </div>
  </div>
);

const ITEMS = [
  {
    title: 'What is NeoPop?',
    content: 'NeoPop is CRED\'s design language that combines bold typography, 3D depth surfaces, and fluid animations to create a tactile digital experience. It bridges physical and digital interactions through carefully crafted visual metaphors.',
  },
  {
    title: 'How does the 3D surface work?',
    content: 'The 3D effect is achieved using box-shadow offsets on the main face element. A bottom shadow and right shadow (each 4px, 30% darker than the face color) create the illusion of depth and physical extrusion. On press, the shadows reduce to simulate depression.',
  },
  {
    title: 'Is it compatible with Expo?',
    content: 'Yes. neopop-rn supports both bare React Native and Expo managed workflow. Skia-based components require @shopify/react-native-skia which needs a bare workflow or EAS Build with native modules support.',
  },
  {
    title: 'Can I customize the color palette?',
    content: 'Absolutely. The design system exposes a theme provider that accepts custom color tokens. All components reference semantic tokens so swapping the accent color updates the entire UI consistently.',
  },
];

const SingleAccordion: React.FC<{ defaultOpen?: boolean }> = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ maxWidth: 480 }}>
      <AccordionItem
        title={ITEMS[0].title}
        content={ITEMS[0].content}
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        number={1}
      />
    </div>
  );
};

const MultipleAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div style={{ maxWidth: 480 }}>
      {ITEMS.map((item, i) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          content={item.content}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          number={i + 1}
        />
      ))}
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopAccordion
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Expand/collapse with smooth height transition
    </p>

    <p style={S.sectionTitle}>Collapsed</p>
    <SingleAccordion defaultOpen={false} />
    <pre style={S.code}>{`<NeoPopAccordion
  title="What is NeoPop?"
  isExpanded={false}
  onToggle={toggle}
>
  <Typography>Content here</Typography>
</NeoPopAccordion>`}</pre>

    <p style={S.sectionTitle}>Expanded</p>
    <SingleAccordion defaultOpen={true} />
    <pre style={S.code}>{`<NeoPopAccordion
  title="What is NeoPop?"
  isExpanded={true}
  onToggle={toggle}
>
  <Typography>Content here</Typography>
</NeoPopAccordion>`}</pre>

    <p style={S.sectionTitle}>Multiple (one open at a time)</p>
    <MultipleAccordion />
    <pre style={S.code}>{`<NeoPopAccordionGroup>
  {items.map(item => (
    <NeoPopAccordion
      key={item.id}
      title={item.title}
    >
      <Typography>{item.content}</Typography>
    </NeoPopAccordion>
  ))}
</NeoPopAccordionGroup>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopAccordion',
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

export const Collapsed: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <SingleAccordion defaultOpen={false} />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <SingleAccordion defaultOpen={true} />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '5rem' }}>
      <MultipleAccordion />
    </div>
  ),
};
