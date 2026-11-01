<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { qualifications } from "../data/qualifications";

const searchQuery = ref("");
const selectedCategory = ref("all");
const sortBy = ref("newest");
const currentPage = ref(1);
const itemsPerPage = 6;

const selectedCertificate = ref<string | null>(null);
const selectedCertificateTitle = ref("");

const categories = [
  { value: "all", label: "Alle Kategorien" },
  { value: "education", label: "Ausbildung" },
  { value: "professional", label: "Berufliche Zertifikate" },
  { value: "language", label: "Sprachen" },
  { value: "other", label: "Sonstiges" },
];

const filteredQualifications = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  const result = qualifications.filter((item) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;

    const searchableText = [
      item.title,
      item.issuer,
      item.level,
      item.description,
      ...item.skills,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });

  return [...result].sort((a, b) => {
    if (sortBy.value === "alphabetical") {
      return a.title.localeCompare(b.title, "de");
    }

    if (sortBy.value === "oldest") {
      return (a.date ?? "9999").localeCompare(b.date ?? "9999");
    }

    return (b.date ?? "").localeCompare(a.date ?? "");
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredQualifications.value.length / itemsPerPage)),
);

const paginatedQualifications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredQualifications.value.slice(start, start + itemsPerPage);
});

const startItem = computed(() =>
  filteredQualifications.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage + 1,
);

const endItem = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage,
    filteredQualifications.value.length,
  ),
);

watch([searchQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1;
});

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = pages;
  }
});

