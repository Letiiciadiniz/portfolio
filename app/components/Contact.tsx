import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../data/site';

const links = [
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'Resume', href: RESUME_URL },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <div className="wrap">
        <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
          Building something that helps people? I&apos;d love to hear about it.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">
          I&apos;m open to internships in assistive technology, product design, and hardware engineering. Email is the
          best way to reach me.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-10 inline-block break-all text-xl font-bold text-violet underline decoration-2 underline-offset-8 hover:text-lilac sm:text-3xl"
        >
          {EMAIL}
        </a>

        <ul className="mt-12 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border-2 border-line px-5 py-2 font-bold text-ink transition-colors hover:border-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-20 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Leticia Diniz</p>
          <p>Evanston, Illinois</p>
        </footer>
      </div>
    </section>
  );
}
