import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChatAI Platform',
  description: 'Multi-agent AI chat platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
