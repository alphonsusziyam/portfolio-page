export type VerificationStatus =
  | "verified"
  | "document-provided"
  | "unverified";

export interface Qualification {
  id: string;
  title: string;
  category: "education" | "language" | "professional" | "other";
  issuer: string;
  level: string;
  date: string | null;
  description: string;
  credentialId: string | null;
  certificateUrl: string | null;
  verificationUrl: string | null;
  officialUrl: string | null;
  verificationStatus: VerificationStatus;
  skills: string[];
  imageUrl: string | null;
  logoUrl: string | null;
  grade: string | null;
}

export const qualifications: Qualification[] = [
  {
    id: "cambridge-b1",
    title: "Cambridge English B1",
    category: "language",
    issuer: "Cambridge English",
    level: "B1",
    date: "06.01.2020",
    description:
      "Englischqualifikation auf dem Niveau B1 des Gemeinsamen Europäischen Referenzrahmens für Sprachen.",
    credentialId: null,
    certificateUrl: null,
    verificationUrl: null,
    officialUrl:
      "https://www.cambridgeenglish.org/educators-organisations/accept-verify-exams/employers/verify-results-online/",
    verificationStatus: "unverified",
    skills: ["Englisch", "Lesen", "Schreiben", "Hören", "Sprechen"],
    imageUrl: new URL(
      "../assets/qualifications/certificat/PET-Certificate.jpg",
      import.meta.url,
    ).href,
    logoUrl: new URL(
      "../assets/qualifications/logo/cambridge.png",
      import.meta.url,
    ).href,
    grade: "Grade A: Pass with Merit",
  },

  {
    id: "informatiker-efz",
    title: "Informatiker EFZ",
    category: "education",
    issuer: "Mittelschul- und Berufsbildungsamt des Kantons Bern",
    level: "EFZ",
    date: "07.01.2024",
    description:
      "Berufliche Grundbildung in der Informatik mit Schwerpunkt Betriebsinformatik.",
    credentialId: null,
    certificateUrl: null,
    verificationUrl: null,
    officialUrl: null,
    verificationStatus: "unverified",
    skills: ["Softwareentwicklung", "Systemtechnik", "IT-Support"],
    imageUrl: new URL(
      "../assets/qualifications/certificat/faehigkeitszeugnis.webp",
      import.meta.url,
    ).href,
    logoUrl: new URL(
      "../assets/qualifications/logo/switzerland.webp",
      import.meta.url,
    ).href,
    grade: "5.1 / 6",
  },
  {
    id: "berufsmaturitaet",
    title: "Berufsmaturitätszeugnis",
    category: "education",
    issuer: "Mittelschul- und Berufsbildungsamt des Kantons Bern",
    level: "Berufsmaturität",
    date: "07.04.2024",
    description:
      "Abschluss der Berufsmaturität als Ergänzung zur beruflichen Grundbildung.",
    credentialId: null,
    certificateUrl: null,
    verificationUrl: null,
    officialUrl: null,
    verificationStatus: "unverified",
    imageUrl: new URL(
      "../assets/qualifications/certificat/Berufsmaturitaetszeugnis.webp",
      import.meta.url,
    ).href,
    logoUrl: new URL(
      "../assets/qualifications/logo/switzerland.webp",
      import.meta.url,
    ).href,
    grade: "4.9 / 6",
    skills: [],
  },
  {
    id: "ireb-foundation-level",
    title: "IREB Certified Professional for Requirements Engineering",
    category: "professional",
    issuer: "Swiss Assosciation For Quality",
    level: "Foundation Level (CPRE-FL)",
    date: "01.29.2026",
    description:
      "Zertifizierung im Requirements Engineering mit Grundlagen der Anforderungsermittlung, Dokumentation, Validierung und Verwaltung von Anforderungen.",
    credentialId: null,
    certificateUrl: null,
    verificationUrl: null,
    officialUrl: "https://cpre.ireb.org/de/process/level-1",
    verificationStatus: "unverified",
    imageUrl: new URL(
      "../assets/qualifications/certificat/ireb.png",
      import.meta.url,
    ).href,
    logoUrl: new URL("../assets/qualifications/logo/IREB.webp", import.meta.url)
      .href,
    grade: "74.58% / 100%",
    skills: [
      "Requirements Engineering",
      "Anforderungsermittlung",
      "Anforderungsdokumentation",
      "Anforderungsvalidierung",
      "Anforderungsmanagement",
    ],
  },
];
