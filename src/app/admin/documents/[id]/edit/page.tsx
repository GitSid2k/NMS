"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Loader2, Upload, FileText, X, ExternalLink } from "lucide-react"

type Params = Promise<{ id: string }>

export default function EditDocumentPage(props: { params: Params }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [docId, setDocId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    fileUrl: "",
    fileType: "PDF",
    fileSize: ""
  })

  useEffect(() => {
    props.params.then(p => setDocId(p.id))
  }, [props.params])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    async function fetchDocument() {
      if (!docId) return
      try {
        const res = await fetch(`/api/documents/${docId}`)
        const data = await res.json()
        setFormData({
          name: data.name || "",
          category: data.category || "",
          fileUrl: data.fileUrl || "",
          fileType: data.fileType || "PDF",
          fileSize: data.fileSize || ""
        })
      } catch (error) {
        console.error("Failed to fetch document:", error)
      } finally {
        setIsLoading(false)
      }
    }
    if (session && docId) {
      fetchDocument()
    }
  }, [docId, session])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp"
    ]
    if (!allowedTypes.includes(file.type)) {
      alert("Неверный тип файла. Разрешены: PDF, JPEG, PNG, GIF, WebP")
      return
    }

    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert("Файл слишком большой. Максимум 20MB.")
      return
    }

    setIsUploading(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData
      })

      const data = await res.json()

      if (res.ok && data.url) {
        const fileType = file.type === "application/pdf" ? "PDF" : 
                         file.type.split("/")[1].toUpperCase()
        const fileSize = formatFileSize(file.size)
        
        setFormData({
          ...formData,
          fileUrl: data.url,
          fileType,
          fileSize
        })
      } else {
        alert(data.error || "Ошибка при загрузке")
      }
    } catch (error) {
      alert("Ошибка при загрузке файла")
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push("/admin/documents")
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
          <Link href="/admin/documents">
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Редактирование документа</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Название документа</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Например: Сертификаты"
                required
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <Label>Файл документа</Label>
              
              {formData.fileUrl ? (
                <div className="border rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">{formData.name || "Документ"}</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.fileType} • {formData.fileSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={formData.fileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setFormData({ ...formData, fileUrl: "", fileType: "PDF", fileSize: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Preview for images */}
                  {formData.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                    <div className="mt-4 rounded-lg overflow-hidden border">
                      <img 
                        src={formData.fileUrl} 
                        alt="Preview" 
                        className="w-full max-h-48 object-contain bg-white"
                      />
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    Нажмите кнопку ниже чтобы заменить файл
                  </p>
                </div>
              ) : null}

              <label className={`block ${formData.fileUrl ? 'mt-2' : ''}`}>
                <div className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer
                  ${isUploading 
                    ? "border-brand-500 bg-brand-500/10" 
                    : "border-zinc-300 dark:border-zinc-700 hover:border-brand-400 hover:bg-brand-500/5"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  
                  <div className="flex flex-col items-center justify-center py-8 px-4">
                    {isUploading ? (
                      <>
                        <Loader2 className="h-8 w-8 text-brand-500 animate-spin mb-2" />
                        <p className="text-sm text-muted-foreground">Загрузка файла...</p>
                      </>
                    ) : (
                      <>
                        <div className="h-12 w-12 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 mb-3">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium mb-1">
                          {formData.fileUrl ? "Заменить файл" : "Загрузить файл"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPEG, PNG, GIF, WebP • до 20 MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fileType">Тип файла</Label>
                <Input
                  id="fileType"
                  value={formData.fileType}
                  onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                  placeholder="PDF"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileSize">Размер</Label>
                <Input
                  id="fileSize"
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  placeholder="2.5 MB"
                />
              </div>
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
