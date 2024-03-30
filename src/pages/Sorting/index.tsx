// import Select from "../../components/Select";
import PageLayout from "../../layouts/PageLayout";
import * as SortingAlgorithms from "../../algorithms/sorting";
import ArrayInput from "../../components/array/ArrayInput";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useSortingStore from "../../stores/useSortingStore";
import { useState } from "react";
import { isNumberCsv } from "../../validators";
import { Canvas } from "@react-three/fiber";
import Animation from "./Animation";

export default function SortingPage() {
    const [buttonEnabled, setButtonEnabled] = useState(true);

    const setNumberList = useSortingStore((state) => state.setNumberList);
    const numberList = useSortingStore((state) => state.numberList);

    const stepSpeed = useSortingStore((state) => state.stepSpeed);
    const setStepSpeed = useSortingStore((state) => state.setStepSpeed);

    const showAnimation = useSortingStore((state) => state.showAnimation);
    const setShowAnimation = useSortingStore((state) => state.setShowAnimation);

    const algorithm = useSortingStore((state) => state.algorithm);
    const setAlgorithm = useSortingStore((state) => state.setAlgorithm);

    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Sorting</h1>
            <p>
                Sorting algorithms are used to rearrange a collection of items
                in a specific order.
            </p>
            <div className="my-4" />
            <div className="grid grid-cols-3 gap-4">
                <ArrayInput
                    showTarget={false}
                    onChange={(e) => {
                        // Enable number if it's valid
                        if (isNumberCsv(e.list)) {
                            setButtonEnabled(true);
                        } else {
                            setButtonEnabled(false);
                        }

                        setNumberList(e.list);
                    }}
                    disabled={showAnimation}
                    value={numberList}
                />
                <Select
                    className="col-span-3 lg:col-span-1"
                    value={algorithm}
                    label="Algorithm"
                    onChange={(value) =>
                        setAlgorithm(value as keyof typeof SortingAlgorithms)
                    }
                    disabled={showAnimation}
                    options={Object.entries(SortingAlgorithms).map(
                        ([k, v]) => ({
                            display: v.DISPLAY_NAME,
                            value: k,
                        })
                    )}
                />
                <div className="col-span-3 lg:col-span-1 grid grid-cols-2 items-end gap-2">
                    <Input
                        className="col-span-2 lg:col-span-1"
                        label="Step Speed (ms)"
                        type="number"
                        value={stepSpeed.toString()}
                        disabled={showAnimation}
                        onChange={(val) => setStepSpeed(parseInt(val))}
                    />
                    <Button
                        className="col-span-2 lg:col-span-1"
                        onClick={() => setShowAnimation(!showAnimation)}
                        theme={showAnimation ? "danger" : "primary"}
                        disabled={!buttonEnabled}
                    >
                        <span className={`text-white font-semibold`}>
                            Start Animation
                        </span>
                    </Button>
                </div>
            </div>
            <div className="my-4" />
            {showAnimation && (
                <>
                    <div className="w-full h-[600px] rounded-lg border border-neutral-400 ">
                        <Canvas
                            camera={{
                                position: [0, 3, 10],
                                fov: 75,
                                aspect: 2,
                                near: 0.1,
                                far: 1000,
                            }}
                        >
                            <Animation />
                        </Canvas>
                    </div>
                </>
            )}
        </PageLayout>
    );
}
