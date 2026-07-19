'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, BookOpen } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function NewBookPage() {
  const [form, setForm] = useState({
    title_bn: '',
    title_en: '',
    description_bn: '',
    description_en: '',
    published_date: '',
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = null
      let pdfUrl = null

      if (coverFile) {
        const ext = coverFile.name.split('.').pop()
        const name = `book-cover-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('covers').upload(name, coverFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(name)
        coverUrl = publicUrl
      }

      if (pdfFile) {
        const ext = pdfFile.name.split('.').pop()
        const name = `book-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('pdfs').upload(name, pdfFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('pdfs').getPublicUrl(name)
        pdfUrl = publicUrl
      }

      const slug = slugify(form.title_bn) || `book-${Date.now()}`

      const { error } = await supabase.from('books').insert({
        slug,
        title_bn: form.title_bn,
        title_en: form.title_en || null,
        description_bn: form.description_bn || null,
        description_en: form.description_en || null,
        cover_image_url: coverUrl,
        pdf_url: pdfUrl,
        published_date: form.published_date || null,
      })

      if (error) throw error
      router.push('/admin/books')
      router.refresh()
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (বাংলা) *</label>
            <input required value={form.title_bn} onChange={(e) => setForm({ ...form, title_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="বইয়ের নাম" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (English)</label>
            <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Book title in English" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Cover Image</label>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{coverFile ? coverFile.name : 'Choose cover'}</span>
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } }} className="hidden" />
            </label>
            {coverPreview && <img src={coverPreview} alt="Preview" className="w-24 h-32 object-cover rounded-lg mt-2" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">PDF File</label>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{pdfFile ? pdfFile.name : 'Choose PDF'}</span>
              <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Published Date</label>
          <input type="date" value={form.published_date} onChange={(e) => setForm({ ...form, published_date: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (বাংলা)</label>
            <textarea rows={6} value={form.description_bn} onChange={(e) => setForm({ ...form, description_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="বইয়ের বিবরণ..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (English)</label>
            <textarea rows={6} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Book description..." />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Book'}
          </button>
          <button type="button" onClick={() => router.push('/admin/books')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
