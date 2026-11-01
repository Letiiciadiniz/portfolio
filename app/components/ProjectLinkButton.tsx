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
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-colors ${
        primary
          ? 'bg-violet text-paper hover:bg-lilac'
          : 'border-2 border-line text-ink hover:border-ink'
      }`}
    >
      <Icon size={17} aria-hidden="true" />
      {link.label}
    </a>
  );
}
