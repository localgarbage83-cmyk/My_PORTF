import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import type { Book } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Books',
  description: 'Published books and literary works by Ahammad Shuvo.',
  openGraph: {
    title: 'Books | Ahammad Shuvo',
    description: 'Published books and literary works.',
  },
}
export default async function BooksPage() {
  const supabase = createClient()
  const { data: books } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  const items = (books || []) as Book[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">বই</h1>
      <p className="text-gray-500 mb-10">Published books and literary works.</p>

      {items.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-lg">No books published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((book) => (
            <Link key={book.id} href={`/books/${book.slug}`} className="card group">
              {book.cover_image_url ? (
                <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
                  <Image
                    src={book.cover_image_url}
                    alt={book.title_bn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-64 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-primary to-accent flex items-center justify-center rounded-t-xl">
                  <BookOpen className="w-16 h-16 text-white/50" />
                </div>
              )}
              <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-highlight transition-colors">
                {book.title_bn}
              </h3>
              {book.title_en && <p className="text-sm text-gray-400 mb-3">{book.title_en}</p>}
              {book.published_date && <p className="text-sm text-gray-400 mb-3">{book.published_date}</p>}
              <p className="text-sm text-gray-500 line-clamp-2">{book.description_bn || book.description_en || ''}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
