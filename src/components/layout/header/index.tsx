"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

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

  // Тень при скролле
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-shadow duration-300",
        scrolled ? "shadow-lg shadow-black/5" : ""
      )}>
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt={siteConfig.name}
                width={140}
                height={42}
                className="h-9 w-auto"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {siteConfig.mainNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-brand-600 after:transition-transform after:duration-300 after:origin-left",
                    pathname === item.href
                      ? "text-brand-600 dark:text-brand-400 after:scale-x-100"
                      : "text-foreground/70 after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-brand-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </a>
            <Button className="hidden md:flex rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 transition-all" asChild>
              <Link href="/contacts">Оставить заявку</Link>
            </Button>
            
            <button
              className="flex items-center justify-center rounded-full p-2.5 md:hidden bg-brand-600 text-white hover:bg-brand-700 transition-colors"
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
      </header>

      {/* Mobile Menu Overlay - outside header */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-[60] bg-background md:hidden overflow-y-auto">
          <nav className="container flex flex-col gap-1 py-6">
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-colors",
                  pathname === item.href
                    ? "text-brand-600 bg-brand-600/5"
                    : "text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
                )}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-6 border-t mt-4 space-y-4 px-4">
              <Button className="w-full rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md" size="lg" asChild>
                <Link href="/contacts">Оставить заявку</Link>
              </Button>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
