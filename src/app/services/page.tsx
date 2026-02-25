import { FileText, HardHat, Building2, Wrench, Truck, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn, SlideUp } from "@/components/ui-custom/animations"

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Проектирование",
      desc: "Комплексное проектирование объектов промышленного и гражданского строительства.",
      details: [
        "Сбор исходно-разрешительной документации",
        "Разработка проектной документации",
        "Прохождение государственной экспертизы",
        "Разработка рабочей документации"
      ]
    },
    {
      icon: HardHat,
      title: "Строительно-монтажные работы",
      desc: "Выполнение полного комплекса строительных работ от нулевого цикла до сдачи объекта.",
      details: [
        "Земляные работы и устройство фундаментов",
        "Возведение несущих конструкций",
        "Кровельные и фасадные работы",
        "Внутренняя и наружная отделка"
      ]
    },
    {
      icon: Building2,
      title: "Инженерные сети",
      desc: "Монтаж внутренних и наружных инженерных систем и коммуникаций.",
      details: [
        "Водоснабжение и водоотведение",
        "Отопление и вентиляция",
        "Электроснабжение и освещение",
        "Слаботочные системы"
      ]
    },
    {
      icon: Truck,
      title: "Механизация строительства",
      desc: "Предоставление строительной техники и механизмов с экипажем.",
      details: [
        "Землеройная техника",
        "Грузоподъемные механизмы",
        "Транспортные средства",
        "Специализированная техника"
      ]
    },
    {
      icon: Wrench,
      title: "Пусконаладочные работы",
      desc: "Комплекс работ по вводу смонтированного оборудования и систем в эксплуатацию.",
      details: [
        "Индивидуальные испытания оборудования",
        "Комплексное опробование систем",
        "Настройка и регулировка параметров",
        "Обучение персонала заказчика"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Функции генерального подрядчика",
      desc: "Полное управление строительным проектом и ответственность за результат.",
      details: [
        "Организация всего комплекса работ",
        "Координация субподрядных организаций",
        "Контроль качества и сроков",
        "Сдача объекта в эксплуатацию"
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
                Наши услуги
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground">
                Мы предлагаем комплексные решения в области строительства и проектирования, 
                обеспечивая высокое качество на каждом этапе реализации проекта.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <SlideUp key={i} delay={i * 0.1} className="flex flex-col bg-background p-8 rounded-2xl shadow-sm border group hover:shadow-md transition-all">
                <div className="h-14 w-14 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{service.desc}</p>
                <div className="space-y-3 mb-8">
                  {service.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <SlideUp>
              <h2 className="text-3xl font-bold mb-2">Нужен нестандартный подход?</h2>
              <p className="text-brand-100 text-lg max-w-2xl">
                Свяжитесь с нами, и мы разработаем индивидуальное решение специально для вашего проекта.
              </p>
            </SlideUp>
            <FadeIn delay={0.2}>
              <Button size="lg" variant="secondary" className="bg-white text-brand-600 hover:bg-zinc-100 flex-shrink-0" asChild>
                <Link href="/contacts">Обсудить проект</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
