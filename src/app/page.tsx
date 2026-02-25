import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, HardHat, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/ui-custom/animations";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Фоновое изображение - плейсхолдер */}
        <div className="absolute inset-0 z-0 bg-zinc-900/80">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2671&auto=format&fit=crop"
            alt="Строительная площадка"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        <div className="container relative z-20 flex flex-col items-start gap-6 pt-20">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-zinc-200/20 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-200 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Проектирование и строительство
            </div>
          </FadeIn>
          
          <SlideUp delay={0.2}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Комплексные решения для вашего бизнеса
            </h1>
          </SlideUp>
          
          <SlideUp delay={0.3}>
            <p className="max-w-2xl text-lg text-zinc-300 sm:text-xl">
              ООО &quot;Нефтемашстрой&quot; предлагает полный спектр услуг: от проектирования до сдачи объекта в эксплуатацию. Надежность, проверенная временем.
            </p>
          </SlideUp>
          
          <SlideUp delay={0.4} className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/services">
                Наши услуги <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white" asChild>
              <Link href="/projects">Смотреть проекты</Link>
            </Button>
          </SlideUp>
        </div>
      </section>

      {/* О компании (кратко) */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideUp className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">О компании НМС</h2>
              <p className="text-lg text-muted-foreground">
                Мы — команда профессионалов с многолетним опытом работы в сфере проектирования, 
                строительства и инженерных изысканий. Наш подход основан на инновациях, 
                ответственности и строгом соблюдении сроков.
              </p>
              <ul className="space-y-4 mt-6">
                {[
                  "Более 10 лет на рынке строительных услуг",
                  "Сотни успешно реализованных проектов",
                  "Комплексный подход от идеи до реализации",
                  "Гарантия качества на все виды работ"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button variant="outline" asChild>
                  <Link href="/about">Подробнее о нас</Link>
                </Button>
              </div>
            </SlideUp>
            <FadeIn delay={0.2} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                alt="Команда инженеров"
                fill
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Основные направления */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container">
          <SlideUp className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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
              <SlideUp key={i} delay={i * 0.1} className="group relative bg-background p-8 rounded-2xl shadow-sm border transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <SlideUp className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">Готовы обсудить ваш проект?</h2>
              <p className="text-blue-100 text-lg">
                Свяжитесь с нашими специалистами для получения консультации и предварительного расчета стоимости.
              </p>
            </SlideUp>
            <FadeIn delay={0.2} className="flex gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-zinc-100" asChild>
                <Link href="/contacts">Оставить заявку</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
