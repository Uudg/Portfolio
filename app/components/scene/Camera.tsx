import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useState } from "react";

const Camera: React.FC = () => {
    const [distance, setDistance] = useState(75);

    useEffect(() => {
        const start = Date.now();
        const duration = 1500;

        const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easing = (1 - Math.cos(progress * Math.PI)) / 2;
            const newDistance = 75 + 25 * easing;
            setDistance(newDistance);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }, []);

    return (
        <PerspectiveCamera
            makeDefault
            position={[distance, 0, distance]}
            fov={50}
        />
    );
};

export default Camera;
