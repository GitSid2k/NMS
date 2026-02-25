import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SlideUp, FadeIn } from "@/components/ui-custom/animations"
import prisma from "@/lib/prisma"

export default async function ContactsPage() {
  const contact = await prisma.contactInfo.findFirst()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <SlideUp>
              <div className="w-12 h-1 bg-brand-600 rounded-full mb-6"></div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Контакты
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Свяжитесь с нами удобным для вас способом. Мы всегда готовы обсудить ваш проект 
                и предложить оптимальные решения.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <SlideUp delay={0.2} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Телефон</h3>
                      <p className="text-muted-foreground">{contact?.phone || "+7 (999) 000-00-00"}</p>
                    </div>
                  </SlideUp>
                  
                  <SlideUp delay={0.3} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">E-mail</h3>
                      <p className="text-muted-foreground">{contact?.email || "info@example.com"}</p>
                    </div>
                  </SlideUp>
                  
                  <SlideUp delay={0.4} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Режим работы</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{contact?.workHours || "Пн-Пт: 09:00 - 18:00"}</p>
                    </div>
                  </SlideUp>
                </div>

                <div className="space-y-6">
                  <SlideUp delay={0.5} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Центральный офис</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{contact?.address || "Адрес не указан"}</p>
                    </div>
                  </SlideUp>

                  {contact?.address2 && (
                  <SlideUp delay={0.6} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Производственная площадка</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{contact.address2}</p>
                    </div>
                  </SlideUp>
                  )}
                </div>
              </div>

              {/* Map Placeholder */}
              <FadeIn delay={0.7} className="w-full h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden relative border">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground flex-col gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-brand-600/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-brand-600" />
                  </div>
                  <span className="font-medium">Интерактивная карта</span>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <FadeIn delay={0.4} className="bg-background rounded-3xl border p-8 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-300 h-fit">
              <h2 className="text-2xl font-bold mb-2">Написать нам</h2>
              <p className="text-muted-foreground mb-8">
                Оставьте заявку, и наши специалисты свяжутся с вами в ближайшее время.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Иван Иванов" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 000-00-00" className="rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" className="rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Опишите вашу задачу или задайте вопрос..." 
                    className="min-h-[150px] resize-y rounded-xl"
                  />
                </div>

                <Button type="button" size="lg" className="w-full rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20">
                  <Send className="mr-2 h-4 w-4" /> Отправить сообщение
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку «Отправить», вы соглашаетесь с политикой конфиденциальности 
                  и обработкой персональных данных.
                </p>
              </form>
            </FadeIn>
            
          </div>
        </div>
      </section>
    </div>
  )
}
