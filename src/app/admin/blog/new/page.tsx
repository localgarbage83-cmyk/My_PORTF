'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, Eye, EyeOff } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function NewBlogPostPage() {
  const [form, setForm] = useState({
    title_bn: '',
    title_en: '',
    content_bn: '',
    content_en: '',
    published: false,
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = null

      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('covers')
          .upload(fileName, coverFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(fileName)
        coverUrl = publicUrl
      }

      const slug = slugify(form.title_bn) || `post-${Date.now()}`

      const { error } = await supabase.from('blog_posts').insert({
        slug,
        title_bn: form.title_bn,
        title_en: form.title_en || null,
        content_bn: form.content_bn,
        content_en: form.content_en || null,
        cover_image_url: coverUrl,
        published: form.published,
      })

      if (error) throw error

      router.push('/admin/blog')
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (বাংলা) *</label>
            <input
              required
              value={form.title_bn}
              onChange={(e) => setForm({ ...form, title_bn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none"
              placeholder="পোস্টের শিরোনাম"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (English)</label>
            <input
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none"
              placeholder="Post title in English"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{coverFile ? coverFile.name : 'Choose file'}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {preview && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Content (বাংলা) *</label>
            <textarea
              required
              rows={15}
              value={form.content_bn}
              onChange={(e) => setForm({ ...form, content_bn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm"
              placeholder="Write in Markdown..."
            />
            <p className="text-xs text-gray-400 mt-1">Markdown supported</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Content (English)</label>
            <textarea
              rows={15}
              value={form.content_en}
              onChange={(e) => setForm({ ...form, content_en: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm"
              placeholder="English content (optional)..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, published: !form.published })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              form.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {form.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {form.published ? 'Published' : 'Draft'}
          </button>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Post'}
          </button>
          <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
