import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, HardHat, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/ui-custom/animations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/38efd871-53ad-41e5-83d7-4c310fcfa6b5.png"
            alt="Нефтеперерабатывающий завод"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="container relative z-20 flex flex-col items-start gap-8 pt-24 pb-32">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-200 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              Проектирование и строительство
            </div>
          </FadeIn>
          
          <SlideUp delay={0.2}>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Комплексные решения<br className="hidden sm:block" /> для вашего бизнеса
            </h1>
          </SlideUp>
          
          <SlideUp delay={0.3}>
            <p className="max-w-2xl text-lg text-zinc-300/90 sm:text-xl leading-relaxed">
              ООО &quot;Нефтемашстрой&quot; предлагает полный спектр услуг: от проектирования до сдачи объекта в эксплуатацию. Надежность, проверенная временем.
            </p>
          </SlideUp>
          
          <SlideUp delay={0.4} className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
            <Button size="lg" className="rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all px-8 w-full sm:w-auto" asChild>
              <Link href="/services">
                Наши услуги <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-black border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm px-8 w-full sm:w-auto" asChild>
              <Link href="/projects">Смотреть проекты</Link>
            </Button>
          </SlideUp>
        </div>
      </section>

      {/* О компании (кратко) */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideUp className="space-y-8">
              <div>
                <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">О компании НМС</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы — команда профессионалов с многолетним опытом работы в сфере проектирования, 
                строительства и инженерных изысканий. Наш подход основан на инновациях, 
                ответственности и строгом соблюдении сроков.
              </p>
              <ul className="space-y-4">
                {[
                  "Более 10 лет на рынке строительных услуг",
                  "Сотни успешно реализованных проектов",
                  "Комплексный подход от идеи до реализации",
                  "Гарантия качества на все виды работ"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-600/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-600" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Button variant="outline" className="rounded-full px-6" asChild>
                  <Link href="/about">Подробнее о нас <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </SlideUp>
            <FadeIn delay={0.2} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/2779d35a-8259-4848-afa0-330fc9a232c7.png"
                alt="Команда инженеров"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Основные направления */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <SlideUp className="mb-16 space-y-4 max-w-3xl">
            <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Направления деятельности</h2>
            <p className="text-muted-foreground text-lg">
              Мы предоставляем комплексные услуги, охватывающие все этапы жизненного цикла объекта.
            </p>
          </SlideUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Проектирование",
                desc: "Разработка проектной и рабочей документации любой сложности с прохождением экспертизы."
              },
              {
                icon: HardHat,
                title: "Строительство",
                desc: "Выполнение строительно-монтажных работ в качестве генерального подрядчика."
              },
              {
                icon: Building2,
                title: "Инженерные сети",
                desc: "Проектирование и монтаж внутренних и наружных инженерных систем и коммуникаций."
              }
            ].map((service, i) => (
              <SlideUp key={i} delay={i * 0.1} className="group relative bg-background p-8 rounded-3xl shadow-sm border transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="h-14 w-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 group-hover:gap-2 transition-all">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-brand-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="container relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <SlideUp className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">Готовы обсудить ваш проект?</h2>
              <p className="text-white/80 text-lg">
                Свяжитесь с нашими специалистами для получения консультации и предварительного расчета стоимости.
              </p>
            </SlideUp>
            <FadeIn delay={0.2} className="flex gap-4">
              <Button size="lg" variant="secondary" className="rounded-full bg-white text-brand-600 hover:bg-zinc-100 shadow-lg px-8" asChild>
                <Link href="/contacts">Оставить заявку</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
