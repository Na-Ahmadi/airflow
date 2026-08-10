import projects from '@/data/projects.json';

const FALLBACK_IMAGE = '/images/project-placeholder.svg';

export const PROJECT_IMAGES: Record<string, string> = Object.fromEntries(
  projects.fa.items.map((item) => [item.id, item.image]),
);

export function getProjectImage(slug: string): string {
  return PROJECT_IMAGES[slug] ?? FALLBACK_IMAGE;
}
