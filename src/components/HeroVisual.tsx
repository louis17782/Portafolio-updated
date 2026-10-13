import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as THREE from "three";
import { useEffect, useRef, type PointerEvent } from "react";

export default function HeroVisual() {
  const area = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const host = canvasHost.current;
    if (!host || !window.WebGLRenderingContext) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x8e79d4,
        metalness: 0.52,
        roughness: 0.24,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.88,
      }),
    );
    sculpture.add(core);

    const wireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.29, 1),
      new THREE.MeshBasicMaterial({ color: 0xc8ff72, wireframe: true, transparent: true, opacity: 0.3 }),
    );
    sculpture.add(wireframe);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.008, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0xc8ff72, transparent: true, opacity: 0.75 }),
    );
    orbit.rotation.set(1.12, 0.2, -0.36);
    sculpture.add(orbit);

    const ambient = new THREE.AmbientLight(0x9b8ada, 2.2);
    const keyLight = new THREE.PointLight(0xc8ff72, 28, 12);
    keyLight.position.set(2.4, 2.2, 3.2);
    const fillLight = new THREE.PointLight(0xb7a2ff, 18, 10);
    fillLight.position.set(-2.4, -1, 2);
    scene.add(ambient, keyLight, fillLight);

    let frame = 0;
    let pointerXNow = 0;
    let pointerYNow = 0;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 400 ? 6.5 : 6;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(host);

    const render = () => {
      pointerXNow += (pointerX.get() - pointerXNow) * 0.035;
      pointerYNow += (pointerY.get() - pointerYNow) * 0.035;
      sculpture.rotation.y += 0.0025;
      sculpture.rotation.y += pointerXNow * 0.0008;
      sculpture.rotation.x = pointerYNow * 0.18;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      core.geometry.dispose();
      core.material.dispose();
      wireframe.geometry.dispose();
      wireframe.material.dispose();
      orbit.geometry.dispose();
      orbit.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = area.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={area}
      className="relative mx-auto grid aspect-square w-full max-w-[510px] place-items-center [perspective:1000px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      role="img"
      aria-label="Escultura 3D interactiva: mueve el puntero para cambiar su orientación"
    >
      <div className="grid-glow absolute inset-0 rounded-full opacity-60" />
      <div ref={canvasHost} className="absolute inset-0 z-10 [&>canvas]:size-full" aria-hidden="true">
        <div className="absolute inset-[25%] rounded-full border border-lilac/30 bg-[radial-gradient(circle_at_35%_25%,rgba(183,162,255,.28),rgba(20,26,35,.15)_48%,rgba(200,255,114,.12))] shadow-[0_0_90px_rgba(183,162,255,.12)]" />
      </div>
      <motion.div
        className="pointer-events-none absolute inset-[17%] z-20 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        <motion.div
          className="absolute left-[19%] top-[26%] size-[13%] rounded-full bg-lime shadow-[0_0_42px_rgba(200,255,114,.7)]"
          animate={{ y: [0, -13, 0], x: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(90px)" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[13%] size-[8%] rounded-full bg-lilac shadow-[0_0_35px_rgba(183,162,255,.8)]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(112px)" }}
        />
        <motion.div
          className="absolute left-[5%] top-[48%] h-px w-[90%] rounded-full bg-gradient-to-r from-transparent via-lime/50 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(66px) rotateX(68deg)" }}
        />
        <div className="absolute inset-[34%] grid place-items-center rounded-[28px] border border-white/15 bg-ink/45 text-4xl font-semibold tracking-[-.08em] text-white shadow-2xl backdrop-blur-md" style={{ transform: "translateZ(130px)" }}>
          <span className="text-lime">.</span>
        </div>
      </motion.div>
      <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-panel/70 px-3 py-2 text-[11px] text-muted backdrop-blur">
        <span className="size-1.5 animate-pulse rounded-full bg-lime" />
        Interactúa con la escena
      </div>
      <span className="absolute left-[5%] top-[25%] font-mono text-[10px] text-lilac/70">EVOLUCIÓN</span>
      <span className="absolute right-[1%] top-[48%] font-mono text-[10px] text-lime/70">ESCALA</span>
    </div>
  );
}
