import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react'
import type { ResearchItem } from '@/types'

export default async function ResearchDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: item } = await supabase
    .from('research_items')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!item) notFound()

  const r = item as ResearchItem

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/research" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Research
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{r.title_bn}</h1>
      {r.title_en && <p className="text-gray-400 mb-8">{r.title_en}</p>}

      <div className="prose prose-lg max-w-none text-gray-600 mb-8">
        {r.summary_bn || r.summary_en || <p className="text-gray-400 italic">No summary available.</p>}
      </div>

      <div className="flex flex-wrap gap-4">
        {r.file_url && (
          <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            <FileText className="w-4 h-4" />View Document
          </a>
        )}
        {r.external_url && (
          <a href={r.external_url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />External Link
          </a>
        )}
      </div>
    </div>
  )
}
