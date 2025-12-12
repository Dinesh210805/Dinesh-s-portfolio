import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshTransmissionMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Workaround for missing intrinsic element types in strict TS environments
const TColor = 'color' as any;
const TGroup = 'group' as any;
const TAmbientLight = 'ambientLight' as any;
const TSpotLight = 'spotLight' as any;

const LiquidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow rotation for organic feel
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={2.8}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={2}
          roughness={0}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={1}
          chromaticAberration={1} // High value for the rainbow edges
          anisotropy={0.5}
          distortion={0.6} // Key for the liquid look
          distortionScale={0.5}
          temporalDistortion={0.2}
          ior={1.5}
          color="#ffffff"
          background={new THREE.Color('#050505')}
        />
      </Sphere>
    </Float>
  );
};

export const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <TColor attach="background" args={['#050505']} />
        
        <Environment resolution={512}>
           <TGroup rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          </TGroup>
        </Environment>
        
        <TAmbientLight intensity={0.5} />
        <TSpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#CCFF00" />
        
        <LiquidSphere />
      </Canvas>
    </div>
  );
};