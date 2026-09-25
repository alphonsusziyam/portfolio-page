<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="page">
    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <p class="hero-label">INFORMATIKER EFZ · BETRIEBSINFORMATIK</p>

          <h1>
            Softwareentwicklung<br />
            <span>& Systemtechnik</span>
          </h1>

          <p class="hero-text">
            Ich entwickle digitale Lösungen und beschäftige mich gleichzeitig
            mit Systemadministration, IT-Infrastrukturen und der technischen
            Umsetzung von IT-Projekten.
          </p>

          <div class="hero-buttons">
            <a href="/#projects" class="btn btn-primary"> Projekte ansehen </a>

            <RouterLink to="/about" class="btn btn-secondary">
              Über mich
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- WHAT I DO -->
      <section class="what-i-do">
        <div class="container">
          <div class="section-header">
            <p class="section-label">WAS ICH MACHE</p>
            <h2>Von der Idee bis zur Umsetzung.</h2>
          </div>

          <div class="focus-grid">
            <div class="focus-item">
              <span class="focus-number">01</span>

              <div>
                <h3>Softwareentwicklung</h3>

                <p>
                  Ich entwickle Webanwendungen und digitale Lösungen und
                  beschäftige mich dabei mit Programmierung, Datenbanken und der
                  technischen Umsetzung.
                </p>

                <div class="focus-tags">
                  <span>Webentwicklung</span>
                  <span>Programmierung</span>
                  <span>SQL</span>
                </div>
              </div>
            </div>

            <div class="focus-item">
              <span class="focus-number">02</span>

              <div>
                <h3>Systemtechnik</h3>

                <p>
                  Durch meine Ausbildung in Betriebsinformatik kenne ich auch
                  die technische Seite hinter Anwendungen: Systemadministration,
                  IT-Infrastrukturen und Problembehebung.
                </p>

                <div class="focus-tags">
                  <span>Systemadministration</span>
                  <span>IT-Infrastruktur</span>
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>

          <RouterLink to="/skills" class="project-link">
            Alle Skills ansehen →
          </RouterLink>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="section projects">
        <div class="section-heading">
          <p class="eyebrow">PROJEKTE</p>

          <h2>Projekte, an denen ich gearbeitet habe.</h2>
        </div>

        <div class="projects-grid">
          <!-- LOOPLY -->

          <RouterLink to="/projects/looply" class="project-card">
            <div class="project-image project-looply">
              <span>01</span>
            </div>

            <div class="project-content">
              <p class="project-type">FULL-STACK WEB APPLICATION</p>

              <h3>Looply</h3>

              <p>
                Eine moderne Secondhand-Plattform, auf der Benutzer Produkte
                suchen, verkaufen und kaufen können. Die Anwendung umfasst unter
                anderem Benutzerkonten, Warenkorb, Wishlist, Chat, Bestellungen
                und Bewertungen.
              </p>

              <div class="tags">
                <span>Vue</span>
                <span>TypeScript</span>
                <span>Strapi</span>
                <span>Stripe</span>
              </div>

              <span class="project-link"> Mehr Informationen </span>
            </div>
          </RouterLink>

          <!-- ECOCHARGE -->

          <RouterLink to="/projects/ecocharge" class="project-card">
            <div class="project-image project-ecocharge">
              <span>02</span>
            </div>

            <div class="project-content">
              <p class="project-type">PWA · SMART CHARGING</p>

              <h3>EcoCharge</h3>

              <p>
                Eine Webapplikation für Elektrofahrzeuge, die anhand von
                Ladepräferenzen, Strompreisen, Fahrzeugdaten und einer
                Photovoltaikanlage den optimalen Ladezeitpunkt berechnet.
              </p>

              <div class="tags">
                <span>PHP</span>
                <span>MySQL</span>
                <span>Smartcar</span>
                <span>Open-Meteo</span>
              </div>

              <span class="project-link"> Mehr Informationen </span>
            </div>
          </RouterLink>

          <!-- ORDERLY -->

          <RouterLink to="/projects/orderly" class="project-card">
            <div class="project-image project-orderly">
              <span>03</span>
            </div>

            <div class="project-content">
              <p class="project-type">RESTAURANT · PWA</p>

              <h3>Orderly</h3>

              <p>
                Ein digitales Bestellsystem für das Restaurant Saagi
                Steffisburg. Gäste können über einen QR-Code am Tisch
                Bestellungen aufgeben, während Mitarbeitende diese über eine
                separate Oberfläche verwalten.
              </p>

              <div class="tags">
                <span>PHP</span>
                <span>MySQL</span>
                <span>PWA</span>
                <span>QR-Code</span>
              </div>

              <span class="project-link"> Mehr Informationen </span>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="section contact">
        <div class="contact-box">
          <p class="eyebrow">KONTAKT</p>

          <h2>
            Lass uns etwas
            <span>entwickeln.</span>
          </h2>

          <p>
            Du möchtest mehr über mich oder meine Projekte erfahren? Ich freue
            mich auf deine Nachricht.
          </p>

          <a href="mailto:deine.email@example.com" class="button primary">
            E-Mail schreiben
          </a>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2026 Ziyam Alphonsus</p>
      <p>Built with Vue & TypeScript</p>
    </footer>
  </div>
</template>
