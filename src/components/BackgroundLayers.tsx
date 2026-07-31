import { ParticleCanvas } from "./ParticleCanvas";

export function BackgroundLayers() {
  return (
    <>
      <ParticleCanvas />
      <div
        className="bg-grid fixed inset-0 -z-20 h-screen w-full bg-darker"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-[15] overflow-hidden opacity-40"
        aria-hidden="true"
      >
        <div className="animate-blob absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600 opacity-30 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 animate-blob absolute right-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-600 opacity-30 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-4000 animate-blob absolute bottom-[-20%] left-[20%] h-96 w-96 rounded-full bg-pink-600 opacity-30 mix-blend-multiply blur-3xl filter" />
      </div>
    </>
  );
}
