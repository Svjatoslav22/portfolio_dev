import { useEffect, useState } from "react";
import type { GitHubRepo, GitHubUser } from "../types/github";
import { GITHUB_USERNAME } from "../constants/contact";
import { fetchGitHubRepos, fetchGitHubUser } from "../utils/githubApi";

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

        const user = await fetchGitHubUser<GitHubUser>(GITHUB_USERNAME);
        const repos = await fetchGitHubRepos<GitHubRepo[]>(GITHUB_USERNAME);
        const filteredRepos = repos.filter((repo) => !repo.fork);

        if (!cancelled) {
          setData({ user, repos: filteredRepos });
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
