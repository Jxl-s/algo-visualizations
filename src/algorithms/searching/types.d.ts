interface Callbacks {
    iteration: (i: number, other?: number[]) => Promise<void>;
    found: (i: number) => Promise<void>;
    eliminate: (range: number[]) => Promise<void>;
    reset: (i: number) => Promise<void>;
    stop?: boolean;
}
