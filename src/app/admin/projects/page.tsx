import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import type { Project } from '@/types'

export default async function AdminProjectsPage() {
  const supabase = createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const items = (projects || []) as Project[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="card overflow-hidden p-0">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No projects yet. Add your first one!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Title (BN)</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Tags</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-primary">{project.title_bn}</p>
                    {project.title_en && <p className="text-sm text-gray-400">{project.title_en}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags || []).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/projects/edit/${project.id}`} className="inline-flex items-center gap-1 text-sm text-highlight hover:underline">
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
