import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FolderOpen, BookOpen, FileText, FlaskConical } from 'lucide-react'

const hubs = [
  {
    title: 'প্রজেক্ট',
    subtitle: 'Projects',
    href: '/projects',
    icon: FolderOpen,
    description: 'Web apps, tools, and experiments I have built.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'বই',
    subtitle: 'Books',
    href: '/books',
    icon: BookOpen,
    description: 'Published books and literary works.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'ব্লগ',
    subtitle: 'Blog',
    href: '/blog',
    icon: FileText,
    description: 'Daily thoughts, essays, and stories.',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'গবেষণা',
    subtitle: 'Research',
    href: '/research',
    icon: FlaskConical,
    description: 'Academic writing and research papers.',
    color: 'bg-purple-50 text-purple-600',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg">
              AS
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Ahammad Shuvo
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-2">
            Thinker. Builder. Writer.
          </p>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Building things that matter, writing what I believe, and sharing the journey along the way.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/profile" className="btn-primary inline-flex items-center gap-2">
              প্রোফাইল দেখুন
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
              কাজ দেখুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hub Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub) => {
              const Icon = hub.icon
              return (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="card group hover:-translate-y-1 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-xl ${hub.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-highlight transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">{hub.subtitle}</p>
                  <p className="text-sm text-gray-500">{hub.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
