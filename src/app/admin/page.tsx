import { createClient } from '@/lib/supabase-server'
import { FileText, BookOpen, FolderOpen, FlaskConical } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [{ count: blogCount }, { count: booksCount }, { count: projectsCount }, { count: researchCount }] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('books').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('research_items').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Blog Posts', count: blogCount || 0, icon: FileText, color: 'bg-green-50 text-green-600' },
    { label: 'Books', count: booksCount || 0, icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
    { label: 'Projects', count: projectsCount || 0, icon: FolderOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Research', count: researchCount || 0, icon: FlaskConical, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-primary mb-1">{stat.count}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-10 card">
        <h2 className="text-lg font-bold text-primary mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/admin/blog/new" className="p-4 rounded-lg border border-gray-100 hover:border-highlight hover:bg-red-50 transition-colors">
            <p className="font-medium text-primary">Write New Blog Post</p>
            <p className="text-sm text-gray-400 mt-1">Create a new bilingual blog entry</p>
          </a>
          <a href="/admin/projects/new" className="p-4 rounded-lg border border-gray-100 hover:border-highlight hover:bg-red-50 transition-colors">
            <p className="font-medium text-primary">Add New Project</p>
            <p className="text-sm text-gray-400 mt-1">Showcase a new project</p>
          </a>
        </div>
      </div>
    </div>
  )
}
