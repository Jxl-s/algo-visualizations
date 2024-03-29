import Button from "../../components/Button";
import Input from "../../components/Input";
import PageLayout from "../../layouts/PageLayout";
import Select from "../../components/Select";
import useSearchingStore from "../../stores/useSearchingStore";
import { Canvas } from "@react-three/fiber";
import ArrayInput from "../../components/array/ArrayInput";
import InstancedAnimation from "./InstancedAnimation";
import * as SearchingAlgorithms from "../../algorithms/searching";
import { isNumber, isNumberCsv } from "../../validators";
import { useState } from "react";

export default function SearchingPage() {
    // manage the button state
    const [buttonEnabled, setButtonEnabled] = useState(true);

    // Load from the store
    const setNumberList = useSearchingStore((state) => state.setNumberList);
    const setTarget = useSearchingStore((state) => state.setTarget);

    const algorithm = useSearchingStore((state) => state.algorithm);
    const setAlgorithm = useSearchingStore((state) => state.setAlgorithm);

    const showAnimation = useSearchingStore((state) => state.showAnimation);
    const setShowAnimation = useSearchingStore(
        (state) => state.setShowAnimation
    );

    const animationStatus = useSearchingStore((state) => state.status);

    const stepSpeed = useSearchingStore((state) => state.stepSpeed);
    const setStepSpeed = useSearchingStore((state) => state.setStepSpeed);

    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Searching</h1>
            <p>
                Searching algorithms are used to find a specific item in a
                collection of items.
            </p>

            <div className="my-4" />
            <div className="grid grid-cols-3 gap-4">
                <ArrayInput
                    onChange={(e) => {
                        // Enable number if it's valid
                        if (isNumberCsv(e.list) && isNumber(e.target)) {
                            setButtonEnabled(true);
                        } else {
                            setButtonEnabled(false);
                        }

                        setNumberList(e.list);
                        setTarget(parseInt(e.target));
                    }}
                    disabled={showAnimation}
                />
                <Select
                    className="col-span-3 lg:col-span-1"
                    value={algorithm}
                    label="Algorithm"
                    onChange={(value) =>
                        setAlgorithm(value as keyof typeof SearchingAlgorithms)
                    }
                    disabled={showAnimation}
                    options={Object.entries(SearchingAlgorithms).map(
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
                            {showAnimation
                                ? "Stop Animation"
                                : "Start Animation"}
                        </span>
                    </Button>
                </div>
            </div>
            <div className="my-4" />
            {showAnimation && (
                <>
                    {animationStatus && <p>{animationStatus}</p>}
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
                            <InstancedAnimation />
                        </Canvas>
                    </div>
                </>
            )}
        </PageLayout>
    );
}
