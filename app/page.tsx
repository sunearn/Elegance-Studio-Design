import type { Metadata } from 'next';
import { AboutStudio } from '@/components/sections/about-studio';
import { Contact } from '@/components/sections/contact';
import { DesignProcess } from '@/components/sections/design-process';
import { Hero } from '@/components/sections/hero';
import { FloorplanReveal } from '@/components/three/FloorplanReveal';
import { MaterialLibrary } from '@/components/sections/material-library';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { StyleExplorer } from '@/components/sections/style-explorer';
import { Testimonials } from '@/components/sections/testimonials';
import { RoomConfigurator } from '@/components/configurator/RoomConfigurator';
import { StudioStructuredData } from '@/components/seo/StudioStructuredData';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Elegance Design Studio — Interior Design in Pune', description: 'Elegance Design Studio creates considered homes in Pune, bringing architecture, function and feeling into balance.', path: '/' });

export default function HomePage() {
  return <><main><Hero /><FloorplanReveal /><RoomConfigurator /><Projects /><Services /><StyleExplorer /><MaterialLibrary /><DesignProcess /><AboutStudio /><Testimonials /><Contact compact /></main><StudioStructuredData /></>;
}
