import { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Shared scroll progress — avoids React re-renders inside the Canvas
// ---------------------------------------------------------------------------
const sp = { v: 0 };

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
}

const PIECES: PieceConfig[] = [
  {
    id: 'web',
    label: 'Aplicaciones Web',
    sub: 'React · TypeScript · Next.js',
    color: '#c8a87a',
    hoverColor: '#dfbf90',
    geo: 'icosahedron',
    pos: [2.6, 0.9, 0],
    origin: [10, 0.9, 0],
    revealAt: 0.12,
    rot: [0.3, 0.5, 0.1],
  },
  {
    id: 'saas',
    label: 'Sistemas & SaaS',
    sub: 'POS · Backoffice · Reservas',
    color: '#b8442b',
    hoverColor: '#d05040',
    geo: 'torusKnot',
    pos: [-2.8, -0.2, -0.5],
    origin: [-10, -0.2, -0.5],
    revealAt: 0.3,
    rot: [0.2, 0.6, 0.2],
  },
  {
    id: 'api',
    label: 'Backend & APIs',
    sub: 'Node.js · PostgreSQL · REST',
    color: '#6a9ab8',
    hoverColor: '#80b0cc',
    geo: 'dodecahedron',
    pos: [1.8, -2.2, 0.5],
    origin: [1.8, -10, 0.5],
    revealAt: 0.5,
    rot: [0.4, 0.2, 0.3],
  },
  {
    id: 'design',
    label: 'UI / UX Design',
    sub: 'Figma · Tailwind · Motion',
    color: '#b8a040',
    hoverColor: '#ccb850',
    geo: 'octahedron',
    pos: [-2.0, 1.8, -0.8],
    origin: [-2.0, 8, -0.8],
    revealAt: 0.68,
    rot: [0.5, 0.3, 0.4],
  },
];

// ---------------------------------------------------------------------------
// Central pulsing core sphere
// ---------------------------------------------------------------------------
function CoreSphere() {
  const inner = useRef<THREE.Mesh>(null!);
  const outer = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    inner.current.rotation.y = t * 0.2;
    inner.current.rotation.x = t * 0.1;

    const pulse = 1 + Math.sin(t * 1.8) * 0.05;
    outer.current.scale.setScalar(pulse * 1.5);

    const fade = Math.min(1, sp.v * 12);
    (inner.current.material as THREE.MeshStandardMaterial).opacity = fade;
    (outer.current.material as THREE.MeshBasicMaterial).opacity =
      fade * (0.07 + Math.sin(t * 1.8) * 0.03);
  });

  return (
    <group>
      <mesh ref={outer}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#e8d4b8"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.38, 4]} />
        <meshStandardMaterial
          color="#e0ccaa"
          emissive="#c8a878"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.15}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Bezier connection lines from origin to each piece
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
    mid.y += 0.6;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    const mat = new THREE.LineBasicMaterial({
      color: '#c8a870',
      transparent: true,
      opacity: 0,
    });
    return new THREE.Line(geo, mat);
  }, [to]);

  useFrame(() => {
    const prog = Math.max(0, Math.min(1, (sp.v - revealAt) / 0.12));
    (lineObj.material as THREE.LineBasicMaterial).opacity = prog * 0.2;
  });

  return <primitive object={lineObj} />;
}

