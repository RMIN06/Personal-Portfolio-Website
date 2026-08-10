"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * A flat plastic bar used to build the bezel "card holder" frame around the
 * actual ID card. Positioned relative to the card center space.
 */
function BezelBar({
  position,
  size,
  color = "#1c1c1e",
  metalness = 0.75,
  roughness = 0.35,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

function CardScene() {
  const rig = useRef<THREE.Group>(null);
  const card = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const grab = useRef({ active: false, dx: 0, dy: 0, px: 0, py: 0 });
  // Spring: swing (rz), tilt (rx), stretch (sx) with velocities.
  const spring = useRef({ rz: 0, rx: 0, vx: 0, vz: 0, sx: 1, svx: 0 });

  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load("/profile-card.webp");
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useEffect(() => {
    const dom = gl.domElement;
    const down = (e: PointerEvent) => {
      grab.current.active = true;
      grab.current.dx = 0;
      grab.current.dy = 0;
      grab.current.px = e.clientX;
      grab.current.py = e.clientY;
      dom.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!grab.current.active) return;
      grab.current.dx += e.clientX - grab.current.px;
      grab.current.dy += e.clientY - grab.current.py;
      grab.current.px = e.clientX;
      grab.current.py = e.clientY;
    };
    const up = () => {
      grab.current.active = false;
    };
    dom.addEventListener("pointerdown", down);
    dom.addEventListener("pointermove", move);
    dom.addEventListener("pointerup", up);
    dom.addEventListener("pointercancel", up);
    return () => {
      dom.removeEventListener("pointerdown", down);
      dom.removeEventListener("pointermove", move);
      dom.removeEventListener("pointerup", up);
      dom.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, rawDt) => {
    const r = rig.current;
    const c = card.current;
    if (!r || !c) return;

    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const grb = grab.current;
    const s = spring.current;

    // Pendulum about the top anchor — drag swings, squares squash.
    const targetRz = grb.active ? clamp(grb.dx * 0.0032, -0.65, 0.65) : 0;
    const targetRx = grb.active ? clamp(grb.dy * 0.0026, -0.45, 0.45) : 0;
    const targetSx = grb.active
      ? clamp(1 + Math.abs(grb.dx) * 0.0016, 0.82, 1.35)
      : 1;

    const k = 74;
    const damp = 4.9;
    s.vz += ((targetRz - s.rz) * k - damp * s.vz) * dt;
    s.vx += ((targetRx - s.rx) * k - damp * s.vx) * dt;
    s.svx += ((targetSx - s.sx) * 58 - 5.5 * s.svx) * dt;
    s.rz += s.vz * dt;
    s.rx += s.vx * dt;
    s.sx += s.svx * dt;

    const sway = grb.active ? 0 : Math.sin(t * 1.1) * 0.05;
    r.rotation.set(s.rx, 0, s.rz + sway);
    r.position.y = Math.sin(t * 0.7) * 0.02;
    // Stretch horizontally, squish vertically — the card plays with the cursor.
    c.scale.set(s.sx, 1 / clamp(s.sx, 0.85, 1.2), 1);
  });

  return (
    <group>
      {/* Fixed hang point at the very top */}
      <mesh position={[0, 1.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.022, 12, 32]} />
        <meshStandardMaterial color="#d6d6d6" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.02, 0.05]}>
        <boxGeometry args={[0.22, 0.05, 0.04]} />
        <meshStandardMaterial color="#383838" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Suspended rig — pivots around the top anchor */}
      <group ref={rig} position={[0, 1.0, 0]}>
        {/* Card-holding ribbon (a flat fabric strip) */}
        <mesh position={[0, -0.2, 0.05]}>
          <boxGeometry args={[0.1, 0.55, 0.018]} />
          <meshStandardMaterial
            color="#c9b8a0"
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
        {/* Metal clip joining ribbon → holder */}
        <mesh position={[0, -0.48, 0.05]}>
          <boxGeometry args={[0.13, 0.07, 0.05]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.35} />
        </mesh>

        {/* Card + its holder (same size as the card) */}
        <group ref={card} position={[0, -0.85, 0]}>
          {/* Card body with real depth */}
          <mesh>
            <boxGeometry args={[0.92, 1.3, 0.05]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.55} metalness={0.25} />
          </mesh>
          {/* Front face */}
          <mesh position={[0, 0, 0.027]}>
            <planeGeometry args={[0.88, 1.26]} />
            <meshBasicMaterial map={texture} />
          </mesh>
          {/* Back face */}
          <mesh position={[0, 0, -0.027]}>
            <planeGeometry args={[0.88, 1.26]} />
            <meshBasicMaterial color="#151515" />
          </mesh>

          {/* Bezel holder — a slim frame at the exact size of the card */}
          <BezelBar position={[0, 0.665, 0.028]} size={[0.98, 0.025, 0.06]} />
          <BezelBar position={[0, -0.665, 0.028]} size={[0.98, 0.025, 0.06]} />
          <BezelBar position={[-0.49, 0, 0.028]} size={[0.025, 1.3, 0.06]} />
          <BezelBar position={[0.49, 0, 0.028]} size={[0.025, 1.3, 0.06]} />
        </group>
      </group>
    </group>
  );
}

export function IdCard() {
  const [show, setShow] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShow(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holderRef} className="h-full w-full touch-none">
      {show && (
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 4.35], fov: 38 }}
          style={{ touchAction: "none" }}
        >
          <ambientLight intensity={0.55} />
          <hemisphereLight args={["#ffffff", "#3a3a3a", 0.6]} />
          <directionalLight position={[3, 5, 3]} intensity={1.2} />
          <directionalLight position={[-4, -2, -3]} intensity={0.35} />
          <CardScene />
        </Canvas>
      )}
    </div>
  );
}