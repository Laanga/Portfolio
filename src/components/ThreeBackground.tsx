"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";
import { Group, Vector3, Quaternion, Euler } from "three";

const Stars = (props: any) => {
    const ref = useRef<any>(null);

    const sphere = useMemo(() => {
        return random.inSphere(new Float32Array(15000), { radius: 8 });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 50;
            ref.current.rotation.y -= delta / 60;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const Rig = () => {
    const { camera, mouse } = useThree();
    const vec = new Vector3();

    useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.05);
        camera.lookAt(0, 0, 0);
    });
    return null;
};

const Rocket = () => {
    const group = useRef<Group>(null);
    const targetQuaternion = useMemo(() => new Quaternion(), []);

    // Positions of "planets" to visit - pushed to the edges, away from center
    const planets = useMemo(() => [
        [-6, 4, -3],
        [6, 4, -3],
        [6, -4, -3],
        [-6, -4, -3],
        [0, 5, -4],
        [-6, 0, -4],
        [6, 0, -4],
        [0, -5, -4],
    ], []);

    useFrame((state) => {
        if (group.current) {
            // Cycle through planets every 15 seconds
            const planetIndex = Math.floor(state.clock.elapsedTime / 15) % planets.length;
            const nextPlanetIndex = (planetIndex + 1) % planets.length;

            const currentPlanet = planets[planetIndex];
            const nextPlanet = planets[nextPlanetIndex];

            // Interpolation factor with ease-in-out for smoother movement
            const t = (state.clock.elapsedTime % 15) / 15;
            const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            // Smoothly interpolate position with easing
            const targetX = currentPlanet[0] + (nextPlanet[0] - currentPlanet[0]) * easedT;
            const targetY = currentPlanet[1] + (nextPlanet[1] - currentPlanet[1]) * easedT;
            const targetZ = currentPlanet[2] + (nextPlanet[2] - currentPlanet[2]) * easedT;

            // Smooth lerp to target position
            group.current.position.x += (targetX - group.current.position.x) * 0.08;
            group.current.position.y += (targetY - group.current.position.y) * 0.08;
            group.current.position.z += (targetZ - group.current.position.z) * 0.08;

            // SMOOTH ROTATION: Calculate target quaternion and slerp towards it
            // Create a target point ahead for calculating rotation
            const lookAheadT = Math.min(easedT + 0.2, 1);
            const lookAheadX = currentPlanet[0] + (nextPlanet[0] - currentPlanet[0]) * lookAheadT;
            const lookAheadY = currentPlanet[1] + (nextPlanet[1] - currentPlanet[1]) * lookAheadT;
            const lookAheadZ = currentPlanet[2] + (nextPlanet[2] - currentPlanet[2]) * lookAheadT;

            // Create temp group to calculate target rotation
            const tempVec = new Vector3(lookAheadX, lookAheadY, lookAheadZ);
            const direction = tempVec.clone().sub(new Vector3(
                group.current.position.x,
                group.current.position.y,
                group.current.position.z
            ));

            // Only rotate if moving significantly
            if (direction.length() > 0.1) {
                direction.normalize();

                // Calculate rotation to face the target
                const euler = new Euler();
                euler.setFromQuaternion(group.current.quaternion);

                // Calculate target angle
                const targetYaw = Math.atan2(direction.x, direction.z);
                const targetPitch = Math.asin(-direction.y);

                // Lerp angles smoothly (very slowly for subtle rotation)
                const currentYaw = euler.y;
                const currentPitch = euler.x;

                const newYaw = currentYaw + (targetYaw - currentYaw) * 0.02;
                const newPitch = currentPitch + (targetPitch - currentPitch) * 0.02;

                euler.y = newYaw;
                euler.x = newPitch;
                group.current.quaternion.setFromEuler(euler);
            }

            // Add subtle floating effect
            group.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.001;
        }
    });

    const materialProps = { color: "white", wireframe: true };

    return (
        <group ref={group} scale={[0.15, 0.15, 0.15]}>
            {/* Wrapper group rotated 90° so rotation works correctly (rocket points forward along -Z) */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                {/* NOSE CONE */}
                <mesh position={[0, 2, 0]}>
                    <coneGeometry args={[0.4, 1.2, 8]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>

                {/* MAIN BODY */}
                <mesh position={[0, 0.8, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 1.6, 8]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>

                {/* WINDOWS */}
                <mesh position={[0, 1.3, 0.42]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshBasicMaterial color="#88ccff" transparent opacity={0.4} />
                </mesh>
                <mesh position={[0, 0.8, 0.42]}>
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshBasicMaterial color="#88ccff" transparent opacity={0.4} />
                </mesh>

                {/* FINS */}
                <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[0.8, 0.05, 1.2]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>
                <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.8, 0.05, 1.2]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>
                <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 4, 0, 0]}>
                    <boxGeometry args={[0.05, 0.8, 1.2]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>
                <mesh position={[0, 0, -0.5]} rotation={[-Math.PI / 4, 0, 0]}>
                    <boxGeometry args={[0.05, 0.8, 1.2]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>

                {/* ENGINE NOZZLE */}
                <mesh position={[0, -0.3, 0]}>
                    <cylinderGeometry args={[0.35, 0.45, 0.6, 8]} />
                    <meshBasicMaterial {...materialProps} />
                </mesh>

                {/* EXHAUST RING */}
                <mesh position={[0, -0.7, 0]}>
                    <torusGeometry args={[0.3, 0.08, 8, 12]} />
                    <meshBasicMaterial color="#ff6600" />
                </mesh>
            </group>
        </group>
    );
};

const GeometricShape = ({ position, size, color, speed = 0.01 }: { position: [number, number, number], size: number, color: string, speed?: number }) => {
    const ref = useRef<any>(null);
    const { mouse, viewport } = useThree();

    // Store initial position for orbital movement
    const initialPosition = useMemo(() => [...position] as [number, number, number], [position[0], position[1], position[2]]);

    useFrame((state) => {
        if (ref.current) {
            // Rotation
            ref.current.rotation.x += speed;
            ref.current.rotation.y += speed;

            // Subtle floating up and down
            const floatOffset = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
            ref.current.position.y = floatOffset;

            // Very subtle orbital movement
            const orbitRadius = 0.1;
            const orbitSpeed = 0.2;
            const offsetX = Math.sin(state.clock.elapsedTime * orbitSpeed) * orbitRadius;
            ref.current.position.x = offsetX;

            // Minimal mouse interaction
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            const distX = (x - initialPosition[0]) * 0.0003;
            const distY = (y - initialPosition[1]) * 0.0003;
            ref.current.position.x += distX;
            ref.current.position.y += distY;
        }
    });

    return (
        <group position={initialPosition}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[size, 0]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
        </group>
    );
};

const ThreeBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Stars />
                <Rig />

                <Rocket />

                {/* 4 esquinas - muy alejadas del centro */}
                <GeometricShape position={[-6, 4, -3]} size={0.8} color="#ffffff" speed={0.002} />
                <GeometricShape position={[6, 4, -3]} size={0.8} color="#888888" speed={0.0015} />
                <GeometricShape position={[6, -4, -3]} size={0.8} color="#666666" speed={0.0018} />
                <GeometricShape position={[-6, -4, -3]} size={0.8} color="#444444" speed={0.002} />

                {/* 4 bordes extremos */}
                <GeometricShape position={[0, 5, -4]} size={0.9} color="#dddddd" speed={0.0015} />
                <GeometricShape position={[-6, 0, -4]} size={0.9} color="#aaaaaa" speed={0.001} />
                <GeometricShape position={[6, 0, -4]} size={0.9} color="#333333" speed={0.0012} />
                <GeometricShape position={[0, -5, -4]} size={0.9} color="#555555" speed={0.0015} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
