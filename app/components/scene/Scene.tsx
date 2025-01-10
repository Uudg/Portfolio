import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./bg.css";
import React, { useState, useEffect } from "react";
import Light from "./Light";
import Camera from "./Camera";
import Eyes from "./Eyes";
import { useScene } from "~/providers/SceneProvider";
import { motion, useMotionValue, useSpring } from "framer-motion";

const asciiText = `██████╗     ██████╗ 
██╔══██╗    ██╔══██╗
██║  ██║    ██████╔╝
██║  ██║    ██╔═══╝ 
██████╔╝    ██║     
╚═════╝     ╚═╝     `;

const Background = () => {
    const { isLoaded } = useScene();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 100 };
    const translateX = useSpring(mouseX, springConfig);
    const translateY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const moveRangeX = (clientX / window.innerWidth - 0.5) * 20;
            const moveRangeY = (clientY / window.innerHeight - 0.5) * 20;
            mouseX.set(moveRangeX);
            mouseY.set(moveRangeY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed w-screen h-screen -z-0">
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.03 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        x: translateX,
                        y: translateY,
                    }}
                    className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-mono 
                              pointer-events-none text-white z-0 whitespace-pre"
                >
                    {asciiText}
                </motion.pre>
            </div>
            <Canvas className="w-full h-full hidden md:block">
                <fog attach="fog" color="#161616" near={1} far={700} />
                <Camera />
                <Light isLoaded={isLoaded} />
                <OrbitControls enabled={false} />
                <Eyes isLoaded={isLoaded} />
            </Canvas>
        </div>
    );
};

export default Background;
