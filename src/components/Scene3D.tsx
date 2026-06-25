import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
} from 'framer-motion';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Shared scroll progress (avoids React re-renders inside Canvas)
// ---------------------------------------------------------------------------
const sp = { v: 0 };

// ---------------------------------------------------------------------------
// Stage data — the editorial text that pairs each 3D object
// ---------------------------------------------------------------------------
interface Stage {
  id: string;
  label: string;
  title: string;
  sub: string;
}

const STAGES: Stage[] = [
  {
    id: 'intro',
    label: '— STACK —',
    title: 'Lo que construyo',
    sub: 'Scroll para descubrir cada especialidad ↓',
  },
  {
    id: 'web',
    label: '01 · 04',
    title: 'Aplicaciones Web',
    sub: 'React · TypeScript · Next.js',
  },
  {
    id: 'saas',
    label: '02 · 04',
    title: 'Sistemas & SaaS',
    sub: 'POS · Backoffice · Reservas',
  },
  {
    id: 'api',
    label: '03 · 04',
    title: 'Backend & APIs',
    sub: 'Node.js · PostgreSQL · REST',
  },
  {
    id: 'design',
    label: '04 · 04',
    title: 'UI / UX Design',
    sub: 'Figma · Tailwind · Motion',
  },
];

function getStage(progress: number): Stage {
  if (progress < 0.13) return STAGES[0];
  if (progress < 0.33) return STAGES[1];
  if (progress < 0.53) return STAGES[2];
  if (progress < 0.73) return STAGES[3];
  return STAGES[4];
}

// ---------------------------------------------------------------------------
// Piece configuration
// ---------------------------------------------------------------------------
interface PieceConfig {
  id: string;
  label: string;
  sub: string;
  color: string;
  hoverColor: string;
  geo: 'icosahedron' | 'torusKnot' | 'dodecahedron' | 'octahedron';
  pos: [number, number, number];
  origin: [number, number, number];
  revealAt: number;
  rot: [number, number, number];
  size: number;
}

const PIECES: PieceConfig[] = [
  {
    id: 'web',
    label: 'Aplicaciones Web',
    sub: 'React · TypeScript · Next.js',
    color: '#c09550',
    hoverColor: '#d4aa68',
    geo: 'icosahedron',
    pos: [2.4, 0.7, 0],
    origin: [10, 0.7, 0],
    revealAt: 0.13,
    rot: [0.3, 0.5, 0.1],
    size: 0.82,
  },
  {
    id: 'saas',
    label: 'Sistemas & SaaS',
    sub: 'POS · Backoffice · Reservas',
    color: '#b8442b',
    hoverColor: '#cc5540',
    geo: 'torusKnot',
    pos: [-2.6, -0.1, -0.4],
    origin: [-10, -0.1, -0.4],
    revealAt: 0.33,
    rot: [0.2, 0.6, 0.15],
    size: 0.52,
  },
  {
    id: 'api',
    label: 'Backend & APIs',
    sub: 'Node.js · PostgreSQL · REST',
    color: '#5080a0',
    hoverColor: '#6898b8',
    geo: 'dodecahedron',
    pos: [1.6, -1.9, 0.4],
    origin: [1.6, -10, 0.4],
    revealAt: 0.53,
    rot: [0.4, 0.2, 0.3],
    size: 0.78,
  },
  {
    id: 'design',
    label: 'UI / UX Design',
    sub: 'Figma · Tailwind · Motion',
    color: '#a08020',
    hoverColor: '#b89430',
    geo: 'octahedron',
    pos: [-1.8, 1.6, -0.7],
    origin: [-1.8, 8, -0.7],
    revealAt: 0.73,
    rot: [0.5, 0.3, 0.4],
    size: 0.8,
  },
];

// ---------------------------------------------------------------------------
// Geometry helper
// ---------------------------------------------------------------------------
function PieceGeo({ geo, size }: { geo: PieceConfig['geo']; size: number }) {
  if (geo === 'icosahedron') return <icosahedronGeometry args={[size, 1]} />;
  if (geo === 'torusKnot') return <torusKnotGeometry args={[size, 0.18, 120, 20]} />;
  if (geo === 'dodecahedron') return <dodecahedronGeometry args={[size, 0]} />;
  return <octahedronGeometry args={[size, 0]} />;
}

