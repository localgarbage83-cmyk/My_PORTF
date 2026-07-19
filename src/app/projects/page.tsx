import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'

export default async function ProjectsPage() {
  const supabase = createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const items = (projects || []) as Project[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">প্রজেক্ট</h1>
      <p className="text-gray-500 mb-10">Projects and works I have built.</p>

      {items.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-lg">No projects published yet.</p>
          <p className="text-gray-400 text-sm mt-2">Projects like Sylhet Trail and Angon will be added here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="card group overflow-hidden"
            >
              {project.cover_image_url && (
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <Image
                    src={project.cover_image_url}
                    alt={project.title_bn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-highlight transition-colors">
                {project.title_bn}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {project.summary_bn || project.summary_en || ''}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