function formatDate(date: string | null) {
  if (!date) return "Datum nicht angegeben";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("de-CH", {
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function categoryLabel(category: string) {
  return categories.find((item) => item.value === category)?.label ?? category;
}

function verificationLabel(status: string) {
  const labels: Record<string, string> = {
    verified: "Verifiziert",
    "document-provided": "Dokument vorhanden",
    unverified: "Nicht verifiziert",
  };

  return labels[status] ?? status;
}

function resetFilters() {
  searchQuery.value = "";
  selectedCategory.value = "all";
  sortBy.value = "newest";
  currentPage.value = 1;
}

function openCertificate(url: string, title: string) {
  selectedCertificate.value = url;
  selectedCertificateTitle.value = title;
}

function closeCertificate() {
  selectedCertificate.value = null;
  selectedCertificateTitle.value = "";
}
</script>

<template>
  <main class="qualifications-page">
    <section class="qualifications-header">
      <p class="eyebrow">
        <span class="eyebrow-line"></span>
        QUALIFIKATIONEN
      </p>

      <h1>Meine <span>Zertifikate.</span></h1>

      <p class="page-description">
        Meine Bildungsabschlüsse, Zertifikate und Weiterbildungen auf einen
        Blick.
      </p>
    </section>

    <section class="qualifications-content">
      <div class="toolbar">
        <div class="search-field">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            class="search-icon"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            v-model="searchQuery"
            type="search"
            placeholder="Zertifikate, Aussteller oder Skills suchen..."
            aria-label="Zertifikate durchsuchen"
          />

          <button
            v-if="searchQuery"
            type="button"
            class="clear-search"
            aria-label="Suche löschen"
            @click="searchQuery = ''"
          >
            &times;
          </button>
        </div>

        <div class="toolbar-controls">
          <label class="select-wrapper">
            <span class="sr-only">Kategorie filtern</span>
            <select v-model="selectedCategory">
              <option
                v-for="category in categories"
                :key="category.value"
                :value="category.value"
              >
                {{ category.label }}
              </option>
            </select>
            <span class="select-chevron">⌄</span>
          </label>

          <label class="select-wrapper sort-select">
            <span class="sr-only">Sortierung</span>
            <select v-model="sortBy">
              <option value="newest">Neueste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
              <option value="alphabetical">Alphabetisch</option>
            </select>
            <span class="select-chevron">⌄</span>
          </label>
        </div>
      </div>

      <div class="results-info">
        <span>
          <strong>{{ filteredQualifications.length }}</strong>
          {{ filteredQualifications.length === 1 ? "Ergebnis" : "Ergebnisse" }}
        </span>

        <button
          v-if="
            searchQuery || selectedCategory !== 'all' || sortBy !== 'newest'
          "
          type="button"
          class="reset-button"
          @click="resetFilters"
        >
          Filter zurücksetzen
        </button>
      </div>

      <div v-if="paginatedQualifications.length" class="qualification-grid">
        <article
          v-for="item in paginatedQualifications"
          :key="item.id"
          class="qualification-card"
        >
          <div class="card-top">
            <div class="issuer-logo">
              <img
                v-if="item.logoUrl"
                :src="item.logoUrl"
                :alt="`${item.issuer} Logo`"
                loading="lazy"
                @error="
                  ($event.target as HTMLImageElement).style.display = 'none'
                "
              />
              <span v-else>{{ item.issuer?.charAt(0) || "Q" }}</span>
            </div>

            <span class="category-badge">
              {{ categoryLabel(item.category) }}
            </span>
          </div>

          <div class="card-body">
            <p class="issuer-name">{{ item.issuer }}</p>

            <h2>{{ item.title }}</h2>

            <p v-if="item.level" class="qualification-level">
              {{ item.level }}
            </p>

            <p class="qualification-description">
              {{ item.description }}
            </p>

            <div v-if="item.skills?.length" class="skills-list">
              <span v-for="skill in item.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <div class="date-info">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
              </svg>
              <span>{{ formatDate(item.date) }}</span>
            </div>

            <span
              class="verification-status"
              :class="`status-${item.verificationStatus}`"
            >
              <span class="status-dot"></span>
              {{ verificationLabel(item.verificationStatus) }}
            </span>
          </div>

          <div
            v-if="
              item.grade ||
              item.credentialId ||
              item.certificateUrl ||
              item.verificationUrl ||
              item.officialUrl ||
              item.imageUrl
            "
            class="card-details"
          >
            <p v-if="item.grade" class="grade">
              <span>Note / Ergebnis</span>
              <strong>{{ item.grade }}</strong>
            </p>

            <p v-if="item.credentialId" class="credential-id">
              <span>Zertifikatsnummer</span>
              <strong>{{ item.credentialId }}</strong>
            </p>

            <div class="card-links">
              <button
                v-if="item.imageUrl"
                type="button"
                class="card-link certificate-button"
                @click="openCertificate(item.imageUrl, item.title)"
              >
                Zertifikat ansehen
                <span aria-hidden="true">↗</span>
              </button>

              <a
                v-if="item.certificateUrl"
                :href="item.certificateUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="card-link"
              >
                Dokument öffnen
                <span aria-hidden="true">↗</span>
              </a>

              <a
                v-if="item.verificationUrl"
                :href="item.verificationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="card-link"
              >
                Verifizieren
                <span aria-hidden="true">↗</span>
              </a>

              <a
                v-if="item.officialUrl"
                :href="item.officialUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="card-link secondary-link"
              >
                Offizielle Website
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4M8 11h6" />
          </svg>
        </div>

        <h2>Keine Zertifikate gefunden</h2>
        <p>Passe deinen Suchbegriff oder die ausgewählten Filter an.</p>

        <button type="button" class="reset-empty-button" @click="resetFilters">
          Filter zurücksetzen
        </button>
      </div>

      <nav
        v-if="filteredQualifications.length > itemsPerPage"
        class="pagination"
        aria-label="Seitennavigation"
      >
        <p class="pagination-summary">
          {{ startItem }}–{{ endItem }} von
          {{ filteredQualifications.length }}
        </p>

        <div class="pagination-controls">
          <button
            type="button"
            class="page-arrow"
            :disabled="currentPage === 1"
            aria-label="Vorherige Seite"
            @click="currentPage--"
          >
            ‹
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="page-number"
            :class="{ active: currentPage === page }"
            :aria-current="currentPage === page ? 'page' : undefined"
            :aria-label="`Seite ${page}`"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button
            type="button"
            class="page-arrow"
            :disabled="currentPage === totalPages"
            aria-label="Nächste Seite"
            @click="currentPage++"
          >
            ›
          </button>
        </div>
      </nav>
    </section>
  </main>

  <Teleport to="body">
    <div
      v-if="selectedCertificate"
      class="certificate-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="selectedCertificateTitle"
      @click.self="closeCertificate"
      @keydown.esc="closeCertificate"
    >
      <div class="certificate-modal-content">
        <div class="certificate-modal-header">
          <div>
            <p class="modal-eyebrow">ZERTIFIKAT</p>
            <h2>{{ selectedCertificateTitle }}</h2>
          </div>

          <button
            type="button"
            class="modal-close"
            aria-label="Zertifikat schliessen"
            @click="closeCertificate"
          >
            &times;
          </button>
        </div>

        <div class="certificate-image-container">
          <img
            :src="selectedCertificate"
            :alt="selectedCertificateTitle"
            class="certificate-preview"
          />
        </div>

        <div class="certificate-modal-footer">
          <a
            :href="selectedCertificate"
            target="_blank"
            rel="noopener noreferrer"
            class="modal-open-link"
          >
            In neuem Tab öffnen ↗
          </a>

          <button type="button" class="modal-done" @click="closeCertificate">
            Schliessen
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
