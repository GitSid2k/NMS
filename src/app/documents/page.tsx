import { FileText, Download, Shield, Award, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui-custom/animations"

export default function DocumentsPage() {
  const categories = [
    {
      title: "Разрешительная документация",
      icon: Shield,
      docs: [
        { name: "Свидетельство СРО (Проектирование)", size: "2.4 MB", type: "PDF" },
        { name: "Свидетельство СРО (Строительство)", size: "3.1 MB", type: "PDF" },
        { name: "Свидетельство СРО (Инженерные изыскания)", size: "1.8 MB", type: "PDF" },
        { name: "Лицензия МЧС", size: "1.2 MB", type: "PDF" }
      ]
    },
    {
      title: "Учредительные документы",
      icon: FileCheck,
      docs: [
        { name: "Свидетельство ИНН", size: "0.5 MB", type: "PDF" },
        { name: "Свидетельство ОГРН", size: "0.5 MB", type: "PDF" },
        { name: "Устав ООО \"Нефтемашстрой\"", size: "4.2 MB", type: "PDF" },
        { name: "Карточка предприятия", size: "0.1 MB", type: "DOCX" }
      ]
    },
    {
      title: "Сертификаты и отзывы",
      icon: Award,
      docs: [
        { name: "Сертификат ISO 9001:2015", size: "1.5 MB", type: "PDF" },
        { name: "Сертификат ISO 14001:2015", size: "1.5 MB", type: "PDF" },
        { name: "Сертификат OHSAS 18001:2007", size: "1.5 MB", type: "PDF" },
        { name: "Отзывы заказчиков (Архив)", size: "8.5 MB", type: "ZIP" }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Документация
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground">
                Мы ведем прозрачную деятельность и предоставляем в открытом доступе 
                все необходимые лицензии, сертификаты и учредительные документы.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Documents Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="space-y-16">
            {categories.map((category, i) => (
              <SlideUp key={i} delay={i * 0.1}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.docs.map((doc, j) => (
                    <div key={j} className="flex items-center justify-between p-4 rounded-xl border bg-background hover:border-brand-500/50 hover:shadow-sm transition-all group">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="h-10 w-10 flex-shrink-0 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate" title={doc.name}>
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full group-hover:bg-brand-50 group-hover:text-brand-600 dark:group-hover:bg-brand-900/20 dark:group-hover:text-brand-400" asChild>
                        <a href="#" download>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Скачать</span>
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
