import { Source_Sans_3 } from 'next/font/google';
import { Providers } from './Providers';
import { LayoutShell } from '@/components/LayoutShell';
import { siteMetadata } from '@/lib/siteMetadata';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'prismjs/themes/prism.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`
  },
  description: `Blog by ${siteMetadata.title}`,
  metadataBase: new URL(siteMetadata.siteUrl)
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
