import useSearchingStore from "../../stores/useSearchingStore";
import { Html, OrbitControls, Plane, Stage } from "@react-three/drei";
import * as THREE from "three";
import { createRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    transparent: true,
    opacity: 0.95,
});

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LinearSearch() {
    const camera = useThree((state) => state.camera);

    // Get the number list and the target from the state
    const numberList = useSearchingStore((state) => state.numberList);
    const numberListArray = useMemo(
        () => numberList.split(",").map((n) => parseInt(n)),
        [numberList]
    );

    const toSearch = useSearchingStore((state) => state.toSearch);
    const stepSpeed = useSearchingStore((state) => state.stepSpeed);

    // Initialize boxes and their refs
    const boxRefs = useMemo(
        () => numberList.split(",").map(() => createRef()),
        [numberList]
    );
    const boxMaterials = useMemo(
        () => numberList.split(",").map(() => boxMaterial.clone()),
        [numberList]
    );

    const boxes = useMemo(() => {
        return numberListArray.map((number, i) => (
            <group ref={boxRefs[i]} position={[i, number * 0.5, 0]} key={i}>
                <mesh
                    key={i}
                    geometry={boxGeometry}
                    material={boxMaterials[i]}
                    scale={[1, number, 1]}
                />
                <Html
                    center
                    transform
                    rotation-x={-Math.PI / 2}
                    position={[0, -number / 2, 1.5]}
                >
                    <div className="text-center">
                        <div>{i}</div>
                        <div className="text-sm">({number})</div>
                    </div>
                </Html>
            </group>
        ));
    }, [numberListArray, boxRefs, boxMaterials]);

    useEffect(() => {
        // Do the animation
        function setGreen(material: THREE.MeshStandardMaterial) {
            gsap.to(material.emissive, {
                duration: 0.5,
                r: 0.2,
                g: 0.8,
                b: 0.2,
            });

            gsap.to(material, {
                duration: 0.5,
                opacity: 1,
            });
        }

        function setRed(material: THREE.MeshStandardMaterial) {
            gsap.to(material.emissive, {
                duration: 0.5,
                r: 0.8,
                g: 0.2,
                b: 0.2,
            });

            gsap.to(material, {
                duration: 0.5,
                opacity: 1,
            });
        }

        async function startAnimation() {
            camera.rotation.x = -Math.PI / 4;
            for (let i = 0; i < numberListArray.length; i++) {
                // Focus on the current box
                const boxPosition = boxRefs[i].current.position;
                gsap.to(camera.position, {
                    duration: 1,
                    x: boxPosition.x,
                    y: 8,
                    z: boxPosition.z + 6,
                });

                if (numberListArray[i] == toSearch) {
                    setGreen(boxMaterials[i]);
                    await sleep(1000);

                    // Set the rest to red
                    for (let j = i + 1; j < numberListArray.length; j++) {
                        setRed(boxMaterials[j]);
                    }

                    // Destroy them after
                    for (let j = 0; j < numberListArray.length; j++) {
                        if (j === i) continue;

                        const boxPosition = boxRefs[j].current.position;
                        const boxOffset = j < i ? -5 : 5;

                        gsap.to(boxRefs[j].current.position, {
                            duration: 1,
                            x: boxPosition.x + boxOffset,
                        });
                    }

                    break;
                }

                setRed(boxMaterials[i]);
                await sleep(stepSpeed);
            }
        }

        startAnimation();
    }, [boxRefs, numberListArray, boxMaterials, toSearch, stepSpeed]);

    return (
        <>
            {/* <OrbitControls /> */}
            <directionalLight position={[1, 10, 1]} intensity={1} />
            {boxes}
        </>
    );
}
