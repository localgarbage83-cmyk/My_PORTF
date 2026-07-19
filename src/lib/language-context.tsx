'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/types'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (bn: string, en?: string | null) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('lang') as Lang
    if (saved === 'bn' || saved === 'en') {
      setLangState(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('lang', lang)
      document.documentElement.setAttribute('data-lang', lang)
    }
  }, [lang, mounted])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (bn: string, en?: string | null) => {
    if (lang === 'en' && en && en.trim()) return en
    return bn
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div style={mounted ? undefined : { visibility: 'hidden' }}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
