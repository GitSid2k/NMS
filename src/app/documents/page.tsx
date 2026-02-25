import { FileText, Download, Shield, Award, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui-custom/animations"
import prisma from "@/lib/prisma"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Разрешительная документация": Shield,
  "Учредительные документы": FileCheck,
  "Сертификаты и отзывы": Award
}

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { order: 'asc' }
  })
  
  // Group documents by category
  const categories = documents.reduce((acc: Record<string, typeof documents>, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {})

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Документация
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Мы ведем прозрачную деятельность и предоставляем в открытом доступе 
                все необходимые лицензии, сертификаты и учредительные документы.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Documents Content */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="space-y-16">
            {Object.entries(categories).map(([categoryName, docs], i: number) => {
              const IconComponent = categoryIcons[categoryName] || FileText
              return (
              <SlideUp key={categoryName} delay={i * 0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{categoryName}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(docs as any[]).map((doc: any, j: number) => (
                    <div key={j} className="flex items-center justify-between p-4 rounded-2xl border bg-background hover:border-brand-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate" title={doc.name}>
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {doc.fileType} • {doc.fileSize}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full group-hover:bg-brand-600/10 group-hover:text-brand-600 dark:group-hover:bg-brand-900/20 dark:group-hover:text-brand-400 transition-colors" asChild>
                        <a href={doc.fileUrl} download>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Скачать</span>
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </SlideUp>
            )})}
          </div>
        </div>
      </section>
    </div>
  )
}
