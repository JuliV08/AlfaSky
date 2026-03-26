"use client";

/**
 * FallingShards — Octaedros 3D azules que descienden lentamente.
 *
 * DECISIÓN DE DISEÑO: Se abandonaron los shaders custom porque WebGL1 no
 * soporta inverse() y el resultado era siempre gris. En vez de eso:
 *
 *  - MeshBasicMaterial con color sólido azul — NO PUEDE FALLAR
 *  - Cada shard tiene un tint aleatorio del palette navy→cobalt→azure
 *  - Transparencia 0.35-0.55 para flotar elegantemente sobre fondo blanco
 *  - Aristas (LineSegments) con color azul brillante, opacity 0.70
 *  - 3 ejes de rotación + tumble sinusoidal para movimiento orgánico
 *
 * Performance: InstancedMesh + DPR clamped + reducido en mobile.
 */

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Palette de azules para las caras (unificado a brand blue)
const BLUE_PALETTE = [
    0x2E7DD1, // brand accent
];

interface Shard {
    x: number; y: number; z: number;
    vy: number; vx: number;
    rx: number; ry: number; rz: number;
    rsx: number; rsy: number; rsz: number;
    tumblePhase: number; tumbleSpeed: number;
    scale: number;
    colorIdx: number;
    opacity: number;
}

function mkShard(vW: number, vH: number, above: boolean): Shard {
    return {
        x: (Math.random() - 0.5) * vW * 0.92,
        y: above ? vH * 0.52 + Math.random() * vH * 0.5 : (Math.random() - 0.2) * vH,
        z: -0.5 - Math.random() * 5.0,
        vy: 0.08 + Math.random() * 0.18,
        vx: (Math.random() - 0.5) * 0.04,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        rsx: (Math.random() - 0.5) * 1.0,
        rsy: (Math.random() - 0.5) * 0.8,
        rsz: (Math.random() - 0.5) * 0.5,
        tumblePhase: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.3 + Math.random() * 0.55,
        scale: 0.22 + Math.random() * 0.30,
        colorIdx: Math.floor(Math.random() * BLUE_PALETTE.length),
        opacity: 0.55 + Math.random() * 0.25,
    };
}

