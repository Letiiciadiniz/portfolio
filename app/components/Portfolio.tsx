'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { CATEGORIES, projects, type Project } from '../data/projects';
import { ProjectLinkButton } from './ProjectLinkButton';

// Fixed order from projects.ts; categories with no projects yet are hidden.
const categories = ['All', ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))];

/** Photo if there is one, otherwise a clean gradient with the project icon. */
function CardMedia({ project }: { project: Project }) {
  const Icon = project.icon;
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <Icon size={56} strokeWidth={1.5} className="text-white/90" />
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const hasPage = Boolean(project.caseStudy);
  const shownTags = project.tags.slice(0, 4);
  const extra = project.tags.length - shownTags.length;

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <CardMedia project={project} />
        {hasPage && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur dark:bg-gray-900/80 dark:text-white">
            Case study
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {project.category} <span className="text-gray-400 dark:text-gray-500">· {project.date}</span>
        </p>
        <h3 className="mb-2 text-xl font-bold leading-snug text-gray-900 dark:text-white">{project.title}</h3>
        <p className="mb-5 text-gray-600 dark:text-gray-300">{project.summary}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {shownTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              +{extra} more
            </span>
          )}
        </div>

        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
          {hasPage ? 'Read case study' : 'View details'}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );

  const cardClass =
    'group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900';

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
    <section id="portfolio" className="min-h-screen bg-gray-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Selected{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Mechatronics, robotics, and assistive technology, from patented devices to research instruments.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} onOpen={() => setSelected(project)} />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <CardMedia project={selected} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white dark:bg-gray-900/80 dark:text-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {selected.category} · {selected.date}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{selected.title}</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{selected.summary}</p>

                {selected.highlights.length > 0 && (
                  <>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Highlights
                    </h4>
                    <ul className="mb-6 space-y-2">
                      {selected.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-gray-700 dark:text-gray-300">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Built with
                </h4>
                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
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
