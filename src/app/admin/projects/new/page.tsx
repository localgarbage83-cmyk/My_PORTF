'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, ExternalLink } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function NewProjectPage() {
  const [form, setForm] = useState({
    title_bn: '',
    title_en: '',
    summary_bn: '',
    summary_en: '',
    description_bn: '',
    description_en: '',
    project_url: '',
    tags: '',
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = null

      if (coverFile) {
        const ext = coverFile.name.split('.').pop()
        const name = `project-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('covers').upload(name, coverFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(name)
        coverUrl = publicUrl
      }

      const slug = slugify(form.title_bn) || `project-${Date.now()}`
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)

      const { error } = await supabase.from('projects').insert({
        slug,
        title_bn: form.title_bn,
        title_en: form.title_en || null,
        summary_bn: form.summary_bn || null,
        summary_en: form.summary_en || null,
        description_bn: form.description_bn || null,
        description_en: form.description_en || null,
        cover_image_url: coverUrl,
        project_url: form.project_url || null,
        tags: tags.length > 0 ? tags : null,
      })

      if (error) throw error
      router.push('/admin/projects')
      router.refresh()
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (বাংলা) *</label>
            <input required value={form.title_bn} onChange={(e) => setForm({ ...form, title_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="প্রজেক্টের নাম" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (English)</label>
            <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Project title" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Cover Image</label>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">{coverFile ? coverFile.name : 'Choose cover'}</span>
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } }} className="hidden" />
          </label>
          {coverPreview && <img src={coverPreview} alt="Preview" className="w-32 h-20 object-cover rounded-lg mt-2" />}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Project URL</label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={form.project_url} onChange={(e) => setForm({ ...form, project_url: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Tags (comma separated)</label>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="React, Next.js, Tailwind" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Summary (বাংলা)</label>
            <textarea rows={3} value={form.summary_bn} onChange={(e) => setForm({ ...form, summary_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="সংক্ষিপ্ত বিবরণ..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Summary (English)</label>
            <textarea rows={3} value={form.summary_en} onChange={(e) => setForm({ ...form, summary_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Short summary..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (বাংলা)</label>
            <textarea rows={8} value={form.description_bn} onChange={(e) => setForm({ ...form, description_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" placeholder="বিস্তারিত বিবরণ..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (English)</label>
            <textarea rows={8} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" placeholder="Detailed description..." />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Project'}
          </button>
          <button type="button" onClick={() => router.push('/admin/projects')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
