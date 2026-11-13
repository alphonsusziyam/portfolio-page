/**
 * Fragen und Antworten für den Chat-Assistenten (ChatWidget.vue).
 *
 * So pflegst du die Fragen:
 * - question: so erscheint sie als Vorschlag-Knopf
 * - answer:   die Antwort
 * - keywords: Wörter und kurze Wortgruppen, bei denen die Antwort passt
 *             (Gross-/Kleinschreibung, Umlaute und Mehrzahl sind egal)
 * - links:    optionale Knöpfe unter der Antwort (to = Seite der App, href = extern)
 *
 * Reihenfolge = Reihenfolge der Vorschläge. Bei gleich guten Treffern
 * gewinnt der weiter oben stehende Eintrag.
 */

export interface FaqLink {
  label: string;
  /** Seite innerhalb der App, z. B. "/about" oder "/#contact" */
  to?: string;
  /** Externe Adresse */
  href?: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  links?: FaqLink[];
}

const LINKEDIN_URL = "https://ch.linkedin.com/in/ziyam-alphonsus-a45b39205";

export const GREETING =
  "Hallo! Ich beantworte häufige Fragen zu Ziyams Ausbildung, Skills und Projekten. Wähle eine Frage aus oder tippe deine eigene.";

export const FALLBACK: { text: string; links: FaqLink[] } = {
  text: "Dazu habe ich leider keine passende Antwort. Probier eine der Fragen unten, oder schreib Ziyam direkt.",
  links: [{ label: "Zum Kontakt", to: "/#contact" }],
};

