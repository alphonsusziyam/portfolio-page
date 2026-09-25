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
        image: "/projects/looply/home.png",
        title: "Startseite",
        description:
          "Die Startseite bietet einen Überblick über die Plattform und aktuelle Produkte. Über die Navigation können Benutzer direkt zur Produktsuche oder zu ihrem persönlichen Bereich wechseln.",
      },
      {
        image: "/projects/looply/product.png",
        title: "Produktübersicht",
        description:
          "Produkte können durchsucht und anhand verschiedener Kriterien gefiltert werden. Dadurch können Benutzer gezielt nach passenden Secondhand-Artikeln suchen.",
      },
      {
        image: "/projects/looply/dashboard.png",
        title: "Verkäufer-Dashboard",
        description:
          "Im Dashboard können Verkäufer ihre Produkte und Bestellungen verwalten und erhalten einen Überblick über ihre Aktivitäten.",
      },
    ],

    demo: "https://example.com",
    github: "https://gitlab.com/example",
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
        image: "/src/assets/ecocharge/ecocharge_home.png",
        title: "Ladeplan",
        description:
          "Der Ladeplan zeigt dem Benutzer den empfohlenen Ladezeitpunkt sowie alternative Möglichkeiten. Die Empfehlung basiert auf den hinterlegten Ladepräferenzen und verfügbaren Energiedaten.",
      },
      {
        image: "/src/assets/ecocharge/ecocharge_login.png",
        title: "Smartcar API Anbindung",
        description:
          "Über die Smartcar API ruft EcoCharge Fahrzeugdaten wie Akkustand und Batteriekapazität ab. Diese Daten werden für die Berechnung der benötigten Energiemenge und des optimalen Ladezeitpunkts verwendet.",
      },
      {
        image: "/src/assets/ecocharge/ecocharge_settings.png",
        title: "Einstellungen",
        description:
          "Über die Einstellungen können unter anderem Ladepräferenzen, Wallbox-Leistung, Photovoltaikanlage und Fahrzeugdaten konfiguriert werden.",
      },
    ],

    demo: "https://ecocharge.free.nf",
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
        image: "/src/assets/orderly/orderly_menu.png",
        title: "Digitale Speisekarte",
        description:
          "Die digitale Speisekarte zeigt das aktuelle Angebot des Restaurants übersichtlich an. Gäste können die verschiedenen Gerichte auswählen, anpassen und direkt über die Webapplikation eine Bestellung aufgeben.",
      },
      {
        image: "/src/assets/orderly/orderly_orders.png",
        title: "Bestellmonitor",
        description:
          "Auf dem Bestellmonitor werden die eingegangenen Bestellungen in Echtzeit angezeigt. Mitarbeitende können dadurch schnell erkennen, welche Bestellungen neu eingegangen sind und bearbeitet werden müssen.",
      },
      {
        image: "/src/assets/orderly/orderly_kitchen.png",
        title: "Mitarbeiterbereich",
        description:
          "Die Mitarbeiteroberfläche ermöglicht die Verwaltung der Bestellungen. Der aktuelle Status einer Bestellung kann angepasst werden, sodass jederzeit ersichtlich ist, welche Bestellungen noch offen, in Bearbeitung oder bereits abgeschlossen sind.",
      },
    ],

    demo: "https://saagi.free.nf/orderly",
  },
};

