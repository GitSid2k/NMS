import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold sm:text-xl">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex space-x-4">
            <Link href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">Instagram</span>
            </Link>
            {/* Добавьте другие соцсети по необходимости */}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.mainNav.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
