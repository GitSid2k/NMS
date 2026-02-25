import { FileText, HardHat, Building2, Wrench, Truck, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn, SlideUp } from "@/components/ui-custom/animations"
import prisma from "@/lib/prisma"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  HardHat,
  Building2,
  Truck,
  Wrench,
  ShieldCheck
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Наши услуги
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Мы предлагаем комплексные решения в области строительства и проектирования, 
                обеспечивая высокое качество на каждом этапе реализации проекта.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, i: number) => {
              const IconComponent = iconMap[service.icon] || FileText
              const details = JSON.parse(service.details || "[]")
              return (
              <SlideUp key={service.id} delay={i * 0.1} className="flex flex-col bg-background p-8 rounded-3xl shadow-sm border group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">{service.description}</p>
                <div className="space-y-3 mb-8">
                  {details.map((detail: string, j: number) => (
                    <div key={j} className="flex items-start gap-2.5 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                      <span className="text-foreground/80">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-between group/btn" asChild>
                    <Link href="/contacts">
                      Заказать услугу
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                    </Link>
                  </Button>
                </div>
              </SlideUp>
            )})}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="container relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <SlideUp>
              <h2 className="text-3xl font-bold mb-2">Нужен нестандартный подход?</h2>
              <p className="text-white/80 text-lg max-w-2xl">
                Свяжитесь с нами, и мы разработаем индивидуальное решение специально для вашего проекта.
              </p>
            </SlideUp>
            <FadeIn delay={0.2}>
              <Button size="lg" variant="secondary" className="rounded-full bg-white text-brand-600 hover:bg-zinc-100 shadow-lg flex-shrink-0 px-8" asChild>
                <Link href="/contacts">Обсудить проект</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
