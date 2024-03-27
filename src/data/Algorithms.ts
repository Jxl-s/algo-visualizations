export const SearchingAlgorithms = [
    {
        display: "Linear Search",
        name: "linear",
        sort: false,
    },
    {
        display: "Binary Search",
        name: "binary",
        sort: true,
    },
    {
        display: "Interpolation Search",
        name: "interpolation",
        sort: true,
    },
    {
        display: "Jump Search",
        name: "jump",
        sort: true,
    },
    {
        display: "Exponential Search",
        name: "exponential",
        sort: true,
    },
] as const;

export type TSearchingAlgorithms = (typeof SearchingAlgorithms)[number]["name"];

export enum SortingAlgorithms {
    Bubble,
    Selection,
    Insertion,
    Merge,
    Quick,
}

export enum PathfindingAlgorithms {
    Dijkstra,
    AStar,
    BreadthFirst,
    DepthFirst,
}
