import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight, SpotLightHelper, Vector3, Color } from "three";
import { useLocation } from "react-router-dom";

// Define the color mapping for different paths

interface SpotlightProps {
  position: Vector3;
}

const SpotlightComponent: React.FC<SpotlightProps> = ({ position }) => {
  const spotLightRef = useRef<SpotLight>(null);
  const spotLightHelperRef = useRef<SpotLightHelper | null>(null);
//   const { scene } = useThree();
  const location = useLocation();
  const [targetColor, setTargetColor] = useState(new Color("#fff"));
  const [currentColor] = useState(new Color("#fff"));

  useEffect(() => {
    // Set target color based on location
    const newColor = {
        "/": "white",
        "/about": "skyblue",
        "/about/info": "skyblue",
        "/about/work": "skyblue",
        "/about/social": "magenta",
        "/projects": "#46F946",
    }[location.pathname] || "#fff";
    setTargetColor(new Color(newColor));
  }, [location.pathname]);

  useFrame(() => {
    if (spotLightRef.current) {
      // Smoothly interpolate the light's color towards the target color
      currentColor.lerp(targetColor, 0.05);
      spotLightRef.current.color.set(currentColor);
    }
    if (spotLightHelperRef.current) {
      spotLightHelperRef.current.update();
    }
  });

//   useEffect(() => {
//     // Initialization and cleanup code for the light and helper
//     if (spotLightRef.current) {
//       const target = new Vector3(0, 0, 0);
//       spotLightRef.current.target.position.copy(target);
//       spotLightRef.current.lookAt(target);
//       spotLightRef.current.updateMatrixWorld();

//       const helper = new SpotLightHelper(spotLightRef.current);
//       spotLightHelperRef.current = helper;
//       scene.add(helper);
//       return () => {
//         if (spotLightHelperRef.current) {
//           scene.remove(spotLightHelperRef.current);
//         }
//       };
//     }
//   }, [scene]);

  return (
    <spotLight
      ref={spotLightRef}
      position={position.toArray()}
      distance={100}
      angle={Math.PI / 8}
      penumbra={1}
      intensity={800}
      power={7000}
      color={currentColor}
      castShadow
    />
  );
};

// const FollowLight: React.FC = () => {
//   const [position, setPosition] = useState(new Vector3(80, 0, 80));
//   const [angle, setAngle] = useState(Math.PI / 8);
//   const spotLightRef = useRef<SpotLight>(null);
//   const spotLightHelperRef = useRef<SpotLightHelper | null>(null);
//   const { scene, camera, size } = useThree();
//   const newPos = new Vector3();

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       const x = (event.clientX / size.width) * 2 - 1;
//     const y = -(event.clientY / size.height) * 2 + 1;

//     const vector = new Vector3(x, y, 100);
//     vector.unproject(camera);
//     const dir = vector.sub(camera.position).normalize();
//     let distance;
//     if (x <= 0) {
//         distance = -camera.position.z / (dir.x + Number.EPSILON);
//     } else {
//         distance = -camera.position.z / dir.z;
//     }

//     distance *= 0.3;

//     console.log(x);
//     newPos.copy(camera.position).add(dir.multiplyScalar(distance));
//       setPosition(newPos);
//     setPosition(newPos);

//       const target = new Vector3(50, 0, 50);
//       const distToTarget = newPos.distanceTo(target);
//       let newAngle;
//       if (x == 0) {
//         newAngle = Math.PI / 2 / (distToTarget / 1);
//       } else newAngle = Math.max(0.1, Math.min(Math.PI / 2, 1 / (distToTarget / 20)));

//       if (x === 0) {
//     newAngle *= 10; // Adjust this factor as needed
//   }
//       setAngle(newAngle);
      
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [camera, size]);
//   const location = useLocation();
//   const [targetColor, setTargetColor] = useState(new Color("#fff"));
//   const [currentColor] = useState(new Color("#fff"));

//   useEffect(() => {
//     // Set target color based on location
//     const newColor = {
//         "/": "white",
//         "about/": "skyblue",
//         "/about/info": "skyblue",
//         "/about/work": "skyblue",
//         "/about/social": "magenta",
//         "/projects": "#46F946",
//     }[location.pathname] || "#fff";
//     setTargetColor(new Color(newColor));
//   }, [location.pathname]);

//   useFrame(() => {
//     if (spotLightRef.current) {
//       // Smoothly interpolate the light's color towards the target color
//       currentColor.lerp(targetColor, 0.05);
//       spotLightRef.current.color.set(currentColor);
//     }
//     if (spotLightHelperRef.current) {
//       spotLightHelperRef.current.update();
//     }
//   });
// //   useEffect(() => {
// //     if (spotLightRef.current) {
// //       spotLightRef.current.lookAt(new Vector3(0, 0, 0));
// //     }
// //     if (spotLightHelperRef.current) {
// //       spotLightHelperRef.current.update();
// //     }
// //   }, [position]);

// //   useEffect(() => {

// //       const target = new Vector3(25, 0, 25);
// //     const axesHelper = new AxesHelper(5); // Adjust size as needed
// //     axesHelper.position.copy(target);
// //     scene.add(axesHelper);

// //     if (spotLightRef.current) {
// //       const target = new Vector3(0, 0, 0);
// //       spotLightRef.current.target.position.copy(target);
// //       spotLightRef.current.lookAt(target);
// //       spotLightRef.current.updateMatrixWorld();

// //       const helper = new SpotLightHelper(spotLightRef.current);
// //       spotLightHelperRef.current = helper;
// //       scene.add(helper);
// //       return () => {
// //         if (spotLightHelperRef.current) {
// //           scene.remove(spotLightHelperRef.current);
// //         }
// //       };
// //     }
// //     return () => {
// //         scene.remove(axesHelper);
// //     };
// //   }, [scene]);

//   return (
//     <spotLight
//       ref={spotLightRef}
//       position={position.toArray()}
//       distance={1200}
//       angle={angle}
//       penumbra={1}
//       intensity={800}
//       power={10000}
//       color={currentColor}
//       castShadow
//     />
//   );
// };

type LightProps = {
  isLoaded: boolean;
}

const Light: React.FC<LightProps> = () => {
    // const [light1, setLight1] = useState(false)
    // const [light2, setLight2] = useState(false)

    // useEffect(() => {
    //     if (isLoaded) {
    //         setLight1(true)
    //         setLight2(true)
    //     }
    // }, [isLoaded])

  return (
    <>
        <SpotlightComponent position={new Vector3(80, 0, 0)} />
        <SpotlightComponent position={new Vector3(0, 0, 80)} />
        {/* <FollowLight/> */}
    </>
  );
};

export default Light;