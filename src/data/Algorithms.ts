import {
    binarySearch,
    interpolationSearch,
    linearSearch,
    ternarySearch,
} from "../algorithms/searching";

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
        display: "Ternary Search",
        name: "ternary",
        sort: true,
        function: ternarySearch,
    },
    {
        display: "Interpolation Search",
        name: "interpolation",
        sort: true,
        function: interpolationSearch,
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
