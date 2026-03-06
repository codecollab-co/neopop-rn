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
  variantRow: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    marginBottom: '2.5rem',
  } as React.CSSProperties,
  variantBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    alignItems: 'flex-start',
  } as React.CSSProperties,
  variantLabel: {
    fontSize: '0.5rem',
    fontWeight: 700 as const,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.28)',
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
  } as React.CSSProperties,
};

interface NeoPopBtn3DProps {
  label: string;
  faceColor?: string;
  textColor?: string;
  shadowDepth?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  fontSize?: string;
  padding?: string;
}

const NeoPopBtn3D: React.FC<NeoPopBtn3DProps> = ({
  label,
  faceColor = '#ffffff',
  textColor = '#000000',
  shadowDepth = 4,
  disabled = false,
  fullWidth = false,
  fontSize = '0.7rem',
  padding = '0.75rem 1.75rem',
}) => {
  const darken = (hex: string, amount: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return `rgb(${r},${g},${b})`;
  };
  const shadowColor = darken(faceColor, 80);

  return (
    <div
      style={{
        position: 'relative',
        display: fullWidth ? 'block' : 'inline-block',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          background: faceColor,
          color: textColor,
          fontFamily: "'Outfit', sans-serif",
          fontSize,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding,
          display: fullWidth ? 'block' : 'inline-block',
          textAlign: 'center',
          boxShadow: `${shadowDepth}px ${shadowDepth}px 0 0 ${shadowColor}`,
          position: 'relative',
          zIndex: 1,
          transition: 'box-shadow 0.1s ease, transform 0.1s ease',
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface StrokeBtn3DProps {
  label: string;
  borderColor?: string;
  disabled?: boolean;
}

const StrokeBtn3D: React.FC<StrokeBtn3DProps> = ({ label, borderColor = '#ffffff', disabled = false }) => (
  <div style={{ display: 'inline-block', opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
    <div style={{
      background: 'transparent',
      color: borderColor,
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      padding: '0.75rem 1.75rem',
      border: `2px solid ${borderColor}`,
      boxShadow: `4px 4px 0 0 rgba(255,255,255,0.15)`,
    }}>
      {label}
    </div>
  </div>
);

interface ShimmerBtnProps {
  label: string;
  faceColor?: string;
}

const ShimmerBtn: React.FC<ShimmerBtnProps> = ({ label, faceColor = '#06C270' }) => (
  <div style={{ display: 'inline-block', position: 'relative', overflow: 'hidden' }}>
    <style>{`
      @keyframes shimmerSweep {
        0% { transform: translateX(-100%) skewX(-12deg); }
        100% { transform: translateX(200%) skewX(-12deg); }
      }
    `}</style>
    <div style={{
      background: faceColor,
      color: '#000000',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      padding: '0.75rem 1.75rem',
      boxShadow: `4px 4px 0 0 #04905A`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {label}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
        animation: 'shimmerSweep 1.8s ease-in-out infinite',
      }} />
    </div>
  </div>
);

const AllVariants: React.FC = () => (
  <div style={S.page}>
    <p style={S.heading}>NeoPop Design System</p>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
      NeoPopButton
    </h2>
    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginBottom: '3rem' }}>
      3D extruded tactile button — main face + bottom/right depth shadows
    </p>

    <p style={S.sectionTitle}>Elevated</p>
    <div style={S.variantRow}>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>White Face</span>
        <NeoPopBtn3D label="Pay Now" faceColor="#ffffff" textColor="#000000" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Blue Face</span>
        <NeoPopBtn3D label="Continue" faceColor="#0066FF" textColor="#ffffff" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Usage</span>
        <pre style={S.code}>{`<NeoPopButton
  variant="elevated"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Pay Now</Typography>
</NeoPopButton>`}</pre>
      </div>
    </div>

    <p style={S.sectionTitle}>Flat</p>
    <div style={S.variantRow}>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>No depth</span>
        <div style={{
          background: '#ffffff',
          color: '#000000',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.75rem',
        }}>
          Flat Button
        </div>
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Usage</span>
        <pre style={S.code}>{`<NeoPopButton
  variant="flat"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Flat Button</Typography>
</NeoPopButton>`}</pre>
      </div>
    </div>

    <p style={S.sectionTitle}>Stroke</p>
    <div style={S.variantRow}>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>White border</span>
        <StrokeBtn3D label="Stroke Button" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Blue border</span>
        <StrokeBtn3D label="Stroke Button" borderColor="#0066FF" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Usage</span>
        <pre style={S.code}>{`<NeoPopButton
  variant="stroke"
  color="#ffffff"
  onPress={() => {}}
>
  <Typography>Stroke Button</Typography>
</NeoPopButton>`}</pre>
      </div>
    </div>

    <p style={S.sectionTitle}>With Shimmer</p>
    <div style={S.variantRow}>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Green shimmer</span>
        <ShimmerBtn label="Claim Reward" faceColor="#06C270" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Blue shimmer</span>
        <ShimmerBtn label="Get Started" faceColor="#0066FF" />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Usage</span>
        <pre style={S.code}>{`<NeoPopButton
  variant="elevated"
  color="#06C270"
  showShimmer
  onPress={() => {}}
>
  <Typography>Claim Reward</Typography>
</NeoPopButton>`}</pre>
      </div>
    </div>

    <p style={S.sectionTitle}>Disabled</p>
    <div style={S.variantRow}>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>opacity: 0.4</span>
        <NeoPopBtn3D label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
      </div>
      <div style={S.variantBlock}>
        <span style={S.variantLabel}>Usage</span>
        <pre style={S.code}>{`<NeoPopButton
  variant="elevated"
  color="#ffffff"
  disabled
  onPress={() => {}}
>
  <Typography>Disabled</Typography>
</NeoPopButton>`}</pre>
      </div>
    </div>

    <p style={S.sectionTitle}>Big / Full Width</p>
    <div style={{ marginBottom: '2rem' }}>
      <NeoPopBtn3D label="Full Width Button" faceColor="#0066FF" textColor="#ffffff" fullWidth fontSize="0.8rem" padding="1rem 2rem" />
    </div>
    <pre style={S.code}>{`<NeoPopButton
  variant="elevated"
  color="#0066FF"
  fullWidth
  onPress={() => {}}
>
  <Typography>Full Width Button</Typography>
</NeoPopButton>`}</pre>

    <p style={S.sectionTitle}>Adjacent Left / Right (no gap)</p>
    <div style={{ display: 'flex', gap: 0, marginBottom: '1.5rem' }}>
      <div style={{
        flex: 1,
        background: '#ffffff',
        color: '#000000',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '0.75rem 0',
        textAlign: 'center',
        boxShadow: '4px 4px 0 0 rgb(175,175,175)',
        cursor: 'pointer',
      }}>
        Cancel
      </div>
      <div style={{
        flex: 1,
        background: '#0066FF',
        color: '#ffffff',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '0.75rem 0',
        textAlign: 'center',
        boxShadow: '4px 4px 0 0 rgb(0,60,175)',
        cursor: 'pointer',
      }}>
        Confirm
      </div>
    </div>
    <pre style={S.code}>{`<Row>
  <NeoPopButton variant="elevated" color="#ffffff" adjacentLeft>
    <Typography>Cancel</Typography>
  </NeoPopButton>
  <NeoPopButton variant="elevated" color="#0066FF" adjacentRight>
    <Typography>Confirm</Typography>
  </NeoPopButton>
</Row>`}</pre>
  </div>
);

interface ButtonProps {
  variant?: 'elevated' | 'flat' | 'stroke';
  size?: 'big' | 'medium' | 'small';
  disabled?: boolean;
  fullWidth?: boolean;
  color?: string;
}

const ButtonPlayground: React.FC<ButtonProps> = ({
  variant = 'elevated',
  disabled = false,
  fullWidth = false,
  color = '#ffffff',
}) => {
  if (variant === 'stroke') {
    return (
      <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StrokeBtn3D label="Playground" borderColor={color} disabled={disabled} />
      </div>
    );
  }
  return (
    <div style={{ ...S.page, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <NeoPopBtn3D
        label="Playground"
        faceColor={color}
        textColor={color === '#ffffff' ? '#000000' : '#ffffff'}
        disabled={disabled}
        fullWidth={fullWidth}
      />
    </div>
  );
};

const meta: Meta<ButtonProps> = {
  title: 'Components/NeoPopButton',
  component: ButtonPlayground,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'flat', 'stroke'],
    },
    size: {
      control: { type: 'select' },
      options: ['big', 'medium', 'small'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const AllVariantsStory: Story = {
  name: 'All Variants',
  render: () => <AllVariants />,
};

export const Playground: Story = {
  args: {
    variant: 'elevated',
    disabled: false,
    fullWidth: false,
    color: '#ffffff',
  },
};

export const Elevated: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <NeoPopBtn3D label="White" faceColor="#ffffff" textColor="#000000" />
      <NeoPopBtn3D label="Blue" faceColor="#0066FF" textColor="#ffffff" />
      <NeoPopBtn3D label="Success" faceColor="#06C270" textColor="#000000" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ ...S.page, display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <NeoPopBtn3D label="Disabled" faceColor="#ffffff" textColor="#000000" disabled />
      <StrokeBtn3D label="Disabled Stroke" disabled />
    </div>
  ),
};
