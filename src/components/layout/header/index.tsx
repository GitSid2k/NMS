"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // Закрываем меню при смене роута
  React.useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Блокируем скролл при открытом меню
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-brand-600 dark:text-brand-500">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                  pathname === item.href
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-foreground/80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex bg-brand-600 hover:bg-brand-700 text-white" asChild>
            <Link href="/contacts">Связаться с нами</Link>
          </Button>
          
          <button
            className="flex items-center justify-center rounded-md p-2 md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Меню</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden overflow-y-auto">
          <nav className="container flex flex-col gap-6 py-8">
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-brand-600",
                  pathname === item.href
                    ? "text-brand-600"
                    : "text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-6 border-t mt-2">
              <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white" size="lg" asChild>
                <Link href="/contacts">Связаться с нами</Link>
              </Button>
              <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-foreground">
                  {siteConfig.contact.phone}
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
