import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import useSortingStore from "../../stores/useSortingStore";
import {
    BOX_COLOR,
    BOX_CURRENT_COLOR,
    BOX_FOUND_COLOR,
    CAMERA_OFFSET,
    CAMERA_ROTATION,
} from "../../data/Animations";
import { useThree } from "@react-three/fiber";
import * as SortingAlgorithms from "../../algorithms/sorting";

const boxMaterial = new THREE.MeshStandardMaterial({
    color: BOX_COLOR,
    transparent: true,
    opacity: 0.95,
});

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export default function Animation() {
    const camera = useThree((state) => state.camera);
    const numberList = useSortingStore((state) => state.numberList);

    const numberListArray = useMemo(
        () => numberList.split(",").map((n) => parseInt(n)),
        [numberList]
    );

    const sortAlgorithm = useSortingStore((state) => state.algorithm);
    const stepSpeed = useSortingStore((state) => state.stepSpeed);

    // Initiate the instanced mesh
    const instancedRef = useRef<THREE.InstancedMesh>(null);
    const instanceLinker = useMemo(() => [] as number[], []);

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

            instanceLinker[i] = i;
        }
    }, [numberListArray, instancedRef, instanceLinker]);

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
        const animationSortCallbacks: SortCallbacks = {
            async iteration(i: number) {
                if (!useSortingStore.getState().showAnimation) {
                    this.stop = true;
                    return;
                }

                setColor(instanceLinker[i], BOX_CURRENT_COLOR);
                await moveCamera({
                    camera,
                    position: [i, CAMERA_OFFSET[1], CAMERA_OFFSET[2]],
                    duration: stepSpeed * 0.001,
                });
            },
            async reset(...i: number[]) {
                if (!useSortingStore.getState().showAnimation) {
                    this.stop = true;
                    return;
                }

                for (const index of i) {
                    setColor(instanceLinker[index], BOX_COLOR);
                }
            },
            async swap(i: number, j: number) {
                if (!instancedRef.current) return;

                const instanceI = instanceLinker[i];
                const instanceJ = instanceLinker[j];

                instanceLinker[i] = instanceJ;
                instanceLinker[j] = instanceI;

                const matrixI = new THREE.Matrix4();
                const matrixJ = new THREE.Matrix4();

                instancedRef.current.getMatrixAt(instanceI, matrixI);
                instancedRef.current.getMatrixAt(instanceJ, matrixJ);

                const next_i = matrixJ.elements[12];
                const next_j = matrixI.elements[12];

                // Make i move forward, and j backwards first
                gsap.to(matrixI.elements, {
                    duration: stepSpeed * 0.001 * 0.5,
                    14: 1,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceI, matrixI);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                gsap.to(matrixJ.elements, {
                    duration: stepSpeed * 0.001 * 0.5,
                    14: -1,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceJ, matrixJ);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                await sleep(stepSpeed * 0.5);

                gsap.to(matrixI.elements, {
                    duration: stepSpeed * 0.001,
                    12: next_i,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceI, matrixI);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                gsap.to(matrixJ.elements, {
                    duration: stepSpeed * 0.001,
                    12: next_j,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceJ, matrixJ);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                await sleep(stepSpeed);

                gsap.to(matrixI.elements, {
                    duration: stepSpeed * 0.001 * 0.5,
                    14: 0,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceI, matrixI);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                gsap.to(matrixJ.elements, {
                    duration: stepSpeed * 0.001 * 0.5,
                    14: 0,
                    onUpdate: () => {
                        if (!instancedRef.current) return;
                        instancedRef.current.setMatrixAt(instanceJ, matrixJ);
                        instancedRef.current.instanceMatrix.needsUpdate = true;
                    },
                });

                instancedRef.current.instanceMatrix.needsUpdate = true;
            },
            async sorted(...i: number[]) {
                if (!useSortingStore.getState().showAnimation) {
                    this.stop = true;
                    return;
                }

                for (const index of i) {
                    setColor(instanceLinker[index], BOX_FOUND_COLOR);
                }

                await sleep(stepSpeed);
            },
            async split(left: number[], right: number[]) {
                console.log(left, right)
            },
            stop: false,
        };

        SortingAlgorithms[sortAlgorithm].sort(
            numberListArray,
            animationSortCallbacks
        );
    }, [camera, numberListArray, sortAlgorithm, stepSpeed, instanceLinker]);

    return (
        <>
            {/* <OrbitControls /> */}
            <directionalLight position={[1, 10, 1]} intensity={1} />
            <ambientLight />
            <instancedMesh
                args={[boxGeometry, boxMaterial, numberListArray.length]}
                ref={instancedRef}
            />
        </>
    );
}
