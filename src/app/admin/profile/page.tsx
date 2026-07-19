'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Save, Upload, Plus, Trash2, GraduationCap } from 'lucide-react'
import type { Profile, Education, Skills } from '@/types'

export default function AdminProfilePage() {
  const [form, setForm] = useState<Partial<Profile>>({
    legal_name: 'Kowser Ahammad Shuvo',
    brand_name: 'Ahammad Shuvo',
    bio_bn: '',
    bio_en: '',
    education: [],
    skills: { tech: [], language: [], extra: [] },
    github_url: 'https://github.com/akshuvo7s',
    linkedin_url: 'https://www.linkedin.com/in/kawsar-ahmed-shuvo-78961a222/',
    email: 'kshuvo789@gmail.com',
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('profile').select('*').eq('id', 1).single()
      if (data) setForm(data as Profile)
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let photoUrl = form.photo_url
      let cvUrl = form.cv_pdf_url

      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const name = `photo-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('photos').upload(name, photoFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(name)
        photoUrl = publicUrl
      }

      if (cvFile) {
        const ext = cvFile.name.split('.').pop()
        const name = `cv-${Date.now()}.${ext}`
        const { error } = await supabase.storage.from('pdfs').upload(name, cvFile)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('pdfs').getPublicUrl(name)
        cvUrl = publicUrl
      }

      const { error } = await supabase.from('profile').upsert({
        id: 1,
        ...form,
        photo_url: photoUrl,
        cv_pdf_url: cvUrl,
      })

      if (error) throw error
      alert('Profile updated successfully!')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addEducation = () => {
    const edu = [...(form.education || [])]
    edu.push({ institution: '', degree: '', start: '', end: '' })
    setForm({ ...form, education: edu })
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const edu = [...(form.education || [])]
    edu[index] = { ...edu[index], [field]: value }
    setForm({ ...form, education: edu })
  }

  const removeEducation = (index: number) => {
    const edu = [...(form.education || [])]
    edu.splice(index, 1)
    setForm({ ...form, education: edu })
  }

  const updateSkills = (category: keyof Skills, value: string) => {
    const skills = { ...(form.skills || { tech: [], language: [], extra: [] }) }
    skills[category] = value.split(',').map(s => s.trim()).filter(Boolean)
    setForm({ ...form, skills })
  }

  const getSkillsString = (category: keyof Skills) => {
    return (form.skills?.[category] || []).join(', ')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Basic Info */}
        <div className="card space-y-6">
          <h2 className="text-lg font-bold text-primary">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Legal Name</label>
              <input value={form.legal_name || ''} onChange={(e) => setForm({ ...form, legal_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Brand Name</label>
              <input value={form.brand_name || ''} onChange={(e) => setForm({ ...form, brand_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Email</label>
              <input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">GitHub URL</label>
              <input value={form.github_url || ''} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">LinkedIn URL</label>
            <input value={form.linkedin_url || ''} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" />
          </div>
        </div>

        {/* Bio */}
        <div className="card space-y-6">
          <h2 className="text-lg font-bold text-primary">Bio</h2>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Bio (বাংলা)</label>
            <textarea rows={5} value={form.bio_bn || ''} onChange={(e) => setForm({ ...form, bio_bn: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="আপনার সম্পর্কে লিখুন..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Bio (English)</label>
            <textarea rows={5} value={form.bio_en || ''} onChange={(e) => setForm({ ...form, bio_en: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none" placeholder="Write about yourself..." />
          </div>
        </div>

        {/* Files */}
        <div className="card space-y-6">
          <h2 className="text-lg font-bold text-primary">Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Profile Photo</label>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">{photoFile ? photoFile.name : 'Choose photo'}</span>
                <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
              {form.photo_url && (
                <div className="mt-3">
                  <img src={form.photo_url} alt="Current" className="w-20 h-20 rounded-lg object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">CV PDF</label>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-highlight cursor-pointer transition-colors w-fit">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">{cvFile ? cvFile.name : 'Choose CV PDF'}</span>
                <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
              {form.cv_pdf_url && (
                <a href={form.cv_pdf_url} target="_blank" className="text-sm text-highlight hover:underline mt-3 block">
                  View current CV
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h2>
            <button type="button" onClick={addEducation} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-highlight hover:bg-red-50 transition-colors">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {(form.education || []).length === 0 && (
            <p className="text-gray-400 text-sm italic">No education entries yet. Click Add to create one.</p>
          )}

          {(form.education || []).map((edu, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Entry #{index + 1}</span>
                <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-highlight outline-none text-sm"
                />
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-highlight outline-none text-sm"
                />
                <input
                  placeholder="Start Year"
                  value={edu.start}
                  onChange={(e) => updateEducation(index, 'start', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-highlight outline-none text-sm"
                />
                <input
                  placeholder="End Year"
                  value={edu.end}
                  onChange={(e) => updateEducation(index, 'end', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-highlight outline-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="card space-y-6">
          <h2 className="text-lg font-bold text-primary">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Technical (comma separated)</label>
              <input
                value={getSkillsString('tech')}
                onChange={(e) => updateSkills('tech', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="React, Node.js, Python"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Languages (comma separated)</label>
              <input
                value={getSkillsString('language')}
                onChange={(e) => updateSkills('language', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="Bangla, English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Other (comma separated)</label>
              <input
                value={getSkillsString('extra')}
                onChange={(e) => updateSkills('extra', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="Writing, Public Speaking"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
