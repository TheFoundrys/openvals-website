"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function RiskCurve() {
  const lineRef = useRef<THREE.Group>(null);

  // Generate dynamic performance curve points
  const points = useMemo(() => {
    return [
      new THREE.Vector3(-15, -4, -5),
      new THREE.Vector3(-8, -2, -2),
      new THREE.Vector3(-4, 0, 0),
      new THREE.Vector3(-2, 4, 2),
      new THREE.Vector3(0, 5, 2),
      new THREE.Vector3(2, -2, 0),
      new THREE.Vector3(6, -3, -2),
      new THREE.Vector3(12, -2, -4),
      new THREE.Vector3(18, 0, -6),
    ];
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const linePoints = useMemo(() => curve.getPoints(200), [curve]);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={lineRef} position={[0, 0, -5]}>
      <Line
        points={linePoints}
        color="#38BDF8"
        lineWidth={3}
        transparent
        opacity={0.8}
      />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      ))}
      {/* Abstract Background Elements */}
      <gridHelper args={[40, 20, "#052a55", "#042652"]} position={[0, -8, -10]} rotation={[0, 0, 0]} />
      <gridHelper args={[40, 20, "#052a55", "#042652"]} position={[0, 8, -15]} rotation={[0, 0, 0]} />
    </group>
  );
}

export default function ThreeRiskCurve() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Deep Blue Overlay base color */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #011A3A 0%, rgba(1, 26, 58, 0.4) 100%)", zIndex: -1 }}></div>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
        <ambientLight intensity={0.5} />
        <RiskCurve />
      </Canvas>
    </div>
  );
}
