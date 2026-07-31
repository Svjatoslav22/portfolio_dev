const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#22c55e",
  HTML: "#f97316",
  CSS: "#6366f1",
  Java: "#ef4444",
  Go: "#06b6d4",
  Rust: "#f97316",
  Ruby: "#dc2626",
  PHP: "#8b5cf6",
  C: "#64748b",
  "C++": "#64748b",
  "C#": "#8b5cf6",
  Shell: "#84cc16",
  Vue: "#22c55e",
  Swift: "#f97316",
  Kotlin: "#a855f7",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#9ca3af";
  return LANGUAGE_COLORS[language] ?? "#9ca3af";
}

const LANGUAGE_GRADIENTS: Record<string, string> = {
  TypeScript: "linear-gradient(to right, #3b82f6, #60a5fa)",
  JavaScript: "linear-gradient(to right, #ca8a04, #eab308)",
  Python: "linear-gradient(to right, #16a34a, #22c55e)",
  HTML: "linear-gradient(to right, #ea580c, #f97316)",
  CSS: "linear-gradient(to right, #4f46e5, #6366f1)",
  Java: "linear-gradient(to right, #dc2626, #ef4444)",
  Go: "linear-gradient(to right, #0891b2, #06b6d4)",
  Rust: "linear-gradient(to right, #c2410c, #f97316)",
  Ruby: "linear-gradient(to right, #b91c1c, #dc2626)",
  PHP: "linear-gradient(to right, #7c3aed, #8b5cf6)",
  Vue: "linear-gradient(to right, #16a34a, #22c55e)",
  Swift: "linear-gradient(to right, #ea580c, #f97316)",
  Kotlin: "linear-gradient(to right, #9333ea, #a855f7)",
};

export function getLanguageGradient(language: string): string {
  return (
    LANGUAGE_GRADIENTS[language] ??
    "linear-gradient(to right, #6b7280, #9ca3af)"
  );
}

export const TECH_BRAND_SHADOW: Record<string, string> = {
  React: "hover:shadow-blue-200/60",
  TypeScript: "hover:shadow-blue-300/60",
  "Next.js": "hover:shadow-gray-300/60",
  "Node.js": "hover:shadow-green-200/60",
  NestJS: "hover:shadow-red-200/60",
  MongoDB: "hover:shadow-green-300/60",
  Docker: "hover:shadow-sky-200/60",
  "Tailwind CSS": "hover:shadow-cyan-200/60",
};

const DEVICON_SLUGS: Record<string, string> = {
  TypeScript: "typescript/typescript-original",
  JavaScript: "javascript/javascript-original",
  Python: "python/python-original",
  HTML: "html5/html5-original",
  CSS: "css3/css3-original",
  Java: "java/java-original",
  Go: "go/go-original",
  Rust: "rust/rust-plain",
  Ruby: "ruby/ruby-original",
  PHP: "php/php-original",
  "C++": "cplusplus/cplusplus-original",
  "C#": "csharp/csharp-original",
  Shell: "bash/bash-original",
  Vue: "vuejs/vuejs-original",
  Swift: "swift/swift-original",
  Kotlin: "kotlin/kotlin-original",
  React: "react/react-original",
  "Next.js": "nextjs/nextjs-original",
  "Node.js": "nodejs/nodejs-original",
  NestJS: "nestjs/nestjs-plain",
  MongoDB: "mongodb/mongodb-original",
  Docker: "docker/docker-original",
  "Tailwind CSS": "tailwindcss/tailwindcss-original",
};

export function getDeviconUrl(name: string): string {
  const slug = DEVICON_SLUGS[name] ?? "devicon/devicon-original";
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export function calculateLanguageStats(
  repos: { language: string | null }[]
): LanguageStat[] {
  const counts: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];

  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "оновлено сьогодні";
  if (diffDays === 1) return "оновлено 1 день тому";
  if (diffDays < 5) return `оновлено ${diffDays} дні тому`;
  if (diffDays < 30) return `оновлено ${diffDays} днів тому`;

  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const TECHNOLOGIES = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "NestJS",
  "MongoDB",
  "Docker",
  "Tailwind CSS",
] as const;
