const CACHE_PREFIX = "github_cache_";
const CACHE_TTL_MS = 30 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
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

async function fetchWithDelay<T>(url: string, delayMs = 300): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const headers = {
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchGitHubUser<T>(username: string): Promise<T> {
  const cacheKey = `user_${username}`;
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const data = await fetchWithDelay<T>(`https://api.github.com/users/${username}`);
  setCache(cacheKey, data);
  return data;
}

export async function fetchGitHubRepos<T>(username: string): Promise<T> {
  const cacheKey = `repos_${username}`;
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const data = await fetchWithDelay<T>(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    500
  );
  setCache(cacheKey, data);
  return data;
}
