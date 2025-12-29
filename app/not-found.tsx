import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '96px', fontFamily: '-apple-system, Roboto, sans-serif, serif' }}>
      <h1 style={{ marginTop: 0, marginBottom: 64, maxWidth: 320 }}>Page not found</h1>
      <p style={{ marginBottom: 48 }}>
        Sorry, we couldn&apos;t find what you were looking for.
        <br />
        <br />
        <Link href="/">Go home</Link>.
      </p>
    </main>
  );
}
