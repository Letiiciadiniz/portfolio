'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CATEGORIES, projects, type Project } from '../data/projects';
import { ProjectLinkButton } from './ProjectLinkButton';

// Fixed order from projects.ts; categories with no projects yet are hidden.
const categories = ['All', ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))];

/** Photo if there is one, otherwise a quiet panel with the project icon. */
function CardMedia({ project }: { project: Project }) {
  const Icon = project.icon;
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-card">
      <Icon size={56} strokeWidth={1.3} className="text-violet" aria-hidden="true" />
    </div>
  );
}

function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project;
  featured: boolean;
  onOpen: () => void;
}) {
  const hasPage = Boolean(project.caseStudy);

  const inner = (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl bg-card ${
          // Photo tiles are tall; projects without a photo get a slim banner instead.
          !project.image ? 'aspect-[16/6]' : featured ? 'aspect-[4/3] md:aspect-[2/1]' : 'aspect-[4/3]'
        }`}
      >
        <CardMedia project={project} />
      </div>
      <div className={`pt-5 ${featured ? 'md:grid md:grid-cols-[1fr_1fr] md:gap-10' : ''}`}>
        <div>
          <p className="mb-1.5 text-sm font-bold text-lilac">
            {project.category}, {project.date}
          </p>
          <h3
            className={`font-extrabold leading-snug tracking-tight decoration-violet decoration-2 underline-offset-[6px] group-hover:underline ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>
        </div>
        <p className={`mt-2 leading-relaxed ${featured ? 'md:mt-6' : 'line-clamp-2 text-[0.98rem]'}`}>
          {project.summary}
        </p>
      </div>
    </>
  );

  const cardClass = 'group block w-full text-left';

  return hasPage ? (
    <Link href={`/projects/${project.slug}`} className={cardClass}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onOpen} className={cardClass}>
      {inner}
    </button>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  // Close the pop-up with Escape and stop the page behind it from scrolling.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Selected work</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Devices, instruments, and robots I&apos;ve designed, from first interviews and sketches to CAD,
              electronics, and testing.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  filter === category
                    ? 'bg-ink text-paper'
                    : 'border border-line text-ink hover:border-ink'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-x-8 gap-y-14 sm:grid-cols-2 2xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                className={i === 0 ? 'col-span-full' : ''}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} featured={i === 0} onOpen={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Pop-up for projects without their own page */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <CardMedia project={selected} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full bg-paper/90 p-2 text-ink"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                <p className="mb-2 text-sm font-bold text-lilac">
                  {selected.category}, {selected.date}
                </p>
                <h3 className="mb-3 text-2xl font-extrabold tracking-tight">{selected.title}</h3>
                <p className="mb-6 leading-relaxed">{selected.summary}</p>

                {selected.highlights.length > 0 && (
                  <>
                    <h4 className="mb-3 font-extrabold">Highlights</h4>
                    <ul className="mb-6 space-y-2">
                      {selected.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-2.5 size-1.5 flex-none rounded-full bg-violet" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="mb-3 font-extrabold">Built with</h4>
                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-raise px-2.5 py-1 text-sm text-ink">
                      {tag}
                    </span>
                  ))}
                </div>

                {selected.links && selected.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {selected.links.map((link) => (
                      <ProjectLinkButton key={link.href} link={link} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
