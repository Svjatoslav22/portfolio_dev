import { useEffect, useState } from "react";
import type { GitHubRepo, GitHubUser } from "../types/github";
import { fetchGithubData } from "../utils/githubApi";

interface GithubData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

interface UseGithubDataResult {
  data: GithubData | null;
  loading: boolean;
  error: string | null;
}

export function useGithubData(): UseGithubDataResult {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const { user, repos } = await fetchGithubData();

        if (!cancelled) {
          setData({ user, repos });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Невідома помилка");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