// ---------------------------------------------------------------------------
// Central core sphere — clean, no dark halo
// ---------------------------------------------------------------------------
function CoreSphere() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.x = t * 0.09;
    const fade = Math.min(1, sp.v * 10);
    (mesh.current.material as THREE.MeshStandardMaterial).opacity = fade;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.3, 4]} />
      <meshStandardMaterial
        color="#e8d8b8"
        emissive="#c8a860"
        emissiveIntensity={0.8}
        metalness={0.85}
        roughness={0.08}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Bezier connection lines
// ---------------------------------------------------------------------------
function ConnectionLine({
  to,
  revealAt,
}: {
  to: [number, number, number];
  revealAt: number;
}) {
  const lineObj = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().lerp(end, 0.5);
    mid.y += 0.5;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    const mat = new THREE.LineBasicMaterial({
      color: '#b89850',
      transparent: true,
      opacity: 0,
    });
    return new THREE.Line(geo, mat);
  }, [to]);

  useFrame(() => {
    const prog = Math.max(0, Math.min(1, (sp.v - revealAt) / 0.12));
    (lineObj.material as THREE.LineBasicMaterial).opacity = prog * 0.18;
  });

  return <primitive object={lineObj} />;
}

// ---------------------------------------------------------------------------
// Individual interactive floating piece with wireframe overlay
// ---------------------------------------------------------------------------
function FloatingPiece({ cfg }: { cfg: PieceConfig }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const revealSmooth = useRef(0);
  const hoverScale = useRef(1);
  const emissive = useRef(0.08);
  const px = useRef(cfg.origin[0]);
  const py = useRef(cfg.origin[1]);
  const pz = useRef(cfg.origin[2]);

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;

    const targetReveal = Math.max(0, Math.min(1, (sp.v - cfg.revealAt) / 0.18));
    revealSmooth.current += (targetReveal - revealSmooth.current) * Math.min(1, delta * 5);
    hoverScale.current +=
      ((hovered ? 1.16 : 1) - hoverScale.current) * Math.min(1, delta * 10);

    const scale = revealSmooth.current * hoverScale.current;
    mesh.current.scale.setScalar(scale);

    const floatY = Math.sin(t * 0.65 + cfg.pos[0]) * 0.14;
    if (targetReveal < 0.01) {
      px.current = cfg.origin[0];
      py.current = cfg.origin[1];
      pz.current = cfg.origin[2];
    } else {
      const s = delta * 3;
      px.current += (cfg.pos[0] - px.current) * s;
      py.current += (cfg.pos[1] + floatY - py.current) * s;
      pz.current += (cfg.pos[2] - pz.current) * s;
    }
    mesh.current.position.set(px.current, py.current, pz.current);

    const speed = hovered ? 2.2 : 1;
    mesh.current.rotation.x += delta * cfg.rot[0] * speed;
    mesh.current.rotation.y += delta * cfg.rot[1] * speed;
    mesh.current.rotation.z += delta * cfg.rot[2] * speed;

    const targetEmissive = hovered ? 0.8 : 0.08;
    emissive.current += (targetEmissive - emissive.current) * Math.min(1, delta * 8);
    (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      emissive.current;

    // Sync wireframe opacity via child mesh material
    const wire = mesh.current.children[0] as THREE.Mesh | undefined;
    if (wire?.material) {
      (wire.material as THREE.MeshBasicMaterial).opacity = hovered ? 0.14 : 0.05;
    }
  });

  const enter = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const leave = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    <mesh ref={mesh} position={cfg.origin} onPointerEnter={enter} onPointerLeave={leave}>
      <PieceGeo geo={cfg.geo} size={cfg.size} />
      <meshStandardMaterial
        color={hovered ? cfg.hoverColor : cfg.color}
        emissive={cfg.color}
        emissiveIntensity={0.08}
        metalness={hovered ? 0.82 : 0.52}
        roughness={hovered ? 0.08 : 0.28}
      />

      {/* Wireframe child — inherits parent transform */}
      <mesh scale={[1.018, 1.018, 1.018]}>
        <PieceGeo geo={cfg.geo} size={cfg.size} />
        <meshBasicMaterial
          color={cfg.color}
          wireframe
          transparent
          opacity={0.05}
          depthTest={false}
        />
      </mesh>

      {/* Hover label */}
      {hovered && (
        <Html
          center
          position={[0, 1.5, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          distanceFactor={5.5}
          zIndexRange={[100, 200]}
        >
          <div
            style={{
              background: 'rgba(10,9,6,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(184,152,80,0.2)',
              borderRadius: '4px',
              padding: '7px 13px',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <p
              style={{
                fontFamily: 'Instrument Serif, ui-serif, Georgia, serif',
                fontSize: '13px',
                fontWeight: 400,
                color: '#ece6d8',
                margin: 0,
              }}
            >
              {cfg.label}
            </p>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(180,165,135,0.65)',
                margin: '4px 0 0',
              }}
            >
              {cfg.sub}
            </p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Camera rig — cinematic pull-back driven by scroll progress
// ---------------------------------------------------------------------------
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    // Deliberate zoom out: 5.5 → 9.8 as sp goes 0 → 1
    const targetZ = 5.5 + sp.v * 4.3;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    // Very subtle cinematic breathing
    camera.position.x += (Math.sin(t * 0.05) * 0.12 - camera.position.x) * 0.03;
    camera.position.y += (Math.cos(t * 0.04) * 0.08 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ---------------------------------------------------------------------------
// Scene content (inside Canvas)
// ---------------------------------------------------------------------------
function SceneContent() {
  return (
    <>
      {/* Product-photography lighting: key + accent fills + local core light */}
      <ambientLight intensity={0.08} color="#f0e8d8" />
      <directionalLight position={[4, 7, 3]} intensity={2.4} color="#fff8f0" />
      <pointLight position={[-5, -3, -2]} intensity={10} color="#b8442b" />
      <pointLight position={[0, -3, -5]} intensity={4} color="#5080a0" />
      <pointLight position={[0, 0, 0]} intensity={4} color="#c8a860" />

      <Stars radius={45} depth={65} count={480} factor={1.1} fade speed={0.25} />

      <CoreSphere />

      {PIECES.map((cfg) => (
        <FloatingPiece key={cfg.id} cfg={cfg} />
      ))}

      {PIECES.map((cfg) => (
        <ConnectionLine
          key={`l-${cfg.id}`}
          to={cfg.pos}
          revealAt={cfg.revealAt + 0.06}
        />
      ))}

      <CameraRig />
    </>
  );
}

// ---------------------------------------------------------------------------
// Ease constant for editorial text transitions
// ---------------------------------------------------------------------------
const cinEase = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    sp.v = clamped;
    setProgress(clamped);
  });

  const stage = getStage(progress);

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '320vh' }}
      aria-label="Stack y especialidades — escena 3D interactiva"
    >
      {inView && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 5,
            pointerEvents: progress <= 0.01 || progress >= 0.99 ? 'none' : 'auto',
          }}
        >
          {/* ── Top fade: paper → dark ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '110px',
              background:
                'linear-gradient(to bottom, #faf9f6 0%, rgba(250,249,246,0.55) 55%, transparent 100%)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />

          {/* ── Bottom fade: dark → paper ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '110px',
              background:
                'linear-gradient(to top, #faf9f6 0%, rgba(250,249,246,0.55) 55%, transparent 100%)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />

          {/* ── Editorial text — bottom-left, changes with scroll stage ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '100px',
              left: 'clamp(32px, 5vw, 72px)',
              zIndex: 30,
              pointerEvents: 'none',
              maxWidth: '340px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: cinEase }}
              >
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'rgba(176,162,130,0.6)',
                    margin: '0 0 10px',
                  }}
                >
                  {stage.label}
                </p>
                <h2
                  style={{
                    fontFamily: 'Instrument Serif, ui-serif, Georgia, serif',
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    color: '#ece6d8',
                    margin: '0 0 10px',
                  }}
                >
                  {stage.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(176,162,130,0.5)',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {stage.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Progress bar — aligns with text left edge ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '68px',
              left: 'clamp(32px, 5vw, 72px)',
              width: '56px',
              height: '1px',
              background: 'rgba(176,162,130,0.18)',
              borderRadius: '1px',
              zIndex: 30,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: 'rgba(192,149,80,0.55)',
                borderRadius: '1px',
              }}
            />
          </div>

          {/* ── Three.js canvas ── */}
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            style={{
              background: '#0c0b08',
              width: '100%',
              height: '100%',
            }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <SceneContent />
            </Suspense>
          </Canvas>
        </div>
      )}
    </section>
  );
}