// ---------------------------------------------------------------------------
// Individual interactive floating piece
// ---------------------------------------------------------------------------
function FloatingPiece({ cfg }: { cfg: PieceConfig }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const revealSmooth = useRef(0);
  const hoverScale = useRef(1);
  const emissive = useRef(0.12);
  const px = useRef(cfg.origin[0]);
  const py = useRef(cfg.origin[1]);
  const pz = useRef(cfg.origin[2]);

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;

    const targetReveal = Math.max(0, Math.min(1, (sp.v - cfg.revealAt) / 0.18));
    revealSmooth.current += (targetReveal - revealSmooth.current) * Math.min(1, delta * 5);
    hoverScale.current +=
      ((hovered ? 1.2 : 1) - hoverScale.current) * Math.min(1, delta * 10);
    mesh.current.scale.setScalar(revealSmooth.current * hoverScale.current);

    const floatOffset = Math.sin(t * 0.7 + cfg.pos[0]) * 0.18;

    if (targetReveal < 0.01) {
      px.current = cfg.origin[0];
      py.current = cfg.origin[1];
      pz.current = cfg.origin[2];
    } else {
      const s = delta * 3;
      px.current += (cfg.pos[0] - px.current) * s;
      py.current += (cfg.pos[1] + floatOffset - py.current) * s;
      pz.current += (cfg.pos[2] - pz.current) * s;
    }

    mesh.current.position.set(px.current, py.current, pz.current);

    const speed = hovered ? 3 : 1;
    mesh.current.rotation.x += delta * cfg.rot[0] * speed;
    mesh.current.rotation.y += delta * cfg.rot[1] * speed;
    mesh.current.rotation.z += delta * cfg.rot[2] * speed;

    const targetEmissive = hovered ? 0.9 : 0.12;
    emissive.current += (targetEmissive - emissive.current) * Math.min(1, delta * 8);
    (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      emissive.current;
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
      {cfg.geo === 'icosahedron' && <icosahedronGeometry args={[0.82, 1]} />}
      {cfg.geo === 'torusKnot' && <torusKnotGeometry args={[0.52, 0.18, 120, 20]} />}
      {cfg.geo === 'dodecahedron' && <dodecahedronGeometry args={[0.78, 0]} />}
      {cfg.geo === 'octahedron' && <octahedronGeometry args={[0.82, 0]} />}
      <meshStandardMaterial
        color={hovered ? cfg.hoverColor : cfg.color}
        emissive={cfg.color}
        emissiveIntensity={0.12}
        metalness={hovered ? 0.75 : 0.45}
        roughness={hovered ? 0.12 : 0.32}
      />
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
              background: 'rgba(15,14,10,0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(200,168,120,0.2)',
              borderRadius: '6px',
              padding: '8px 14px',
              color: '#f5f2ea',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            <p style={{ fontWeight: 500, margin: 0, letterSpacing: '0.01em' }}>
              {cfg.label}
            </p>
            <p
              style={{
                color: '#9a978b',
                margin: '3px 0 0',
                fontSize: '9.5px',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
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
// Camera: subtle autonomous drift + zoom-in at end of scroll
// ---------------------------------------------------------------------------
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.x += (Math.sin(t * 0.08) * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (Math.cos(t * 0.06) * 0.25 - camera.position.y) * 0.02;
    const targetZ = sp.v > 0.88 ? 7.5 : 9.2;
    camera.position.z += (targetZ - camera.position.z) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ---------------------------------------------------------------------------
// Scene root (inside Canvas)
// ---------------------------------------------------------------------------
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} color="#f0e8d8" />
      <pointLight position={[6, 5, 4]} intensity={18} color="#fff5e8" />
      <pointLight position={[-5, -4, -2]} intensity={12} color="#b8442b" />
      <pointLight position={[0, 0, 5]} intensity={6} color="#6a9ab8" />

      <Stars radius={35} depth={60} count={600} factor={1.5} fade speed={0.4} />

      <CoreSphere />

      {PIECES.map((cfg) => (
        <FloatingPiece key={cfg.id} cfg={cfg} />
      ))}

      {PIECES.map((cfg) => (
        <ConnectionLine
          key={`line-${cfg.id}`}
          to={cfg.pos}
          revealAt={cfg.revealAt + 0.06}
        />
      ))}

      <CameraRig />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  // Track when the section is in the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll progress within the section
  // Works correctly even when CSS sticky is broken by overflow-x:hidden on body
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    sp.v = clamped;
    setProgress(clamped);
  });

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '320vh' }}
      aria-label="Stack y especialidades — escena 3D interactiva"
    >
      {/* position:fixed canvas — shown only while section intersects viewport */}
      {inView && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 5, // below Navbar (z-50) but above page content
            pointerEvents: progress <= 0.01 || progress >= 0.99 ? 'none' : 'auto',
          }}
        >
          {/* Top fade: paper → dark */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to bottom, #faf9f6, transparent)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />
          {/* Bottom fade: dark → paper */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to top, #faf9f6, transparent)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />

          {/* Section label */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(154,151,139,0.55)',
              }}
            >
              Stack · Especialidades
            </span>
          </div>

          {/* Scroll progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '52px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '1px',
              background: 'rgba(154,151,139,0.2)',
              borderRadius: '1px',
              zIndex: 30,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: 'rgba(200,168,120,0.7)',
                borderRadius: '1px',
              }}
            />
          </div>

          {/* Scroll hint — fades out after first scroll */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 30,
              pointerEvents: 'none',
              opacity: progress > 0.08 ? 0 : 1,
              transition: 'opacity 0.6s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(154,151,139,0.45)',
              }}
            >
              Scroll para explorar ↓
            </span>
          </div>

          {/* Three.js canvas */}
          <Canvas
            camera={{ position: [0, 0, 9.2], fov: 50 }}
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
