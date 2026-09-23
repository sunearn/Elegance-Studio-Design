import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Footer, Navbar } from '@/components/site-shell';
import { MotionFeatures } from '@/components/animations/MotionFeatures';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600'] });
const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: { default: 'Elegance Design Studio | Interior Design in Pune', template: '%s | ' + SITE_NAME },
  description: 'Elegance Design Studio creates thoughtful interiors in Kharadi, Pune, shaping homes through architecture, material and light.',
  applicationName: SITE_NAME, creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_IN', siteName: SITE_NAME, title: 'Elegance Design Studio | Interior Design in Pune', description: 'Thoughtfully designed interiors where architecture, functionality and emotion come together.', url: '/', images: [{ url: DEFAULT_OG_IMAGE, alt: 'Elegance Design Studio logo' }] },
  twitter: { card: 'summary_large_image', title: 'Elegance Design Studio | Interior Design in Pune', description: 'Thoughtfully designed interiors where architecture, functionality and emotion come together.', images: [{ url: DEFAULT_OG_IMAGE, alt: 'Elegance Design Studio logo' }] },
  icons: { icon: [{ url: '/elegance-design-studio-logo.svg', type: 'image/svg+xml' }], shortcut: '/elegance-design-studio-logo.svg', apple: '/elegance-design-studio-logo.svg' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return <html lang="en-IN" className={display.variable + ' ' + sans.variable}><body><Navbar /><MotionFeatures>{children}</MotionFeatures><Footer /></body></html>;
}
