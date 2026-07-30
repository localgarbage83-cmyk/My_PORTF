import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Daily thoughts, essays, and stories by Ahammad Shuvo.',
  openGraph: {
    title: 'Blog | Ahammad Shuvo',
    description: 'Daily thoughts, essays, and stories.',
  },
}
export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const items = (posts || []) as BlogPost[]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">ব্লগ</h1>
      <p className="text-gray-500 mb-10">Daily thoughts, essays, and stories.</p>

      {items.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-lg">No blog posts published yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((post) => (
            <article key={post.id} className="card group">
              <div className="flex flex-col md:flex-row gap-6">
                {post.cover_image_url && (
                  <div className="relative w-full md:w-48 h-48 md:h-32 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title_bn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString('bn-BD')}
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-highlight transition-colors">
                    {post.title_bn}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {post.content_bn?.substring(0, 200).replace(/[#*_]/g, '')}...
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-highlight text-sm font-medium hover:underline">
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
