import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin, Calendar } from "lucide-react"
import { SlideUp } from "@/components/ui-custom/animations"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Завод по производству металлоконструкций",
      category: "Промышленное строительство",
      location: "г. Ростов-на-Дону",
      year: "2023",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "Логистический комплекс класса А",
      category: "Складские комплексы",
      location: "Московская область",
      year: "2022",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Модернизация насосной станции",
      category: "Инженерные сети",
      location: "г. Краснодар",
      year: "2023",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop"
    },
    {
      title: "Административно-бытовой корпус",
      category: "Гражданское строительство",
      location: "г. Новочеркасск",
      year: "2021",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Реконструкция производственного цеха",
      category: "Реконструкция",
      location: "г. Шахты",
      year: "2022",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Очистные сооружения",
      category: "Инфраструктурные объекты",
      location: "Ростовская область",
      year: "2021",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop"
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
                Наши проекты
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground">
                Опыт и профессионализм нашей команды отражены в каждом реализованном объекте. 
                Мы гордимся результатами своей работы.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <SlideUp key={i} delay={i * 0.1} className="group flex flex-col gap-4">
                <Link href="#" className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden block">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-zinc-900">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </Link>
                <div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href="#">{project.title}</Link>
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {project.year} год
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
