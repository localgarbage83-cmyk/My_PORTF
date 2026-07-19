-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_bn text NOT NULL,
  title_en text,
  content_bn text NOT NULL,
  content_en text,
  cover_image_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Books
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_bn text NOT NULL,
  title_en text,
  description_bn text,
  description_en text,
  cover_image_url text,
  pdf_url text,
  published_date date,
  created_at timestamptz DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_bn text NOT NULL,
  title_en text,
  summary_bn text,
  summary_en text,
  description_bn text,
  description_en text,
  cover_image_url text,
  project_url text,
  tags text[],
  created_at timestamptz DEFAULT now()
);

-- Research items
CREATE TABLE IF NOT EXISTS research_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_bn text NOT NULL,
  title_en text,
  summary_bn text,
  summary_en text,
  file_url text,
  external_url text,
  created_at timestamptz DEFAULT now()
);

-- Profile (single row)
CREATE TABLE IF NOT EXISTS profile (
  id int PRIMARY KEY DEFAULT 1,
  legal_name text NOT NULL,
  brand_name text NOT NULL DEFAULT 'Ahammad Shuvo',
  bio_bn text,
  bio_en text,
  education jsonb DEFAULT '[]',
  skills jsonb DEFAULT '{"tech": [], "language": [], "extra": []}',
  cv_pdf_url text,
  photo_url text,
  github_url text,
  linkedin_url text,
  email text,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default profile
INSERT INTO profile (id, legal_name, brand_name, email, github_url, linkedin_url)
VALUES (1, 'Kowser Ahammad Shuvo', 'Ahammad Shuvo', 'kshuvo789@gmail.com', 'https://github.com/akshuvo7s', 'https://www.linkedin.com/in/kawsar-ahmed-shuvo-78961a222/')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Public read policies (published content only)
CREATE POLICY IF NOT EXISTS "Public read published blog" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY IF NOT EXISTS "Public read books" ON books
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public read research" ON research_items
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public read profile" ON profile
  FOR SELECT USING (true);

-- Admin full access policies (authenticated users)
CREATE POLICY IF NOT EXISTS "Admin full access blog" ON blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Admin full access books" ON books
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Admin full access projects" ON projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Admin full access research" ON research_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Admin full access profile" ON profile
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
