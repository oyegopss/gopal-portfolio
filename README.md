# Gopal Ji Dwivedi — Portfolio

A premium, tech-conference-style personal portfolio for a software developer. Built with Next.js, Tailwind CSS, and Framer Motion.

## Design

- **Colors:** Crimson Red, Orange, Charcoal Black, Warm White, Gold accent
- **Vibe:** Tech innovation platform / developer portfolio
- **Features:** Animated hero, section reveals, scroll progress, loading screen, custom cursor (desktop), smooth scrolling, responsive layout

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **React Icons**
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route      | Page     |
|-----------|----------|
| `/`       | Home     |
| `/about`  | About    |
| `/projects` | Projects |
| `/experience` | Experience |
| `/skills` | Skills   |
| `/resume` | Resume   |
| `/contact` | Contact  |

## Project Structure

```
src/
  app/          # App Router pages & layout
  components/   # Reusable UI (Navbar, Footer, cards, etc.)
  hooks/        # Custom hooks
  styles/       # Global theme tokens
  assets/        # Images, etc.
```

## Customize

- Update social links in `src/components/Footer.tsx` and `src/app/contact/page.tsx`
- Add resume PDF and link in `src/app/resume/page.tsx`
- Replace project placeholders with real images and GitHub/live URLs in `src/app/page.tsx` and `src/app/projects/page.tsx`

## Build

```bash
npm run build
npm start
```
