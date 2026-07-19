import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { FileText, ArrowRight, ExternalLink } from 'lucide-react'
import type { ResearchItem } from '@/types'

export default async function ResearchPage() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('research_items')
    .select('*')
    .order('created_at', { ascending: false })

  const research = (items || []) as ResearchItem[]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">গবেষণা</h1>
      <p className="text-gray-500 mb-10">Academic writing and research papers.</p>

      {research.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-lg">No research items published yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {research.map((item) => (
            <article key={item.id} className="card group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-highlight transition-colors">
                    {item.title_bn}
                  </h2>
                  {item.title_en && <p className="text-gray-400 text-sm mb-3">{item.title_en}</p>}
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {item.summary_bn || item.summary_en || ''}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {item.file_url && (
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-highlight hover:underline">
                        <FileText className="w-4 h-4" />View Document
                      </a>
                    )}
                    {item.external_url && (
                      <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-highlight hover:underline">
                        <ExternalLink className="w-4 h-4" />External Link
                      </a>
                    )}
                  </div>
                </div>
                <Link href={`/research/${item.slug}`} className="shrink-0 p-2 rounded-lg bg-gray-50 group-hover:bg-red-50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-highlight" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
