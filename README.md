[README.md](https://github.com/user-attachments/files/30162701/README.md)
# My_PORTF# Ahammad Shuvo — Portfolio

A bilingual (Bangla/English) personal portfolio, blog, and CMS built with Next.js 14, Tailwind CSS, and Supabase.

## Features

- **Public Site**: Home, About, Profile (CV), Projects, Blog, Books, Research, Contact
- **Admin Panel**: Full CRUD for all content types with bilingual support
- **Bilingual Toggle**: Content switches between Bangla and English; navigation stays in Bangla
- **Supabase Backend**: Auth, Postgres DB, and File Storage
- **Self-managed**: Publish content without touching code

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres + Storage)
- React Markdown
- Lucide React

## Fonts

- **English** — JetBrains Mono, loaded via `next/font/google` (auto-downloads on build, no setup needed).
- **Bangla** — SolaimanLipi, self-hosted. Add your font file(s) at:
  ```
  public/fonts/SolaimanLipi.woff2   (preferred)
  public/fonts/SolaimanLipi.woff
  public/fonts/SolaimanLipi.ttf
  ```
  Not bundled here since it's a separately-licensed font file. Until added, Bangla text falls back to `Noto Sans Bengali` / `Kalpurush` / system sans-serif — the site still renders correctly, just not with SolaimanLipi. The font switches automatically with the বাং/EN toggle (`html[data-lang]` attribute drives it in `globals.css`).

## Setup

### 1. Create Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run Migration

Open the SQL Editor in your Supabase dashboard and run the contents of `supabase/migrations/001_initial.sql`.

### 3. Create Storage Buckets

In Supabase Storage, create three buckets:
- `covers` — for blog post, book, and project cover images
- `pdfs` — for book PDFs, CV, and research documents
- `photos` — for profile photo

For each bucket, set the **Public** access policy to allow public reads.

### 4. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Create Admin User

In your Supabase dashboard:
1. Go to **Authentication → Users**
2. Click **Add User**
3. Enter your email and password
4. No public signup is enabled — this is your only admin account

### 6. Install & Run

```bash
npm install
npm run dev
```

### 7. Deploy to Vercel

```bash
npm run build
```

Push to GitHub and connect to Vercel, or use `vercel --prod`.

Make sure to add your environment variables in Vercel dashboard.

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # React components
    public/         # Public site components (Header, Footer)
    admin/          # Admin components (AdminLogout)
  lib/              # Utilities, Supabase clients, Language context
  types/            # TypeScript types
  middleware.ts     # Auth protection for admin routes
```

## Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard with stats |
| `/admin/blog` | Manage blog posts |
| `/admin/books` | Manage books |
| `/admin/projects` | Manage projects |
| `/admin/research` | Manage research |
| `/admin/profile` | Edit CV/profile |
| `/admin/settings` | Redirects to profile |

## Content Management

All content is bilingual:
- **Bangla** fields are required (marked with `*`)
- **English** fields are optional
- Admin forms show both languages side-by-side
- Public site uses language toggle (বাং / EN) to switch content

## Contact

- Email: kshuvo789@gmail.com
- GitHub: https://github.com/akshuvo7s
- LinkedIn: https://www.linkedin.com/in/kawsar-ahmed-shuvo-78961a222/
