import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_USERNAME = "Svjatoslav22";
const PORTFOLIO_TOPIC = "portfolio";

async function fetchGitHub<T>(url: string, token?: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

function isAdmin(password: string | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(password && expected && password === expected);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const token = process.env.GITHUB_TOKEN;

    if (req.method === "POST") {
      const password = req.headers["x-admin-password"];
      if (!isAdmin(typeof password === "string" ? password : undefined)) {
        return res.status(401).json({ success: false, error: "Invalid password" });
      }

      if (!token) {
        return res
          .status(500)
          .json({ success: false, error: "GITHUB_TOKEN is not configured" });
      }

      const { repoName, visible } = req.body as {
        repoName?: string;
        visible?: boolean;
      };

      if (!repoName || typeof visible !== "boolean") {
        return res.status(400).json({ success: false, error: "Invalid request" });
      }

      const topicsUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(repoName)}/topics`;
      const current = await fetchGitHub<{ names: string[] }>(topicsUrl, token);
      const topics = new Set(current.names);

      if (visible) topics.add(PORTFOLIO_TOPIC);
      else topics.delete(PORTFOLIO_TOPIC);

      const response = await fetch(topicsUrl, {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: [...topics] }),
      });

      if (!response.ok) {
        throw new Error(
          `GitHub topics error: ${response.status} ${response.statusText}`
        );
      }

      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ success: true });
    }

    const password = req.headers["x-admin-password"];
    const adminRequest =
      req.query.admin === "1" &&
      isAdmin(typeof password === "string" ? password : undefined);

    if (req.query.admin === "1" && !adminRequest) {
      return res.status(401).json({ success: false, error: "Invalid password" });
    }

    const userUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    const [user, repos] = await Promise.all([
      fetchGitHub(userUrl, token),
      fetchGitHub<Array<{ topics?: string[] }>>(reposUrl, token),
    ]);

    const visibleRepos = adminRequest
      ? repos
      : repos.filter((repo) => repo.topics?.includes(PORTFOLIO_TOPIC));

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ user, repos: visibleRepos });
  } catch (error) {
    console.error("github api error:", error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch GitHub data",
    });
  }
}
