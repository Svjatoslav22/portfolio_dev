import { GITHUB_USERNAME } from "../constants/contact";
import type { GitHubRepo, GitHubUser } from "../types/github";

const CACHE_PREFIX = "github_cache_";
const CACHE_TTL_MS = 30 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface GithubPortfolioData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // ignore storage errors
  }
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

async function fetchFromServer(): Promise<GithubPortfolioData | null> {
  try {
    const response = await fetch("/api/github");
    if (!response.ok) return null;
    return (await response.json()) as GithubPortfolioData;
  } catch {
    return null;
  }
}

async function fetchFromGitHubDirect(): Promise<GithubPortfolioData> {
  const [user, repos] = await Promise.all([
    fetchGitHubJson<GitHubUser>(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    ),
    fetchGitHubJson<GitHubRepo[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    ),
  ]);

  return { user, repos };
}

export async function fetchGithubData(): Promise<GithubPortfolioData> {
  const cacheKey = `portfolio_${GITHUB_USERNAME}`;
  const cached = getCached<GithubPortfolioData>(cacheKey);
  if (cached) return cached;

  const fromServer = await fetchFromServer();
  const data = fromServer ?? (await fetchFromGitHubDirect());

  setCache(cacheKey, data);
  return data;
}
