import { binarySearch, linearSearch } from "../algorithms/searching";

export const SearchingAlgorithms = [
    {
        display: "Linear Search",
        name: "linear",
        sort: false,
        function: linearSearch,
    },
    {
        display: "Binary Search",
        name: "binary",
        sort: true,
        function: binarySearch,
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

export function getAlgorithm(name: TSearchingAlgorithms) {
    return SearchingAlgorithms.find((algo) => algo.name === name)!;
}

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
