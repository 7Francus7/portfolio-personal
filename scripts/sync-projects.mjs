#!/usr/bin/env node
/**
 * Sync portfolio projects from GitHub.
 *
 * Reads src/data/projects.config.json (curated repo list + narrative overrides),
 * fetches live metadata from the GitHub API, merges it with the overrides, adds a
 * live-capture screenshot URL for published sites, and writes
 * src/data/projects.generated.json (consumed by the app).
 *
 * Resilient by design: any GitHub failure falls back to the override data so a
 * deploy never breaks because of rate limits or a network blip. Set GITHUB_TOKEN
 * to raise the API rate limit.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../src/data');
const CONFIG = resolve(DATA_DIR, 'projects.config.json');
const OUT = resolve(DATA_DIR, 'projects.generated.json');

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const TOPIC_TO_CATEGORY = {
  saas: 'saas', dashboard: 'dashboard', analytics: 'dashboard', automation: 'automation',
  'internal-tool': 'internal-tool', api: 'api', rest: 'api', pos: 'pos', 'point-of-sale': 'pos',
  ecommerce: 'ecommerce', 'e-commerce': 'ecommerce', mobile: 'mobile-friendly', pwa: 'mobile-friendly',
  game: 'game', react: 'web-app', vue: 'web-app', nextjs: 'web-app', angular: 'web-app',
};

const prettify = (name) =>
  name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const mapTopics = (topics = []) => {
  const out = [];
  for (const t of topics) {
    const c = TOPIC_TO_CATEGORY[String(t).toLowerCase()];
    if (c && !out.includes(c)) out.push(c);
  }
  return out.length ? out : ['web-app'];
};

/** WordPress mShots captures the live URL and caches it on their CDN. */
const screenshotFor = (url) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=853`;

async function fetchRepo(owner, repo) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-sync' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${owner}/${repo}`);
  return res.json();
}

function buildProject(entry, gh) {
  const demo = entry.demo ?? gh?.homepage ?? undefined;
  const isPrivate = entry.private ?? false;
  const useShot = !isPrivate && !!demo && entry.screenshot !== false;
  const id =
    entry.id ?? (entry.repo ? entry.repo.toLowerCase().replace(/[^a-z0-9]/g, '') : prettify(entry.title || 'proyecto').toLowerCase().replace(/[^a-z0-9]/g, ''));

  return {
    id,
    title: entry.title ?? (gh ? prettify(gh.name) : 'Proyecto'),
    tagline: entry.tagline ?? gh?.description ?? 'Proyecto en GitHub',
    category: entry.category ?? mapTopics(gh?.topics),
    featured: entry.featured ?? false,
    status: entry.status ?? 'mvp',
    year: entry.year ?? String(new Date(gh?.pushed_at ?? gh?.created_at ?? Date.now()).getFullYear()),
    description: entry.description ?? gh?.description ?? '',
    problem: entry.problem ?? '',
    solution: entry.solution ?? '',
    stack: entry.stack ?? (gh?.language ? [gh.language] : []),
    features: entry.features ?? [],
    role: entry.role ?? 'Full-stack development',
    github: entry.github ?? gh?.html_url ?? undefined,
    demo: demo || undefined,
    images: useShot ? [screenshotFor(demo)] : [],
    realScreenshot: useShot,
    impact: entry.impact ?? undefined,
    private: isPrivate,
    metrics: entry.metrics ?? undefined,
  };
}

async function main() {
  const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
  const owner = config.owner;
  const out = [];
  let fetched = 0;
  let failed = 0;

  for (const entry of config.projects) {
    let gh = null;
    if (entry.repo) {
      try {
        gh = await fetchRepo(owner, entry.repo);
        fetched++;
      } catch (err) {
        failed++;
        console.warn(`  ! ${entry.repo}: ${err.message} — usando overrides`);
      }
    }
    out.push(buildProject(entry, gh));
  }

  // If every GitHub call failed and we already have a generated file, keep it
  // (avoids overwriting good data with a degraded, override-only build).
  if (failed > 0 && fetched === 0 && existsSync(OUT)) {
    console.warn('GitHub no respondió para ningún repo. Conservando projects.generated.json existente.');
    return;
  }

  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`✓ Sincronizados ${out.length} proyectos (GitHub: ${fetched} ok, ${failed} fallidos).`);
}

main().catch((err) => {
  // Never fail the build because of project sync.
  console.warn(`sync-projects: ${err.message}. Build continúa con datos existentes.`);
});
