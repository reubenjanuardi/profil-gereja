'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Church, Menu, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/jadwal', label: 'Jadwal Ibadah' },
  { href: '/warta', label: 'Warta & Tata Ibadah' },
  { href: '/profil', label: 'Profil Gereja' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-church-800 text-white shadow-sm">
            <Church className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-base font-extrabold tracking-tight text-church-900 dark:text-church-100">
              GPIB HOSIANA
            </span>
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Jakarta
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-church-50 text-church-900 font-semibold dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex gap-1.5 text-xs font-semibold">
            <Link href="/admin">
              <Shield className="h-3.5 w-3.5" />
              Admin Portal
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-church-100 text-church-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t mt-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-church-800 dark:text-church-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                <Shield className="h-4 w-4" />
                Admin Panel (/admin)
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
