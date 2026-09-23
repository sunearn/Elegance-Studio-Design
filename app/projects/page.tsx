import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Projects } from '@/components/sections/projects';
export const metadata: Metadata = pageMetadata({ title: 'Selected Interior Design Projects', description: 'Explore considered homes shaped by architecture, material and light, from Elegance Design Studio in Pune, India.', path: '/projects' });
export default function ProjectsPage(){return <main><header className="page-hero"><div className="container"><span className="eyebrow">Selected work · 2023—25</span><h1 className="display">Homes with<br/>their own stories.</h1><p>Every project begins with the people and place. Explore a selection of homes designed to feel personal, grounded and a little more like you.</p></div></header><Projects/></main>;}
