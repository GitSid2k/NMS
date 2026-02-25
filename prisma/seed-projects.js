const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Проекты по категориям как на nmstroy.ru
const projects = [
  // === ПЕЧИ ТРУБЧАТЫЕ И КОМПЛЕКТУЮЩИЕ ===
  {
    title: "Трубчатая печь П-1/1",
    category: "Печи трубчатые",
    location: "ООО «Славянск-ЭКО», Краснодарский край",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921e0?q=80&w=2800&auto=format&fit=crop",
    description: "Проектирование, изготовление и монтаж трубчатой печи нагрева сырья мощностью 15 МВт. Комплектация: змеевики из стали 12Х18Н10Т, шиберные заслонки с электроприводом, обвязка технологическими трубопроводами."
  },
  {
    title: "Трубчатая печь П-2 АВТ",
    category: "Печи трубчатые",
    location: "ПАО АНК «РОСНЕФТЬ», г. Самара",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-9375e8bbd5e1?q=80&w=2670&auto=format&fit=crop",
    description: "Изготовление и монтаж трубчатой печи атмосферно-вакуумной трубчатки. Радиантные трубы из легированной стали, футеровка огнеупорным бетоном, система автоматического регулирования горения."
  },
  {
    title: "Змеевики печи П-102",
    category: "Печи трубчатые",
    location: "ПАО «Орскнефтеоргсинтез», г. Орск",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-c8eb2e7a6c5b?q=80&w=2670&auto=format&fit=crop",
    description: "Изготовление и монтаж змеевиков из стали 15Х5М для печи атмосферной перегонки нефти. Стилоскопирование и рентген-контроль 100% сварных швов."
  },
  {
    title: "Шиберные заслонки Ду-800",
    category: "Печи трубчатые",
    location: "НПЗ «Афипский», Краснодарский край",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db85da?q=80&w=2670&auto=format&fit=crop",
    description: "Проектирование и изготовление шиберных заслонок с электроприводом для регулирования тяги в трубчатых печах. Комплектация приводами с дистанционным управлением."
  },
  {
    title: "Ремонт радиантных труб печи П-3",
    category: "Печи трубчатые",
    location: "ПАО «ЛУКОЙЛ», г. Волгоград",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1595658648327-32d9fa5d22e2?q=80&w=2670&auto=format&fit=crop",
    description: "Остановочный ремонт с заменой радиантных труб печи висбрекинга. Замена 24 труб, ремонт футеровки, ревизия горелочных устройств ГТП-3."
  },

  // === РЕКТИФИКАЦИОННЫЕ КОЛОННЫ ===
  {
    title: "Ректификационная колонна К-1",
    category: "Ректификационные колонны",
    location: "ООО «Первый Завод», г. Тула",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1565193576-64030a6c6d70?q=80&w=2670&auto=format&fit=crop",
    description: "Проектирование и монтаж ректификационной колонны диаметром 2400 мм, высотой 42 м. 48 клапанных тарелок, система орошения с регулированием флегмового числа."
  },
  {
    title: "Реконструкция колонны К-2",
    category: "Ректификационные колонны",
    location: "ПАО АНК «Башнефть», г. Уфа",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1584467571266-1cb324e0e19b?q=80&w=2670&auto=format&fit=crop",
    description: "Капитальный ремонт и модернизация ректификационной колонны. Замена контактных устройств на высокоэффективные, усиление корпуса, пусконаладочные работы."
  },
  {
    title: "Стабилизационная колонна КС-101",
    category: "Ректификационные колонны",
    location: "ПАО «Газпром», Астраханская область",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2670&auto=format&fit=crop",
    description: "Монтаж стабилизационной колонны установки гидроочистки. Диаметр 1800 мм, 32 ситчатых тарелки, система подачи ингибиторов коррозии."
  },

  // === ТЕПЛООБМЕННОЕ ОБОРУДОВАНИЕ ===
  {
    title: "Теплообменники Т-1/1-4",
    category: "Теплообменное оборудование",
    location: "ПАО «Газпром», Астраханская область",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1504916789300-396e26f3eb5f?q=80&w=2670&auto=format&fit=crop",
    description: "Изготовление и монтаж 4 кожухотрубчатых теплообменников площадью поверхности 400 м² каждый. Материал труб — сталь 12Х18Н10Т, рабочее давление 6,3 МПа."
  },
  {
    title: "Теплообменники «труба в трубе»",
    category: "Теплообменное оборудование",
    location: "ООО «Славянск-ЭКО», Краснодарский край",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e15b91?q=80&w=2670&auto=format&fit=crop",
    description: "Изготовление 12 теплообменников типа «труба в трубе» для подогрева сырья. Длина секций 6 м, общая площадь теплообмена 180 м²."
  },
  {
    title: "Холодильники ХК-1, ХК-2",
    category: "Теплообменное оборудование",
    location: "НПЗ «Афипский», Краснодарский край",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-9375e8bbd5e1?q=80&w=2670&auto=format&fit=crop",
    description: "Монтаж воздушных холодильников конденсации. 8 секций по 4 вентилятора, площадь оребрения 12000 м², система регулирования температуры оборотной воды."
  },

  // === АРМАТУРНЫЕ БЛОКИ И ТРАНСФЕРНЫЕ ЛИНИИ ===
  {
    title: "Арматурный блок АБ-301",
    category: "Арматурные блоки",
    location: "ООО «Первый Завод», г. Тула",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921e0?q=80&w=2670&auto=format&fit=crop",
    description: "Проектирование и изготовление арматурного блока для установки каталитического крекинга. 24 запорных клапана, 8 регулирующих, система дистанционного управления."
  },
  {
    title: "Трансферная линия ТЛ-102",
    category: "Арматурные блоки",
    location: "ПАО АНК «РОСНЕФТЬ», г. Самара",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-c8eb2e7a6c5b?q=80&w=2670&auto=format&fit=crop",
    description: "Изготовление и монтаж трансферной линии диаметром 600 мм для подачи сырья в реактор. Теплоизоляция, опоры с компенсацией температурных расширений."
  },
  {
    title: "Арматурный блок АБ-205",
    category: "Арматурные блоки",
    location: "ПАО «ЛУКОЙЛ», г. Волгоград",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-9375e8bbd5e1?q=80&w=2670&auto=format&fit=crop",
    description: "Монтаж арматурного блока с запорной и предохранительной арматурой. 16 предохранительных клапанов, система сброса на факел, дренажная обвязка."
  },

  // === МОНТАЖ И РЕМОНТ ===
  {
    title: "Факельная установка Ф-100",
    category: "Монтажные работы",
    location: "ПАО «ЛУКОЙЛ», г. Волгоград",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1595658648327-32d9fa5d22e2?q=80&w=2670&auto=format&fit=crop",
    description: "Проектирование и монтаж факельной установки закрытого типа. Система автоматического розжига, сепараторы, система утилизации тепла отходящих газов."
  },
  {
    title: "Технологические трубопроводы",
    category: "Монтажные работы",
    location: "НПЗ «Афипский», Краснодарский край",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1584467571266-1cb324e0e19b?q=80&w=2670&auto=format&fit=crop",
    description: "Монтаж технологических трубопроводов Ду 50-1200 мм для установки каталитического риформинга. Протяженность 2,5 км, испытание давлением 1,5 Рраб."
  },
  {
    title: "Металлоконструкции эстакады",
    category: "Монтажные работы",
    location: "ТЭЦ «Новочеркасская», Ростовская область",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2670&auto=format&fit=crop",
    description: "Проектирование, изготовление и монтаж металлоконструкций технологической эстакады. Общий вес 180 тонн, пролет 24 м, высота 8 м."
  },
  {
    title: "Пусконаладка КИП и А",
    category: "Монтажные работы",
    location: "Мини-НПЗ «Крымск», Краснодарский край",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e15b91?q=80&w=2670&auto=format&fit=crop",
    description: "Комплекс пусконаладочных работ систем КИП и автоматики установки первичной переработки нефти. Настройка АСУ ТП, проверка 240 датчиков и 85 исполнительных механизмов."
  },
  {
    title: "Остановочный ремонт печей",
    category: "Монтажные работы",
    location: "ПАО АНК «РОСНЕФТЬ», г. Самара",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db85da?q=80&w=2670&auto=format&fit=crop",
    description: "Комплексный остановочный ремонт двух трубчатых печей за 18 суток. Замена радиантных труб, ремонт футеровки, ревизия горелок, пусконаладочные работы."
  }
]

async function main() {
  console.log('Clearing existing projects...')
  await prisma.project.deleteMany()
  
  console.log('Seeding projects grouped by categories...\n')
  
  let currentCategory = ''
  let count = 0
  
  for (const project of projects) {
    if (project.category !== currentCategory) {
      currentCategory = project.category
      console.log(`\n=== ${currentCategory.toUpperCase()} ===`)
    }
    
    const created = await prisma.project.create({
      data: project
    })
    console.log(`  ✓ ${created.title} (${created.year})`)
    count++
  }
  
  console.log(`\n\nTotal: ${count} projects in ${[...new Set(projects.map(p => p.category))].length} categories`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
