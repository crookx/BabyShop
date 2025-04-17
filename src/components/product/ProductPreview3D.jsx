import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Box, CircularProgress } from '@mui/material';

const ProductPreview3D = ({ modelUrl }) => {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </Box>
  );
};

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

export default ProductPreview3D;