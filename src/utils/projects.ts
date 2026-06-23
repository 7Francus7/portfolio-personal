import { type Project } from '../data/projects';

export function getProjectLinkLabel(project: Project) {
  const isLanding =
    project.category.includes('web-app') &&
    !project.category.includes('saas') &&
    !project.category.includes('pos') &&
    !project.category.includes('dashboard');

  return isLanding ? 'Abrir landing' : 'Abrir sistema';
}

export function hasProjectImage(project: Project) {
  return project.images.length > 0;
}
