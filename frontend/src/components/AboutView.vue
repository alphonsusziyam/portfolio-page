<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

import { useBernWeather } from "../composables/useBernWeather";
import { useGithubProfile } from "../composables/useGithubProfile";

/* =========================================
   KONFIGURATION
========================================= */

const GITHUB_USER = "alphonsusziyam";
const LINKEDIN_URL = "https://ch.linkedin.com/in/ziyam-alphonsus-a45b39205";
const IT_START = new Date(2020, 7, 1); // August 2020

const portrait = new URL("../assets/ziyam.jpg", import.meta.url).href;

/* =========================================
   LIVE-DATEN (APIs)
   - Open-Meteo: Wetter in Bern
   - GitHub REST API: Profil & Repositories
========================================= */

const { time, weather, status: weatherStatus } = useBernWeather();

const {
  user: githubUser,
  repos,
  languages,
  status: githubStatus,
} = useGithubProfile(GITHUB_USER);

const relativeTime = new Intl.RelativeTimeFormat("de-CH", { numeric: "auto" });

function timeAgo(iso: string): string {
  const diffSeconds = (new Date(iso).getTime() - Date.now()) / 1000;

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31557600],
    ["month", 2629800],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeTime.format(Math.round(diffSeconds / seconds), unit);
    }
  }

  return "gerade eben";
}

const yearsInIt = computed(() =>
  Math.floor((Date.now() - IT_START.getTime()) / (365.25 * 24 * 3600 * 1000)),
);

const latestRepos = computed(() => repos.value.slice(0, 4));

const lastActivity = computed(() => {
  const latest = repos.value[0];

  return latest ? timeAgo(latest.pushed_at) : "–";
});

/* =========================================
   WERDEGANG
========================================= */

type TimelineKind = "ausbildung" | "erfahrung";

interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  period: string;
  title: string;
  place: string;
  current?: boolean;
  points?: string[];
}

const timeline: TimelineEntry[] = [
  {
    id: "bsc",
    kind: "ausbildung",
    period: "2024 – heute",
    title: "BSc Digital Business & AI",
    place: "Berner Fachhochschule · Bern",
    current: true,
  },
  {
    id: "bm",
    kind: "ausbildung",
    period: "2023 – 2024",
    title: "Berufsmaturität",
    place: "gibb Berufsfachschule Bern",
  },
  {
    id: "efz",
    kind: "ausbildung",
    period: "2020 – 2024",
    title: "Informatiker EFZ",
    place: "Fachrichtung Betriebsinformatik · Technische Fachschule Bern",
  },
  {
    id: "lehre",
    kind: "erfahrung",
    period: "2020 – 2023",
    title: "Informatiker Lehrling",
    place: "Technische Fachschule Bern · Bern",
    points: [
      "Programmierung von Webanwendungen mit HTML, CSS und JavaScript",
      "Analyse und Verbesserung von IT-Infrastrukturen",
      "Projektmanagement von IT-Projekten",
      "Datenbankdesign und -management mit SQL",
      "Dokumentation und Schulung von Mitarbeitenden zu neuen IT-Lösungen",
    ],
  },
];

type TimelineFilter = "alle" | TimelineKind;

const filters: { id: TimelineFilter; label: string }[] = [
  { id: "alle", label: "Alles" },
  { id: "ausbildung", label: "Ausbildung" },
  { id: "erfahrung", label: "Erfahrung" },
];

const activeFilter = ref<TimelineFilter>("alle");

const visibleTimeline = computed(() =>
  activeFilter.value === "alle"
    ? timeline
    : timeline.filter((entry) => entry.kind === activeFilter.value),
);

/* =========================================
   SCHWERPUNKTE & SPRACHEN
========================================= */

const focusAreas = [
  {
    title: "Programmierung",
    text: "Entwicklung und Umsetzung von IT-Lösungen",
  },
  {
    title: "Datenbanken",
    text: "Datenbankdesign und Management mit SQL",
  },
  {
    title: "Systemtechnik",
    text: "Systemadministration und IT-Infrastruktur",
  },
  {
    title: "Projektmanagement",
    text: "Planung und Umsetzung von IT-Projekten",
  },
  {
    title: "Problembehebung",
    text: "Analyse und Lösung technischer Probleme",
  },
  {
    title: "Teamarbeit",
    text: "Kommunikation und Zusammenarbeit im Team",
  },
];

const spokenLanguages = [
  { name: "Deutsch", label: "Fortgeschritten", level: 4 },
  { name: "Englisch", label: "Fortgeschritten · Cambridge B2", level: 4 },
  { name: "Französisch", label: "Gute Kenntnisse", level: 3 },
  { name: "Tamilisch", label: "Muttersprache", level: 5 },
];
</script>

