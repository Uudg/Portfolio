import { GroupProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Mesh } from "three";

interface ModelProps extends GroupProps {
    position: [number, number, number];
    correction: number;
}

const Model: React.FC<ModelProps> = ({ position, correction }) => {
    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (meshRef.current) {
                const x = (event.clientX / window.innerWidth) * 2 - 1;
                const y = (event.clientY / window.innerHeight) * 2 - 1;
                meshRef.current.rotation.z = x * 0.2 * Math.PI + correction;
                meshRef.current.rotation.y = y * 0.2 * Math.PI;
            }
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (meshRef.current && event.touches.length > 0) {
                const x =
                    (event.touches[0].clientX / window.innerWidth) * 2 - 1;
                const y =
                    (event.touches[0].clientY / window.innerHeight) * 2 - 1;
                meshRef.current.rotation.z = x * 0.2 * Math.PI + correction;
                meshRef.current.rotation.y = y * 0.2 * Math.PI;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [correction]);

    const [hovered, setHovered] = useState(false);
    const [eyeColor, setEyeColor] = useState("");

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
        setEyeColor(hovered ? "skyblue" : "white");
    }, [hovered]);

    const { nodes, materials } = useGLTF("/scene.gltf") as {
        nodes: any;
        materials: any;
    };

    return (
        <mesh
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <group
                scale={[0.1, 0.1, 0.1]}
                position={position}
                dispose={null}
                rotation={[0, -45, 0]}
            >
                <group position={[-0.526, -11.646, 0]}>
                    <group rotation={[0, 0, 0]}>
                        <mesh
                            ref={meshRef}
                            geometry={
                                (nodes.eye_eye_material_0 as THREE.Mesh)
                                    .geometry
                            }
                            material={materials.eye_material}
                            rotation={[-Math.PI / 2, 0, 0]}
                            material-color={eyeColor}
                            scale={100}
                        ></mesh>
                        <mesh
                            geometry={
                                (nodes.sclera_sclera_material_0 as THREE.Mesh)
                                    .geometry
                            }
                            material={materials.sclera_material}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        />
                    </group>
                </group>
            </group>
        </mesh>
    );
};

export default Model;
