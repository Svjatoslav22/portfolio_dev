import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GITHUB_USERNAME } from "../src/constants/contact";

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    const userUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

    const [user, repos] = await Promise.all([
      fetchGitHub(userUrl, token),
      fetchGitHub(reposUrl, token),
    ]);

    return res.status(200).json({ user, repos });
  } catch (error) {
    console.error("github api error:", error);
    return res.status(502).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch GitHub data",
    });
  }
}
