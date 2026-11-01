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
    <main className="min-h-screen">
      <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Link
          href="/#portfolio"
          className="mb-10 inline-flex items-center gap-2 text-[0.95rem] font-bold text-ink underline decoration-violet decoration-[3px] underline-offset-[6px] hover:decoration-ink"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        {/* Header */}
        <p className="mb-3 font-bold text-lilac">
          {project.category}
        </p>
        <h1 className="mb-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          {project.title}
        </h1>
        <p className="mb-10 text-xl leading-relaxed">{project.summary}</p>

        {/* Quick facts */}
        <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="mb-1 text-sm font-bold text-lilac">
                {f.label}
              </dt>
              <dd className="font-medium text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Hero image */}
        <div className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-card">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card">
              <Icon size={80} strokeWidth={1.25} className="text-violet" />
            </div>
          )}
        </div>

        {/* Key numbers */}
        {cs.metrics && cs.metrics.length > 0 && (
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-line bg-card p-5"
              >
                <p className="mb-1 text-2xl font-extrabold text-violet">{m.value}</p>
                <p className="text-sm leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Problem */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">The problem</h2>
          <p className="text-lg leading-relaxed">{cs.problem}</p>
        </section>

        {/* Body sections */}
        {cs.sections.map((s) => (
          <section key={s.heading} className="mb-12">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">{s.heading}</h2>
            {s.body && <p className="mb-4 text-lg leading-relaxed">{s.body}</p>}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-lg">
                    <span className="mt-3 size-1.5 flex-none rounded-full bg-violet" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="mt-6">
                <div className="overflow-x-auto rounded-xl border border-line bg-card">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-raise">
                      <tr>
                        {s.table.headers.map((h) => (
                          <th key={h} className="px-4 py-3 font-bold text-ink">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {s.table.rows.map((row) => (
                        <tr key={row.join('|')}>
                          {row.map((cell, i) => (
                            <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-ink' : 'tabular-nums'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {s.table.note && <p className="mt-2 text-sm text-muted">{s.table.note}</p>}
              </div>
            )}
            {s.figures && s.figures.length > 0 && (
              <div className={`mt-8 ${s.sideBySide ? 'grid gap-6 sm:grid-cols-2' : 'space-y-8'}`}>
                {s.figures.map((f) => (
                  <figure key={f.src}>
                    <div className="overflow-hidden rounded-xl border border-line bg-card p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.src} alt={f.caption} className="w-full" />
                    </div>
                    <figcaption className="mt-2 text-sm text-muted">{f.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Gallery */}
        {cs.gallery && cs.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight">Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((g) => (
                <figure key={g.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.caption} className="mb-2 w-full rounded-xl object-cover" />
                  <figcaption className="text-sm text-muted">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Tools and skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-line bg-card px-3 py-1.5 text-sm font-medium text-ink"
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
            className="group flex items-center justify-between rounded-2xl border border-line bg-card p-6 transition-colors hover:border-violet"
          >
            <div>
              <p className="mb-1 text-sm font-bold text-lilac">Next project</p>
              <p className="text-xl font-extrabold text-ink">{next.title}</p>
            </div>
            <ArrowRight className="text-violet transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </article>
    </main>
  );
}
