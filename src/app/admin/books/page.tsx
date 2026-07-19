import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Book } from '@/types'

export default async function AdminBooksPage() {
  const supabase = createClient()
  const { data: books } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  const items = (books || []) as Book[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Books</h1>
        <Link href="/admin/books/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Book
        </Link>
      </div>

      <div className="card overflow-hidden p-0">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No books yet. Add your first one!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Title (BN)</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Published Date</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-primary">{book.title_bn}</p>
                    {book.title_en && <p className="text-sm text-gray-400">{book.title_en}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{book.published_date || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/books/edit/${book.id}`} className="inline-flex items-center gap-1 text-sm text-highlight hover:underline">
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
