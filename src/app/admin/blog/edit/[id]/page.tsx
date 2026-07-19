'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, Trash2, Eye, EyeOff } from 'lucide-react'
import type { BlogPost } from '@/types'

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<BlogPost | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', params.id).single()
      if (data) setForm(data as BlogPost)
    }
    load()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    setLoading(true)

    try {
      let coverUrl = form.cover_image_url

      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('covers').upload(fileName, coverFile)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(fileName)
        coverUrl = publicUrl
      }

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title_bn: form.title_bn,
          title_en: form.title_en,
          content_bn: form.content_bn,
          content_en: form.content_en,
          cover_image_url: coverUrl,
          published: form.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id)

      if (error) throw error
      router.push('/admin/blog')
      router.refresh()
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', params.id)
    router.push('/admin/blog')
    router.refresh()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  if (!form) return <div className="p-8 text-center text-gray-400">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Edit Blog Post</h1>
        <button onClick={handleDelete} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (বাংলা) *</label>
            <input required value={form.title_bn} onChange={(e) => setForm({ ...form, title_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (English)</label>
            <input value={form.title_en || ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{coverFile ? coverFile.name : 'Change cover'}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {(preview || form.cover_image_url) && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img src={preview || form.cover_image_url!} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Content (বাংলা) *</label>
            <textarea required rows={15} value={form.content_bn} onChange={(e) => setForm({ ...form, content_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Content (English)</label>
            <textarea rows={15} value={form.content_en || ''} onChange={(e) => setForm({ ...form, content_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setForm({ ...form, published: !form.published })} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${form.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {form.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {form.published ? 'Published' : 'Draft'}
          </button>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Update Post'}
          </button>
          <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
