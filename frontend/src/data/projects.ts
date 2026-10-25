/**
 * Zentrale Projektdaten: Startseite (Karten, Zahlen, Hero) und
 * Projektseite (Details) lesen alle aus dieser Datei.
 */

export interface Screenshot {
  image: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  subtitle: string;
  type: string;
  /** Kurztext für die Karten auf der Startseite */
  summary: string;
  /** Technologien, die auf der Karte als Tags erscheinen */
  tags: string[];
  description: string;
  goal: string;
  role: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  thumbnail: string;
  screenshots: Screenshot[];
  demo?: string;
  github?: string;
  documentation?: string;
}

export const projects: Record<string, Project> = {
  looply: {
    title: "Looply",
    subtitle: "Online Secondhand Marketplace",
    type: "FULL-STACK WEB APPLICATION",

    summary:
      "Eine moderne Secondhand-Plattform, auf der Benutzer Produkte suchen, verkaufen und kaufen können. Die Anwendung umfasst unter anderem Benutzerkonten, Warenkorb, Wishlist, Chat, Bestellungen und Bewertungen.",

    tags: ["Vue", "TypeScript", "Strapi", "Stripe"],

    description:
      "Looply ist eine moderne Secondhand-Plattform, auf der Benutzer Produkte suchen, verkaufen und kaufen können. Die Anwendung bildet den gesamten Prozess von der Produktsuche bis zur Bestellung digital ab.",

    goal: "Ziel des Projekts war die Entwicklung einer benutzerfreundlichen Plattform für den Handel mit gebrauchten Produkten. Dabei sollten sowohl Käufer als auch Verkäufer ihre wichtigsten Aufgaben direkt über die Webapplikation erledigen können.",

    role: "Ich war an der Konzeption und Entwicklung der Webapplikation beteiligt. Dabei arbeitete ich unter anderem mit Vue und TypeScript im Frontend sowie mit Strapi als Backend und API.",

    technologies: [
      "Vue",
      "TypeScript",
      "Strapi",
      "SQLite",
      "Stripe",
      "ApexCharts",
      "Nodemailer",
    ],

    features: [
      "Produktsuche und Filter",
      "Benutzerregistrierung und Login",
      "Produktverwaltung",
      "Warenkorb und Wishlist",
      "Bestellungen und Lagerverwaltung",
      "Chat zwischen Benutzern",
      "Bewertungen",
      "Stripe-Zahlungen",
      "Passwort zurücksetzen",
      "Verkäufer-Dashboard",
    ],

    challenges: [
      "Verknüpfung des Vue-Frontends mit der Strapi API",
      "Umsetzung des Bestell- und Lagerprozesses",
      "Integration der Stripe-Zahlungen",
      "Verwaltung verschiedener Benutzerrollen und Funktionen",
      "Umsetzung einer übersichtlichen Benutzeroberfläche",
    ],

    thumbnail: new URL("../assets/looply/thumbnail.png", import.meta.url).href,

    screenshots: [
      {
        image: new URL("../assets/looply/home.png", import.meta.url).href,
        title: "Startseite",
        description:
          "Die Startseite bietet einen Überblick über die Plattform und aktuelle Produkte. Über die Navigation können Benutzer direkt zur Produktsuche oder zu ihrem persönlichen Bereich wechseln.",
      },
      {
        image: new URL("../assets/looply/filteredProducts.png", import.meta.url)
          .href,
        title: "Produktübersicht",
        description:
          "Produkte können durchsucht und anhand verschiedener Kriterien gefiltert werden. Dadurch können Benutzer gezielt nach passenden Secondhand-Artikeln suchen.",
      },
      {
        image: new URL("../assets/looply/seller.png", import.meta.url).href,
        title: "Verkäufer-Dashboard",
        description:
          "Im Dashboard können Verkäufer ihre Produkte und Bestellungen verwalten und erhalten einen Überblick über ihre Aktivitäten.",
      },
    ],

    //demo: "https://example.com",
    documentation: "https://online-secondhand-7b02fb.pages.ti.bfh.ch/docs/",
  },

  ecocharge: {
    title: "EcoCharge",
    subtitle: "Smart EV Charging",
    type: "PWA · SMART CHARGING",

    summary:
      "Eine Webapplikation für Elektrofahrzeuge, die anhand von Ladepräferenzen, Strompreisen, Fahrzeugdaten und einer Photovoltaikanlage den optimalen Ladezeitpunkt berechnet.",

    tags: ["PHP", "MySQL", "Smartcar", "Open-Meteo"],

    description:
      "EcoCharge ist eine Webapplikation, die Elektroauto-Besitzern anhand ihrer Ladepräferenzen und ihrer Photovoltaik-Ladeinfrastruktur den optimalen Ladezeitpunkt empfiehlt.",

    goal: "Ziel war es, verschiedene Einflussfaktoren wie Strompreise, Solarenergie, Ladeleistung und Fahrzeugdaten miteinander zu kombinieren und daraus einen geeigneten Ladezeitpunkt zu bestimmen.",

    role: "Ich entwickelte die Webapplikation sowie die Logik für die Berechnung der Ladezeiten und integrierte verschiedene externe APIs für Fahrzeug-, Wetter- und Strompreisdaten.",

    technologies: ["PHP", "MySQL", "Smartcar", "Open-Meteo", "EKZ API", "PWA"],

    features: [
      "Fahrzeugdaten über Smartcar",
      "Berechnung des benötigten Ladebedarfs",
      "Berechnung der Ladezeit",
      "Berücksichtigung der Ladeleistung",
      "Integration von Stromtarifen",
      "Berücksichtigung der Solarenergie",
      "Verschiedene Ladepräferenzen",
      "Optimale und alternative Ladezeiten",
      "Progressive Web App",
    ],

    challenges: [
      "Integration mehrerer externer APIs",
      "Kombination verschiedener Datenquellen",
      "Berechnung geeigneter Ladezeiten",
      "Berücksichtigung verschiedener Benutzerpräferenzen",
      "Umsetzung der Anwendung als Progressive Web App",
    ],

    thumbnail: new URL("../assets/ecocharge/thumbnail.png", import.meta.url)
      .href,

    screenshots: [
      {
        image: new URL(
          "../assets/ecocharge/ecocharge_home.png",
          import.meta.url,
        ).href,
        title: "Ladeplan",
        description:
          "Der Ladeplan zeigt dem Benutzer den empfohlenen Ladezeitpunkt sowie alternative Möglichkeiten. Die Empfehlung basiert auf den hinterlegten Ladepräferenzen und verfügbaren Energiedaten.",
      },
      {
        image: new URL(
          "../assets/ecocharge/ecocharge_login.png",
          import.meta.url,
        ).href,
        title: "Smartcar API Anbindung",
        description:
          "Über die Smartcar API ruft EcoCharge Fahrzeugdaten wie Akkustand und Batteriekapazität ab. Diese Daten werden für die Berechnung der benötigten Energiemenge und des optimalen Ladezeitpunkts verwendet.",
      },
      {
        image: new URL(
          "../assets/ecocharge/ecocharge_settings.png",
          import.meta.url,
        ).href,
        title: "Einstellungen",
        description:
          "Über die Einstellungen können unter anderem Ladepräferenzen, Wallbox-Leistung, Photovoltaikanlage und Fahrzeugdaten konfiguriert werden.",
      },
    ],

    demo: "https://ecocharge.free.nf",
    documentation:
      "https://showroom-bcs.digisus-lab.ch/ecocharge-smartes-laden-fur-dein-elektroauto/",
  },

  orderly: {
    title: "Orderly",
    subtitle: "Digital Restaurant Ordering",
    type: "RESTAURANT · PWA",

    summary:
      "Ein digitales Bestellsystem für das Restaurant Saagi Steffisburg. Gäste können über einen QR-Code am Tisch Bestellungen aufgeben, während Mitarbeitende diese über eine separate Oberfläche verwalten.",

    tags: ["PHP", "MySQL", "PWA", "QR-Code"],

    description:
      "Orderly ist ein digitales Bestellsystem für das Restaurant Saagi Steffisburg. Gäste können über einen QR-Code am Tisch die Speisekarte öffnen und ihre Bestellung direkt über das Smartphone aufgeben.",

    goal: "Das Ziel war es, den Bestellprozess im Restaurant zu digitalisieren und gleichzeitig eine einfache Verwaltung der Bestellungen für das Personal zu ermöglichen.",

    role: "Ich entwickelte die Webapplikation inklusive Kundenbereich und Mitarbeiteroberfläche sowie die Logik für Tische, Kunden-Sitzungen und Bestellungen.",

    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "HTML",
      "CSS",
      "PWA",
      "QR-Code",
    ],

    features: [
      "Digitale Speisekarte",
      "Bestellung über QR-Code",
      "Kunden-Tischzuordnung",
      "Mitarbeiter-Login",
      "Bestellverwaltung",
      "Bestellstatus",
      "Tischverwaltung",
      "Kunden-Sitzungen",
    ],

    challenges: [
      "Zuordnung von Kunden zu Tischen",
      "Verwaltung verschiedener Bestellstatus",
      "Synchronisation zwischen Kunden- und Mitarbeiterbereich",
      "Entwicklung einer mobilen Benutzeroberfläche",
      "Einfache Bedienung für Gäste und Restaurantpersonal",
    ],

    thumbnail: new URL("../assets/orderly/thumbnail.png", import.meta.url).href,

    screenshots: [
      {
        image: new URL("../assets/orderly/orderly_menu.png", import.meta.url)
          .href,
        title: "Digitale Speisekarte",
        description:
          "Die digitale Speisekarte zeigt das aktuelle Angebot des Restaurants übersichtlich an. Gäste können die verschiedenen Gerichte auswählen, anpassen und direkt über die Webapplikation eine Bestellung aufgeben.",
      },
      {
        image: new URL("../assets/orderly/orderly_orders.png", import.meta.url)
          .href,
        title: "Bestellmonitor",
        description:
          "Auf dem Bestellmonitor werden die eingegangenen Bestellungen in Echtzeit angezeigt. Mitarbeitende können dadurch schnell erkennen, welche Bestellungen neu eingegangen sind und bearbeitet werden müssen.",
      },
      {
        image: new URL("../assets/orderly/orderly_kitchen.png", import.meta.url)
          .href,
        title: "Mitarbeiterbereich",
        description:
          "Die Mitarbeiteroberfläche ermöglicht die Verwaltung der Bestellungen. Der aktuelle Status einer Bestellung kann angepasst werden, sodass jederzeit ersichtlich ist, welche Bestellungen noch offen, in Bearbeitung oder bereits abgeschlossen sind.",
      },
    ],

    demo: "https://saagi.free.nf/orderly",
  },
};

/** Alle Projekte als Liste (mit id), in der Reihenfolge der Karten */

export const projectList = Object.entries(projects).map(([id, project]) => ({
  id,
  ...project,
}));
