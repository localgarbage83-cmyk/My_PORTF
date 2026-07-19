'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload, Save, FileText, ExternalLink } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function NewResearchPage() {
  const [form, setForm] = useState({
    title_bn: '',
    title_en: '',
    summary_bn: '',
    summary_en: '',
    external_url: '',
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let fileUrl = null

      if (pdfFile) {
        const ext = pdfFile.name.split('.').pop()
        const name = `research-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('pdfs').upload(name, pdfFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('pdfs').getPublicUrl(name)
        fileUrl = publicUrl
      }

      const slug = slugify(form.title_bn) || `research-${Date.now()}`

      const { error } = await supabase.from('research_items').insert({
        slug,
        title_bn: form.title_bn,
        title_en: form.title_en || null,
        summary_bn: form.summary_bn || null,
        summary_en: form.summary_en || null,
        file_url: fileUrl,
        external_url: form.external_url || null,
      })

      if (error) throw error
      router.push('/admin/research')
      router.refresh()
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">New Research Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (বাংলা) *</label>
            <input required value={form.title_bn} onChange={(e) => setForm({ ...form, title_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="গবেষণার শিরোনাম" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title (English)</label>
            <input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Research title" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Document (PDF)</label>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">{pdfFile ? pdfFile.name : 'Choose PDF'}</span>
            <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">External URL</label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="https://..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Summary (বাংলা)</label>
            <textarea rows={8} value={form.summary_bn} onChange={(e) => setForm({ ...form, summary_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" placeholder="সারাংশ..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Summary (English)</label>
            <textarea rows={8} value={form.summary_en} onChange={(e) => setForm({ ...form, summary_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none font-mono text-sm" placeholder="Summary..." />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Research'}
          </button>
          <button type="button" onClick={() => router.push('/admin/research')} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  )
}
