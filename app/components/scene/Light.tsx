import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight, SpotLightHelper, Vector3, Color } from "three";
import { useLocation } from "@remix-run/react";

const THEME_COLORS = {
    primary: "#ffffff",
    about: "#4A90E2",
    aboutInfo: "#4A90E2",
    aboutSocials: "#FF69B4",
    projects: "#50E3C2",
    blog: "#B4A7D6",
};

interface SpotlightProps {
    position: Vector3;
}

const SpotlightComponent: React.FC<SpotlightProps> = ({ position }) => {
    const spotLightRef = useRef<SpotLight>(null);
    const spotLightHelperRef = useRef<SpotLightHelper | null>(null);
    const location = useLocation();
    const [targetColor, setTargetColor] = useState(
        new Color(THEME_COLORS.primary)
    );
    const [currentColor] = useState(new Color(THEME_COLORS.primary));
    const [currentIntensity, setCurrentIntensity] = useState(0);
    const [isInitializing, setIsInitializing] = useState(true);
    const flickerTimeoutRef = useRef<NodeJS.Timeout[]>([]);

    const flicker = () => {
        const sequence = [
            { intensity: 0, duration: 100 },
            { intensity: 1200, duration: 50 },
            { intensity: 200, duration: 100 },
            { intensity: 0, duration: 50 },
            { intensity: 800, duration: 100 },
            { intensity: 400, duration: 50 },
            { intensity: 1800, duration: 100 },
        ];

        let totalDelay = 0;
        sequence.forEach(({ intensity, duration }, index) => {
            const timeout = setTimeout(() => {
                setCurrentIntensity(intensity);
                if (index === sequence.length - 1) {
                    setIsInitializing(false);
                }
            }, totalDelay);
            totalDelay += duration;
            flickerTimeoutRef.current.push(timeout);
        });
    };

    useEffect(() => {
        if (isInitializing) {
            flicker();
        }
        return () => {
            flickerTimeoutRef.current.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (!isInitializing) {
            const pathname = location.pathname;
            let newColor = THEME_COLORS.primary;

            if (pathname === "/about/info") {
                newColor = THEME_COLORS.aboutInfo;
            } else if (pathname === "/about/socials") {
                newColor = THEME_COLORS.aboutSocials;
            } else if (pathname.includes("projects")) {
                newColor = THEME_COLORS.projects;
            } else if (pathname.includes("blog")) {
                newColor = THEME_COLORS.blog;
            }

            setTargetColor(new Color(newColor));
        }
    }, [location.pathname, isInitializing]);

    useFrame(() => {
        if (spotLightRef.current) {
            currentColor.lerp(targetColor, 0.05);
            spotLightRef.current.color.set(currentColor);
        }
        if (spotLightHelperRef.current) {
            spotLightHelperRef.current.update();
        }
    });

    return (
        <spotLight
            ref={spotLightRef}
            position={position.toArray()}
            distance={100}
            angle={Math.PI / 8}
            penumbra={1}
            intensity={currentIntensity}
            power={7000}
            color={currentColor}
            castShadow
        />
    );
};

const Light: React.FC<{ isLoaded: boolean }> = () => {
    return (
        <>
            <SpotlightComponent position={new Vector3(80, 0, 0)} />
            <SpotlightComponent position={new Vector3(0, 0, 80)} />
        </>
    );
};

export default Light;
