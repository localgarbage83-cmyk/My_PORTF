import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FolderOpen, BookOpen, FileText, FlaskConical } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Ahammad Shuvo — Thinker, Builder, Writer. Portfolio, projects, books, blog & research.',
  openGraph: {
    title: 'Ahammad Shuvo — Thinker. Builder. Writer.',
    description:
      'Building things that matter, writing what I believe, and sharing the journey along the way.',
  },
}
const hubs = [
  {
    title: 'প্রজেক্ট',
    subtitle: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    description: 'Web apps, tools, and experiments I have built.',
    color: 'bg-blue-50 text-blue-600',
    ring: 'group-hover:ring-blue-200/60',
  },
  {
    title: 'বই',
    subtitle: 'Books',
    href: '/books',
    icon: BookOpen,
    description: 'Published books and literary works.',
    color: 'bg-amber-50 text-amber-600',
    ring: 'group-hover:ring-amber-200/60',
  },
  {
    title: 'ব্লগ',
    subtitle: 'Blog',
    href: '/blog',
    icon: FileText,
    description: 'Daily thoughts, essays, and stories.',
    color: 'bg-green-50 text-green-600',
    ring: 'group-hover:ring-green-200/60',
  },
  {
    title: 'গবেষণা',
    subtitle: 'Research',
    href: '/research',
    icon: FlaskConical,
    description: 'Academic writing and research papers.',
    color: 'bg-purple-50 text-purple-600',
    ring: 'group-hover:ring-purple-200/60',
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* ── Niche ambient background ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        {/* Soft primary / accent orbs */}
        <div className="absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute top-32 -right-40 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        {/* Fine geometric grid (writer / thinker feel) */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Subtle radial vignette + paper texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      {/* ── Hero ── */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          {/* Avatar */}
          <div className="relative mb-10 inline-block">
            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl" />
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-5xl font-bold text-white shadow-2xl ring-4 ring-white md:h-44 md:w-44 md:text-6xl">
              AS
              {/* Ready for real photo:
              <Image
                src="/profile.jpg"
                alt="Ahammad Shuvo"
                fill
                className="rounded-full object-cover"
                priority
              />
              */}
            </div>
          </div>

          {/* Name + tagline */}
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
            Ahammad Shuvo
          </h1>

          <p className="mb-3 text-xl font-medium tracking-wide text-gray-500 md:text-2xl">
            Thinker. Builder. Writer.
          </p>

          <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
            Building things that matter, writing what I believe, and sharing the journey along the way.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/profile"
              className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              প্রোফাইল দেখুন
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center gap-2 transition-all duration-300"
            >
              কাজ দেখুন
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hub cards ── */}
      <section className="relative pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="section-title mb-12 text-center">Explore</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hubs.map((hub) => {
              const Icon = hub.icon
              return (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className={`
                    card group relative overflow-hidden
                    bg-white/70 backdrop-blur-md
                    border border-white/60
                    ring-1 ring-transparent
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-xl
                    ${hub.ring}
                  `}
                >
                  {/* Soft color wash on hover */}
                  <div
                    className={`
                      pointer-events-none absolute inset-0 opacity-0
                      transition-opacity duration-300 group-hover:opacity-100
                      ${hub.color.replace('text-', 'bg-').split(' ')[0]}/5
                    `}
                  />

                  <div className="relative">
                    <div
                      className={`
                        mb-5 flex h-12 w-12 items-center justify-center rounded-xl
                        ${hub.color}
                        transition-transform duration-300 group-hover:scale-110
                      `}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>

                    <h3 className="mb-1 text-lg font-bold text-primary transition-colors group-hover:text-highlight">
                      {hub.title}
                    </h3>

                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                      {hub.subtitle}
                    </p>

                    <p className="text-sm leading-relaxed text-gray-500">
                      {hub.description}
                    </p>

                    {/* Subtle arrow that appears on hover */}
                    <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
