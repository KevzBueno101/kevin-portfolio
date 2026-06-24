# Kevin B. Bueno — Portfolio

A social-media-style developer portfolio built with **React + Vite + Tailwind CSS**. Features project feeds, certificates gallery, skills showcase, and dark/light theme.

## Features

- **Project Feed** — Facebook-style post cards with asymmetric media gallery, modal viewer, tech stack tags, and action buttons
- **Certificates Gallery** — Filterable, searchable grid of certifications, seminars, and courses
- **Skills & Tools** — Categorized tech stack display with devicon badges
- **Dark/Light Mode** — Theme toggle with persistent state
- **Responsive** — Mobile-first design with adaptive layouts
- **Search** — Filter projects and certificates by keyword

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** SVG inline components
- **Theme:** React Context API

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── feed/          # ProjectCard, CertificateCard
│   ├── layout/        # Navbar
│   ├── profile/       # ProfileHeader
│   └── sidebar/       # AboutCard, EducationCard, SkillsCard, LinksCard
├── data/              # projects.js, certificates.js, skills.js
├── context/           # ThemeContext
└── assets/            # Static images
```
