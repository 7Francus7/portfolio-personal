import { type Project } from '../data/projects';

export function getProjectLinkLabel(project: Project) {
  const isLanding =
    project.category.includes('web-app') &&
    !project.category.includes('saas') &&
    !project.category.includes('pos') &&
    !project.category.includes('dashboard');

  return isLanding ? 'Abrir landing' : 'Abrir sistema';
}

/** Pretty domain for display: https://www.courtops.net/ -> courtops.net */
export function prettyDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  }
}

export type ProjectLink =
  | { kind: 'live'; href: string; display: string; label: string }
  | { kind: 'code'; href: string; display: string; label: string }
  | { kind: 'private'; display: string; label: string };

/**
 * Decide intelligently what to surface for a project:
 * a live URL first, then public source code, otherwise a clear private notice.
 */
export function getProjectLink(project: Project): ProjectLink {
  if (project.demo) {
    return {
      kind: 'live',
      href: project.demo,
      display: prettyDomain(project.demo),
      label: getProjectLinkLabel(project),
    };
  }
  if (project.github && !project.private) {
    return {
      kind: 'code',
      href: project.github,
      display: 'github.com',
      label: 'Ver código',
    };
  }
  return {
    kind: 'private',
    display: project.status === 'client' ? 'Trabajo de cliente' : 'Proyecto privado',
    label: 'Sin acceso público',
  };
}

/** Only show a screenshot when it is a genuine product capture, flagged by hand. */
export function hasRealScreenshot(project: Project) {
  return !!project.realScreenshot && project.images.length > 0;
}
