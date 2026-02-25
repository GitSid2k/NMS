"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "@/components/ui-custom/image-upload"

type Params = Promise<{ id: string }>

export default function EditProject(props: { params: Params }) {
  const { status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [projectId, setProjectId] = useState<string>("")

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    year: "",
    imageUrl: "",
    description: "",
  })

  useEffect(() => {
    props.params.then(p => setProjectId(p.id))
  }, [props.params])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
      return
    }

    const fetchProject = async () => {
      if (!projectId) return
      try {
        const res = await fetch(`/api/projects/${projectId}`)
        if (!res.ok) throw new Error("Project not found")
        const data = await res.json()
        setFormData({
          title: data.title || "",
          category: data.category || "",
          location: data.location || "",
          year: data.year || "",
          imageUrl: data.imageUrl || "",
          description: data.description || "",
        })
      } catch (err) {
        setError("Ошибка при загрузке проекта")
      } finally {
        setFetching(false)
      }
    }

    if (status === "authenticated" && projectId) {
      fetchProject()
    }
  }, [projectId, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed to update project")
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (err) {
      setError("Ошибка при сохранении проекта")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (fetching || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Редактирование проекта</h1>
            <p className="text-muted-foreground">Изменение данных существующего проекта</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border shadow-sm space-y-6">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название проекта *</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Input id="category" name="category" placeholder="Например: Промышленный объект" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Локация *</Label>
              <Input id="location" name="location" placeholder="Например: Ростов-на-Дону" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Год завершения *</Label>
              <Input id="year" name="year" placeholder="Например: 2023" value={formData.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Изображение проекта *</Label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />
            <p className="text-xs text-muted-foreground">
              Перетащите изображение, нажмите для выбора или вставьте из буфера обмена (Ctrl+V)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание проекта (необязательно)</Label>
            <Textarea id="description" name="description" className="min-h-[150px]" value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/projects">Отмена</Link>
            </Button>
            <Button type="submit" disabled={loading} className="bg-brand-600 hover:bg-brand-700 text-white">
              {loading ? "Сохранение..." : <><Save className="h-4 w-4 mr-2" /> Сохранить изменения</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
