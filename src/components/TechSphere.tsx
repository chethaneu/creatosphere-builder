import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const TechSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles in sphere formation
    const createParticles = () => {
      const particles: Particle[] = [];
      const radius = 200;
      const particleCount = 800;

      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        particles.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }

      return particles;
    };

    particlesRef.current = createParticles();

    // Handle scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let rotation = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(13, 13, 13, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      rotation += 0.002 + scrollYRef.current * 0.00002;

      // Sort particles by z-index for depth
      particlesRef.current.sort((a, b) => b.z - a.z);

      particlesRef.current.forEach((particle) => {
        // Rotate particle
        const rotatedX =
          particle.baseX * Math.cos(rotation) -
          particle.baseZ * Math.sin(rotation);
        const rotatedZ =
          particle.baseX * Math.sin(rotation) +
          particle.baseZ * Math.cos(rotation);

        // Add floating effect
        particle.x = rotatedX + particle.vx;
        particle.z = rotatedZ;
        particle.y = particle.baseY + Math.sin(rotation * 2 + particle.baseY) * 5;

        // 3D projection
        const scale = 300 / (300 + particle.z);
        const x2d = particle.x * scale + centerX;
        const y2d = particle.y * scale + centerY;
        const size = particle.size * scale;

        // Color based on depth
        const hue = 220 + (particle.z / 400) * 45; // Blue to cyan gradient
        const saturation = 97;
        const lightness = 57 + (particle.z / 400) * 20;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${particle.alpha * scale})`;
        ctx.fill();

        // Add glow effect for closer particles
        if (particle.z > 0) {
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
          gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.3 * scale})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(64, 149, 255, 0.1)";
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i += 5) {
        const p1 = particlesRef.current[i];
        const scale1 = 300 / (300 + p1.z);
        const x1 = p1.x * scale1 + centerX;
        const y1 = p1.y * scale1 + centerY;

        for (let j = i + 1; j < Math.min(i + 10, particlesRef.current.length); j += 5) {
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 80) {
            const scale2 = 300 / (300 + p2.z);
            const x2 = p2.x * scale2 + centerX;
            const y2 = p2.y * scale2 + centerY;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default TechSphere;
