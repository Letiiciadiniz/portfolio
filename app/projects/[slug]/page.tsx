import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProject, projects } from '../../data/projects';
import { ProjectLinkButton } from '../../components/ProjectLinkButton';

const caseStudies = projects.filter((p) => p.caseStudy);

// Build one page per case-study project at deploy time.
export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Leticia Diniz`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;
  const Icon = project.icon;
  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const facts = [
    { label: 'Role', value: cs.role },
    { label: 'Timeline', value: cs.timeline },
    cs.team && { label: 'Team', value: cs.team },
    cs.status && { label: 'Status', value: cs.status },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Link
          href="/#portfolio"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        {/* Header */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {project.category}
        </p>
        <h1 className="mb-5 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
          {project.title}
        </h1>
        <p className="mb-10 text-xl leading-relaxed text-gray-600 dark:text-gray-300">{project.summary}</p>

        {/* Quick facts */}
        <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-gray-200 py-6 dark:border-gray-800 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {f.label}
              </dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Hero image */}
        <div className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
              <Icon size={80} strokeWidth={1.25} className="text-white/90" />
            </div>
          )}
        </div>

        {/* Key numbers */}
        {cs.metrics && cs.metrics.length > 0 && (
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{m.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Problem */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">The problem</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{cs.problem}</p>
        </section>

        {/* Body sections */}
        {cs.sections.map((s) => (
          <section key={s.heading} className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{s.heading}</h2>
            {s.body && <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{s.body}</p>}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-lg text-gray-700 dark:text-gray-300">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Gallery */}
        {cs.gallery && cs.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((g) => (
                <figure key={g.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.caption} className="mb-2 w-full rounded-xl object-cover" />
                  <figcaption className="text-sm text-gray-500 dark:text-gray-400">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Tools & skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mb-16 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <ProjectLinkButton key={link.href} link={link} />
            ))}
          </div>
        )}

        {/* Next project */}
        {next && next.slug !== project.slug && (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Next project
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{next.title}</p>
            </div>
            <ArrowRight className="text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-500" />
          </Link>
        )}
      </article>
    </main>
  );
}
