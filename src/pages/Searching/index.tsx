import Button from "../../components/Button";
import Input from "../../components/Input";
import PageLayout from "../../layouts/PageLayout";
import Select from "../../components/Select";
import { SearchingAlgorithms } from "../../data/Algorithms";
import useSearchingStore from "../../stores/useSearchingStore";
import LinearSearch from "./Linear";
import { Canvas } from "@react-three/fiber";

export default function SearchingPage() {
    const numberList = useSearchingStore((state) => state.numberList);
    const setNumberList = useSearchingStore((state) => state.setNumberList);

    const toSearch = useSearchingStore((state) => state.toSearch);
    const setToSearch = useSearchingStore((state) => state.setToSearch);

    const algorithm = useSearchingStore((state) => state.algorithm);
    const setAlgorithm = useSearchingStore((state) => state.setAlgorithm);

    const showAnimation = useSearchingStore((state) => state.showAnimation);
    const setShowAnimation = useSearchingStore(
        (state) => state.setShowAnimation
    );

    const stepSpeed = useSearchingStore((state) => state.stepSpeed);
    const setStepSpeed = useSearchingStore((state) => state.setStepSpeed);

    function randomizeNumberList() {
        const numbers = Array.from(
            { length: 20 },
            () => Math.floor(Math.random() * 9) + 1
        );

        setNumberList(numbers.join(","));
        setToSearch(
            numbers[Math.floor(Math.random() * numbers.length)].toString()
        );
    }

    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Searching</h1>
            <p>
                Searching algorithms are used to find a specific item in a
                collection of items.
            </p>

            <div className="my-4" />

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 lg:col-span-1 grid grid-cols-6 items-end gap-2">
                    <Input
                        className="col-span-3"
                        label="List (comma separated)"
                        placeholder="e.g. 1,2,3,4,5"
                        onChange={setNumberList}
                        value={numberList}
                        disabled={showAnimation}
                    />
                    <Input
                        className="col-span-2"
                        label="To Search"
                        placeholder="e.g. 4"
                        type="number"
                        onChange={(val) => setToSearch(parseInt(val))}
                        value={toSearch.toString()}
                        disabled={showAnimation}
                    />
                    <Button
                        onClick={randomizeNumberList}
                        disabled={showAnimation}
                    >
                        <span className="text-white font-semibold">Random</span>
                    </Button>
                </div>
                <Select
                    className="col-span-3 lg:col-span-1"
                    value={algorithm}
                    label="Algorithm"
                    onChange={(value) =>
                        setAlgorithm(value as SearchingAlgorithms)
                    }
                    disabled={showAnimation}
                    options={[
                        {
                            display: "Linear Search",
                            value: SearchingAlgorithms.Linear,
                        },
                        {
                            display: "Binary Search",
                            value: SearchingAlgorithms.Binary,
                        },
                    ]}
                />
                <div className="col-span-3 lg:col-span-1 grid grid-cols-2 items-end gap-2">
                    <Input
                        className="col-span-3 lg:col-span-1"
                        label="Step Speed (ms)"
                        type="number"
                        value={stepSpeed.toString()}
                        disabled={showAnimation}
                        onChange={(val) => setStepSpeed(parseInt(val))}
                    />
                    <Button onClick={() => setShowAnimation(!showAnimation)} theme={showAnimation ? "danger" : "primary"}>
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
                <div className="w-full h-[600px]">
                    <Canvas
                        camera={{
                            position: [0, 3, 10],
                            fov: 75,
                            aspect: 2,
                            near: 0.1,
                            far: 1000,
                        }}
                    >
                        <LinearSearch />
                    </Canvas>
                </div>
            )}
        </PageLayout>
    );
}
