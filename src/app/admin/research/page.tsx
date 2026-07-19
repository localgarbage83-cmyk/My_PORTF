import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import type { ResearchItem } from '@/types'

export default async function AdminResearchPage() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('research_items')
    .select('*')
    .order('created_at', { ascending: false })

  const research = (items || []) as ResearchItem[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Research</h1>
        <Link href="/admin/research/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Research
        </Link>
      </div>

      <div className="card overflow-hidden p-0">
        {research.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No research items yet. Add your first one!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Title (BN)</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">External URL</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {research.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-primary">{item.title_bn}</p>
                    {item.title_en && <p className="text-sm text-gray-400">{item.title_en}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.external_url ? (
                      <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline truncate max-w-[200px] inline-block">
                        {item.external_url}
                      </a>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/research/edit/${item.id}`} className="inline-flex items-center gap-1 text-sm text-highlight hover:underline">
                      <Pencil className="w-4 h-4" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
