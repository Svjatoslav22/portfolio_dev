import { useState, type FormEvent } from "react";
import {
  CV_URL,
  DISPLAY_NAME,
  EMAIL,
  GITHUB_USERNAME,
  LINKEDIN_URL,
  TELEGRAM_URL,
} from "../constants/contact";

type FormStatus = "idle" | "sending" | "success" | "error";

function openMailtoFallback(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  );
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const year = new Date().getFullYear();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.status === 404) {
        openMailtoFallback(name, email, message);
        setFormStatus("idle");
        return;
      }

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (response.ok && data.success) {
        setFormStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      setFormStatus("error");
    } catch {
      setFormStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-2.5 text-white transition placeholder:text-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20";

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/10 blur-3xl"></div>

      <div className="glass mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-16">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-accent-500">
          What&apos;s Next?
        </h2>
        <h3 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Let&apos;s work together.
        </h3>
        <p className="mx-auto mb-10 max-w-xl text-lg font-light text-gray-400">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-lg space-y-4 text-left"
        >
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={formStatus === "sending"}
            className={inputClass}
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={formStatus === "sending"}
            className={inputClass}
          />
          <textarea
            required
            rows={4}
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={formStatus === "sending"}
            className={`${inputClass} resize-none`}
          />

          {formStatus === "success" && (
            <p className="text-sm text-green-400">Message sent successfully!</p>
          )}
          {formStatus === "error" && (
            <p className="text-sm text-red-400">
              Failed to send. Please try again later.
            </p>
          )}

          <button
            type="submit"
            disabled={formStatus === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] disabled:opacity-70"
          >
            {formStatus === "sending" ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Sending...
              </>
            ) : (
              <>
                Say Hello <i className="fas fa-paper-plane ml-2"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-sm text-gray-500">
            Designed &amp; Built by {DISPLAY_NAME} &copy; {year}
          </p>
          <div className="flex gap-6 text-gray-500">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              <i className="fab fa-telegram"></i>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              <i className="fab fa-linkedin"></i>
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
      </div>
    </section>
  );
}