<template>
  <main class="page">
    <!-- HERO -->
    <section class="about-hero">
      <div class="container about-hero-grid">
        <div class="about-hero-text">
          <p class="section-label">ÜBER MICH</p>

          <h1>Hi, ich bin <span>Ziyam.</span></h1>

          <p class="about-lead">
            Informatiker EFZ mit Fachrichtung Betriebsinformatik. Ich verbinde
            Softwareentwicklung mit Systemadministration und IT-Infrastruktur
            und setze IT-Lösungen von der Idee bis zur Umsetzung um.
          </p>

          <p class="about-lead">
            Neben dem Studium in Digital Business &amp; AI arbeite ich an
            eigenen Projekten, von Webapplikationen bis zu kleinen
            Bestellsystemen.
          </p>

          <ul class="about-chips">
            <li>Informatiker EFZ</li>
            <li>BSc Digital Business &amp; AI</li>
            <li>Bern, Schweiz</li>
          </ul>

          <div class="hero-buttons">
            <RouterLink to="/#projects" class="button primary">
              Meine Projekte
            </RouterLink>

            <RouterLink to="/#contact" class="button secondary">
              Kontakt aufnehmen
            </RouterLink>
          </div>
        </div>

        <figure class="portrait">
          <div class="portrait-frame">
            <img
              :src="portrait"
              alt="Portrait von Ziyam Alphonsus"
              width="736"
              height="736"
            />
          </div>

          <!-- Live: Zeit & Wetter in Bern (Open-Meteo) -->
          <figcaption class="status-card">
            <span class="status-dot" aria-hidden="true"></span>

            <div>
              <p class="status-label">LOKALE ZEIT &amp; WETTER</p>

              <p class="status-place">Bern, Schweiz</p>

              <p class="status-meta">
                <span>{{ time }} Uhr</span>

                <template v-if="weather">
                  · {{ weather.temperature }}&nbsp;°C · {{ weather.label }}
                </template>

                <span
                  v-else-if="weatherStatus === 'loading'"
                  class="skeleton skeleton-inline"
                ></span>
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ZAHLEN -->
    <section class="about-stats" aria-label="Auf einen Blick">
      <div class="container">
        <dl class="stats-grid">
          <div>
            <dt>Jahre in der IT</dt>
            <dd>{{ yearsInIt }}</dd>
          </div>

          <div>
            <dt>Sprachen</dt>
            <dd>{{ spokenLanguages.length }}</dd>
          </div>

          <div>
            <dt>Öffentliche Repos</dt>
            <dd>{{ githubUser ? githubUser.public_repos : "–" }}</dd>
          </div>

          <div>
            <dt>Letzter Push</dt>
            <dd class="stat-small">{{ lastActivity }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- WERDEGANG -->
    <section class="about-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">01 / WERDEGANG</p>

          <h2>Von der Lehre ins Studium.</h2>
        </div>

        <div
          class="timeline-filter"
          role="group"
          aria-label="Werdegang filtern"
        >
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            class="filter-chip"
            :aria-pressed="activeFilter === filter.id"
            @click="activeFilter = filter.id"
          >
            {{ filter.label }}
          </button>
        </div>

        <ol class="timeline">
          <li
            v-for="entry in visibleTimeline"
            :key="entry.id"
            class="timeline-item"
            :class="{ current: entry.current }"
          >
            <div class="timeline-meta">
              <span class="timeline-date">{{ entry.period }}</span>

              <span class="timeline-kind">
                {{ entry.kind === "ausbildung" ? "AUSBILDUNG" : "ERFAHRUNG" }}
              </span>
            </div>

            <h3>{{ entry.title }}</h3>

            <p class="timeline-place">{{ entry.place }}</p>

            <ul v-if="entry.points" class="timeline-points">
              <li v-for="point in entry.points" :key="point">
                {{ point }}
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </section>

    <!-- SCHWERPUNKTE -->
    <section class="about-section about-section-alt">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">02 / SCHWERPUNKTE</p>

          <h2>Wo ich mich zuhause fühle.</h2>
        </div>

        <div class="about-cards">
          <article
            v-for="(area, index) in focusAreas"
            :key="area.title"
            class="about-card"
          >
            <span class="about-card-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <h3>{{ area.title }}</h3>

            <p>{{ area.text }}</p>
          </article>
        </div>

        <p class="about-more">
          Die detaillierte Übersicht mit Skill-Profil findest du unter
          <RouterLink to="/skills">Skills →</RouterLink>
        </p>
      </div>
    </section>

    <!-- LIVE: GITHUB -->
    <section class="about-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">03 / LIVE</p>

          <h2>Aktuell auf GitHub.</h2>
        </div>

        <article class="panel gh-card" :aria-busy="githubStatus === 'loading'">
          <header class="gh-head">
            <img
              v-if="githubUser"
              :src="githubUser.avatar_url"
              alt=""
              class="gh-avatar"
              width="56"
              height="56"
              loading="lazy"
            />

            <span v-else class="gh-avatar skeleton"></span>

            <div class="gh-who">
              <h3>{{ githubUser?.name ?? GITHUB_USER }}</h3>

              <a
                :href="
                  githubUser?.html_url ?? `https://github.com/${GITHUB_USER}`
                "
                target="_blank"
                rel="noopener noreferrer"
              >
                @{{ githubUser?.login ?? GITHUB_USER }} ↗
              </a>
            </div>

            <dl v-if="githubUser" class="gh-numbers">
              <div>
                <dt>Repos</dt>
                <dd>{{ githubUser.public_repos }}</dd>
              </div>

              <div>
                <dt>Follower</dt>
                <dd>{{ githubUser.followers }}</dd>
              </div>
            </dl>
          </header>

          <p v-if="githubUser?.bio" class="gh-bio">{{ githubUser.bio }}</p>

          <!-- Sprachen -->
          <template v-if="languages.length">
            <div class="lang-bar" role="img" aria-label="Sprachanteile">
              <span
                v-for="language in languages"
                :key="language.name"
                :style="{ width: language.share + '%' }"
                :title="`${language.name} ${language.percent}%`"
              ></span>
            </div>

            <ul class="lang-legend">
              <li v-for="language in languages" :key="language.name">
                {{ language.name }}
                <span>{{ language.percent }}%</span>
              </li>
            </ul>
          </template>

          <!-- Repositories -->
          <ul v-if="githubStatus === 'loading'" class="repo-list">
            <li v-for="n in 4" :key="n" class="repo-card skeleton"></li>
          </ul>

          <ul v-else-if="latestRepos.length" class="repo-list">
            <li v-for="repo in latestRepos" :key="repo.id">
              <a
                :href="repo.html_url"
                class="repo-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="repo-name">{{ repo.name }}</span>

                <span class="repo-description">
                  {{ repo.description ?? "Keine Beschreibung" }}
                </span>

                <span class="repo-meta">
                  <span v-if="repo.language">{{ repo.language }}</span>

                  <span v-if="repo.stargazers_count">
                    ★ {{ repo.stargazers_count }}
                  </span>

                  <span>{{ timeAgo(repo.pushed_at) }}</span>
                </span>
              </a>
            </li>
          </ul>

          <p v-else class="gh-empty">
            <template v-if="githubStatus === 'error'">
              GitHub ist gerade nicht erreichbar.
            </template>

            <template v-else>
              Noch keine öffentlichen Repositories. Meine Arbeiten findest du
              unter Projekte.
            </template>
          </p>
        </article>
      </div>
    </section>

    <!-- SPRACHEN & INFOS -->
    <section class="about-section about-section-alt">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">04 / KURZ &amp; KNAPP</p>

          <h2>Sprachen und mehr.</h2>
        </div>

        <div class="about-panels">
          <article class="panel">
            <h3 class="panel-label">SPRACHEN</h3>

            <ul class="language-rows">
              <li v-for="language in spokenLanguages" :key="language.name">
                <div>
                  <strong>{{ language.name }}</strong>
                  <span>{{ language.label }}</span>
                </div>

                <span
                  class="level-meter"
                  role="img"
                  :aria-label="`${language.level} von 5`"
                >
                  <span
                    v-for="n in 5"
                    :key="n"
                    :class="{ on: n <= language.level }"
                  ></span>
                </span>
              </li>
            </ul>
          </article>

          <article class="panel">
            <h3 class="panel-label">WEITERE INFOS</h3>

            <dl class="info-rows">
              <div>
                <dt>Führerschein</dt>
                <dd>Klasse B</dd>
              </div>

              <div>
                <dt>Ausbildung</dt>
                <dd>Informatiker EFZ · Berufsmaturität</dd>
              </div>

              <div>
                <dt>Studium</dt>
                <dd>BSc Digital Business &amp; AI</dd>
              </div>

              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a
                    :href="LINKEDIN_URL"
                    class="panel-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ziyam-alphonsus ↗
                  </a>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>

    <!-- KONTAKT -->
    <section class="section contact">
      <div class="contact-box">
        <p class="eyebrow">KONTAKT</p>

        <h2>Neugierig <span>geworden?</span></h2>

        <p>Schau dir meine Projekte an oder schreib mir direkt.</p>

        <div class="hero-buttons">
          <RouterLink to="/#contact" class="button primary">
            Kontakt aufnehmen
          </RouterLink>

          <RouterLink to="/#projects" class="button secondary">
            Projekte ansehen
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
