import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Polarity - Personal Memory Companion',
  description: 'Your personal memory companion. Never forget what matters.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neural-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
