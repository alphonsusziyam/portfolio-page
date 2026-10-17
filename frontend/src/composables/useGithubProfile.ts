import { computed, onMounted, ref } from "vue";

import { getJson, readCache, writeCache } from "./http";
import type { LoadStatus } from "./http";

/**
 * Öffentliches GitHub-Profil und Repositories.
 * API: GitHub REST (https://docs.github.com/rest) – ohne Token 60 Anfragen/Stunde
 * pro IP, deshalb 10 Minuten Cache in der sessionStorage.
 */

export interface GithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

export interface LanguageShare {
  name: string;
  count: number;
  /** Anteil in Prozent als Zahl für die Balkenbreite */
  share: number;
  /** gerundeter Prozentwert für die Anzeige */
  percent: number;
}

interface GithubPayload {
  user: GithubUser;
  repos: GithubRepo[];
}

interface RawRepo extends GithubRepo {
  fork: boolean;
}

const CACHE_MS = 10 * 60 * 1000;

export function useGithubProfile(username: string) {
  const user = ref<GithubUser | null>(null);
  const repos = ref<GithubRepo[]>([]);
  const status = ref<LoadStatus>("loading");

  /* Sprachen nach Anzahl Repositories (Top 5) */

  const languages = computed<LanguageShare[]>(() => {
    const counts = new Map<string, number>();

    for (const repo of repos.value) {
      if (repo.language) {
        counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
      }
    }

    let total = 0;

    counts.forEach((count) => {
      total += count;
    });

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        share: (count / total) * 100,
        percent: Math.round((count / total) * 100),
      }));
  });

  function apply(payload: GithubPayload) {
    user.value = payload.user;
    repos.value = payload.repos;
    status.value = "ready";
  }

  onMounted(async () => {
    const cacheKey = `github:${username}`;
    const cached = readCache<GithubPayload>(cacheKey, CACHE_MS);

    if (cached) {
      apply(cached);

      return;
    }

    const headers = { Accept: "application/vnd.github+json" };

    try {
      const [profile, list] = await Promise.all([
        getJson<GithubUser>(
          `https://api.github.com/users/${username}`,
          headers,
        ),
        getJson<RawRepo[]>(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
          headers,
        ),
      ]);

      /* Forks ausblenden und nur benötigte Felder behalten (kleiner Cache) */

      const payload: GithubPayload = {
        user: profile,
        repos: list
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            pushed_at: repo.pushed_at,
          })),
      };

      apply(payload);
      writeCache(cacheKey, payload);
    } catch {
      status.value = "error";
    }
  });

  return { user, repos, languages, status };
}
