import { useEffect, useState } from "react";
import type { GitHubRepo } from "../types/github";

const PORTFOLIO_TOPIC = "portfolio";
const CACHE_KEY_PREFIX = "github_cache_";

export function ProjectsAdmin() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingRepo, setSavingRepo] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "Digit9") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const close = () => {
    setOpen(false);
    setPassword("");
    setRepos(null);
    setError("");

    if (changed) {
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith(CACHE_KEY_PREFIX))
        .forEach((key) => sessionStorage.removeItem(key));
      window.location.reload();
    }
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/github?admin=1", {
        headers: { "x-admin-password": password },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Неправильний пароль"
            : "Не вдалося завантажити проєкти"
        );
      }

      const data = (await response.json()) as { repos: GitHubRepo[] };
      setRepos(data.repos);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Сталася помилка"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleRepo = async (repo: GitHubRepo) => {
    const visible = !repo.topics?.includes(PORTFOLIO_TOPIC);
    setSavingRepo(repo.name);
    setError("");

    try {
      const response = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ repoName: repo.name, visible }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося зберегти зміну");
      }

      setRepos((current) =>
        current?.map((item) =>
          item.id === repo.id
            ? {
                ...item,
                topics: visible
                  ? [...(item.topics ?? []), PORTFOLIO_TOPIC]
                  : (item.topics ?? []).filter(
                      (topic) => topic !== PORTFOLIO_TOPIC
                    ),
              }
            : item
        ) ?? null
      );
      setChanged(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Сталася помилка"
      );
    } finally {
      setSavingRepo(null);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Керування проєктами"
    >
      <div className="glass max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-semibold">Проєкти портфоліо</h2>
            <p className="mt-1 text-sm text-gray-400">
              Познач проєкти, які бачитимуть відвідувачі
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        {!repos ? (
          <form onSubmit={login} className="space-y-4 p-5">
            <label className="block">
              <span className="mb-2 block text-sm text-gray-300">
                Пароль адміністратора
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoFocus
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500 disabled:opacity-50"
            >
              {loading ? "Завантаження..." : "Увійти"}
            </button>
          </form>
        ) : (
          <div className="max-h-[65vh] overflow-y-auto p-3">
            {error && <p className="m-2 text-sm text-red-400">{error}</p>}
            {repos.map((repo) => {
              const checked = repo.topics?.includes(PORTFOLIO_TOPIC) ?? false;
              return (
                <label
                  key={repo.id}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl p-3 hover:bg-white/5"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{repo.name}</span>
                    <span className="block truncate text-sm text-gray-500">
                      {repo.description || "Без опису"}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={savingRepo === repo.name}
                    onChange={() => toggleRepo(repo)}
                    className="h-5 w-5 shrink-0 accent-violet-600"
                  />
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
