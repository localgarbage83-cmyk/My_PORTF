'use client'

import { useState } from 'react'
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title">যোগাযোগ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Have a question, collaboration idea, or just want to say hello? Reach out through any of the channels below.
          </p>

          <div className="space-y-6">
            <a href="mailto:kshuvo789@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-highlight" />
              </div>
              <div>
                <p className="font-medium text-primary">Email</p>
                <p className="text-sm text-gray-500">kshuvo789@gmail.com</p>
              </div>
            </a>

            <a href="https://github.com/akshuvo7s" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                <Github className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="font-medium text-primary">GitHub</p>
                <p className="text-sm text-gray-500">@akshuvo7s</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/kawsar-ahmed-shuvo-78961a222/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-primary">LinkedIn</p>
                <p className="text-sm text-gray-500">Kawsar Ahmed Shuvo</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-primary">Location</p>
                <p className="text-sm text-gray-500">Sylhet, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-gray-500">Thank you for reaching out. I will get back to you soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-highlight hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none transition-colors"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none transition-colors"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-highlight focus:ring-2 focus:ring-red-100 outline-none transition-colors resize-none"
                  placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
