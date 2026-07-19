import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Download, Calendar } from 'lucide-react'
import type { Book } from '@/types'

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: book } = await supabase
    .from('books')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!book) notFound()

  const b = book as Book

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/books" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Books
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {b.cover_image_url ? (
          <div className="relative w-full md:w-64 h-80 rounded-xl overflow-hidden shadow-lg shrink-0">
            <Image src={b.cover_image_url} alt={b.title_bn} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-full md:w-64 h-80 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <BookOpen className="w-20 h-20 text-white/50" />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary mb-2">{b.title_bn}</h1>
          {b.title_en && <p className="text-gray-400 mb-4">{b.title_en}</p>}
          {b.published_date && (
            <p className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4" />{b.published_date}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed mb-6">{b.description_bn || b.description_en || ''}</p>

          {b.pdf_url && (
            <a href={b.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              <Download className="w-4 h-4" />Download PDF
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
