import Image from "next/image"
import { MapPin, Calendar, FolderOpen } from "lucide-react"
import { SlideUp } from "@/components/ui-custom/animations"
import prisma from "@/lib/prisma"

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { category: 'asc' },
      { year: 'desc' }
    ]
  })

  // Group projects by category
  const categories = projects.reduce((acc: Record<string, typeof projects>, project) => {
    const cat = project.category || "Другое"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(project)
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
                Реализованные проекты
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Опыт и профессионализм нашей команды отражены в каждом реализованном объекте. 
                Мы гордимся результатами своей работы для ведущих предприятий нефтегазовой отрасли.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Projects by Category */}
      <section className="py-20 md:py-28">
        <div className="container">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Проекты пока не добавлены.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(categories).map(([category, categoryProjects], catIndex) => (
                <div key={category}>
                  {/* Category Header */}
                  <SlideUp delay={catIndex * 0.1}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                        <FolderOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{category}</h2>
                        <p className="text-sm text-muted-foreground">{categoryProjects.length} проектов</p>
                      </div>
                    </div>
                  </SlideUp>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProjects.map((project: any, i: number) => (
                      <SlideUp key={project.id} delay={(catIndex * 0.1) + (i * 0.05)} className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        {/* Image */}
                        <div className="relative h-[200px] w-full overflow-hidden">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{project.title}</h3>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="line-clamp-1">{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {project.year}
                            </div>
                          </div>
                          {project.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                          )}
                        </div>
                      </SlideUp>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
