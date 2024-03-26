import { create } from "zustand";
import { SearchingAlgorithms } from "../data/Algorithms";

interface SearchingStore {
    numberList: string;
    setNumberList: (numberList: string) => void;

    toSearch: number;
    setToSearch: (toSearch: number) => void;

    algorithm: SearchingAlgorithms;
    setAlgorithm: (algorithm: SearchingAlgorithms) => void;

    showAnimation: boolean;
    setShowAnimation: (showAnimation: boolean) => void;

    stepSpeed: number;
    setStepSpeed: (stepSpeed: number) => void;
}

const useSearchingStore = create<SearchingStore>((set) => ({
    numberList: "",
    setNumberList: (numberList: string) => set({ numberList }),

    toSearch: -1,
    setToSearch: (toSearch: number) => set({ toSearch }),
    
    algorithm: SearchingAlgorithms.Linear,
    setAlgorithm: (algorithm: SearchingAlgorithms) => set({ algorithm }),

    showAnimation: false,
    setShowAnimation: (showAnimation: boolean) => set({ showAnimation }),

    stepSpeed: 1000,
    setStepSpeed: (stepSpeed: number) => set({ stepSpeed }),
}));

export default useSearchingStore;
