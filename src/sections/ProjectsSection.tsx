import { useMemo, useState } from "react";
import type { GitHubRepo } from "../types/github";
import { GITHUB_USERNAME } from "../constants/contact";
import { ProjectCard } from "../components/ProjectCard";

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const repo of repos) {
      if (repo.language) set.add(repo.language);
    }
    return Array.from(set).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return repos;
    return repos.filter((repo) => repo.language === activeFilter);
  }, [repos, activeFilter]);

  const filterClass = (active: boolean) =>
    active
      ? "rounded-full bg-white px-4 py-2 text-sm text-gray-950"
      : "rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-400 transition hover:border-gray-500";

  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="space-y-4">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent-500">
              Selected Works
            </h2>
            <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
              Recent Projects
            </h3>
            <p className="text-gray-400">{repos.length} public repositories</p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="glass flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-accent-400"
              aria-hidden="true"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button
              type="button"
              className="glass flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-accent-400"
              aria-hidden="true"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            className={filterClass(activeFilter === "All")}
          >
            All
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveFilter(lang)}
              className={filterClass(activeFilter === lang)}
            >
              {lang}
            </button>
          ))}
        </div>

        {filteredRepos.length === 0 ? (
          <div className="glass rounded-3xl py-16 text-center text-gray-400">
            Nothing found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <span className="border-b border-gray-600 pb-0.5 font-mono text-sm uppercase tracking-widest transition-colors group-hover:border-white">
              View Archive
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
