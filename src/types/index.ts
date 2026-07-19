export interface BlogPost {
  id: string
  slug: string
  title_bn: string
  title_en: string | null
  content_bn: string
  content_en: string | null
  cover_image_url: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Book {
  id: string
  slug: string
  title_bn: string
  title_en: string | null
  description_bn: string | null
  description_en: string | null
  cover_image_url: string | null
  pdf_url: string | null
  published_date: string | null
  created_at: string
}

export interface Project {
  id: string
  slug: string
  title_bn: string
  title_en: string | null
  summary_bn: string | null
  summary_en: string | null
  description_bn: string | null
  description_en: string | null
  cover_image_url: string | null
  project_url: string | null
  tags: string[] | null
  created_at: string
}

export interface ResearchItem {
  id: string
  slug: string
  title_bn: string
  title_en: string | null
  summary_bn: string | null
  summary_en: string | null
  file_url: string | null
  external_url: string | null
  created_at: string
}

export interface Profile {
  id: number
  legal_name: string
  brand_name: string
  bio_bn: string | null
  bio_en: string | null
  education: Education[] | null
  skills: Skills | null
  cv_pdf_url: string | null
  photo_url: string | null
  github_url: string | null
  linkedin_url: string | null
  email: string | null
}

export interface Education {
  institution: string
  degree: string
  start: string
  end: string
}

export interface Skills {
  tech: string[]
  language: string[]
  extra: string[]
}

export type Lang = 'bn' | 'en'