export function FallingShards({ className = "" }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const hasWebGL = useMemo(() => {
        if (typeof window === "undefined") return true;
        try {
            const c = document.createElement("canvas");
            return !!(c.getContext("webgl2") || c.getContext("webgl"));
        } catch { return false; }
    }, []);

    const prefersRM = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !hasWebGL || prefersRM) return;

        const isMobile = window.innerWidth < 768;
        const COUNT = isMobile ? 12 : 24;
        const DPR = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0);

        const canvas = document.createElement("canvas");
        canvas.style.cssText = "width:100%;height:100%;display:block;background:transparent";

        const renderer = new THREE.WebGLRenderer({
            canvas, alpha: true, antialias: !isMobile,
            premultipliedAlpha: false,
            powerPreference: isMobile ? "low-power" : "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(DPR);

        const w = Math.max(container.clientWidth, 4);
        const h = Math.max(container.clientHeight, 4);
        renderer.setSize(w, h, false);

        const scene = new THREE.Scene();
        const fH = 12;
        const aspect = w / h || 1;
        const camera = new THREE.OrthographicCamera(
            -fH * aspect / 2, fH * aspect / 2,
            fH / 2, -fH / 2,
            0.1, 50,
        );
        camera.position.z = 10;

        // Geometría: OctahedronGeometry — angular, premium
        const geo = new THREE.OctahedronGeometry(1, 0);

        // Crear materiales pre-renderizados para cada color del palette
        const faceMaterials = BLUE_PALETTE.map(hex =>
            new THREE.MeshBasicMaterial({
                color: hex,
                transparent: true,
                opacity: 0.60,
                side: THREE.DoubleSide,
                depthWrite: false,
            })
        );

        // Arista material — azul brillante, ALTA visibilidad
        const edgeGeo = new THREE.EdgesGeometry(geo, 10);
        const edgeMat = new THREE.LineBasicMaterial({
            color: 0x5BA4E6,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
        });

        // STRATEGY: No InstancedMesh para evitar shaders.
        // Con 24 shards Mesh individuales, el rendimiento es más que suficiente.
        const shardData = Array.from({ length: COUNT }, () => mkShard(fH * aspect, fH, false));

        const meshes: THREE.Mesh[] = [];
        const edges: THREE.LineSegments[] = [];

        for (let i = 0; i < COUNT; i++) {
            const s = shardData[i];

            // Mesh con MeshBasicMaterial — color sólido
            const mat = faceMaterials[s.colorIdx].clone();
            mat.opacity = s.opacity;
            const m = new THREE.Mesh(geo, mat);
            m.position.set(s.x, s.y, s.z);
            m.rotation.set(s.rx, s.ry, s.rz);
            m.scale.setScalar(s.scale);
            scene.add(m);
            meshes.push(m);

            // Aristas
            const ls = new THREE.LineSegments(edgeGeo, edgeMat);
            ls.position.copy(m.position);
            ls.rotation.copy(m.rotation);
            ls.scale.copy(m.scale);
            scene.add(ls);
            edges.push(ls);
        }

        renderer.render(scene, camera);
        container.appendChild(canvas);

        let rafId: number | null = null;
        let ro: ResizeObserver | null = null;

        const initRaf = requestAnimationFrame(() => {
            setVisible(true);

            ro = new ResizeObserver(() => {
                const nw = container.clientWidth;
                const nh = container.clientHeight;
                renderer.setSize(nw, nh, false);
                const na = nw / nh || 1;
                camera.left = -fH * na / 2;
                camera.right = fH * na / 2;
                camera.updateProjectionMatrix();
            });
            ro.observe(container);

            let elapsed = 0;
            let last = performance.now();
            const vW = fH * aspect;
            const vH = fH;

            const tick = (now: number) => {
                rafId = requestAnimationFrame(tick);
                const dt = Math.min((now - last) / 1000, 0.05);
                last = now;
                elapsed += dt;

                const curA = (container.clientWidth / container.clientHeight) || 1;
                const curVW = fH * curA;

                for (let i = 0; i < COUNT; i++) {
                    const s = shardData[i];

                    s.y -= s.vy * dt * 60 * 0.016;
                    s.x += s.vx * dt * 60 * 0.016;
                    s.x += Math.sin(elapsed * 0.5 + s.tumblePhase) * 0.003;

                    const tumble = Math.sin(elapsed * s.tumbleSpeed + s.tumblePhase) * 0.20;
                    s.rx += (s.rsx + tumble) * dt;
                    s.ry += (s.rsy - tumble * 0.6) * dt;
                    s.rz += s.rsz * dt;

                    if (s.y < -vH * 0.6 || Math.abs(s.x) > curVW * 0.6) {
                        Object.assign(s, mkShard(curVW, vH, true));
                        const mat = meshes[i].material as THREE.MeshBasicMaterial;
                        mat.color.setHex(BLUE_PALETTE[s.colorIdx]);
                        mat.opacity = s.opacity;
                    }

                    meshes[i].position.set(s.x, s.y, s.z);
                    meshes[i].rotation.set(s.rx, s.ry, s.rz);
                    meshes[i].scale.setScalar(s.scale);

                    edges[i].position.copy(meshes[i].position);
                    edges[i].rotation.copy(meshes[i].rotation);
                    edges[i].scale.copy(meshes[i].scale);
                }
                renderer.render(scene, camera);
            };
            rafId = requestAnimationFrame(tick);
        });

        return () => {
            cancelAnimationFrame(initRaf);
            if (rafId !== null) cancelAnimationFrame(rafId);
            ro?.disconnect();
            geo.dispose();
            edgeGeo.dispose();
            edgeMat.dispose();
            faceMaterials.forEach(m => m.dispose());
            meshes.forEach(m => {
                (m.material as THREE.MeshBasicMaterial).dispose();
            });
            renderer.dispose();
            if (canvas.parentNode === container) container.removeChild(canvas);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasWebGL, prefersRM]);

    if (!hasWebGL || prefersRM) {
        return (
            <div className={className} style={{ background: "transparent" }}>
                <div className="w-full h-full relative">
                    <svg className="w-full h-full opacity-15" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                        {[...Array(10)].map((_, i) => {
                            const x = 40 + (i % 5) * 75;
                            const y = 60 + Math.floor(i / 5) * 240;
                            const s = 10 + (i % 3) * 6;
                            return <polygon key={i} points={`${x},${y - s} ${x + s},${y} ${x},${y + s} ${x - s},${y}`} fill="rgba(46,125,209,0.2)" stroke="rgba(46,125,209,0.8)" strokeWidth="0.8" transform={`rotate(${i * 18},${x},${y})`} />;
                        })}
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ opacity: visible ? 1 : 0, transition: visible ? "opacity 1.5s ease-out" : "none" }}
        />
    );
}
