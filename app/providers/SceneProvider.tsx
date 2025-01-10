import React, { createContext, useContext, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { motion, AnimatePresence } from "framer-motion";

type SceneContextType = {
    isLoaded: boolean;
};

const SceneContext = createContext<SceneContextType | undefined>(undefined);

const asciiFrames = [
    `
    ██████╗     ██████╗ 
    ██╔══██╗    ██╔══██╗
    ██║  ██║    ██████╔╝
    ██║  ██║    ██╔═══╝ 
    ██████╔╝    ██║     
    ╚═════╝     ╚═╝     
    `,
    `
    ▓▓▓▓▓▓▓     ▓▓▓▓▓▓▓ 
    ▓▓╔══▓▓     ▓▓╔══▓▓ 
    ▓▓║  ▓▓     ▓▓▓▓▓▓╝ 
    ▓▓║  ▓▓     ▓▓╔═══  
    ▓▓▓▓▓▓╝     ▓▓║     
    ╚════╝      ╚═╝     
    `,
    `
    ░░░░░░░     ░░░░░░░ 
    ░░╔══░░     ░░╔══░░ 
    ░░║  ░░     ░░░░░░╝ 
    ░░║  ░░     ░░╔═══  
    ░░░░░░╝     ░░║     
    ╚════╝      ╚═╝     
    `,
];

const LoadingOverlay = () => (
    <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
        <div className="flex flex-col items-center gap-8">
            <motion.pre
                className="text-[0.5rem] sm:text-sm md:text-base font-mono whitespace-pre select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                    },
                }}
            >
                {asciiFrames.map((frame, index) => (
                    <motion.div
                        key={index}
                        initial={{ display: "none", opacity: 0 }}
                        animate={{
                            display: "block",
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                repeatDelay: 0.2,
                                delay: index * 0.2,
                            },
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {frame}
                    </motion.div>
                ))}
            </motion.pre>
        </div>
    </motion.div>
);

export const SceneProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load("/scene.gltf", function () {
            setTimeout(() => {
                setIsLoaded(true);
            }, 1000);
        });
    }, []);

    return (
        <SceneContext.Provider value={{ isLoaded }}>
            <AnimatePresence>{!isLoaded && <LoadingOverlay />}</AnimatePresence>
            {isLoaded && children}
        </SceneContext.Provider>
    );
};

export const useScene = () => {
    const context = useContext(SceneContext);
    if (context === undefined) {
        throw new Error("useScene must be used within a SceneProvider");
    }
    return context;
};
