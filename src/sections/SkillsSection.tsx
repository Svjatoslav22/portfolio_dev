import type { GitHubRepo } from "../types/github";
import { calculateLanguageStats } from "../utils/languages";
import { TechnologyOrbit } from "../components/TechnologyOrbit";

interface SkillsSectionProps {
  repos: GitHubRepo[];
}

export function SkillsSection({ repos }: SkillsSectionProps) {
  const languageStats = calculateLanguageStats(repos);

  return (
    <section id="skills" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent-500">
            My Arsenal
          </h2>
          <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
            Technologies &amp; Tools
          </h3>
        </div>

        <div className="auto-rows-[200px] grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="glass group col-span-1 flex flex-col justify-between rounded-3xl p-8 transition-colors duration-300 hover:bg-white/5 md:col-span-2 md:row-span-2 lg:col-span-2">
            <div>
              <i className="fas fa-laptop-code mb-4 text-3xl text-accent-400"></i>
              <h4 className="mb-2 text-2xl font-bold transition-all group-hover:text-gradient">
                Frontend Development
              </h4>
              <p className="font-light text-gray-400">
                Building responsive, accessible, and performant user interfaces.
              </p>
            </div>
            <div className="flex items-center justify-center py-4">
              <TechnologyOrbit />
            </div>
          </div>

          <div className="glass group col-span-1 row-span-1 rounded-3xl p-8 transition-colors duration-300 hover:bg-white/5 md:col-span-1 lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="mb-2 text-xl font-bold">Backend Architecture</h4>
                <p className="text-sm font-light text-gray-400">
                  Scalable APIs and database management.
                </p>
              </div>
              <i className="fas fa-server text-2xl text-blue-400 opacity-50 transition-opacity group-hover:opacity-100"></i>
            </div>
            <div className="mt-6 flex gap-4 text-2xl text-gray-500">
              <i className="fab fa-node-js transition-colors hover:text-green-500"></i>
              <i className="fas fa-leaf transition-colors hover:text-green-600"></i>
              <i className="fas fa-database transition-colors hover:text-white"></i>
            </div>
          </div>

          <div className="glass group col-span-1 row-span-1 flex flex-col items-center justify-center rounded-3xl p-6 text-center transition-colors duration-300 hover:bg-white/5">
            <i className="fab fa-figma mb-3 text-4xl text-pink-400"></i>
            <h4 className="font-bold">UI/UX Design</h4>
            <span className="mt-1 font-mono text-xs text-gray-500">
              Figma / Responsive Design
            </span>
          </div>

          <div className="glass group relative col-span-1 row-span-1 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-accent-600/20 p-6 text-center">
            <div className="bg-grid absolute inset-0 opacity-20"></div>
            <i className="fas fa-cloud mb-3 text-4xl text-white group-hover:animate-pulse"></i>
            <h4 className="relative z-10 font-bold">Cloud & Deployment</h4>
            <span className="relative z-10 mt-1 font-mono text-xs text-gray-400">
              Vercel / Docker / GitHub
            </span>
          </div>

          <div className="glass col-span-1 flex items-center justify-between rounded-3xl p-8 md:col-span-3 lg:col-span-4">
            <div>
              <h4 className="mb-1 text-lg font-bold">Workflow &amp; Tools</h4>
              <p className="text-sm text-gray-400">
                The daily drivers that keep me productive.
              </p>
            </div>
            <div className="flex gap-4 text-xl text-gray-500 sm:gap-8 sm:text-2xl">
              <i
                className="fas fa-paper-plane transition-colors hover:text-orange-500"
                title="Postman"
              ></i>
              <i
                className="fas fa-code transition-colors hover:text-blue-500"
                title="VS Code"
              ></i>
              <i
                className="fab fa-docker transition-colors hover:text-blue-500"
                title="Docker"
              ></i>
              <i
                className="fab fa-github transition-colors hover:text-white"
                title="GitHub Desktop"
              ></i>
            </div>
          </div>
        </div>

        {languageStats.length > 0 && (
          <div className="mt-16">
            <h4 className="mb-6 text-xl font-bold">Language distribution</h4>
            <ul className="space-y-5">
              {languageStats.map((stat) => (
                <li key={stat.language}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-gray-300">{stat.language}</span>
                    <span className="text-gray-500">{stat.percentage}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}
