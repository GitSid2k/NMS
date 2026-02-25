"use client"

import { useState, useCallback } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const uploadFile = async (file: File) => {
    if (disabled) return

    // Validate file
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      alert("Неверный тип файла. Разрешены только изображения.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Файл слишком большой. Максимум 10MB.")
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.url) {
        onChange(data.url)
      } else {
        alert(data.error || "Ошибка при загрузке")
      }
    } catch (error) {
      alert("Ошибка при загрузке файла")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      uploadFile(file)
    }
  }, [uploadFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()
        if (file) {
          uploadFile(file)
        }
        break
      }
    }
  }, [uploadFile])

  // Handle paste globally when component is focused
  const handleFocus = () => {
    document.addEventListener("paste", handlePaste)
  }

  const handleBlur = () => {
    document.removeEventListener("paste", handlePaste)
  }

  return (
    <div
      className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {value ? (
        // Preview with remove button
        <div className="relative group">
          <div className="relative aspect-video rounded-xl overflow-hidden border bg-zinc-100 dark:bg-zinc-800">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Нажмите на изображение чтобы заменить
          </p>
        </div>
      ) : (
        // Upload area
        <div
          className={`relative aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer
            ${isDragging 
              ? "border-brand-500 bg-brand-500/10" 
              : "border-zinc-300 dark:border-zinc-700 hover:border-brand-400 hover:bg-brand-500/5"
            }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            disabled={disabled}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                <p className="text-sm text-muted-foreground">Загрузка...</p>
              </>
            ) : (
              <>
                <div className="h-14 w-14 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <Upload className="h-7 w-7 text-brand-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Перетащите изображение сюда
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    или нажмите для выбора файла
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Также можно вставить из буфера обмена (Ctrl+V)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
