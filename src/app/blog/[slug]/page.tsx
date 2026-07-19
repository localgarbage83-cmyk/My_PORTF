import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { BlogPost } from '@/types'

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  const p = post as BlogPost

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Blog
      </Link>

      {p.cover_image_url && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src={p.cover_image_url} alt={p.title_bn} fill className="object-cover" />
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Calendar className="w-4 h-4" />
        {new Date(p.created_at).toLocaleDateString('bn-BD')}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{p.title_bn}</h1>
      {p.title_en && <p className="text-gray-400 mb-8">{p.title_en}</p>}

      <article className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-highlight">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {p.content_bn}
        </ReactMarkdown>
      </article>
    </div>
  )
}
