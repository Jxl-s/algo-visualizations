interface Callbacks {
    iteration: (i: number, other?: number[]) => void;
    found: (i: number) => void;
    eliminate: (range: number[]) => void;
}