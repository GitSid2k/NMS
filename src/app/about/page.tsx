import Image from "next/image"
import { CheckCircle2, Award, Users, Clock, ShieldCheck } from "lucide-react"
import { FadeIn, SlideUp } from "@/components/ui-custom/animations"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                О компании <span className="text-blue-600">НМС</span>
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground">
                Надежный партнер в сфере строительства, проектирования и инженерных изысканий.
                Мы создаем объекты, которые служат десятилетиями.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SlideUp className="space-y-6">
              <h2 className="text-3xl font-bold">Наша история и миссия</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
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
            
            <FadeIn delay={0.2} className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                alt="Процесс строительства"
                fill
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats / Advantages */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10+", label: "Лет на рынке" },
              { num: "150+", label: "Реализованных проектов" },
              { num: "300+", label: "Сотрудников в штате" },
              { num: "100%", label: "Сдача в срок" }
            ].map((stat, i) => (
              <SlideUp key={i} delay={i * 0.1} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">{stat.num}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <SlideUp className="text-center max-w-3xl mx-auto mb-16">
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
              <SlideUp key={i} delay={i * 0.1} className="flex gap-6 p-8 bg-background rounded-2xl shadow-sm border">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <value.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
