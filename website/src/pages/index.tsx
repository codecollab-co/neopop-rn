import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const componentPreviews = [
  {
    title: 'Buttons with a physical response',
    detail: 'Five-face surfaces turn a press into visible depth.',
    image: 'img/neopop-elevated.png',
    alt: 'NeoPop elevated button in normal and pressed states',
  },
  {
    title: 'Motion that stays off the JS thread',
    detail: 'Reanimated worklets keep taps, swipes, and transitions responsive.',
    image: 'img/neopop-floating.png',
    alt: 'NeoPop floating button in normal and pressed states',
  },
  {
    title: 'Depth that is part of the system',
    detail: 'A single surface model keeps every component consistent.',
    image: 'img/neopop-surface-model.png',
    alt: 'NeoPop five-face surface model diagram',
  },
];

function HomepageHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>NeoPop for React Native</span>
          <Heading as="h1" className={styles.heroTitle}>
            Make interfaces<br />
            <span>feel real.</span>
          </Heading>
          <p className={styles.heroDescription}>
            A tactile, Skia-powered component kit for React Native teams shipping on iOS, Android, and web.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Start building
            </Link>
            <Link className={styles.textLink} to="/docs/components/NeoPopButton">
              Explore components <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.installHint}>
            <code>npm install @codecollab.co/neopop-rn</code>
          </p>
        </div>

        <div className={styles.heroVisual}>
          <img src="img/neopop-hero.jpg" alt="A sculptural NeoPop interface surface" />
          <span className={styles.visualCaption}>Touch has a point of view.</span>
        </div>
      </div>
    </header>
  );
}

function Foundation() {
  const foundation = [
    ['27', 'purpose-built components'],
    ['Skia', 'rendered 3D surfaces'],
    ['UI', 'thread-first animation'],
  ];

  return (
    <section className={styles.foundation}>
      <div className={styles.foundationIntro}>
        <p>Made for products that should feel as considered as they look.</p>
        <Link to="/docs/theming">See the design tokens <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.foundationStats}>
        {foundation.map(([value, label]) => (
          <div key={label} className={styles.foundationStat}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComponentShowcase() {
  return (
    <section className={styles.showcase}>
      <div className={styles.sectionLead}>
        <Heading as="h2">Every interaction earns its place.</Heading>
        <p>Buttons, inputs, gestures, navigation, and feedback built with a shared tactile language.</p>
      </div>
      <div className={styles.previewGrid}>
        {componentPreviews.map((preview, index) => (
          <article className={styles.preview} key={preview.title}>
            <div className={styles.previewImage}>
              <img src={preview.image} alt={preview.alt} loading={index === 0 ? 'eager' : 'lazy'} />
            </div>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Heading as="h3">{preview.title}</Heading>
            <p>{preview.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BuildStrip() {
  return (
    <section className={styles.buildStrip}>
      <div>
        <p>One package. Three platforms.</p>
        <Heading as="h2">Build depth into every tap.</Heading>
      </div>
      <div className={styles.platforms} aria-label="Supported platforms">
        <span>iOS</span>
        <span>Android</span>
        <span>Web</span>
      </div>
      <Link className="button button--primary button--lg" to="/docs/getting-started">
        Read the docs
      </Link>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <HomepageHero />
        <Foundation />
        <ComponentShowcase />
        <BuildStrip />
      </main>
    </Layout>
  );
}
