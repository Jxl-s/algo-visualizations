import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

type ArrayInputEvent = {
    list: string;
    target: string;
};

interface Props {
    onChange: (e: ArrayInputEvent) => void;
    disabled?: boolean;
}

export default function ArrayInput({ onChange, disabled }: Props) {
    const [arrayInput, setArrayInput] = useState({
        value: "",
        error: "",
    });

    const [targetInput, setTargetInput] = useState({
        value: "",
        error: "",
    });

    const [randomOptions, setRandomOptions] = useState({
        open: false,
        min: 1,
        max: 10,
        count: 10,
    });

    // Input validation (on deselect)
    const validateArrayInput = (v: string) => {
        const arr = v.split(",").map((v) => parseInt(v));
        return !arr.some((v) => isNaN(v));
    };

    const validateTargetInput = (v: string) => {
        return !isNaN(parseInt(v));
    };

    const onArrayChange = (v: string) => {
        if (!validateArrayInput(v)) {
            setArrayInput((s) => ({ ...s, error: "Invalid array" }));
        } else {
            setArrayInput((s) => ({ ...s, error: "" }));
        }
    };

    const onTargetChange = (v: string) => {
        if (!validateTargetInput(v)) {
            setTargetInput((s) => ({ ...s, error: "Invalid number" }));
        } else {
            setTargetInput((s) => ({ ...s, error: "" }));
        }
    };

    useEffect(() => {
        onChange?.({
            list: arrayInput.value,
            target: targetInput.value,
        });
    }, [arrayInput.value, targetInput.value, onChange]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setRandomOptions((state) => ({ ...state, open: false }));
    });

    const onRandomArray = () => {
        const randomArray: number[] = [];

        for (let i = 0; i < randomOptions.count; i++) {
            const randNum =
                Math.floor(
                    Math.random() * (randomOptions.max - randomOptions.min + 1)
                ) + randomOptions.min;

            randomArray.push(randNum);
        }

        // Also select a random number from it
        const randomSelection =
            randomArray[Math.floor(Math.random() * randomArray.length)];

        setArrayInput((s) => ({ ...s, value: randomArray.join(",") }));
        setTargetInput((s) => ({ ...s, value: randomSelection.toString() }));
    };

    // Random short-hand functions
    const setMin = (v: string) =>
        setRandomOptions((s) => ({ ...s, min: parseInt(v) }));

    const setMax = (v: string) =>
        setRandomOptions((s) => ({ ...s, max: parseInt(v) }));

    const setCount = (v: string) =>
        setRandomOptions((s) => ({ ...s, count: parseInt(v) }));

    return (
        <div className="col-span-3 lg:col-span-1 grid grid-cols-6 items-end gap-2">
            <Input
                className="col-span-3"
                label="List"
                placeholder="e.g. 1,2,3,4,5"
                onChange={(v) => {
                    setArrayInput((s) => ({ ...s, value: v }));
                    onArrayChange(v);
                }}
                value={arrayInput.value}
                error={arrayInput.error}
                disabled={disabled}
            />
            <Input
                className="col-span-2"
                label="Target"
                placeholder="e.g. 4"
                type="number"
                onChange={(v) => {
                    setTargetInput((s) => ({ ...s, value: v }));
                    onTargetChange(v);
                }}
                value={targetInput.value}
                error={targetInput.error}
                disabled={disabled}
            />
            <div className="flex justify-center">
                <Button
                    onClick={() =>
                        setRandomOptions((s) => ({ ...s, open: !s.open }))
                    }
                    disabled={disabled}
                >
                    <span className="text-white font-semibold text-sm">
                        Random
                    </span>
                </Button>
                {randomOptions.open && (
                    <div
                        ref={wrapperRef}
                        className={`absolute mt-12 bg-white p-4 border border-neutral-400 rounded-lg grid grid-cols-2 gap-2 max-w-sm`}
                    >
                        <Input
                            className="col-span-2 lg:col-span-1"
                            label="Min"
                            placeholder="e.g. 4"
                            type="number"
                            value={randomOptions.min.toString()}
                            onChange={setMin}
                            disabled={disabled}
                        />
                        <Input
                            className="col-span-2 lg:col-span-1"
                            label="Max"
                            placeholder="e.g. 4"
                            type="number"
                            value={randomOptions.max.toString()}
                            onChange={setMax}
                            disabled={disabled}
                        />
                        <Input
                            className="col-span-2"
                            label="Count"
                            placeholder="e.g. 4"
                            type="number"
                            value={randomOptions.count.toString()}
                            onChange={setCount}
                        />
                        <Button
                            className="col-span-2"
                            onClick={() => {
                                // Make the array, and close it
                                onRandomArray();
                                setRandomOptions((state) => ({
                                    ...state,
                                    open: false,
                                }));
                            }}
                            disabled={disabled}
                        >
                            <span className="text-white font-semibold">
                                Generate
                            </span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
