import { createClient } from '@/lib/supabase-server'
import { Download, Github, Linkedin, Mail, MapPin, GraduationCap, Wrench, Languages } from 'lucide-react'
import Link from 'next/link'
import type { Profile } from '@/types'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .single()

  const p = profile as Profile | null

  const education = p?.education || []
  const skills = p?.skills || { tech: [], language: [], extra: [] }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg shrink-0">
          AS
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {p?.legal_name || 'Kowser Ahammad Shuvo'}
          </h1>
          <p className="text-lg text-gray-500 mb-1">{p?.brand_name || 'Ahammad Shuvo'}</p>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-1.5">
            <MapPin className="w-4 h-4" />
            Sylhet, Bangladesh
          </p>

          <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
            {p?.github_url && (
              <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            )}
            {p?.linkedin_url && (
              <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-700" />
              </a>
            )}
            {p?.email && (
              <a href={`mailto:${p.email}`} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">About</h2>
        <p className="text-gray-600 leading-relaxed">
          {p?.bio_en || p?.bio_bn || 'Bio coming soon...'}
        </p>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Education
        </h2>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="card">
                <h3 className="font-bold text-primary">{edu.institution}</h3>
                <p className="text-gray-600">{edu.degree}</p>
                <p className="text-sm text-gray-400">{edu.start} — {edu.end}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">Education details will be added soon.</p>
        )}
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <Wrench className="w-6 h-6" />
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="font-bold text-primary mb-3">Technical</h3>
            {skills.tech?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.tech.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{s}</span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Coming soon...</p>
            )}
          </div>
          <div className="card">
            <h3 className="font-bold text-primary mb-3">Languages</h3>
            {skills.language?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.language.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">{s}</span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Coming soon...</p>
            )}
          </div>
          <div className="card">
            <h3 className="font-bold text-primary mb-3">Other</h3>
            {skills.extra?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.extra.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">{s}</span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Coming soon...</p>
            )}
          </div>
        </div>
      </section>

      {/* CV Download */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">CV / Resume</h2>
        {p?.cv_pdf_url ? (
          <a
            href={p.cv_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        ) : (
          <div className="card border-dashed border-2 border-gray-200">
            <p className="text-gray-400 italic">CV not uploaded yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  )
}
