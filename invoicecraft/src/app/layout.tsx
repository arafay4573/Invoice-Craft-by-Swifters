import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://invoicecraft.vercel.app'),
  title: "InvoiceCraft | Free Online Invoice Generator by Swifters",
  description: "Create professional invoices online instantly with InvoiceCraft — a free, no-subscription invoice generator. Customize, preview, and download your invoices as PDFs in seconds.",
  keywords: [
    "free invoice generator",
    "invoice maker online",
    "download invoice PDF",
    "no signup invoice creator",
    "Swifters invoice app",
    "professional billing template",
    "freelancer invoice tool"
  ],
  openGraph: {
    title: "InvoiceCraft | Free Online Invoice Generator by Swifters",
    description: "Generate, preview, and download clean invoices for free — fast, simple, and beautifully designed.",
    url: "https://invoicecraft.vercel.app",
    siteName: "InvoiceCraft",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "InvoiceCraft App Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceCraft | Free Invoice Generator",
    description: "Create professional invoices instantly — free and easy.",
    images: ["/og-banner.png"]
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://invoicecraft.vercel.app"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'InvoiceCraft',
    operatingSystem: 'Web',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Swifters',
      url: 'https://theswifters.com',
    },
    description:
      'InvoiceCraft is a free online invoice generator that helps freelancers and small businesses create professional invoices instantly with PDF download support and live preview.',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex-grow">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
