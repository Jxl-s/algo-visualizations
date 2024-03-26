import { create } from "zustand";
import { SearchingAlgorithms } from "../data/Algorithms";

interface SearchingStore {
    numberList: string;
    setNumberList: (numberList: string) => void;

    algorithm: SearchingAlgorithms;
    setAlgorithm: (algorithm: SearchingAlgorithms) => void;
}

const useSearchingStore = create<SearchingStore>((set) => ({
    numberList: "",
    setNumberList: (numberList: string) => set({ numberList }),

    algorithm: SearchingAlgorithms.Linear,
    setAlgorithm: (algorithm: SearchingAlgorithms) => set({ algorithm }),
}));

export default useSearchingStore;
