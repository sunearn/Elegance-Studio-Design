import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ServicesPage } from '@/components/sections/services';
export const metadata: Metadata = pageMetadata({ title: 'Interior Design Services in Pune', description: 'From spatial planning to complete interior architecture, Elegance Design Studio offers a considered design process shaped around your home and needs.', path: '/services' });
export default function Page(){return <main><ServicesPage/></main>;}
