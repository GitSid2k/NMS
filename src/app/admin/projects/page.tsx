"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  category: string
  location: string
  year: string
  imageUrl: string
}

export default function AdminProjects() {
  const { status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот проект?")) return

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Управление проектами</h1>
              <p className="text-muted-foreground">Добавление, редактирование и удаление проектов</p>
            </div>
          </div>
          <Button asChild className="bg-brand-600 hover:bg-brand-700 text-white">
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4 mr-2" /> Добавить проект
            </Link>
          </Button>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-muted-foreground border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Название</th>
                  <th className="px-6 py-4 font-medium">Категория</th>
                  <th className="px-6 py-4 font-medium">Локация</th>
                  <th className="px-6 py-4 font-medium">Год</th>
                  <th className="px-6 py-4 font-medium text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      Проекты пока не добавлены
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="border-b last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{project.title}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">{project.location}</td>
                      <td className="px-6 py-4">{project.year}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/projects/${project.id}/edit`}>
                              <Pencil className="h-4 w-4 text-blue-500" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
