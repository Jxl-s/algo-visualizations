import { create } from "zustand";
import * as SortingAlgorithms from "../algorithms/sorting";

type TSortingAlgorithms = keyof typeof SortingAlgorithms;
interface SortingStore {
    numberList: string;
    setNumberList: (numberList: string) => void;

    algorithm: TSortingAlgorithms;
    setAlgorithm: (algorithm: TSortingAlgorithms) => void;

    showAnimation: boolean;
    setShowAnimation: (showAnimation: boolean) => void;

    stepSpeed: number;
    setStepSpeed: (stepSpeed: number) => void;

    status: string;
    setStatus: (status: string) => void;
}

const useSortingStore = create<SortingStore>((set) => ({
    numberList: "",
    setNumberList: (numberList) => set({ numberList }),

    algorithm: "SelectionSort",
    setAlgorithm: (algorithm) => set({ algorithm }),

    showAnimation: false,
    setShowAnimation: (showAnimation) => set({ showAnimation }),

    stepSpeed: 500,
    setStepSpeed: (stepSpeed) => set({ stepSpeed }),

    status: "",
    setStatus: (status) => set({ status }),
}));

export default useSortingStore;
