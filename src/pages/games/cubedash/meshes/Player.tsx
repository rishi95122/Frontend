// import { MeshProps, useFrame } from "@react-three/fiber"
// import { RapierRigidBody, RigidBody } from "@react-three/rapier"
// import { motion } from "framer-motion-3d"
// import { useCallback, useEffect, useRef, useState } from "react"
// import * as THREE from "three"

// export type Animations = {
//   [name: string]: {
//     clip: THREE.AnimationAction
//   }
// }

// export const Player = (props) => {
//   const character = useRef<THREE.Mesh>(null!)
//   const rigidBody = useRef<RapierRigidBody>(null)

//   const activeAnimation: {
//     forward: boolean
//     backward: boolean
//     left: boolean
//     right: boolean
//     run: boolean
//   } = {
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//     run: false
//   }

//   const decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0)
//   const acceleration = new THREE.Vector3(1, 0.125, 100.0)
//   const velocity = new THREE.Vector3(0, 0, 0)

//   let isJumping = false

//   // Controll Input
//   const handleKeyPress = useCallback((event) => {
//     switch (event.keyCode) {
//       case 87: //w
//         activeAnimation.forward = true
//         if (!isJumping) {
//           //@ts-ignore
//           rigidBody.current.applyImpulse({ x: 0, y: 10, z: 0 }, true)
//         }

//         isJumping = true

//         break

//       case 65: //a
//         activeAnimation.left = true
//         break

//       case 83: //s
//         activeAnimation.backward = true
//         break

//       case 68: // d
//         activeAnimation.right = true
//         break

//       case 16: // shift
//         activeAnimation.run = true
//         break
//     }
//   }, [])

//   const handleKeyUp = useCallback((event) => {
//     switch (event.keyCode) {
//       case 87: //w
//         activeAnimation.forward = false
//         break

//       case 65: //a
//         activeAnimation.left = false
//         break

//       case 83: //s
//         activeAnimation.backward = false
//         break

//       case 68: // d
//         activeAnimation.right = false
//         break

//       case 16: // shift
//         activeAnimation.run = false
//         break
//     }
//   }, [])

//   // movement
//   const characterState = (delta: number) => {
//     const newVelocity = velocity
//     const frameDecceleration = new THREE.Vector3(
//       newVelocity.x * decceleration.x,
//       newVelocity.y * decceleration.y,
//       newVelocity.z * decceleration.z
//     )
//     frameDecceleration.multiplyScalar(delta)
//     frameDecceleration.z =
//       Math.sign(frameDecceleration.z) *
//       Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z))

//     newVelocity.add(frameDecceleration)

//     const controlObject = character.current
//     const _R = controlObject.quaternion.clone()

//     const acc = acceleration.clone()
//     if (activeAnimation.run) {
//       acc.multiplyScalar(2.0)
//     }

//     if (activeAnimation.left) {
//       newVelocity.z -= acc.z * delta
//     }
//     if (activeAnimation.right) {
//       newVelocity.z += acc.z * delta
//     }

//     controlObject.quaternion.copy(_R)

//     const oldPosition = new THREE.Vector3()
//     oldPosition.copy(controlObject.position)

//     const forward = new THREE.Vector3(0, 0, 1)
//     forward.applyQuaternion(controlObject.quaternion)
//     forward.normalize()

//     forward.multiplyScalar(newVelocity.z * delta)

//     controlObject.position.add(forward)

//     character.current.position.copy(controlObject.position)
//   }

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyPress)

//     document.addEventListener("keyup", handleKeyUp)

//     return () => {
//       document.removeEventListener("keydown", handleKeyPress)

//       document.removeEventListener("keyup", handleKeyUp)
//     }
//   })

//   useFrame((_, delta) => {
//     characterState(delta)
//   })

//   return (
//     <RigidBody
//       colliders="cuboid"
//       restitution={0}
//       enabledRotations={[false, true, false]}
//       ref={rigidBody}
//       onCollisionEnter={({ manifold, target, other }) => {
//         console.log(
//           "Collision at world position ",
//           manifold.solverContactPoint(0)
//         )

//         if (other.rigidBodyObject) {
//           isJumping = false
//           console.log(
//             // this rigid body's Object3D
//             //@ts-ignore
//             target.rigidBodyObject.name,
//             " collided with ",
//             // the other rigid body's Object3D
//             other.rigidBodyObject.name
//           )
//         }
//       }}
//     >
//       <motion.mesh
//         {...props}
//         ref={character}
//         // animate={clicked ? { scale: 1.5 } : { scale: 1 }}
//         // onClick={(event) => click(!clicked)}
//         // onPointerOver={(event) => hover(true)}
//         // onPointerOut={(event) => hover(false)}
//       >
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial />
//       </motion.mesh>
//     </RigidBody>
//   )
// }
