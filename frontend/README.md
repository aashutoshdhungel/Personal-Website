# Aashutosh Dhungel, Pokedex Portfolio

A retro Pokedex themed personal portfolio, rebuilt on Next.js App Router with
TypeScript and custom CSS. All original content from the previous React and
Vite site (bio, blog posts, study notes, contact form) is preserved, just
reimagined with a handheld console aesthetic.

## Tech Stack

- Next.js 14 App Router, TypeScript
- Pure custom CSS with CSS Modules and CSS variables, no Tailwind
- Retro fonts through next/font/google, Press Start 2P for headings, VT323 for body
- framer-motion for card flips, stat bar fills, and page level animation
- nes.css for retro 8 bit UI accents
- use-sound for click, select, and success sound effects with a global mute toggle
- canvas-confetti for a Pokeball colored burst on contact form success
- Pokemon sprites pulled from the public PokeAPI sprite repository
- react-markdown and remark-gfm for rendering blog posts, gray-matter for parsing

## Getting Started

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
src/
  app/
    layout.tsx        root layout, fonts, metadata, providers
    globals.css        theme tokens and shared styles
    page.tsx            home route
    HomeClient.tsx       home page content
    about/               trainer profile route
    blog/                pokedex list and dynamic post route
    contact/             pokemon center contact route
    notes/               item bag study notes route
    not-found.tsx        404 page
    sitemap.ts            dynamic sitemap
    robots.ts              robots config
  components/           navbar, footer, cards, providers
  lib/                    data and helper functions
content/
  blogs/                 markdown source for each blog post
public/
  sounds/                 generated placeholder sound effects
  pfp.jpeg, favicon.ico    placeholder images, replace with your own
```

## Customization

### Swap in your own photo

Replace `public/pfp.jpeg` with your own square photo. It is referenced from
the home hero and the blog post sidebar.

### Edit trainer info, skills, and timeline

Open `src/app/about/AboutClient.tsx` and edit the `badges`, `skills`, and
`infoItems` arrays.

### Add or edit blog posts

1. Drop a new markdown file into `content/blogs/your-slug.md`
2. Add a matching entry to the `META` array in `src/lib/blogs.ts` with the
   slug, title, date, category, element type, and excerpt

### Add or edit study notes

Edit `src/lib/notes.ts`. Each region (`Grade 11`, `Grade 12`, `MBBS`) holds a
list of notes with an `id`, `subject`, `title`, `file` path, and `desc`. Place
the actual PDF files under `public/notes/...` to match the `file` paths.

### Change the color palettes

All three palettes, Pokedex Red, Game Boy, and Dark Mode, are defined as CSS
variables in `src/app/globals.css` under `:root`, `[data-palette="gameboy"]`,
and `[data-palette="dark"]`. Edit the hex values there.

### Sound effects

Placeholder retro beeps live in `public/sounds`. Swap in your own `.wav` or
`.mp3` files and keep the same file names, or update the paths in
`src/components/SoundProvider.tsx`.

### Contact form

The form posts to Web3Forms using the access key already present in
`src/app/contact/ContactClient.tsx`. Swap in your own Web3Forms access key if
you want submissions to route to your own inbox.

## SEO

Metadata is configured through the Next.js Metadata API in `layout.tsx` and
on each route's `page.tsx`, including Open Graph tags, Twitter cards, a
dynamic `sitemap.ts`, `robots.ts`, and `public/manifest.json`. Update
`SITE_URL` in `src/app/layout.tsx` and `src/app/sitemap.ts` to your real
domain before deploying.

## Deployment

### Vercel

1. Push this project to a GitHub repository
2. Import the repository at vercel.com, framework preset detects Next.js
   automatically
3. Deploy, no environment variables are required

### Netlify

1. Push this project to a GitHub repository
2. Create a new site at app.netlify.com from that repository
3. Set the build command to `npm run build` and use the official Next.js
   Netlify plugin, or the Netlify Next.js runtime, which is added
   automatically when Netlify detects a Next.js project
4. Deploy

## Notes

- The `public/notes` PDF files referenced in `src/lib/notes.ts` are not
  included in this export, add your own PDFs at the listed paths
- `public/pfp.jpeg` and the favicon are placeholder art, replace them with
  your own images before publishing
