import { PerspectiveCamera } from "@react-three/drei";

const Camera: React.FC = () => {
    return (
        <PerspectiveCamera makeDefault position={[100, 0, 100]} fov={50} />
    )
}

export default Camera;