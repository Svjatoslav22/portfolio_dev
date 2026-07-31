import type { GitHubRepo } from "../types/github";
import {
  getLanguageTagClass,
  getProjectImageUrl,
} from "../utils/projectImages";

interface ProjectCardProps {
  repo: GitHubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  const linkUrl = repo.homepage || repo.html_url;
  const showGradientOverlay = index % 3 === 2;

  return (
    <div className="glass group relative overflow-hidden rounded-3xl">
      <div className="relative aspect-video overflow-hidden">
        {showGradientOverlay && (
          <div className="absolute inset-0 z-10 mix-blend-overlay bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
        )}
        <img
          src={getProjectImageUrl(repo, index)}
          alt={repo.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 bg-black/40 transition-colors duration-500 group-hover:bg-transparent"></div>
      </div>

      <div className="relative z-30 p-8">
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-8 top-0 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent-600 opacity-0 shadow-lg shadow-accent-600/50 transition-all duration-300 group-hover:-translate-y-1/2 group-hover:opacity-100"
          aria-label={`Open ${repo.name}`}
        >
          <i className="fas fa-external-link-alt text-white"></i>
        </a>

        <h4 className="mb-2 text-2xl font-bold">{repo.name}</h4>
        <p className="mb-6 font-light text-gray-400">
          {repo.description ?? "No description provided."}
        </p>
        <div className="flex flex-wrap gap-2">
          {repo.language && (
            <span
              className={`rounded px-2 py-1 font-mono text-xs ${getLanguageTagClass(repo.language)}`}
            >
              {repo.language}
            </span>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
