import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, FileText, BookOpen, FolderOpen, FlaskConical, User, Settings } from 'lucide-react'
import { AdminLogout } from '@/components/admin/AdminLogout'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/books', label: 'Books', icon: BookOpen },
    { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
    { href: '/admin/research', label: 'Research', icon: FlaskConical },
    { href: '/admin/profile', label: 'Profile', icon: User },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-bold text-primary">AS Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                <Icon className="w-5 h-5" />{item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <AdminLogout />
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="text-lg font-bold text-primary">AS Admin</Link>
        <AdminLogout />
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
