import type { GitHubUser } from "../types/github";
import { DISPLAY_NAME } from "../constants/contact";

interface AboutSectionProps {
  user: GitHubUser;
}

export function AboutSection({ user }: AboutSectionProps) {
  const bioParagraph =
    user.bio ??
    "I'm a self-taught developer who found a passion in the intersection of design and code.";

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div className="relative md:w-1/2">
            <div className="absolute inset-0 aspect-square rounded-full bg-gradient-to-tr from-accent-600/30 to-blue-600/30 blur-3xl"></div>
            <div className="glass relative rotate-2 transform rounded-2xl p-2 transition-transform duration-500 hover:rotate-0">
              <img
                src={user.avatar_url}
                alt={DISPLAY_NAME}
                className="w-full rounded-xl object-cover shadow-2xl grayscale transition-all duration-500 hover:grayscale-0"
              />

              <div className="glass animate-float absolute -bottom-6 -right-6 flex items-center gap-4 rounded-xl px-6 py-4">
                <div className="text-gradient text-4xl font-bold">5+</div>
                <div className="font-mono text-sm leading-tight">
                  Years of
                  <br />
                  Experience
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:w-1/2">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent-500">
              About Me
            </h2>
            <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
              Crafting digital experiences with purpose.
            </h3>
            <div className="space-y-4 text-lg font-light text-gray-400">
              <p>{bioParagraph}</p>
              <p>
                Currently specializing in modern JavaScript frameworks, performant
                backend architectures, and polished user interfaces. When I&apos;m
                not coding, I explore new tools and keep learning.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-white transition-colors hover:text-accent-400"
              >
                <i className="fab fa-github"></i>
                <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-accent-400">
                  View GitHub Profile
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
