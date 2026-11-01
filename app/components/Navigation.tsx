'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { RESUME_URL } from '../data/site';

const navItems = [
  { id: 'portfolio', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // On a project page, highlight "Work".
  useEffect(() => {
    if (pathname.startsWith('/projects')) setActiveSection('portfolio');
  }, [pathname]);

  // On the home page, highlight whichever section is on screen.
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const y = window.scrollY + 120;
      let current = '';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const goToSection = (id: string) => {
    setIsOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-lg font-extrabold tracking-tight text-ink"
        >
          Leticia Diniz
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`rounded-full px-4 py-2 text-[0.95rem] font-bold transition-colors ${
                activeSection === item.id ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/10'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border-2 border-ink px-4 py-[6px] text-[0.95rem] font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="rounded-md p-2 text-ink md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="wrap border-t border-line bg-paper py-3 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="block w-full rounded-lg px-3 py-3 text-left text-lg font-bold text-ink hover:bg-ink/10"
            >
              {item.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-3 text-lg font-bold text-ink hover:bg-ink/10"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
