import { InstancedMesh } from "three";
import useSearchingStore from "../../stores/useSearchingStore";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import {
    BOX_COLOR,
    BOX_CURRENT_COLOR,
    BOX_FOUND_COLOR,
    BOX_SKIP_COLOR,
    CAMERA_OFFSET,
    CAMERA_ROTATION,
    TEXT_OFFSET,
    TEXT_STEP,
} from "../../data/Animations";
import { getAlgorithm } from "../../data/Algorithms";

const boxMaterial = new THREE.MeshStandardMaterial({
    color: BOX_COLOR,
    transparent: true,
    opacity: 0.95,
});

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export default function LinearSearch() {
    const camera = useThree((state) => state.camera);

    const searchAlgorithm = useSearchingStore((state) => state.algorithm);

    // Get the number list and the target from the state
    const numberList = useSearchingStore((state) => state.numberList);
    const numberListArray = useMemo(() => {
        const numArray = numberList.split(",").map((n) => parseInt(n));

        // If Sorting necessary
        const shouldSort = getAlgorithm(searchAlgorithm).sort;

        if (shouldSort) {
            numArray.sort((a, b) => a - b);
        }

        return numArray;
    }, [numberList, searchAlgorithm]);

    const numberTarget = useSearchingStore((state) => state.target);
    const stepSpeed = useSearchingStore((state) => state.stepSpeed);

    // Initiate the instanced mesh
    const instancedRef = useRef<InstancedMesh>(null);
    useEffect(() => {
        if (!instancedRef.current) return;
        instancedRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // Find the max number in the array
        const max = numberListArray.reduce((a, b) => Math.max(a, b), 0);
        // Fill the instanced mesh with scale and position in matrices
        for (let i = 0; i < numberListArray.length; i++) {
            const num = numberListArray[i];

            const boxHeight = (num / max) * 10;
            const matrix = new THREE.Matrix4();
            matrix.makeScale(1, boxHeight, 1);
            matrix.setPosition(i, boxHeight * 0.5, 0);

            instancedRef.current.setMatrixAt(i, matrix);
            instancedRef.current.setColorAt(i, new THREE.Color(BOX_COLOR));
        }
    }, [numberListArray, instancedRef]);

    // Start the animation
    useEffect(() => {
        // TODO: Place these in a common folder
        async function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        type MoveCameraArgs = {
            camera: THREE.Camera;
            position: number[];
            duration: number;
        };

        async function moveCamera({
            camera,
            position,
            duration,
        }: MoveCameraArgs) {
            return new Promise((resolve) => {
                gsap.to(camera.position, {
                    duration,
                    x: position[0],
                    y: position[1],
                    z: position[2],
                    onComplete: resolve,
                });
            });
        }

        async function setColor(
            index: number,
            color: string,
            duration: number = 0.5
        ) {
            if (!instancedRef.current) return;
            if (!instancedRef.current.instanceColor) return;

            // Get the current color, and then lerp
            const currentColor = new THREE.Color();
            const newColor = new THREE.Color(color);

            instancedRef.current.getColorAt(index, currentColor);
            gsap.to(currentColor, {
                r: newColor.r,
                g: newColor.g,
                b: newColor.b,
                duration,
                onUpdate: () => {
                    if (!instancedRef.current) return;
                    if (!instancedRef.current.instanceColor) return;

                    instancedRef.current.setColorAt(index, currentColor);
                    instancedRef.current.instanceColor.needsUpdate = true;
                },
            });
        }

        // Adjust the camera
        camera.rotation.x = CAMERA_ROTATION[0];
        camera.rotation.y = CAMERA_ROTATION[1];
        camera.rotation.z = CAMERA_ROTATION[2];

        // Start animation
        getAlgorithm(searchAlgorithm).function(numberListArray, numberTarget, {
            async eliminate(range) {
                for (let i = range[0]; i <= (range[1] ?? range[0]); i++) {
                    setColor(i, BOX_SKIP_COLOR);
                }

                await sleep(stepSpeed);
            },
            async found(i) {
                setColor(i, BOX_FOUND_COLOR);
                moveCamera({
                    camera,
                    position: [i, CAMERA_OFFSET[1], CAMERA_OFFSET[2]],
                    duration: stepSpeed * 0.001,
                });
            },
            async iteration(i) {
                // await sleep(stepSpeed);
                setColor(i, BOX_CURRENT_COLOR);
                await moveCamera({
                    camera,
                    position: [i, CAMERA_OFFSET[1], CAMERA_OFFSET[2]],
                    duration: stepSpeed * 0.001,
                });
                await sleep(stepSpeed);
            },
            async reset(i) {
                setColor(i, BOX_COLOR);
            },
        });
    }, [camera, numberListArray, numberTarget, searchAlgorithm, stepSpeed]);

    return (
        <>
            {/* <OrbitControls /> */}
            <directionalLight position={[1, 10, 1]} intensity={1} />
            <ambientLight />
            <instancedMesh
                args={[boxGeometry, boxMaterial, numberListArray.length]}
                ref={instancedRef}
            />
            <Html
                transform
                rotation-x={-Math.PI / 2}
                position={[0, 0, 1]}
                className="w-full text-center"
            >
                {numberListArray.map((num, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: i * TEXT_STEP + TEXT_OFFSET + "px",
                            width: "40px",
                        }}
                    >
                        <span>{num}</span>
                        <br />
                        <span className="text-xs">({i})</span>
                    </div>
                ))}
            </Html>
        </>
    );
}
