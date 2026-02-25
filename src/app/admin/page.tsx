"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Image as ImageIcon, Settings, Users, Phone } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>
  }

  if (!session) {
    return null
  }

  const sections = [
    {
      title: "Проекты",
      description: "Управление портфолио проектов",
      icon: ImageIcon,
      href: "/admin/projects",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Услуги",
      description: "Управление списком услуг",
      icon: Settings,
      href: "/admin/services",
      color: "text-brand-500",
      bgColor: "bg-brand-500/10",
    },
    {
      title: "Документы",
      description: "Управление документацией",
      icon: FileText,
      href: "/admin/documents",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Контакты",
      description: "Контактная информация",
      icon: Phone,
      href: "/admin/contacts",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Панель управления</h1>
            <p className="text-muted-foreground">Добро пожаловать, {session.user?.name || session.user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/" target="_blank">Перейти на сайт</Link>
            </Button>
            <Button variant="destructive" onClick={() => signOut()}>
              Выйти
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-brand-500/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${section.bgColor} ${section.color} group-hover:scale-110 transition-transform`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
