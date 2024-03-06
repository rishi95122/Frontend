// import { Canvas, useFrame } from "@react-three/fiber"
// import { Player } from "./meshes/Player"
// import { Suspense } from "react"
// import {
//   useGLTF,
//   OrbitControls,
//   Sky,
//   Environment,
//   Cloud
// } from "@react-three/drei"
// import { Physics, RigidBody } from "@react-three/rapier"
// import { Ground } from "./meshes/Ground"
// import { FallingSword } from "./meshes/FallingSword"
// import useWebSocket, { ReadyState } from "react-use-websocket"
// import { Button } from "@chakra-ui/react"

// export const CubeDash = () => {
//   const { sendMessage, lastJsonMessage, readyState } = useWebSocket<{
//     address: string
//   }>("ws://0.0.0.0:1337/websocket", {
//     onOpen: () => console.log("Opened Connection")
//   })

//   const handleClick = () => {
//     sendMessage("React")
//   }

//   return (
//     <>
//       {/* <Button onClick={handleClick}></Button> */}
//       <Canvas shadows camera={{ position: [-30, 5, 0], fov: 40 }}>
//         <Suspense fallback={null}>
//           <hemisphereLight intensity={0.45} />
//           <spotLight
//             angle={0.4}
//             penumbra={1}
//             position={[20, 30, 2.5]}
//             castShadow
//             shadow-bias={-0.00001}
//           />
//           <directionalLight
//             color="red"
//             position={[-10, -10, 0]}
//             intensity={1.5}
//           />
//           <Cloud scale={1.5} position={[20, 0, 0]} />
//           <Cloud scale={1} position={[-20, 10, 0]} />
//           <Environment preset="city" />
//           <Sky />
//           <Physics colliders={false} gravity={[0, -20, 0]}>
//             <FallingSword />
//             <Player />
//             <Ground position={[0, -3, 0]} />
//           </Physics>

//           {/* <Physics colliders={false}>
//           {debug && <Debug />}
//           <group position={[2, 3, 0]}>
//             <Track position={[-3, 0, 10.5]} rotation={[0, -0.4, 0]} />
//             <Sphere position={[-12, 13, 0]} />
//             <Sphere position={[-9, 13, 0]} />
//             <Sphere position={[-6, 13, 0]} />
//             <Pacman />
//           </group>
//         </Physics>
//         <OrbitControls /> */}
//         </Suspense>
//       </Canvas>
//     </>
//   )
// }
