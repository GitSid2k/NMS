"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

export default function EditContactsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    address2: "",
    workHours: ""
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch("/api/contacts")
        const data = await res.json()
        if (data) {
          setFormData({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            address2: data.address2 || "",
            workHours: data.workHours || ""
          })
        }
      } catch (error) {
        console.error("Failed to fetch contact:", error)
      } finally {
        setIsLoading(false)
      }
    }
    if (session) {
      fetchContact()
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const res = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert("Контакты успешно обновлены!")
      } else {
        alert("Ошибка при сохранении")
      }
    } catch (error) {
      alert("Ошибка при сохранении")
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 000-00-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="info@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес (основной)</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="г. Москва, ул. Примерная, д. 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Адрес (дополнительный)</Label>
              <Textarea
                id="address2"
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                placeholder="Производственная площадка..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHours">Режим работы</Label>
              <Textarea
                id="workHours"
                value={formData.workHours}
                onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                placeholder="Пн-Пт: 09:00 - 18:00&#10;Сб-Вс: Выходной"
              />
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Сохранение...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Сохранить
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
