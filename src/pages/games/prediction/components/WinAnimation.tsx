import { Flex } from "@chakra-ui/react"
import { useCallback } from "react"
// eslint-disable-next-line import/no-named-as-default
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { type Engine } from "tsparticles-engine"
import { loadConfettiPreset } from "tsparticles-preset-confetti"

export const WinAnimation = () => {
	const particlesInit = useCallback(async (engine: Engine) => {
		// const fixRange = (
		//   value: IRangeValue,
		//   min: number,
		//   max: number
		// ): RangeValue => {
		//   const diffSMax = value.max > max ? value.max - max : 0
		//   let res = setRangeValue(value)

		//   if (diffSMax) {
		//     res = setRangeValue(value.min - diffSMax, max)
		//   }

		//   const diffSMin = value.min < min ? value.min : 0

		//   if (diffSMin) {
		//     res = setRangeValue(0, value.max + diffSMin)
		//   }

		//   return res
		// }

		// const Options: RecursivePartial<IParticlesOptions>[] = [
		//   "#ff595e",
		//   "#ffca3a",
		//   "#8ac926",
		//   "#1982c4",
		//   "#6a4c93"
		// ]
		//   .map((color) => {
		//     const rgb = stringToRgb(color)

		//     if (!rgb) {
		//       return undefined
		//     }

		//     const hsl = rgbToHsl(rgb),
		//       sRange = fixRange({ min: hsl.s - 30, max: hsl.s + 30 }, 0, 100),
		//       lRange = fixRange({ min: hsl.l - 30, max: hsl.l + 30 }, 0, 100)

		//     return {
		//       color: {
		//         value: {
		//           h: hsl.h,
		//           s: sRange,
		//           l: lRange
		//         }
		//       },
		//       stroke: {
		//         width: 0
		//       },
		//       number: {
		//         value: 0
		//       },
		//       opacity: {
		//         value: {
		//           min: 0.1,
		//           max: 1
		//         },
		//         animation: {
		//           enable: true,
		//           speed: 0.7,
		//           sync: false,
		//           startValue: "max",
		//           destroy: "min"
		//         }
		//       },
		//       shape: {
		//         type: "circle"
		//       },
		//       size: {
		//         value: { min: 1, max: 2 },
		//         animation: {
		//           enable: true,
		//           speed: 5,
		//           count: 1,
		//           sync: false,
		//           startValue: "min",
		//           destroy: "none"
		//         }
		//       },
		//       life: {
		//         count: 1,
		//         duration: {
		//           value: {
		//             min: 1,
		//             max: 2
		//           }
		//         }
		//       },
		//       move: {
		//         decay: { min: 0.075, max: 0.1 },
		//         enable: true,
		//         gravity: {
		//           enable: true,
		//           inverse: false,
		//           acceleration: 5
		//         },
		//         speed: { min: 5, max: 15 },
		//         direction: "none",
		//         outModes: "destroy"
		//       }
		//     } as RecursivePartial<IParticlesOptions>
		//   })
		//   .filter((t) => t !== undefined) as RecursivePartial<IParticlesOptions>[]

		// const count = 200
		// const defaults = {
		// 	origin: { y: 0.7 }
		// }

		// function fire(particleRatio, opts) {
		//   confetti(
		//     Object.assign({}, defaults, opts, {
		//       particleCount: Math.floor(count * particleRatio)
		//     })
		//   )
		// }

		const configs = {
			detectRetina: true,
			emitters: [
				{
					life: {
						count: 2,
						duration: 3
					},
					particles: {
						move: {
							direction: "top-right"
						}
					},
					position: {
						x: 20,
						y: 30
					},
					rate: {
						quantity: 8
					}
				},
				{
					life: {
						count: 2,
						duration: 3
					},
					particles: {
						move: {
							direction: "top-left"
						}
					},
					position: {
						x: 95,
						y: 30
					},
					rate: {
						quantity: 8
					}
				},
				{
					life: {
						count: 2,
						duration: 3
					},
					particles: {
						move: {
							direction: "top"
						}
					},
					position: {
						x: 57,
						y: 30
					},
					rate: {
						quantity: 8
					}
				}
			],
			// background: {
			//   color: "rgba(255,255,255,0)"
			// },
			fpsLimit: 120,

			preset: "confetti"
			// emitters: {
			//   direction: "top",
			//   life: {
			//     count: 0,
			//     duration: 0.1,
			//     delay: 0.1
			//   },
			//   rate: {
			//     delay: 0.05,
			//     quantity: 1
			//   },
			//   size: {
			//     width: 100,
			//     height: 0
			//   },
			//   position: {
			//     y: 100,
			//     x: 50
			//   }
			// },
			// particles: {
			//   number: {
			//     value: 0
			//   },
			//   destroy: {
			//     mode: "split",
			//     bounds: {
			//       top: { min: 10, max: 30 }
			//     },
			//     split: {
			//       sizeOffset: false,
			//       count: 1,
			//       factor: {
			//         value: 0.333333
			//       },
			//       rate: {
			//         value: { min: 75, max: 150 }
			//       },
			//       particles: fireworksOptions
			//     }
			//   },
			//   life: {
			//     count: 1
			//   },
			//   shape: {
			//     type: "line"
			//   },
			//   size: {
			//     value: {
			//       min: 0.1,
			//       max: 50
			//     },
			//     animation: {
			//       enable: true,
			//       sync: true,
			//       speed: 90,
			//       startValue: "max",
			//       destroy: "min"
			//     }
			//   },
			//   stroke: {
			//     color: {
			//       value: "#ffffff"
			//     },
			//     width: 1
			//   },
			//   rotate: {
			//     path: true
			//   },
			//   move: {
			//     enable: true,
			//     gravity: {
			//       acceleration: 15,
			//       enable: true,
			//       inverse: true,
			//       maxSpeed: 100
			//     },
			//     speed: {
			//       min: 10,
			//       max: 20
			//     },
			//     outModes: {
			//       default: "destroy",
			//       top: "none"
			//     },
			//     trail: {
			//       fillColor: "rgba(255,0,255,0)",
			//       enable: true,
			//       length: 10
			//     }
			//   }
			// }
		}

		// you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine)
		await loadConfettiPreset(engine)
		await engine.load("test", configs)
	}, [])

	// const particlesLoaded = useCallback((container: Container | undefined) => {
	// 	console.log(container)
	// }, [])

	return (
		<Flex w="full">
			<Particles
				id="tsparticles"
				// url="http://foo.bar/particles.json"
				init={particlesInit}
				// loaded={particlesLoaded}
			/>
		</Flex>
	)
}
