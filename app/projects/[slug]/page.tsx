import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/sections/project-detail';
import { projects } from '@/lib/projects';
import { pageMetadata } from '@/lib/seo';
import { imageUrl } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? pageMetadata({ title: `${project.title} — ${project.style} Interior`, description: project.summary, path: `/projects/${project.slug}`, image: imageUrl(project.heroImage, 1600), imageAlt: `${project.title}, a ${project.style.toLowerCase()} interior in ${project.location}` }) : { title: 'Project not found', robots: { index: false, follow: false } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  return <ProjectDetail project={projects[index]} index={index} />;
}
