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
        <Heading as="h1" className={styles.heroTitle}>
          neopop-rn
        </Heading>
        <p className={styles.heroSubtitle}>
          NeoPop design system for React Native.<br />
          3D, tactile, animated UI components for iOS, Android &amp; Web.
        </p>
        <div className={styles.badges}>
          <img src="https://img.shields.io/npm/v/@codecollab.co/neopop-rn?style=flat-square&color=EDD514&labelColor=0D0D0D" alt="npm version" />
          <img src="https://img.shields.io/npm/l/@codecollab.co/neopop-rn?style=flat-square&color=EDD514&labelColor=0D0D0D" alt="license" />
          <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android%20%7C%20Web-EDD514?style=flat-square&labelColor=0D0D0D" alt="platforms" />
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Get Started →
          </Link>
          <Link className="button button--outline button--lg" to="/docs/components/NeoPopButton">
            Components
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: '27 Components',
    description: 'Buttons, inputs, overlays, data viz, gestures — everything you need to build a CRED-style UI.',
  },
  {
    title: 'Skia-Powered 3D',
    description: 'Real parallelogram rendering via @shopify/react-native-skia. Crisp at any pixel density.',
  },
  {
    title: 'Fully Typed',
    description: 'Strict TypeScript throughout. Every prop, every colorConfig, every theme key — fully typed.',
  },
  {
    title: 'WCAG 2.1 AA',
    description: 'accessibilityRole, accessibilityState, accessibilityValue on every interactive component.',
  },
  {
    title: 'Themeable',
    description: 'Global dark/light theme with per-component colorConfig overrides. Deep merge built in.',
  },
  {
    title: 'Gesture-Driven',
    description: 'PanGesture sliders, swipe rows, carousels, drag-to-dismiss sheets — all via RNGH v2.',
  },
];

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((f, i) => (
            <div key={i} className={clsx('col col--4', styles.featureCol)}>
              <div className={styles.featureCard}>
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

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
