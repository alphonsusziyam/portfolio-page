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

<style scoped>
.qualifications-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 32px 96px;
  color: var(--text);
}

.qualifications-header {
  margin-bottom: 44px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: var(--accent);
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.eyebrow-line {
  display: inline-block;
  width: 24px;
  height: 2px;
  background: var(--accent);
}

.qualifications-header h1 {
  margin: 0;
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 750;
  line-height: 1.12;
  letter-spacing: -0.045em;
}

.qualifications-header h1 span {
  color: var(--accent);
}

.page-description {
  max-width: 580px;
  margin: 18px 0 0;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.7;
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition: border-color 0.2s ease;
}

.search-field:focus-within {
  border-color: var(--accent);
}

.search-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  stroke: var(--text-muted);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.search-field input {
  width: 100%;
  min-width: 0;
  padding: 14px 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 14px;
}

.search-field input::placeholder {
  color: var(--text-muted);
  opacity: 0.8;
}

.clear-search {
  display: grid;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  font-size: 24px;
  cursor: pointer;
}

.clear-search:hover {
  color: var(--text);
  background: var(--border);
}

.toolbar-controls {
  display: flex;
  gap: 12px;
}

.select-wrapper {
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
}

.select-wrapper select {
  width: 100%;
  min-height: 46px;
  padding: 0 36px 0 14px;
  appearance: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.select-wrapper select:focus-visible {
  border-color: var(--accent);
}

.select-chevron {
  position: absolute;
  top: 50%;
  right: 14px;
  color: var(--text-muted);
  pointer-events: none;
  transform: translateY(-60%);
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 24px 0 18px;
  color: var(--text-muted);
  font-size: 13px;
}

.results-info strong {
  color: var(--text);
}

.reset-button {
  padding: 6px 0;
  border: 0;
  background: transparent;
  color: var(--accent);
  font: inherit;
  cursor: pointer;
}

.qualification-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.qualification-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.qualification-card:hover {
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  transform: translateY(-3px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 22px;
}

.issuer-logo {
  display: grid;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--background);
  color: var(--accent);
  font-size: 20px;
  font-weight: 700;
}

.issuer-logo img {
  width: 100%;
  height: 100%;
  padding: 5px;
  object-fit: contain;
}

.category-badge {
  max-width: 65%;
  padding: 6px 9px;
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.4;
  text-align: right;
}

.card-body {
  flex: 1;
}

.issuer-name {
  margin: 0 0 8px;
  color: var(--accent);
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
}

.card-body h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.qualification-level {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
}

.qualification-description {
  margin: 16px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}

.skill-tag {
  padding: 5px 9px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.date-info {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--text-muted);
  font-size: 11px;
}

.date-info svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.verification-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 11px;
}

.status-dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: currentColor;
}

.status-verified {
  color: var(--accent);
}

.status-document-provided {
  color: #d6a54d;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.grade,
.credential-id {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
}

.grade span,
.credential-id span {
  color: var(--text-muted);
  font-size: 11px;
}

.grade strong,
.credential-id strong {
  font-size: 13px;
  overflow-wrap: anywhere;
}

.card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-top: 4px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--accent);
  font-size: 12px;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.certificate-button {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

.secondary-link {
  color: var(--text-muted);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 20px;
  border: 1px dashed var(--border);
  border-radius: 16px;
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 16px;
  background: var(--surface);
  color: var(--text-muted);
}

.empty-icon svg {
  width: 26px;
  height: 26px;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

.empty-state h2 {
  margin: 20px 0 8px;
  font-size: 19px;
}

.empty-state p {
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.reset-empty-button {
  margin-top: 20px;
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.reset-empty-button:hover {
  border-color: var(--accent);
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}

.pagination-summary {
  margin: 0;
  color: var(--text-muted);
  font-size: 12px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-number,
.page-arrow {
  display: grid;
  min-width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface);
  color: var(--text-muted);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.page-number:hover,
.page-arrow:not(:disabled):hover {
  border-color: var(--accent);
  color: var(--text);
}

.page-number.active {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--background);
  font-weight: 700;
}

.page-arrow {
  font-size: 22px;
}

.page-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Zertifikat-Popup */

.certificate-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 78%);
  backdrop-filter: blur(8px);
}

.certificate-modal-content {
  display: flex;
  flex-direction: column;
  width: min(900px, 100%);
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--background);
  box-shadow: 0 24px 80px rgb(0 0 0 / 35%);
}

.certificate-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.certificate-modal-header h2 {
  margin: 4px 0 0;
  color: var(--text);
  font-size: 18px;
}

.modal-eyebrow {
  margin: 0;
  color: var(--accent);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
}

.modal-close {
  display: grid;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  font-size: 28px;
  cursor: pointer;
}

.modal-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.certificate-image-container {
  display: flex;
  justify-content: center;
  min-height: 0;
  padding: 24px;
  overflow: auto;
  background: rgb(0 0 0 / 12%);
}

.certificate-preview {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 62vh;
  object-fit: contain;
  border-radius: 4px;
}

.certificate-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid var(--border);
}

.modal-open-link {
  color: var(--accent);
  font-size: 13px;
  text-decoration: none;
}

.modal-open-link:hover {
  text-decoration: underline;
}

.modal-done {
  padding: 10px 16px;
  border: 1px solid var(--accent);
  border-radius: 9px;
  background: var(--accent);
  color: var(--background);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 900px) {
  .toolbar {
    flex-direction: row;
    align-items: center;
  }

  .search-field {
    flex: 1;
  }

  .toolbar-controls {
    flex-shrink: 0;
  }

  .select-wrapper {
    flex: initial;
    width: 190px;
  }

  .sort-select {
    width: 165px;
  }
}

@media (max-width: 700px) {
  .qualifications-page {
    padding: 36px 18px 64px;
  }

  .qualifications-header {
    margin-bottom: 30px;
  }

  .qualifications-header h1 {
    font-size: clamp(32px, 9vw, 44px);
  }

  .page-description {
    margin-top: 12px;
    font-size: 14px;
  }

  .toolbar-controls {
    flex-direction: column;
    gap: 10px;
  }

  .select-wrapper select {
    min-height: 48px;
  }

  .results-info {
    margin-top: 20px;
  }

  .qualification-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .qualification-card {
    padding: 19px;
    border-radius: 14px;
  }

  .card-top {
    margin-bottom: 18px;
  }

  .card-body h2 {
    font-size: 19px;
  }

  .qualification-description {
    font-size: 13px;
  }

  .card-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .pagination {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .pagination-controls {
    width: 100%;
    flex-wrap: wrap;
  }

  .page-number,
  .page-arrow {
    min-width: 40px;
    height: 40px;
  }

  .certificate-modal {
    padding: 12px;
  }

  .certificate-modal-content {
    max-height: 92vh;
    border-radius: 14px;
  }

  .certificate-modal-header {
    padding: 16px;
  }

  .certificate-modal-header h2 {
    font-size: 16px;
  }

  .certificate-image-container {
    padding: 12px;
  }

  .certificate-preview {
    max-height: 65vh;
  }

  .certificate-modal-footer {
    padding: 12px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qualification-card,
  .page-number,
  .page-arrow {
    transition: none;
  }

  .qualification-card:hover {
    transform: none;
  }
}
</style>
