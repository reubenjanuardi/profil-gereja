'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Church, Menu, X, ShieldCheck } from 'lucide-react'
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-slate-900 dark:text-white transition-opacity hover:opacity-90 tactile-press"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 shadow-sm">
            <Church className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              GPIB HOSIANA
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
              Jakarta
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors tactile-press',
                  isActive
                    ? 'bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:inline-flex gap-1.5 text-xs font-semibold border-slate-300 dark:border-slate-700"
          >
            <Link href="/admin">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              Admin Portal
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-800 dark:text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Buka Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-background px-4 py-4 shadow-md">
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
                      ? 'bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Panel (/admin)
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
