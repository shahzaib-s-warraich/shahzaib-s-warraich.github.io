# shahzaib-s-warraich.github.io

Personal portfolio site for **Shahzaib Saqib Warraich**, AI Research Scientist (AI Safety & Alignment through Interpretability and Evaluation) and Co-Founder & COO of [Turon AI](https://www.turon.ai). Built with Next.js 16, React 19, TypeScript, Tailwind CSS, next-intl, and Framer Motion.

## Structure

- `messages/en.json` / `messages/fr.json` — all site copy (bio, education, research, industry experience, projects, skills, leadership, teaching, blog, books, awards, contact). `fr.json` currently mirrors the English text 1:1 (pending real French translation).
- `src/app/[locale]/` — one route per section (`about`, `research`, `experience`, `projects`, `skills`, `leadership`, `teaching`, `blog`, `books`, `awards`, `contact`), plus `HomeClient.tsx` which renders the single-page scroll version of all of them.
- `src/components/` — shared UI (Navbar, SectionNav, TimelineItem, ProjectCard/ProjectModal, SkillCategory, ContactForm, etc.).
- `public/images/` — headshots, org/institution logos, publication-venue logos, book covers.
- `public/projects/` — project card/case-study images.
- `public/cv/` — CV PDF(s).

## CV download behavior

- CV PDF files live in `public/cv/`.
- The **Download CV** buttons automatically download the most recently modified `.pdf` file in that folder (see `src/lib/cv.ts`).
- If no PDF is found, the app falls back to `/cv/CV.pdf`.

## Prerequisites

- Node.js (see `package.json` for dependency versions; no Conda/virtualenv required — this is a plain Node/npm project).

## Setup (first time)

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is currently required due to a peer-dependency conflict between `next-intl` and Next.js 16.

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`. The dev server hot-reloads on code changes.

## Production build

```bash
npm run build
```

This statically prerenders every route for both locales (`/en/...`, `/fr/...`).

## Lint

```bash
npm run lint
```