export const faq: FaqEntry[] = [
  {
    id: "who",
    question: "Wer bist du?",
    answer:
      "Ich bin Ziyam Alphonsus, Informatiker EFZ mit Fachrichtung Betriebsinformatik. Neben dem Studium in Digital Business & AI setze ich IT-Lösungen von der Idee bis zur Umsetzung um.",
    keywords: [
      "wer bist du",
      "vorstellen",
      "vorstellung",
      "ziyam",
      "person",
      "ueber dich",
      "ueber mich",
    ],
    links: [{ label: "Über mich", to: "/about" }],
  },
  {
    id: "focus",
    question: "Was machst du genau?",
    answer:
      "Ich entwickle digitale Lösungen und Webanwendungen und beschäftige mich gleichzeitig mit Systemadministration, IT-Infrastrukturen und der technischen Umsetzung von IT-Projekten.",
    keywords: [
      "was machst du",
      "machst",
      "schwerpunkt",
      "spezialisiert",
      "taetigkeit",
      "beruf",
      "arbeitest",
      "beschaeftigst",
    ],
  },
  {
    id: "education",
    question: "Welche Ausbildung hast du?",
    answer:
      "Ich habe die Lehre als Informatiker EFZ (Fachrichtung Betriebsinformatik) an der Technischen Fachschule Bern gemacht, parallel die Berufsmaturität an der gibb Berufsfachschule Bern. Seit 2024 studiere ich BSc Digital Business & AI an der Berner Fachhochschule.",
    keywords: [
      "ausbildung",
      "lehre",
      "studium",
      "studierst",
      "studiert",
      "abschluss",
      "abschluesse",
      "bildung",
      "efz",
      "berufsmatura",
      "berufsmaturitaet",
      "maturitaet",
      "bfh",
      "fachhochschule",
      "schule",
      "gelernt",
    ],
    links: [{ label: "Werdegang ansehen", to: "/about" }],
  },
  {
    id: "skills",
    question: "Welche Technologien beherrschst du?",
    answer:
      "Mein Schwerpunkt ist die Webentwicklung mit HTML, CSS, JavaScript/TypeScript, Vue.js, PHP und SQL. Dazu kommen Git, Python und Systemtechnik (Windows, Ubuntu, macOS/iOS, PowerShell, Bash).",
    keywords: [
      "skills",
      "skill",
      "technologien",
      "technologie",
      "kenntnisse",
      "faehigkeiten",
      "programmiersprachen",
      "programmieren",
      "stack",
      "tools",
      "vue",
      "typescript",
      "javascript",
      "php",
      "python",
      "sql",
      "git",
      "html",
      "css",
      "kannst",
    ],
    links: [{ label: "Alle Skills", to: "/skills" }],
  },
  {
    id: "projects",
    question: "Welche Projekte hast du umgesetzt?",
    answer:
      "Drei Projekte stehen im Portfolio: Looply (Secondhand-Plattform mit Vue und Strapi), EcoCharge (Ladeplanung für Elektroautos) und Orderly (digitales Bestellsystem für ein Restaurant). Frag mich gern nach einem davon.",
    keywords: [
      "projekte",
      "projekt",
      "portfolio",
      "arbeiten",
      "gemacht",
      "umgesetzt",
      "referenzen",
      "beispiele",
    ],
    links: [{ label: "Zu den Projekten", to: "/#projects" }],
  },
  {
    id: "looply",
    question: "Was ist Looply?",
    answer:
      "Looply ist eine moderne Secondhand-Plattform, auf der Benutzer Produkte suchen, verkaufen und kaufen können (Vue, TypeScript, Strapi, SQLite, Stripe). Dazu gehören unter anderem Warenkorb, Wishlist, Chat, Bestellungen, Bewertungen und ein Verkäufer-Dashboard.",
    keywords: [
      "looply",
      "secondhand",
      "marktplatz",
      "strapi",
      "stripe",
      "verkaufen",
      "wishlist",
    ],
    links: [{ label: "Looply ansehen", to: "/projects/looply" }],
  },
  {
    id: "ecocharge",
    question: "Was ist EcoCharge?",
    answer:
      "EcoCharge ist eine Webapplikation (PWA) für Elektroauto-Besitzer. Sie berechnet anhand von Ladepräferenzen, Strompreisen, Fahrzeugdaten (Smartcar) und Solarenergie den optimalen Ladezeitpunkt. Technik: PHP, MySQL, Open-Meteo, EKZ API.",
    keywords: [
      "ecocharge",
      "elektroauto",
      "elektrofahrzeug",
      "laden",
      "ladezeit",
      "ladezeitpunkt",
      "solar",
      "smartcar",
      "photovoltaik",
      "strompreis",
    ],
    links: [{ label: "EcoCharge ansehen", to: "/projects/ecocharge" }],
  },
  {
    id: "orderly",
    question: "Was ist Orderly?",
    answer:
      "Orderly ist ein digitales Bestellsystem für das Restaurant Saagi Steffisburg: Gäste bestellen per QR-Code am Tisch über das Smartphone, das Personal verwaltet die Bestellungen in einer separaten Oberfläche. Technik: PHP, MySQL, JavaScript, PWA.",
    keywords: [
      "orderly",
      "restaurant",
      "saagi",
      "bestellsystem",
      "qr",
      "qr code",
      "bestellung",
      "speisekarte",
    ],
    links: [{ label: "Orderly ansehen", to: "/projects/orderly" }],
  },
  {
    id: "languages",
    question: "Welche Sprachen sprichst du?",
    answer:
      "Deutsch (fortgeschritten), Englisch (fortgeschritten, Cambridge B2), Französisch (gute Kenntnisse) und Tamilisch (Muttersprache).",
    keywords: [
      "sprachen",
      "sprache",
      "sprichst",
      "englisch",
      "franzoesisch",
      "deutsch",
      "tamil",
      "tamilisch",
      "cambridge",
    ],
  },
  {
    id: "certificates",
    question: "Hast du Zertifikate?",
    answer:
      "Ja, meine Abschlüsse und Zertifikate (zum Beispiel Informatiker EFZ, Berufsmaturität und Cambridge English B2) sind auf der Qualifikationen-Seite gesammelt.",
    keywords: [
      "zertifikat",
      "zertifikate",
      "qualifikation",
      "qualifikationen",
      "diplom",
      "nachweis",
      "nachweise",
    ],
  },
  {
    id: "contact",
    question: "Wie kann ich dich kontaktieren?",
    answer:
      "Am einfachsten über den Kontaktbereich auf der Startseite oder über LinkedIn. Ich freue mich auf deine Nachricht.",
    keywords: [
      "kontakt",
      "kontaktieren",
      "erreichen",
      "email",
      "mail",
      "schreiben",
      "nachricht",
      "linkedin",
      "zusammenarbeit",
      "zusammenarbeiten",
      "anfrage",
      "melden",
    ],
    links: [
      { label: "Zum Kontakt", to: "/#contact" },
      { label: "LinkedIn", href: LINKEDIN_URL },
    ],
  },
  {
    id: "site",
    question: "Wie ist diese Seite gebaut?",
    answer:
      "Die Seite ist mit Vue 3, TypeScript und Vite gebaut, läuft als PWA und wird über GitHub Pages ausgeliefert. Es gibt einen Hell-/Dunkelmodus, und auf «Über mich» laden Live-Daten von GitHub und Open-Meteo.",
    keywords: [
      "gebaut",
      "website",
      "webseite",
      "hosting",
      "github pages",
      "wie wurde",
      "technik dahinter",
      "diese seite",
    ],
  },
  {
    id: "pwa",
    question: "Kann ich die Seite als App installieren?",
    answer:
      "Ja. In Chrome und Edge über «App installieren» im Footer oder das Browsermenü, auf dem iPhone über Teilen → «Zum Home-Bildschirm». Bereits besuchte Seiten funktionieren auch offline.",
    keywords: [
      "installieren",
      "installation",
      "app",
      "offline",
      "pwa",
      "homescreen",
      "home bildschirm",
    ],
  },
];
