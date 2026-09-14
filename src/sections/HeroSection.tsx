import { useRef } from "react";
import type { GitHubUser } from "../types/github";
import {
  DISPLAY_NAME,
  LINKEDIN_URL,
  TELEGRAM_URL,
  CV_URL,
} from "../constants/contact";

import { useTypingEffect } from "../hooks/useTypingEffect";

interface HeroSectionProps {
  user: GitHubUser;
}

export function HeroSection({ user }: HeroSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const displayName = user.name ?? user.login;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.5s ease";
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  function handleMouseEnter() {
    const card = cardRef.current;
    if (card) card.style.transition = "none";
  }

  const subtitle =
    user.bio ??
    "A creative Full-Stack Developer bridging the gap between design and engineering to build engaging digital experiences.";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="z-10 space-y-8">
          <div className="glass inline-block rounded-full border border-accent-500/30 px-4 py-1.5 font-mono text-xs text-accent-500">
            <span className="relative mr-2 inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500"></span>
            </span>
            Available for work
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
            Hi, I&apos;m <br />
            <span className="text-gradient">{displayName}</span>
          </h1>

          <p className="max-w-lg text-lg font-light text-gray-400 md:text-xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-gray-200"
            >
              View Work
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-8 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>

          <div className="flex gap-6 pt-8 text-xl text-gray-500">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="Telegram"
            >
              <i className="fab fa-telegram"></i>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="CV"
            >
              <i className="fas fa-file-pdf"></i>
            </a>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="card-3d-wrap hidden h-[500px] items-center justify-center md:flex"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <div
            ref={cardRef}
            className="card-3d animate-float relative h-full w-full max-w-md"
          >
            <div className="absolute inset-0 rotate-6 transform rounded-3xl border border-white/10 bg-gradient-to-tr from-accent-600/20 to-blue-600/20 backdrop-blur-sm"></div>
            <div className="absolute inset-0 -rotate-3 transform rounded-3xl border border-white/10 bg-gradient-to-bl from-pink-600/20 to-accent-600/20 backdrop-blur-md"></div>

            <div className="glass absolute inset-4 flex flex-col items-center justify-center space-y-6 overflow-hidden rounded-2xl p-8">
              <div className="w-full rounded-lg border border-white/5 bg-darker/80 p-4 text-left font-mono text-xs shadow-2xl">
                <div className="mb-3 flex gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <p>
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-blue-400">developer</span> = {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-green-400">name</span>:{" "}
                  <span className="text-yellow-300">
                    &apos;{DISPLAY_NAME}&apos;
                  </span>
                  ,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">role</span>:{" "}
                  <span className="text-yellow-300">
                    &apos;Full-Stack&apos;
                  </span>
                  ,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">passions</span>: [
                  <span className="text-yellow-300">
                    {useTypingEffect([
                      "React",
                      "Next.js",
                      "Node.js",
                      "TypeScript",
                      "MongoDB",
                    ])}
                  </span>
                  ]
                </p>

                <p>{"}"};</p>
                <p className="mt-2 text-gray-500">
                  developer.createMagic();
                  <span className="animate-pulse">_</span>
                </p>
              </div>

              <div className="flex gap-4">
                <div className="-translate-y-4 transform rounded-xl border border-white/10 bg-white/5 p-3 text-2xl text-blue-400 shadow-lg backdrop-blur-md">
                  <i className="fab fa-react"></i>
                </div>
                <div className="translate-y-2 transform rounded-xl border border-white/10 bg-white/5 p-3 text-2xl text-yellow-400 shadow-lg backdrop-blur-md">
                  <i className="fab fa-js"></i>
                </div>
                <div className="-translate-y-2 transform rounded-xl border border-white/10 bg-white/5 p-3 text-2xl text-teal-400 shadow-lg backdrop-blur-md">
                  <i className="fab fa-node-js"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500">
        <span className="font-mono text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
    </section>
  );
}