const project = computed(() => {
  return projects[route.params.slug as string];
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

<style scoped>
/* ========================================
   GENERAL
======================================== */

.project-page {
  background: var(--background);
  color: var(--text);
  min-height: 100vh;
}

.project-container {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
}

/* ========================================
   HERO
======================================== */

.project-hero {
  padding: 150px 0 100px;
  border-bottom: 1px solid var(--border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 80px;

  color: var(--text-muted);
  text-decoration: none;

  font-size: 14px;

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--accent);
}

.back-link span {
  font-size: 18px;
}

.project-hero-content {
  max-width: 850px;
}

.project-hero h1 {
  margin: 15px 0 10px;

  font-size: clamp(64px, 10vw, 130px);
  line-height: 0.9;
  letter-spacing: -5px;
}

.project-subtitle {
  margin: 25px 0 35px;

  color: var(--text-muted);

  font-size: clamp(22px, 3vw, 32px);
}

.project-intro {
  max-width: 700px;

  color: #b5b5b5;

  font-size: 18px;
  line-height: 1.8;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin-top: 35px;
}

.project-tags span,
.tags span {
  padding: 7px 12px;

  border: 1px solid var(--border);
  border-radius: 4px;

  color: var(--text-muted);

  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
}

/* ========================================
   SCREENSHOTS
======================================== */

.screenshots-section {
  padding: 120px 0;
}

.section-heading {
  margin-bottom: 60px;
}

.section-heading h2 {
  max-width: 700px;

  margin-top: 12px;

  font-size: clamp(36px, 5vw, 58px);
  line-height: 1.05;
  letter-spacing: -2px;
}

.screenshots {
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.screenshot-item {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.screenshot-image {
  width: 100%;

  overflow: hidden;

  border: 1px solid var(--border);
  border-radius: 10px;

  background: var(--surface);
}

.screenshot-image img {
  display: block;

  width: 100%;
  height: auto;

  transition: transform 0.5s ease;
}

.screenshot-image:hover img {
  transform: scale(1.015);
}

.screenshot-info {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;

  max-width: 800px;
}

.screenshot-number {
  color: var(--accent);

  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
}

.screenshot-info h3 {
  margin: 0 0 8px;

  font-size: 22px;
}

.screenshot-info p {
  margin: 0;

  color: var(--text-muted);

  line-height: 1.7;
}

/* ========================================
   PROJECT INFORMATION
======================================== */

.project-information {
  padding: 120px 0;

  background: var(--surface);

  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.information-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);
  gap: 100px;
}

.project-section {
  padding-bottom: 90px;
}

.project-section:last-child {
  padding-bottom: 0;
}

.project-section h2 {
  margin: 12px 0 25px;

  font-size: clamp(30px, 4vw, 48px);
  letter-spacing: -1.5px;
}

.project-section p:not(.eyebrow) {
  max-width: 700px;

  color: var(--text-muted);

  font-size: 17px;
  line-height: 1.8;
}

/* ========================================
   SIDEBAR
======================================== */

.information-sidebar {
  position: sticky;
  top: 100px;

  align-self: start;
}

.sidebar-block {
  padding: 25px 0;

  border-top: 1px solid var(--border);
}

.sidebar-block:last-child {
  border-bottom: 1px solid var(--border);
}

.sidebar-label {
  margin: 0 0 18px;

  color: var(--text-muted);

  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 1px;
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.technology-list span {
  color: var(--text);
  font-size: 14px;
}

.technology-list span:not(:last-child)::after {
  content: " ·";

  color: var(--accent);
}

.sidebar-text {
  margin: 0;

  color: var(--text);
  font-size: 14px;
}

/* ========================================
   FEATURES
======================================== */

.features-section {
  padding: 120px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
}

.feature-card {
  min-height: 160px;

  padding: 30px;

  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feature-number {
  color: var(--accent);

  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
}

.feature-card p {
  margin: 30px 0 0;

  font-size: 17px;
}

/* ========================================
   CHALLENGES
======================================== */

.challenges-section {
  padding: 120px 0;

  background: var(--surface);

  border-top: 1px solid var(--border);
}

.challenge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
}

.challenge-grid h2 {
  max-width: 450px;

  margin-top: 15px;

  font-size: clamp(34px, 5vw, 55px);
  line-height: 1.05;
  letter-spacing: -2px;
}

.challenge-list {
  border-top: 1px solid var(--border);
}

.challenge-item {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;

  padding: 25px 0;

  border-bottom: 1px solid var(--border);
}

.challenge-item span {
  color: var(--accent);

  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
}

.challenge-item p {
  margin: 0;

  color: var(--text-muted);

  line-height: 1.6;
}

/* ========================================
   PROJECT LINKS
======================================== */

.project-links-section {
  padding: 120px 0;
}

.project-links {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 40px;
}

.project-links h2 {
  margin: 12px 0 0;

  font-size: clamp(40px, 5vw, 65px);
  letter-spacing: -2px;
}

.links {
  display: flex;
  gap: 12px;
}

.project-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;

  padding: 14px 22px;

  border-radius: 5px;

  text-decoration: none;

  font-size: 14px;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.project-button.primary {
  background: var(--accent);
  color: #0a0a0a;
}

.project-button.primary:hover {
  background: var(--accent-dark);
}

.project-button.secondary {
  border: 1px solid var(--border);

  color: var(--text);
}

.project-button.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ========================================
   NEXT PROJECT
======================================== */

.next-project {
  border-top: 1px solid var(--border);
}

.next-project-link {
  min-height: 150px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--text);
  text-decoration: none;

  font-size: 14px;
}

.next-project-link strong {
  font-size: 20px;

  transition: color 0.2s ease;
}

.next-project-link:hover strong {
  color: var(--accent);
}

/* ========================================
   NOT FOUND
======================================== */

.project-not-found {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.project-not-found h1 {
  margin: 15px 0 30px;
}

.project-not-found a {
  color: var(--accent);
}

/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 800px) {
  .project-hero {
    padding: 120px 0 80px;
  }

  .project-hero h1 {
    letter-spacing: -3px;
  }

  .screenshots-section,
  .project-information,
  .features-section,
  .challenges-section,
  .project-links-section {
    padding: 80px 0;
  }

  .information-grid {
    grid-template-columns: 1fr;
    gap: 70px;
  }

  .information-sidebar {
    position: static;
  }

  .challenge-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .project-links {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .project-container {
    width: min(100% - 32px, 1200px);
  }

  .project-hero {
    padding-top: 105px;
  }

  .back-link {
    margin-bottom: 55px;
  }

  .project-hero h1 {
    font-size: 64px;
  }

  .project-intro {
    font-size: 16px;
  }

  .screenshots {
    gap: 65px;
  }

  .screenshot-info {
    grid-template-columns: 45px 1fr;
    gap: 10px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .links {
    width: 100%;
    flex-direction: column;
  }

  .project-button {
    justify-content: center;
  }
}
</style>
