import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Uncerson AI IDE & Solana Staking Agent',
  description: 'Next-generation Solana AI IDE, QuickNode RPC integration, and Uncerson High-Yield Staking Protocol.',
  openGraph: {
    title: 'Uncerson AI IDE & Solana Staking Agent',
    description: 'Next-generation Solana AI IDE, QuickNode RPC integration, and Uncerson High-Yield Staking Protocol.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uncerson AI IDE & Solana Staking Agent',
    description: 'Next-generation Solana AI IDE, QuickNode RPC integration, and Uncerson High-Yield Staking Protocol.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
