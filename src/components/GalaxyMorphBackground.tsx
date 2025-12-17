import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Particle system component
const GalaxyParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  // Detect if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Adaptive particle count
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 150 : 450;

  // Create particles and morph target positions
  const { positions, targetPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Text "TECH SPHERE" as morph target
    const text = "TECH SPHERE";
    const gridCols = 60;
    const gridRows = 10;
    const spacing = 0.15;

    // Generate particle positions in a sphere (galaxy bubble)
    for (let i = 0; i < particleCount; i++) {
      // Initial sphere distribution with depth layers
      const radius = 2.8 + (Math.random() - 0.5) * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 2;

      // Target positions forming "TECH SPHERE" text grid
      const textIdx = Math.floor((i / particleCount) * text.length);
      const char = text[textIdx] || ' ';
      const charOffset = textIdx * 3;
      
      const row = Math.floor((i % (particleCount / text.length)) / (gridCols));
      const col = (i % gridCols);
      
      // Create letter-like clusters
      const inLetter = char !== ' ' && Math.random() > 0.3;
      
      targetPositions[i * 3] = (col - gridCols / 2) * spacing * 0.6 + charOffset - text.length * 1.5;
      targetPositions[i * 3 + 1] = (row - gridRows / 2) * spacing + (Math.random() - 0.5) * 0.2;
      targetPositions[i * 3 + 2] = inLetter ? 0 : -5;

      // Metallic silver/chrome color palette
      const colorPalette = [
        new THREE.Color('#FFFFFF'),
        new THREE.Color('#E8E8E8'),
        new THREE.Color('#C0C0C0'),
        new THREE.Color('#A0A0A0'),
        new THREE.Color('#D4D4D4'),
      ];
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied particle sizes
      sizes[i] = Math.random() * 4 + 1;
    }

    return { positions, targetPositions, colors, sizes };
  }, [particleCount]);

  // Animation frame
  useFrame((state) => {
    if (!particlesRef.current || prefersReducedMotion) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.current;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Interpolate between sphere and text positions based on scroll
      const startX = positions[i3];
      const startY = positions[i3 + 1];
      const startZ = positions[i3 + 2];
      
      const targetX = targetPositions[i3];
      const targetY = targetPositions[i3 + 1];
      const targetZ = targetPositions[i3 + 2];

      // Smooth interpolation with easing
      const easeProgress = progress < 0.2 
        ? 0 
        : progress < 0.6 
          ? (progress - 0.2) / 0.4 
          : Math.min((progress - 0.6) / 0.35 + 0.5, 1);

      positions[i3] = startX + (targetX - startX) * easeProgress;
      positions[i3 + 1] = startY + (targetY - startY) * easeProgress;
      positions[i3 + 2] = startZ + (targetZ - startZ) * easeProgress;

      // Add orbital motion when in bubble phase
      if (progress < 0.2) {
        const orbitSpeed = 0.1;
        const orbitRadius = 0.1;
        positions[i3] += Math.cos(time * orbitSpeed + i) * orbitRadius;
        positions[i3 + 1] += Math.sin(time * orbitSpeed + i) * orbitRadius;
      }

      // Add breathing effect
      if (progress < 0.2) {
        const breathe = Math.sin(time * 0.5) * 0.03;
        positions[i3] *= 1 + breathe;
        positions[i3 + 1] *= 1 + breathe;
      }

      // Mouse interaction
      const dx = positions[i3] - mousePos.current.x * 5;
      const dy = positions[i3 + 1] - mousePos.current.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2 && progress < 0.6) {
        positions[i3] += dx * 0.01;
        positions[i3 + 1] += dy * 0.01;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire system slightly
    if (progress < 0.6) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  // Setup scroll trigger
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'center center',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Custom shader material for glow effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });
  }, []);

  return (
    <points ref={particlesRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

// Main component
const GalaxyMorphBackground = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-metallic">TECH SPHERE</h1>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance' 
        }}
        style={{ background: 'transparent' }}
      >
        <GalaxyParticles />
      </Canvas>
    </div>
  );
};

export default GalaxyMorphBackground;
