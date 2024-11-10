// src/Pages/Animation.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import '../Styles/model.css'
function CellModel() {
  // Assuming you have a 3D model of the cell, load it here
  const { scene } = useGLTF("/models/human_cell.glb"); // Update with correct path
  return <primitive object={scene} />;
}

export default function Animation() {
  return (
    <div className="model">
    <Canvas camera={{ position: [0, 0, 1.4] }}>
      <ambientLight intensity={2} />
      {/* <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} /> */}
      <pointLight position={[-10, -10, -10]} />
      <CellModel />
      <OrbitControls minPolarAngle={1} maxPolarAngle={Math.PI / 2 - 1} minDistance={0.5} maxDistance={2}/>
    </Canvas>
    <div className="content">
      <h1>About Human Cell</h1>
    Cells are the smallest units of life and the building blocks of all living organisms. Here is some information about cells: 
 
 Structure
 Cells have many parts, including:
 Cell membrane: A fragile membrane that controls what goes in and out of the cell 
  
 Nucleus: Contains the cell's DNA and most of its RNA 
  
 Cytoplasm: A jelly-like fluid that surrounds the nucleus and contains organelles and other structures 
  
 Cytoskeleton: A network of fibers that gives the cell its shape, helps with cell division, and allows cells to move 
  
 Organelles: Specialized structures that perform specific functions within the cell, such as processing molecules, breaking down waste, and producing energy 
  
 Types
 Cells are divided into two main classes: prokaryotic and eukaryotic. Prokaryotic cells, like bacteria, are generally smaller and simpler than eukaryotic cells, which have a nucleus. 
  
 Composition
 Cells are made of water, inorganic ions, and organic molecules. Water is the most abundant molecule in cells, making up 70% or more of their mass. 
  
 Function
 Cells provide structure, take in nutrients, convert nutrients into energy, and carry out specialized functions. 
  
 Discovery
 Robert Hooke discovered the cell in 1665 after observing a piece of cork under a microscope. 
  
 Development
 Cells develop and divide through a four-stage process called the cell cycle
    </div>
    </div>
    

  );
}
