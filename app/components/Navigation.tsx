'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined outside the component so it isn't recreated on every render.
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // On a project page (/projects/...), highlight "Portfolio".
  useEffect(() => {
    if (pathname.startsWith('/projects')) setActiveSection('portfolio');
  }, [pathname]);

  // On the home page, highlight whichever section is on screen.
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const { id } of navItems) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // On the home page: smooth-scroll. On any other page: go home, then jump to the section.
  const goToSection = (id: string) => {
    setIsOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  goToSection('home');
                }
              }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Leticia Diniz
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => goToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
