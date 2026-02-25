const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.service.deleteMany()
  await prisma.document.deleteMany()
  await prisma.contactInfo.deleteMany()
  await prisma.siteSettings.deleteMany()

  // Seed Services
  const services = [
    {
      title: "Проектирование",
      description: "Комплексное проектирование объектов промышленного и гражданского строительства.",
      icon: "FileText",
      details: JSON.stringify([
        "Сбор исходно-разрешительной документации",
        "Разработка проектной документации",
        "Прохождение государственной экспертизы",
        "Разработка рабочей документации"
      ]),
      order: 1
    },
    {
      title: "Строительно-монтажные работы",
      description: "Выполнение полного комплекса строительных работ от нулевого цикла до сдачи объекта.",
      icon: "HardHat",
      details: JSON.stringify([
        "Земляные работы и устройство фундаментов",
        "Возведение несущих конструкций",
        "Кровельные и фасадные работы",
        "Внутренняя и наружная отделка"
      ]),
      order: 2
    },
    {
      title: "Инженерные сети",
      description: "Монтаж внутренних и наружных инженерных систем и коммуникаций.",
      icon: "Building2",
      details: JSON.stringify([
        "Водоснабжение и водоотведение",
        "Отопление и вентиляция",
        "Электроснабжение и освещение",
        "Слаботочные системы"
      ]),
      order: 3
    },
    {
      title: "Механизация строительства",
      description: "Предоставление строительной техники и механизмов с экипажем.",
      icon: "Truck",
      details: JSON.stringify([
        "Землеройная техника",
        "Грузоподъемные механизмы",
        "Транспортные средства",
        "Специализированная техника"
      ]),
      order: 4
    },
    {
      title: "Пусконаладочные работы",
      description: "Комплекс работ по вводу смонтированного оборудования и систем в эксплуатацию.",
      icon: "Wrench",
      details: JSON.stringify([
        "Индивидуальные испытания оборудования",
        "Комплексное опробование систем",
        "Настройка и регулировка параметров",
        "Обучение персонала заказчика"
      ]),
      order: 5
    },
    {
      title: "Функции генерального подрядчика",
      description: "Полное управление строительным проектом и ответственность за результат.",
      icon: "ShieldCheck",
      details: JSON.stringify([
        "Организация всего комплекса работ",
        "Координация субподрядных организаций",
        "Контроль качества и сроков",
        "Сдача объекта в эксплуатацию"
      ]),
      order: 6
    }
  ]

  await prisma.service.createMany({ data: services })

  // Seed Documents
  const documents = [
    // Лаборатория неразрушающего контроля
    { name: "Аттестат аккредитации лаборатории НК", category: "Лаборатория неразрушающего контроля", fileUrl: "https://drive.google.com/file/d/11yPOWMMfr0fEnOzL4k-365yrG9Fp3vr_/view", fileType: "PDF", fileSize: "Актуально", order: 1 },
    { name: "Свидетельство СРО 2017", category: "Лаборатория неразрушающего контроля", fileUrl: "https://trello-attachments.s3.amazonaws.com/5191c87308093f800c001a95/59ba491db96d617e0f23e258/x/67e3e243dc61a70a244697c8c5bf2759/_D0_9D_D0_BE_D0_B2_D0_BE_D0_B5__D0_A1_D0_A0_D0_9E_2017.pdf", fileType: "PDF", fileSize: "2017", order: 2 },
    { name: "Сертификат соответствия", category: "Лаборатория неразрушающего контроля", fileUrl: "https://drive.google.com/file/d/1NJsLGfIFfcobCRXlVcyAVlq1tukJF_lJ/view", fileType: "PDF", fileSize: "Актуально", order: 3 },
    { name: "Методика ВИК (Визуальный контроль)", category: "Лаборатория неразрушающего контроля", fileUrl: "/documents/vik-method.pdf", fileType: "PDF", fileSize: "2.1 MB", order: 4 },
    { name: "Методика УЗК (Ультразвуковой контроль)", category: "Лаборатория неразрушающего контроля", fileUrl: "/documents/uzk-method.pdf", fileType: "PDF", fileSize: "3.4 MB", order: 5 },
    { name: "Методика рентгенографического контроля", category: "Лаборатория неразрушающего контроля", fileUrl: "/documents/rgk-method.pdf", fileType: "PDF", fileSize: "2.8 MB", order: 6 },
    { name: "Стилоскопирование металлов", category: "Лаборатория неразрушающего контроля", fileUrl: "/documents/stiloskop.pdf", fileType: "PDF", fileSize: "1.5 MB", order: 7 },
    // Разрешительная документация
    { name: "Свидетельство СРО (Проектирование)", category: "Разрешительная документация", fileUrl: "/documents/sro-proekt.pdf", fileType: "PDF", fileSize: "2.4 MB", order: 8 },
    { name: "Свидетельство СРО (Строительство)", category: "Разрешительная документация", fileUrl: "/documents/sro-stroy.pdf", fileType: "PDF", fileSize: "3.1 MB", order: 9 },
    { name: "Свидетельство СРО (Инженерные изыскания)", category: "Разрешительная документация", fileUrl: "/documents/sro-izysk.pdf", fileType: "PDF", fileSize: "1.8 MB", order: 10 },
    { name: "Лицензия МЧС", category: "Разрешительная документация", fileUrl: "/documents/mchs.pdf", fileType: "PDF", fileSize: "1.2 MB", order: 11 },
    // Учредительные документы
    { name: "Свидетельство ИНН", category: "Учредительные документы", fileUrl: "/documents/inn.pdf", fileType: "PDF", fileSize: "0.5 MB", order: 12 },
    { name: "Свидетельство ОГРН", category: "Учредительные документы", fileUrl: "/documents/ogrn.pdf", fileType: "PDF", fileSize: "0.5 MB", order: 13 },
    { name: "Устав ООО \"Нефтемашстрой\"", category: "Учредительные документы", fileUrl: "/documents/ustav.pdf", fileType: "PDF", fileSize: "4.2 MB", order: 14 },
    { name: "Карточка предприятия", category: "Учредительные документы", fileUrl: "/documents/kartochka.docx", fileType: "DOCX", fileSize: "0.1 MB", order: 15 },
    // Сертификаты и отзывы
    { name: "Сертификат ISO 9001:2015", category: "Сертификаты и отзывы", fileUrl: "/documents/iso9001.pdf", fileType: "PDF", fileSize: "1.5 MB", order: 16 },
    { name: "Сертификат ISO 14001:2015", category: "Сертификаты и отзывы", fileUrl: "/documents/iso14001.pdf", fileType: "PDF", fileSize: "1.5 MB", order: 17 },
    { name: "Политика обработки персональных данных", category: "Сертификаты и отзывы", fileUrl: "https://drive.google.com/file/d/1ncKeGulG5zxuoMSnZAoYWIF2eENrM9rY/view", fileType: "PDF", fileSize: "Актуально", order: 18 }
  ]

  await prisma.document.createMany({ data: documents })

  // Seed Contact Info
  await prisma.contactInfo.upsert({
    where: { id: "contact-main" },
    update: {
      phone: "+7 (863) 226-90-42",
      email: "info@nm-stroy.com",
      address: "Октябрьский р-н, п. Каменоломни, пер. Садовый, 28",
      address2: "г. Новочеркасск, Харьковское шоссе, 14г",
      workHours: "Пн-Пт: 09:00 - 18:00\nСб-Вс: Выходной"
    },
    create: {
      id: "contact-main",
      phone: "+7 (863) 226-90-42",
      email: "info@nm-stroy.com",
      address: "Октябрьский р-н, п. Каменоломни, пер. Садовый, 28",
      address2: "г. Новочеркасск, Харьковское шоссе, 14г",
      workHours: "Пн-Пт: 09:00 - 18:00\nСб-Вс: Выходной"
    }
  })

  // Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "site-settings" },
    update: {
      siteName: "НМС",
      description: "Строительство, проектирование и инженерные изыскания"
    },
    create: {
      id: "site-settings",
      siteName: "НМС",
      description: "Строительство, проектирование и инженерные изыскания"
    }
  })

  console.log("Content seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
