import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-dark/80 backdrop-blur-md"
          : ""
      }`}
      id="navbar"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass flex items-center justify-between rounded-2xl px-6 py-3">
          <a
            href="#hero"
            className="glitch-hover text-xl font-bold tracking-tighter text-white"
          >
            <span className="text-accent-500">{"{"}</span>DEV
            <span className="text-accent-500">{"}"}</span>
          </a>

          <div className="hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none md:hidden"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass absolute left-0 top-full flex w-full flex-col space-y-4 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-mono text-gray-400 transition-colors hover:text-white"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
