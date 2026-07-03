import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import SectionHeading from './ui/section-heading';

/* ─────────────────────────────────────────────────────────────
 * Certifications — a clean editorial ledger. One row per credential:
 * topic logo, title, issuer, year, and a link out to the certificate.
 * Matches the Skills / Services / Works language (monochrome, sharp,
 * full-bleed). Heading aligns to the hero "D".
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  slug: string; // simple-icons slug for the topic logo
  date: string;
  link: string;
}

const CERTIFICATIONS: Cert[] = [
  {
    id: 'CERT_01',
    title: 'Claude Code 101',
    issuer: 'Anthropic',
    slug: 'anthropic',
    date: '2025',
    link: 'https://verify.skilljar.com/c/y7vfre3zzy7m',
  },
  {
    id: 'CERT_02',
    title: 'Claude 101',
    issuer: 'Anthropic',
    slug: 'anthropic',
    date: '2025',
    link: 'https://verify.skilljar.com/c/n9vdrrejaxbs',
  },
  {
    id: 'CERT_03',
    title: 'Diploma in Full Stack Development',
    issuer: 'I Shine Info Tech',
    slug: 'react',
    date: '2023',
    link: 'https://drive.google.com/file/d/1qrIg6CE9CADRlQ58rG0f6GQkcKFhToZw/view?usp=sharing',
  },
  {
    id: 'CERT_04',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    slug: 'linkedin',
    date: '2024',
    link: 'https://www.linkedin.com/learning/certificates/e4cb08e17e29e60b42bc2f69d154df89c11852782543ffb319372ff9d16f9d5f',
  },
  {
    id: 'CERT_05',
    title: 'Programming in Java (NPTEL)',
    issuer: 'NPTEL · IIT Madras',
    slug: 'openjdk',
    date: '2023',
    link: 'https://drive.google.com/file/d/13DtTDlZQNWFqcaCyCkucnsdh_4QkIbsJ/view?usp=sharing',
  },
  {
    id: 'CERT_06',
    title: 'Database Management System (NPTEL)',
    issuer: 'NPTEL · IIT Kharagpur',
    slug: 'sqlite',
    date: '2023',
    link: 'https://drive.google.com/file/d/1oeYc41j95ufyLGjufpDb9rp585uhoxgb/view?usp=sharing',
  },
];

/* Topic logo with a graceful fallback — some brand logos (e.g. LinkedIn) are
 * not on the simple-icons CDN, so a failed load shows the issuer's initial. */
const CertLogo: React.FC<{ slug: string; issuer: string }> = ({ slug, issuer }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] sm:flex">
      {failed ? (
        <span className="font-display text-sm font-bold text-black">{issuer.charAt(0)}</span>
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={issuer}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-5 w-5 object-contain"
        />
      )}
    </div>
  );
};

const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden py-20 text-black transition-colors duration-500 dark:text-white md:py-28"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Certifications">Credentials.</SectionHeading>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-lg">
              Coursework and programs — each one links out to the verified certificate.
            </p>
          </ScrollReveal>
        </div>

        {/* Ledger */}
        <ScrollReveal delay={0.1} blur={false}>
          <div className="border-t border-black/12 dark:border-white/12">
            {CERTIFICATIONS.map((cert, i) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 border-b border-black/12 py-7 transition-opacity duration-500 dark:border-white/12 md:gap-8 md:py-9"
              >
                <span className="w-6 shrink-0 font-mono text-xs text-neutral-400 dark:text-neutral-600">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <CertLogo slug={cert.slug} issuer={cert.issuer} />

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-bold leading-tight tracking-tight md:text-3xl">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    {cert.issuer}
                  </p>
                </div>

                <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 md:block">
                  {cert.date}
                </span>

                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-black group-hover:text-white dark:border-white/15 dark:group-hover:bg-white dark:group-hover:text-black">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Certifications;
