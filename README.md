<div align="center">

# Archive

**A curated portfolio of deployed AI systems, reasoning pipelines, and grounded digital products.**

[Try it live ->](https://your-url-here.vercel.app)

---

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://your-url-here.vercel.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-F5A623?style=for-the-badge)](LICENSE)

</div>

---

## What is Archive?

Archive is a minimalist, mobile-first portfolio site built to showcase deployed AI systems and reasoning pipelines. It does not follow the conventions of a typical developer portfolio - no skill bars, no hero section, no floating blobs.

Instead it functions as a curated index: a clean list of shipped work that users can explore in-place. On desktop, selecting a project opens a detail panel on the right while the entire page gradient shifts to a colour unique to that project. On mobile, projects expand in an accessible accordion.

The design language is editorial - calm, structured, and trustworthy. The goal is for the work to speak, not the page.

---

## How it works

### Architecture

```
                             Browser
                                |
                                v
                +---------------+---------------+
                |           App.tsx             |
                |   - manages activeId state    |
                |   - renders ambient overlays  |
                +---+-------+-------+-------+---+
                    |       |       |       |
              Fixed bg  Overlay  Overlay  Overlay   <- stacked fixed divs
              (default)  (01)     (02)    (03+)        per project
                    |
                    v
         +----------+----------+
         |                     |
        Nav                Projects
                               |
             +-----------------+-----------------+
             |                                   |
      Desktop (md and above)              Mobile (below md)
      Split panel layout                  Accordion layout
             |                                   |
    +--------+--------+               AccordionItem x 4
    |                 |               - button[aria-expanded]
  tablist          tabpanel           - grid-template-rows animation
  272 px left      flex-1 right       - description, tech chips, links
    |                 |
  Tab buttons    ProjectDetail
  - role="tab"   - opacity + translateY fade
  - aria-selected  - ghost project number (decorative)
  - arrow keys     - core idea, description
  - Home / End     - tech chips, GitHub, Live Demo
```

### Layout breakpoints

| Breakpoint | Layout | Interaction pattern |
|---|---|---|
| Below 768 px | Single-column accordion | `button[aria-expanded]` toggle |
| 768 px and above | 272 px left list + right detail panel | ARIA `tablist / tabpanel` |

### Ambient gradient system

Each project carries an `ambientBg` gradient string. When a project is selected, `App.tsx` sets `activeId`. A set of `position: fixed` overlay divs - one per project - transitions between `opacity: 0` and `opacity: 1` over 650 ms, shifting the entire page colour.

CSS cannot interpolate between `linear-gradient()` values, so overlays with opacity transitions are used instead. The base gradient is always rendered underneath; the per-project overlay fades in on top.

| Project | Ambient shift |
|---|---|
| 01 - MarketSense AI | Soft lavender - indigo - ice blue |
| 02 - Triad | Ice blue - periwinkle - mint |
| 03 - TenderAI | Soft mint - pale emerald - ice blue |
| 04 - Codemorpher | Pale indigo - soft blue - pale cyan |
| None selected | Soft orchid - sky blue - mint (default) |

### Keyboard navigation

The desktop tablist follows the ARIA Authoring Practices Guide composite widget pattern.

| Key | Action |
|---|---|
| `ArrowDown` / `ArrowRight` | Focus next project tab |
| `ArrowUp` / `ArrowLeft` | Focus previous project tab |
| `Home` | Focus first tab |
| `End` | Focus last tab |
| `Enter` / `Space` | Select focused tab, open detail panel |
| `Tab` | Move focus into the open detail panel |

---

## Live Demo

The live site is deployed at: [your-url-here.vercel.app](https://your-url-here.vercel.app)

No login required. All four projects are visible immediately. Click or keyboard-navigate any project name to open its detail panel. Click the same project again to collapse it.

---

## Setup

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install

```bash
git clone https://github.com/sudo-Harshk/archive.git
cd archive
npm install
```

### Configure

No environment variables are required. All project data lives in `src/data/projects.ts`.

To update a deployed URL or GitHub link, edit the `demoUrl` or `githubUrl` field for that project. Setting either to `'#'` renders it as disabled in the UI.

To add a new project, append an entry to the `projects` array:

```ts
{
  id: '05',
  name: 'Your Project',
  tagline: 'One-line description',
  description: 'Full paragraph description.',
  coreIdea: 'The core design or research idea.',
  tech: ['Tool A', 'Tool B'],
  githubUrl: 'https://github.com/sudo-Harshk/your-repo',
  demoUrl: 'https://your-live-url.com',
  ambientBg: 'linear-gradient(145deg, #FFF7ED 0%, #FEF3C7 45%, #ECFDF5 100%)',
}
```

### Run

```bash
npm run dev       # development server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

---

## Usage

The site is entirely static with no backend, API calls, or authentication.

- **Desktop** - Click any project in the left list to open its detail panel. The page background shifts to that project's ambient colour. Click the same item again to deselect.
- **Mobile** - Tap any project row to expand it. Tap again to collapse.
- **Keyboard** - Tab to the project list, use arrow keys to navigate between projects, press Enter or Space to open. Tab again to move focus into the detail panel.
- **Screen reader** - The project list is a vertical `tablist`. Each project is a `tab` with `aria-selected` and `aria-controls`. The detail panel is a `tabpanel` with `aria-labelledby`. All decorative elements carry `aria-hidden`.

---

## Project Structure

```
Archive/
├── public/
├── src/
│   ├── components/
│   │   ├── AccordionItem.tsx   <- mobile accordion row
│   │   ├── Footer.tsx          <- contact links, copyright
│   │   ├── Nav.tsx             <- wordmark top bar
│   │   └── Projects.tsx        <- split panel + accordion shell
│   ├── data/
│   │   └── projects.ts         <- all project entries with ambientBg
│   ├── App.tsx                 <- activeId state, gradient overlay stack
│   ├── index.css               <- Tailwind + reduced-motion rule
│   └── main.tsx                <- React entry point
├── index.html                  <- Inter font import
├── package.json
├── postcss.config.js
├── tailwind.config.ts          <- colour tokens, font family
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json                 <- Vercel deployment config
└── vite.config.ts
```

---

## Tech Stack

| Technology | Role | Version |
|---|---|---|
| React | Component UI framework | 18.3 |
| TypeScript | Static type checking | 5.7 |
| Vite | Build tool and dev server | 6.0 |
| Tailwind CSS | Utility-first styling | 3.4 |
| PostCSS + Autoprefixer | CSS processing | 8.4 / 10.4 |
| Lucide React | Icon library | 0.469 |
| Inter (Google Fonts) | Typography | - |
| Vercel | Deployment platform | - |

---

## Design Decisions

**`grid-template-rows` over `max-height` for accordion animation**

Animating `max-height` from `0` to a fixed large value (e.g. `500px`) produces uneven easing because the transition runs over the full declared range regardless of actual content height. The `grid-template-rows: 0fr -> 1fr` trick transitions over the true rendered height, producing a smooth, correctly-timed open and close without DOM measurement.

**Stacked opacity overlays over CSS gradient transitions**

CSS transitions cannot interpolate between `linear-gradient()` values - the browser snaps between them instantly. Each project gets a `position: fixed` overlay div at `opacity: 0`. On selection it transitions to `opacity: 1` over 650 ms while the base gradient remains visible underneath, creating a seamless cross-fade across the full viewport.

**ARIA `tablist / tabpanel` on desktop, `aria-expanded` on mobile**

These are semantically distinct patterns. On desktop, one project is selected at a time from a persistent side-list - this is a tab widget. On mobile, multiple items could be open and the list is inline - this is a disclosure widget. Applying the correct role at each breakpoint ensures screen readers receive accurate semantics in both layouts.

**`useId()` for ARIA `id` attributes**

Hardcoded IDs break when a component renders more than once on the same page. React's `useId` generates a stable, unique prefix per instance, guaranteeing that `aria-controls` and `aria-labelledby` cross-references are always valid.

**Vite over Next.js**

The site is entirely static - no server rendering, no data fetching, no dynamic routing. Next.js adds Node.js server complexity and deployment overhead with no benefit for this use case. Vite outputs a plain `dist/` folder any CDN can serve.

**Pastel colours on backgrounds only, never on text**

Pastel hues have luminance values too close to white to meet WCAG AA contrast ratios as text. The colour system reserves all pastel values (`#F5F3FF`, `#EDE9FE`, `#DDD6FE`) for backgrounds and borders. Text uses zinc greys (`#18181B`, `#52525B`, `#71717A`) and deep violet (`#6D28D9`, `#7C3AED`), all passing 4.5:1 minimum contrast against the site backgrounds.

---

## Acknowledgements

The editorial restraint and spacing precision of this project draw from the design systems of [Linear](https://linear.app) and [Anthropic](https://anthropic.com). The research-index aesthetic is influenced by academic and institutional publication conventions.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full text.

Copyright (c) 2026 [sudo-Harshk](https://github.com/sudo-pooja/)

---

<div align="center">

Built by [sudo-Harshk](https://github.com/sudo-pooja/) · [Live Demo](https://your-url-here.vercel.app) · [MIT License](LICENSE)

</div>
