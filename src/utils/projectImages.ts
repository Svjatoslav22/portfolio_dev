import type { GitHubRepo } from "../types/github";

const PROJECT_IMAGES = [
  { bg: "111", fg: "fff" },
  { bg: "222", fg: "8b5cf6" },
  { bg: "1a1a2e", fg: "e94560" },
];

export function getProjectImageUrl(repo: GitHubRepo, index: number): string {
  const { bg, fg } = PROJECT_IMAGES[index % PROJECT_IMAGES.length];
  return `https://placehold.co/800x600/${bg}/${fg}?text=${encodeURIComponent(repo.name)}`;
}

export function getLanguageTagClass(language: string): string {
  const map: Record<string, string> = {
    TypeScript: "text-blue-400 bg-blue-400/10",
    JavaScript: "text-yellow-400 bg-yellow-400/10",
    Python: "text-green-400 bg-green-400/10",
    Vue: "text-green-400 bg-green-400/10",
    HTML: "text-orange-400 bg-orange-400/10",
    CSS: "text-indigo-400 bg-indigo-400/10",
  };
  return map[language] ?? "text-accent-400 bg-accent-400/10";
}
