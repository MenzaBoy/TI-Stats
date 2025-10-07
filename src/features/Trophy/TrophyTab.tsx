import React, { Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box, Typography } from '@mui/material';

import { Group } from 'three';
import { getBaseUrl } from '@/utils';
import type { FactionEntry } from '@/types/models';

function TrophyModelGLB() {
    const { scene } = useGLTF(getBaseUrl() + '/models/ti-trophy.glb');
    const ref = useRef<Group>(null);
    const hasTilted = useRef(false);

    useEffect(() => {
        if (ref.current) {
            ref.current.rotation.y = Math.PI / 10; // 45-degree tilt
            ref.current.rotation.y = Math.PI / 10; // 45-degree tilt
            ref.current.rotation.y = Math.PI / 10; // 45-degree tilt
        }
    }, []);

    // Rotate the trophy on its Y axis
    useFrame(() => {
        if (ref.current) {
            // Set initial tilt only once
            if (!hasTilted.current) {
                ref.current.rotation.x = 0.5;
                hasTilted.current = true;
            }
            ref.current.rotation.y += 0.005;
            // console.log(ref)
        }
    });

    return <primitive ref={ref} object={scene} scale={1.2} />;
}

const RotatingTrophy = () => {
    return (
        <div style={{ touchAction: 'auto' }}>
            <Canvas style={{ height: '400px', touchAction: 'auto' }}>
                {/* Fixed lights in the scene */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 1, 1]} intensity={10} />
                <directionalLight position={[1, 0, 0]} intensity={10} />
                <directionalLight position={[0, 0, 1]} intensity={10} />
                <directionalLight position={[1, 0, 0]} intensity={10} />

                <Suspense fallback={null}>
                    <TrophyModelGLB />
                </Suspense>
                {/* Camera controls */}
                <OrbitControls
                    enableZoom={false}
                    enableRotate={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
};

type TrophyTabProps = {
    trophyHolderName: string;
    trophyHolderFaction: FactionEntry;
};

const TrophyTab: React.FC<TrophyTabProps> = ({
    trophyHolderName,
    trophyHolderFaction,
}) => {
    return (
        <div
            style={{
                overflow: 'hidden',
                borderRadius: '20px',
                touchAction: 'auto',
                width: '300px',
                maxHeight: 'min-content',
                // maxHeight: '100%',
            }}
        >
            <div
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '100%',
                    // height: '50%',
                    touchAction: 'auto',
                }}
            >
                <Box
                    textAlign="center"
                    sx={{
                        backgroundImage: `url("${getBaseUrl()}images/tihexes.webp")`,
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        touchAction: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: '5px',
                            backgroundImage:
                                'linear-gradient(to bottom right, rgb(241,87,38) ,rgb(245,189,26) )',
                            width: '100px',
                            height: '150px',
                            padding: '4px',
                            marginTop: '30px',
                            // marginBottom: '-200px',
                        }}
                    >
                        {trophyHolderName && (
                            <Box
                                sx={{
                                    borderRadius: '5px',
                                    height: '150px',
                                    backgroundImage: `url("${getBaseUrl()}images/factions/${trophyHolderFaction.factionImage}")`,
                                    backgroundSize: 'cover',
                                }}
                            ></Box>
                        )}
                    </Box>
                    <Suspense fallback={<div>Loading Trophy...</div>}>
                        <RotatingTrophy />
                    </Suspense>
                    <Box textAlign="center" mb={8} sx={{ marginTop: '-50px' }}>
                        <Typography variant="h6" sx={{ color: '#C5CAE9' }}>
                            Current trophy holder:
                        </Typography>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Box>
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    gutterBottom
                                    sx={{ color: '#FFEB3B', fontWeight: 700 }}
                                >
                                    {trophyHolderName}
                                </Typography>
                            </Box>
                        </motion.div>
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default TrophyTab;
