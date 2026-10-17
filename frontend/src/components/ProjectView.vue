<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

interface Screenshot {
  image: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  subtitle: string;
  type: string;
  description: string;
  goal: string;
  role: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  screenshots: Screenshot[];
  demo?: string;
  github?: string;
  documentation?: string;
}

const projects: Record<string, Project> = {
  looply: {
    title: "Looply",
    subtitle: "Online Secondhand Marketplace",
    type: "FULL-STACK WEB APPLICATION",

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

const project = computed(() => {
  return projects[route.params.id as string];
});
</script>

<template>
  <main v-if="project" class="project-page">
    <!-- ========================================
         HERO
    ========================================= -->

    <section class="project-hero">
      <div class="project-container">
        <RouterLink to="/#projects" class="back-link">
          <span>←</span>
          Zurück zu Projekten
        </RouterLink>

        <div class="project-hero-content">
          <p class="eyebrow">
            {{ project.type }}
          </p>

          <h1>
            {{ project.title }}
          </h1>

          <p class="project-subtitle">
            {{ project.subtitle }}
          </p>

          <p class="project-intro">
            {{ project.description }}
          </p>

          <div class="project-tags">
            <span v-for="technology in project.technologies" :key="technology">
              {{ technology }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         SCREENSHOTS
    ========================================= -->

    <section class="screenshots-section">
      <div class="project-container">
        <div class="section-heading">
          <p class="eyebrow">EINBLICKE</p>

          <h2>Die Anwendung im Einsatz.</h2>
        </div>

        <div class="screenshots">
          <article
            v-for="(screenshot, index) in project.screenshots"
            :key="screenshot.title"
            class="screenshot-item"
          >
            <div class="screenshot-image">
              <img
                :src="screenshot.image"
                :alt="`${project.title} – ${screenshot.title}`"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="screenshot-info">
              <span class="screenshot-number">
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <div>
                <h3>
                  {{ screenshot.title }}
                </h3>

                <p>
                  {{ screenshot.description }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================================
         PROJECT INFORMATION
    ========================================= -->

    <section class="project-information">
      <div class="project-container">
        <div class="information-grid">
          <!-- About -->

          <div class="information-main">
            <div class="project-section">
              <p class="eyebrow">01 / ÜBER DAS PROJEKT</p>

              <h2>Was ist {{ project.title }}?</h2>

              <p>
                {{ project.description }}
              </p>
            </div>

            <!-- Goal -->

            <div class="project-section">
              <p class="eyebrow">02 / PROBLEM & ZIEL</p>

              <h2>Die Idee dahinter.</h2>

              <p>
                {{ project.goal }}
              </p>
            </div>

            <!-- Role -->

            <div class="project-section">
              <p class="eyebrow">03 / MEINE AUFGABE</p>

              <h2>Mein Beitrag zum Projekt.</h2>

              <p>
                {{ project.role }}
              </p>
            </div>
          </div>

          <!-- Sidebar -->

          <aside class="information-sidebar">
            <div class="sidebar-block">
              <p class="sidebar-label">TECHNOLOGIEN</p>

              <div class="technology-list">
                <span
                  v-for="technology in project.technologies"
                  :key="technology"
                >
                  {{ technology }}
                </span>
              </div>
            </div>

            <div class="sidebar-block">
              <p class="sidebar-label">PROJEKT</p>

              <p class="sidebar-text">Webapplikation / PWA</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ========================================
         FEATURES
    ========================================= -->

    <section class="features-section">
      <div class="project-container">
        <div class="section-heading">
          <p class="eyebrow">FUNKTIONEN</p>

          <h2>Was die Anwendung kann.</h2>
        </div>

        <div class="features-grid">
          <div
            v-for="(feature, index) in project.features"
            :key="feature"
            class="feature-card"
          >
            <span class="feature-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <p>
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         CHALLENGES
    ========================================= -->

    <section class="challenges-section">
      <div class="project-container">
        <div class="challenge-grid">
          <div>
            <p class="eyebrow">HERAUSFORDERUNGEN</p>

            <h2>Was technisch anspruchsvoll war.</h2>
          </div>

          <div class="challenge-list">
            <div
              v-for="(challenge, index) in project.challenges"
              :key="challenge"
              class="challenge-item"
            >
              <span>
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <p>
                {{ challenge }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         LINKS
    ========================================= -->

    <section class="project-links-section">
      <div class="project-container">
        <div class="project-links">
          <div>
            <p class="eyebrow">PROJEKT</p>

            <h2>Mehr entdecken.</h2>
          </div>

          <div class="links">
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button primary"
            >
              Live Demo
              <span>↗</span>
            </a>

            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button secondary"
            >
              GitLab
              <span>↗</span>
            </a>
            <a
              v-if="project.documentation"
              :href="project.documentation"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button secondary"
            >
              Dokumentation
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         NEXT PROJECT
    ========================================= -->

    <section class="next-project">
      <div class="project-container">
        <RouterLink to="/#projects" class="next-project-link">
          <span> Zurück zu allen Projekten </span>

          <strong> Projekte → </strong>
        </RouterLink>
      </div>
    </section>
  </main>

  <!-- ========================================
       PROJECT NOT FOUND
  ======================================== -->

  <main v-else class="project-not-found">
    <p class="eyebrow">404</p>

    <h1>Projekt nicht gefunden.</h1>

    <RouterLink to="/"> Zurück zur Startseite </RouterLink>
  </main>
</template>
