// src/Pages/Animation.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function CellModel() {
  // Assuming you have a 3D model of the cell, load it here
  const { scene } = useGLTF("/models/human_cell.glb"); // Update with correct path
  return <primitive object={scene} scale={0.02} />;
}

export default function Animation() {
  return (
    <div backgroundcolor="red" height="100px" width="100px">
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <CellModel />
      <OrbitControls />
    </Canvas>
    </div>
    

  );
}
