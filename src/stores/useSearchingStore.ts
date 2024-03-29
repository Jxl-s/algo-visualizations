import { create } from "zustand";
import * as SearchingAlgorithms from "../algorithms/searching";

type TSearchingAlgorithms = keyof typeof SearchingAlgorithms;
interface SearchingStore {
    numberList: string;
    setNumberList: (numberList: string) => void;

    target: number;
    setTarget: (target: number) => void;

    algorithm: TSearchingAlgorithms;
    setAlgorithm: (algorithm: TSearchingAlgorithms) => void;

    showAnimation: boolean;
    setShowAnimation: (showAnimation: boolean) => void;

    stepSpeed: number;
    setStepSpeed: (stepSpeed: number) => void;

    status: string;
    setStatus: (status: string) => void;
}

const useSearchingStore = create<SearchingStore>((set) => ({
    numberList: "",
    setNumberList: (numberList) => set({ numberList }),

    target: 0,
    setTarget: (target) => set({ target }),

    algorithm: "LinearSearch",
    setAlgorithm: (algorithm) => set({ algorithm }),

    showAnimation: false,
    setShowAnimation: (showAnimation) => set({ showAnimation }),

    stepSpeed: 500,
    setStepSpeed: (stepSpeed) => set({ stepSpeed }),

    status: "",
    setStatus: (status) => set({ status }),
}));

export default useSearchingStore;
