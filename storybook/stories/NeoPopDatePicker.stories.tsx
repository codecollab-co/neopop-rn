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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const YEARS = Array.from({ length: 30 }, (_, i) => String(2000 + i));

const ITEM_HEIGHT = 40;
const VISIBLE = 5;
const CENTER = Math.floor(VISIBLE / 2);

interface ScrollWheelProps {
  items: string[];
  selected: number;
  onSelect: (i: number) => void;
  label: string;
}

const ScrollWheel: React.FC<ScrollWheelProps> = ({ items, selected, onSelect, label }) => {
  const wheel = [
    ...Array(CENTER).fill(''),
    ...items,
    ...Array(CENTER).fill(''),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <span style={{ fontSize: '0.45rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </span>
      <div
        style={{
          position: 'relative',
          height: ITEM_HEIGHT * VISIBLE,
          width: 72,
          overflow: 'hidden',
        }}
      >
        {/* Selection highlight */}
        <div style={{
          position: 'absolute',
          top: CENTER * ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          background: 'rgba(0,102,255,0.12)',
          borderTop: '1px solid rgba(0,102,255,0.3)',
          borderBottom: '1px solid rgba(0,102,255,0.3)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Fade top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: CENTER * ITEM_HEIGHT,
          background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Fade bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: CENTER * ITEM_HEIGHT,
          background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Items */}
        <div
          style={{
            transform: `translateY(-${selected * ITEM_HEIGHT}px)`,
            transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {wheel.map((item, i) => {
            const realIndex = i - CENTER;
            const isSelected = realIndex === selected;
            const isBlank = item === '';
            return (
              <div
                key={`${i}-${item}`}
                style={{
                  height: ITEM_HEIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: isSelected ? '1rem' : '0.8rem',
                  fontWeight: isSelected ? 700 : 400,
                  color: isBlank ? 'transparent' : isSelected ? '#ffffff' : 'rgba(255,255,255,0.3)',
                  cursor: isBlank ? 'default' : 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'font-size 0.15s ease, color 0.15s ease',
                }}
                onClick={() => !isBlank && onSelect(realIndex)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface DatePickerProps {
  defaultDay?: number;
  defaultMonth?: number;
  defaultYear?: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  defaultDay = 14,
  defaultMonth = 2,
  defaultYear = 24,
}) => {
  const [day, setDay] = useState(defaultDay);
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);

  return (
    <div>
      <div style={{
        display: 'inline-flex',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.08)',
        gap: 0,
        position: 'relative',
      }}>
        <div style={{ padding: '0.75rem 1rem' }}>
          <ScrollWheel items={DAYS} selected={day} onSelect={setDay} label="Day" />
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', margin: '1rem 0' }} />
        <div style={{ padding: '0.75rem 1rem' }}>
          <ScrollWheel items={MONTHS} selected={month} onSelect={setMonth} label="Month" />
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', margin: '1rem 0' }} />
        <div style={{ padding: '0.75rem 1rem' }}>
          <ScrollWheel items={YEARS} selected={year} onSelect={setYear} label="Year" />
        </div>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
        Selected: {DAYS[day]} {MONTHS[month]} {YEARS[year]}
      </div>
    </div>
  );
};

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopDatePicker
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      Three-column scroll wheels — Day / Month / Year
    </p>

    <p style={S.sectionTitle}>Default</p>
    <DatePicker defaultDay={0} defaultMonth={0} defaultYear={24} />
    <pre style={S.code}>{`<NeoPopDatePicker
  value={selectedDate}
  onChange={setDate}
  minimumDate={new Date()}
/>`}</pre>

    <p style={S.sectionTitle}>With Selected Date</p>
    <DatePicker defaultDay={14} defaultMonth={2} defaultYear={24} />
    <pre style={S.code}>{`<NeoPopDatePicker
  value={new Date(2024, 2, 15)}
  onChange={setDate}
/>`}</pre>
  </div>
);

const meta: Meta = {
  title: 'Components/NeoPopDatePicker',
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
      <DatePicker defaultDay={0} defaultMonth={0} defaultYear={24} />
    </div>
  ),
};

export const WithSelected: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DatePicker defaultDay={14} defaultMonth={2} defaultYear={24} />
    </div>
  ),
};
