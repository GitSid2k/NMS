import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react"

import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt={siteConfig.name}
                width={140}
                height={42}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {siteConfig.description}. Надежный партнер для реализации проектов любой сложности.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 hover:bg-brand-600 text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-zinc-800 hover:bg-brand-600 text-zinc-400 hover:text-white transition-colors"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Telegram</span>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-3 text-sm">
              {siteConfig.mainNav.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Проектирование</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Строительство</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Инженерные сети</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Пусконаладочные работы</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-start gap-3 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-500" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-3 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-500" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-500" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-sm">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
          <Link href="/documents" className="hover:text-white transition-colors">
            Документация
          </Link>
        </div>
      </div>
    </footer>
  )
}
