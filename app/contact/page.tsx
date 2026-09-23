import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ContactPage } from '@/components/sections/contact';
export const metadata: Metadata = pageMetadata({ title: 'Start Your Interior Design Project', description: 'Tell Elegance Design Studio about your space, location and plans. Start a conversation with our Pune design studio.', path: '/contact' });
export default function Page(){return <main><ContactPage/></main>;}
