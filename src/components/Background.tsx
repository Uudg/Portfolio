import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./bg.css"
import React, {useEffect} from "react";
import Light from "./scene/Light";
import Eyes from "./scene/Eyes";
import Camera from "./scene/Camera";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import Preloader from "./Preloared";

type BackgroundProps = {
    isLoaded: boolean;
}

const Background: React.FC<BackgroundProps> = ({isLoaded}) => {
    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/scene.gltf', function () {
            // scene.add(gltf.scene);
        const preloader = document.querySelector('.preloader');
            setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hide');
            }
            }, 800)
});
    }, []);
    
    return(
        <>
                <Preloader/>
                <div className="bg">
                    <Canvas
                    className="bg"
                // style={{ width: "100%", height: "100%" }}
                >
                    <fog attach="fog" color="#161616" near={1} far={700} />
                    <Camera/>
                    <Light isLoaded={isLoaded}/>
                    <OrbitControls enabled={false}/>
                    <Eyes isLoaded={isLoaded}/>
                    {/* <axesHelper args={[50]}/> */}
                </Canvas>
                </div>
                
        </>
    )
}

export default Background;