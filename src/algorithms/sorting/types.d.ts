interface SortCallbacks {
    iteration: (i: number, other?: number[]) => Promise<void>;
    reset: (...i: number[]) => Promise<void>;
    swap: (i: number, j: number) => Promise<void>;
    sorted: (...i: number[]) => Promise<void>;
    split?: (left: number[], right: number[]) => Promise<void>;
    stop?: boolean;
}
