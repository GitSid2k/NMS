import Image from "next/image"
import { Award, Users, Clock, ShieldCheck } from "lucide-react"
import { FadeIn, SlideUp } from "@/components/ui-custom/animations"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                О компании <span className="text-brand-600">НМС</span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Надежный партнер в сфере строительства, проектирования и инженерных изысканий.
                Мы создаем объекты, которые служат десятилетиями.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SlideUp className="space-y-6">
              <h2 className="text-3xl font-bold">Наша история и миссия</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ООО &quot;Нефтемашстрой&quot; (НМС) — динамично развивающаяся строительная компания, 
                  которая за годы своей работы зарекомендовала себя как надежный и ответственный подрядчик.
                </p>
                <p>
                  Наша главная миссия — предоставлять заказчикам комплексные решения высокого качества, 
                  оптимизируя сроки и бюджет строительства за счет применения современных технологий 
                  и профессионализма нашей команды.
                </p>
                <p>
                  Мы обладаем всеми необходимыми допусками СРО на проектирование, строительство 
                  и инженерные изыскания, что позволяет нам выступать в качестве генерального подрядчика 
                  на объектах любой сложности.
                </p>
              </div>
            </SlideUp>
            
            <FadeIn delay={0.2} className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/40e471dd-21f7-45d9-8e08-00542d6e8c47.png"
                alt="Процесс строительства"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats / Advantages */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10+", label: "Лет на рынке" },
              { num: "150+", label: "Реализованных проектов" },
              { num: "300+", label: "Сотрудников в штате" },
              { num: "100%", label: "Сдача в срок" }
            ].map((stat, i) => (
              <SlideUp key={i} delay={i * 0.1} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">{stat.num}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <SlideUp className="mb-16 max-w-3xl">
            <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
            <h2 className="text-3xl font-bold mb-4">Наши принципы работы</h2>
            <p className="text-lg text-muted-foreground">
              Мы строим свою работу на фундаменте из четырех ключевых принципов, 
              которые позволяют нам достигать высоких результатов.
            </p>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: "Высокое качество",
                desc: "Многоуровневый контроль качества на каждом этапе работ, использование проверенных материалов и технологий."
              },
              {
                icon: Clock,
                title: "Соблюдение сроков",
                desc: "Грамотное планирование и управление процессами позволяет нам всегда сдавать объекты в оговоренные сроки."
              },
              {
                icon: Users,
                title: "Профессиональная команда",
                desc: "В нашем штате работают только высококвалифицированные инженеры, проектировщики и строители."
              },
              {
                icon: ShieldCheck,
                title: "Безопасность",
                desc: "Строгое соблюдение всех норм и правил охраны труда, промышленной и экологической безопасности."
              }
            ].map((value, i) => (
              <SlideUp key={i} delay={i * 0.1} className="flex gap-6 p-8 bg-background rounded-3xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <value.icon className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
