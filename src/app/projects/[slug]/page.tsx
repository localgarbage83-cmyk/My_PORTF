import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!project) notFound()

  const p = project as Project

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {p.cover_image_url && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image
            src={p.cover_image_url}
            alt={p.title_bn}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{p.title_bn}</h1>
      {p.title_en && <p className="text-gray-400 mb-6">{p.title_en}</p>}

      {p.project_url && (
        <a
          href={p.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 mb-8"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Project
        </a>
      )}

      {p.tags && p.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {p.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-600">
        {p.description_bn || p.description_en || (
          <p className="text-gray-400 italic">No detailed description yet.</p>
        )}
      </div>
    </div>
  )
}
