import Image from 'next/image';
import BrailleBackdrop from './BrailleBackdrop';
import { EMAIL, RESUME_URL } from '../data/site';

export default function Home() {
  return (
    <section id="home" className="hero-light relative overflow-hidden border-b border-line">
      <BrailleBackdrop lines={['Leticia', 'Diniz']} />

      <div className="wrap relative grid items-center gap-12 pb-16 pt-28 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pb-24 md:pt-36">
        <div>
          <h1 className="text-[clamp(3.25rem,9vw,9rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
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
        </div>

        <figure className="mx-auto w-full max-w-sm md:ml-auto md:mr-0 md:max-w-[34rem]">
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
    </section>
  );
}
