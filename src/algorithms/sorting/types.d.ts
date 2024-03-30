interface SortCallbacks {
    iteration: (i: number, noCameraMove?: boolean) => Promise<void>;
    reset: (...i: number[]) => Promise<void>;
    swap: (i: number, j: number, fast?: boolean) => Promise<void>;
    sorted: (...i: number[]) => Promise<void>;
    active: (...i: number[]) => Promise<void>;
    reorder: (min: number, ...i: number[]) => Promise<void>;
    stop?: boolean;
}
