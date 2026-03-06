import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <span className={styles.heroEyebrow}>NeoPop Design System</span>
        <Heading as="h1" className={styles.heroTitle}>
          neopop-rn
        </Heading>
        <p className={styles.heroSubtitle}>
          3D surfaces, fluid animations, and tactile interactions
          for iOS, Android &amp; Web — powered by Skia and Reanimated.
        </p>
        <div className={styles.badges}>
          <img src="https://img.shields.io/npm/v/@codecollab.co/neopop-rn?style=flat-square&color=EDD514&labelColor=000000" alt="npm version" />
          <img src="https://img.shields.io/npm/l/@codecollab.co/neopop-rn?style=flat-square&color=EDD514&labelColor=000000" alt="license" />
          <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android%20%7C%20Web-EDD514?style=flat-square&labelColor=000000" alt="platforms" />
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/components/NeoPopButton">
            View Components
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatsStrip() {
  const stats = [
    { number: '27', label: 'Components' },
    { number: '18', label: 'UI-Thread Animated' },
    { number: '8', label: 'Skia Canvas' },
    { number: '< 1ms', label: 'JS Thread / Frame' },
    { number: '< 50KB', label: 'ESM Gzip' },
  ];

  return (
    <div className={styles.statsStrip}>
      {stats.map((s) => (
        <div key={s.label} className={styles.statItem}>
          <span className={styles.statNumber}>{s.number}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    title: '3D Surfaces',
    description: 'Real parallelogram rendering via @shopify/react-native-skia. Five-face depth model, crisp at any pixel density.',
  },
  {
    title: 'Fluid Animations',
    description: 'Reanimated 3 worklets on the UI thread. Zero JS bridge calls per frame, even at 120 FPS.',
  },
  {
    title: 'Complete Token System',
    description: 'Exported color palettes, spacing scale, typography — plus Style Dictionary output for CSS, Figma, Android, and iOS.',
  },
  {
    title: 'Gesture-Driven',
    description: 'Pan sliders, swipe rows, drag-to-dismiss sheets, velocity-aware carousels — all via RNGH v2.',
  },
  {
    title: 'Fully Typed',
    description: 'Strict TypeScript throughout. Every prop interface, every colorConfig key, every theme token exported.',
  },
  {
    title: 'WCAG 2.1 AA',
    description: 'accessibilityRole, accessibilityState, and accessibilityValue on every interactive component.',
  },
];

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeading}>
          <span className={styles.featuresEyebrow}>What's inside</span>
          <Heading as="h2" className={styles.featuresTitle}>Built to Ship</Heading>
        </div>
        <div className="row">
          {features.map((f, i) => (
            <div key={i} className={clsx('col col--4', styles.featureCol)}>
              <div className={styles.featureCard}>
                <span className={styles.featureNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Heading as="h3">{f.title}</Heading>
                <p>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <div className={styles.platformSection}>
      <div className="container">
        <span className={styles.platformLabel}>Platform support</span>
        <div className={styles.platformGrid}>
          <div className={clsx(styles.platformItem, styles.platformItemActive)}>iOS</div>
          <div className={clsx(styles.platformItem, styles.platformItemActive)}>Android</div>
          <div className={clsx(styles.platformItem, styles.platformItemActive)}>Web (Expo)</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <StatsStrip />
      <main>
        <HomepageFeatures />
        <PlatformSection />
      </main>
    </Layout>
  );
}
