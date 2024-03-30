interface SortCallbacks {
    iteration: (i: number, other?: number[]) => Promise<void>;
    reset: (...i: number[]) => Promise<void>;
    swap: (i: number, j: number, fast?: boolean) => Promise<void>;
    sorted: (...i: number[]) => Promise<void>;
    active: (...i: number[]) => Promise<void>;
    stop?: boolean;
}
