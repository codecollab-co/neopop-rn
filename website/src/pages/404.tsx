import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function NotFound(): JSX.Element {
  useEffect(() => {
    // Redirect /neopop-rn/storybook/ → /neopop-rn/storybook/index.html
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/storybook')) {
        window.location.replace(
          'https://codecollab-co.github.io/neopop-rn/storybook/index.html'
        );
      }
    }
  }, []);

  return (
    <Layout title="Page Not Found">
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          fontFamily: "'Outfit', sans-serif",
          textAlign: 'center',
          padding: '4rem 2rem',
        }}
      >
        <p
          style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--neopop-accent)',
            marginBottom: '1.5rem',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: '0 0 1.5rem',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--neopop-text-secondary)',
            maxWidth: 400,
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          We couldn't find what you were looking for.
        </p>
        <a
          href="/neopop-rn/"
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--neopop-accent)',
            border: '1px solid var(--neopop-accent-border)',
            padding: '0.75rem 1.75rem',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </a>
      </main>
    </Layout>
  );
}
