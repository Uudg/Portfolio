import Model from "./Model";

const correction = {
    right: 0,
    left: 0.3925,
};

type EyeProps = {
    isLoaded: boolean;
};

const Eyes: React.FC<EyeProps> = () => {
    return (
        <>
            <group>
                <Model position={[25, 0, 0]} correction={correction["right"]} />
                <Model position={[0, 0, 25]} correction={correction["left"]} />
            </group>
        </>
    );
};

export default Eyes;
