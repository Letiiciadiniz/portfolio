import { Code2, ExternalLink, FileText, Network, PencilRuler, PlayCircle } from 'lucide-react';
import type { ProjectLink } from '../data/projects';

const icons = {
  github: Code2,
  demo: PlayCircle,
  sketch: PencilRuler,
  diagram: Network,
  doc: FileText,
  link: ExternalLink,
};

export function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const Icon = icons[link.kind] ?? ExternalLink;
  const primary = link.kind === 'demo';
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
        primary
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
          : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
      }`}
    >
      <Icon size={16} />
      {link.label}
    </a>
  );
}
