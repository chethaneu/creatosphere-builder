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
  const { positions, targetPositions, colors, sizes, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Generate particle positions in a perfect sphere
    for (let i = 0; i < particleCount; i++) {
      // Perfect sphere distribution using Fibonacci sphere algorithm
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const radius = 3 + Math.random() * 0.5; // Sphere radius
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Store initial positions
      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Target positions forming "TECHSPHERE" text
      const text = "TECHSPHERE";
      const charsPerParticleGroup = Math.floor(particleCount / text.length);
      const charIndex = Math.floor(i / charsPerParticleGroup);
      const particleInChar = i % charsPerParticleGroup;
      
      // Create grid for each character
      const gridSize = Math.ceil(Math.sqrt(charsPerParticleGroup));
      const row = Math.floor(particleInChar / gridSize);
      const col = particleInChar % gridSize;
      
      // Spacing and positioning
      const charSpacing = 0.8;
      const particleSpacing = 0.08;
      const totalWidth = text.length * charSpacing;
      
      targetPositions[i * 3] = (charIndex * charSpacing - totalWidth / 2) + (col - gridSize / 2) * particleSpacing;
      targetPositions[i * 3 + 1] = (row - gridSize / 2) * particleSpacing;
      targetPositions[i * 3 + 2] = 0;

      // Vibrant color palette
      const colorPalette = [
        new THREE.Color('#6EE7F9'),
        new THREE.Color('#64B5FF'),
        new THREE.Color('#A8FFED'),
        new THREE.Color('#FFD6A5'),
        new THREE.Color('#FFFFFF'),
        new THREE.Color('#00D1FF'),
      ];
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Larger particle sizes for better visibility
      sizes[i] = Math.random() * 5 + 2;
    }

    return { positions, initialPositions, targetPositions, colors, sizes };
  }, [particleCount]);

  // Animation frame
  useFrame((state) => {
    if (!particlesRef.current || prefersReducedMotion) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.current;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get initial sphere position and target text position
      const initialX = initialPositions[i3];
      const initialY = initialPositions[i3 + 1];
      const initialZ = initialPositions[i3 + 2];
      
      const targetX = targetPositions[i3];
      const targetY = targetPositions[i3 + 1];
      const targetZ = targetPositions[i3 + 2];

      // Easing function for smooth transition
      const easeProgress = progress < 0.1 
        ? 0 
        : progress > 0.9 
          ? 1 
          : gsap.parseEase("power3.inOut")((progress - 0.1) / 0.8);

      // Interpolate from sphere to text
      positions[i3] = initialX + (targetX - initialX) * easeProgress;
      positions[i3 + 1] = initialY + (targetY - initialY) * easeProgress;
      positions[i3 + 2] = initialZ + (targetZ - initialZ) * easeProgress;

      // Sphere phase - rotation and breathing
      if (progress < 0.5) {
        const rotationSpeed = 0.2;
        const angle = time * rotationSpeed;
        
        // Rotate around Y axis
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        positions[i3] = x * cosAngle - z * sinAngle;
        positions[i3 + 2] = x * sinAngle + z * cosAngle;
        
        // Breathing effect
        const breathe = 1 + Math.sin(time * 0.8) * 0.05;
        positions[i3] *= breathe;
        positions[i3 + 1] *= breathe;
        positions[i3 + 2] *= breathe;
      }

      // Add subtle floating motion in text phase
      if (progress > 0.5) {
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01 * (progress - 0.5);
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Setup scroll trigger
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      end: 'bottom center',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  // Custom shader material for enhanced glow effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Soft glow with bright core
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          float glow = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor * (1.0 + glow), alpha * 0.9);
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
        <h1 className="text-6xl font-bold text-gradient-shine">TECHSPHERE</h1>
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
