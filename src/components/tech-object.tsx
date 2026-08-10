"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function createEllipseGeometry(rx: number, ry: number, segments = 32) {
  const shape = new THREE.Shape();
  shape.ellipse(0, 0, rx, ry, 0, Math.PI * 2, false, segments);
  return new THREE.ShapeGeometry(shape);
}

function ImageCardScene() {
  const cardRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const grab = useRef({ active: false, dx: 0, dy: 0, px: 0, py: 0 });
  const spring = useRef({ rx: 0, ry: 0, vx: 0, vy: 0 });

  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load("/object.png");
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useEffect(() => {
    const dom = gl.domElement;
    const down = (e: PointerEvent) => {
      grab.current.active = true;
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
    const card = cardRef.current;
    if (!card) return;

    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const grb = grab.current;
    const s = spring.current;

    const targetRy = grb.active ? clamp(grb.dx * 0.003, -0.5, 0.5) : 0;
    const targetRx = grb.active ? clamp(-grb.dy * 0.003, -0.4, 0.4) : 0;

    const idleRy = Math.sin(t * 0.5) * 0.03;
    const idleRx = Math.cos(t * 0.4) * 0.02;

    const k = 50;
    const damp = 4.5;
    s.vx += ((targetRx - s.rx) * k - damp * s.vx) * dt;
    s.vy += ((targetRy - s.ry) * k - damp * s.vy) * dt;
    s.rx += s.vx * dt;
    s.ry += s.vy * dt;

    card.rotation.set(s.rx + idleRx, s.ry + idleRy, 0);
    card.position.y = Math.sin(t * 0.6) * 0.015;
  });

  return (
    <group ref={cardRef}>
      <mesh receiveShadow castShadow>
        <planeGeometry args={[1.6, 1.6 * 0.75]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.62, 1.62 * 0.75]} />
        <meshStandardMaterial color="#0a0a0a" side={THREE.BackSide} />
      </mesh>

      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[1.68, 1.68 * 0.75]} />
        <meshBasicMaterial
          color="#00d4aa"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        position={[0, -0.85, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh geometry={createEllipseGeometry(0.9, 0.35, 32)} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function TechObject() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", () => setIsMobile(window.innerWidth < 768));
  }, []);

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

  // On mobile, show a simple static image instead of 3D canvas
  if (isMobile) {
    return (
      <div ref={holderRef} className="h-full w-full touch-none flex items-center justify-center">
        <div className="w-full max-w-[520px] aspect-[4/3]">
          <img
            src="/object.png"
            alt="Project showcase"
            className="w-full h-full object-contain mix-blend-screen grayscale contrast-[1.05]"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={holderRef} className="h-full w-full touch-none">
      {show && (
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
          camera={{ position: [0, 0.1, 2.2], fov: 40 }}
          style={{ touchAction: "none" }}
          shadows
        >
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[2, 4, 2]}
            intensity={1.2}
            castShadow
          >
            <orthographicCamera
              left={-3}
              right={3}
              top={3}
              bottom={-3}
              near={0.1}
              far={10}
            />
          </directionalLight>
          <directionalLight position={[-1, 1, -2]} intensity={0.3} />
          <hemisphereLight args={["#ffffff", "#1a1a2e", 0.4]} />
          <ImageCardScene />
        </Canvas>
      )}
    </div>
  );
}