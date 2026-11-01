import Image from 'next/image';
import BrailleBackdrop from './BrailleBackdrop';
import { EMAIL, RESUME_URL } from '../data/site';

export default function Home() {
  return (
    <section id="home" className="hero-light relative overflow-hidden border-b border-line">
      <BrailleBackdrop lines={['Leticia', 'Diniz']} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pb-24 md:pt-36">
        <div>
          <h1 className="text-[clamp(3.25rem,10vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            Leticia
            <br />
            Diniz
          </h1>

          <p className="mt-10 max-w-xl text-2xl font-medium leading-snug text-ink sm:text-[1.75rem]">
            I design and build assistive devices: hardware that helps people do more on their own.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Computer engineering student at Northwestern University, with the Segal Design Certificate. I grew up in
            Catolé do Rocha, in the sertão of northeastern Brazil.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-violet px-6 py-3 font-bold text-paper transition-colors hover:bg-lilac"
            >
              See my work
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-line px-6 py-[10px] font-bold text-ink transition-colors hover:border-ink"
            >
              Resume
            </a>
            <a href={`mailto:${EMAIL}`} className="px-3 py-3 font-bold text-ink underline-offset-4 hover:underline">
              Email me
            </a>
          </div>

          <p className="mt-12 text-sm text-muted">The dots behind this page spell my name in braille.</p>
        </div>

        <figure className="mx-auto w-full max-w-sm md:max-w-none">
          <Image
            src="/profile.jpeg"
            alt="Leticia Diniz"
            width={1536}
            height={2046}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="aspect-[4/5] w-full rounded-2xl object-cover object-top"
          />
        </figure>
      </div>

      <div className="relative border-t border-line bg-paper/60 backdrop-blur-sm">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[0.95rem] sm:px-8">
          <span className="mr-2 inline-block size-2 rounded-full bg-violet align-middle" aria-hidden="true" />
          Now: building a blade-coating platform for artificial muscles at the Robotic Matter Lab, and leading the
          electronics team for a 30 lb combat robot.
        </p>
      </div>
    </section>
  );
}
