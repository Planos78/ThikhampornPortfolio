"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Mouse tracker (shared state) ─── */
const mousePos = { x: 0, y: 0 };

function useMouseTracker() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}

/* ─── Face visor dots (like the image) ─── */
function VisorDots() {
  const dots: [number, number, number][] = [];
  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      dots.push([col * 0.06, row * 0.06 - 0.05, 0.72]);
    }
  }

  return (
    <group>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={1.5 + Math.sin(i * 0.5) * 0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Robot Head ─── */
function RobotHead() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth follow mouse
    targetRotation.current.y = mousePos.x * 0.4;
    targetRotation.current.x = -mousePos.y * 0.25;

    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* HEAD - Main sphere (chrome/dark) */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.08}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Visor / face plate */}
      <mesh position={[0, 0.2, 0.45]}>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#050510"
          roughness={0.05}
          metalness={1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Visor dot grid */}
      <group position={[0, 0.25, 0]}>
        <VisorDots />
      </group>

      {/* NECK */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.35, 32]} />
        <meshStandardMaterial color="#0d0d1a" roughness={0.2} metalness={0.95} />
      </mesh>

      {/* Neck ring detail */}
      <mesh position={[0, -0.3, 0]}>
        <torusGeometry args={[0.38, 0.03, 16, 32]} />
        <meshStandardMaterial color="#1a1a3e" roughness={0.15} metalness={1} />
      </mesh>

      {/* BODY (upper torso hint) */}
      <mesh position={[0, -0.85, 0]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#080818" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Shoulder joints */}
      <mesh position={[-0.65, -0.7, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#0d0d20" roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh position={[0.65, -0.7, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#0d0d20" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Upper arms */}
      <group position={[-0.75, -1.0, 0.1]} rotation={[0.3, 0, 0.2]}>
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
          <meshStandardMaterial color="#0a0a1a" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
      <group position={[0.75, -1.0, 0.1]} rotation={[0.3, 0, -0.2]}>
        <mesh>
          <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
          <meshStandardMaterial color="#0a0a1a" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Chest light stripe */}
      <mesh position={[0, -0.65, 0.55]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── Ambient particles ─── */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useRef(
    Float32Array.from(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 8)
    )
  ).current;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
    ref.current.rotation.x = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#00d4ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ─── Scene ─── */
function Scene() {
  useMouseTracker();

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4060ff" />
      <spotLight
        position={[0, 3, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
      />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#00d4ff" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <RobotHead />
      </Float>

      <Particles />

      <Environment preset="city" environmentIntensity={0.6} />
    </>
  );
}

/* ─── Loading fallback ─── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

/* ─── Exported Component ─── */
export default function Robot3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingFallback />;

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </Suspense>

      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
