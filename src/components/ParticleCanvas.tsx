import { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx!.fillStyle = `rgba(139, 92, 246, ${this.baseAlpha})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const particles: Particle[] = [];

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.update();
        p.draw();
      }

      ctx!.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx!.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const onResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
