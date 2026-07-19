'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, Trash2, BookOpen } from 'lucide-react'
import type { Book } from '@/types'

export default function EditBookPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<Book | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('books').select('*').eq('id', params.id).single()
      if (data) setForm(data as Book)
    }
    load()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    setLoading(true)

    try {
      let coverUrl = form.cover_image_url
      let pdfUrl = form.pdf_url

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

      const { error } = await supabase.from('books').update({
        title_bn: form.title_bn,
        title_en: form.title_en,
        description_bn: form.description_bn,
        description_en: form.description_en,
        cover_image_url: coverUrl,
        pdf_url: pdfUrl,
        published_date: form.published_date,
      }).eq('id', params.id)

      if (error) throw error
      router.push('/admin/books')
      router.refresh()
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this book? Cannot be undone.')) return
    await supabase.from('books').delete().eq('id', params.id)
    router.push('/admin/books')
    router.refresh()
  }

  if (!form) return <div className="p-8 text-center text-gray-400">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Edit Book</h1>
        <button onClick={handleDelete} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Cover Image</label>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{coverFile ? coverFile.name : 'Change cover'}</span>
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); } }} className="hidden" />
            </label>
            {(coverPreview || form.cover_image_url) && <img src={coverPreview || form.cover_image_url!} alt="Cover" className="w-24 h-32 object-cover rounded-lg mt-2" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">PDF File</label>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">{pdfFile ? pdfFile.name : 'Change PDF'}</span>
              <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="hidden" />
            </label>
            {form.pdf_url && <a href={form.pdf_url} target="_blank" className="text-sm text-highlight hover:underline mt-2 block">View current PDF</a>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Published Date</label>
          <input type="date" value={form.published_date || ''} onChange={(e) => setForm({ ...form, published_date: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (বাংলা)</label>
            <textarea rows={6} value={form.description_bn || ''} onChange={(e) => setForm({ ...form, description_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Description (English)</label>
            <textarea rows={6} value={form.description_en || ''} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Update Book'}
          </button>
          <button type="button" onClick={() => router.push('/admin/books')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
