import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AboutStudio } from '@/components/sections/about-studio';
import { DesignProcess } from '@/components/sections/design-process';
import { Testimonials } from '@/components/sections/testimonials';
export const metadata: Metadata = pageMetadata({ title: 'About the Studio', description: 'Meet Elegance Design Studio, an independent design studio creating personal, lasting homes in Pune, India.', path: '/studio' });
export default function StudioPage(){return <main><header className="page-hero"><div className="container"><span className="eyebrow">About Elegance</span><h1 className="display">A small studio<br/>with a wide lens.</h1><p>Rooted in Pune and working across India, we create personal interiors with a lasting connection to place, craft and the people who call them home.</p></div></header><AboutStudio/><DesignProcess/><Testimonials all/></main>;}
