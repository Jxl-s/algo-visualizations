import PathfindingPage from "../pages/Pathfinding";
import SearchingPage from "../pages/Searching";
import SortingPage from "../pages/Sorting";

export const Pages = [
    {
        name: "Searching",
        href: "searching",
        component: SearchingPage,
    },
    {
        name: "Sorting",
        href: "sorting",
        component: SortingPage,
    },
    {
        name: "Pathfinding",
        href: "pathfinding",
        component: PathfindingPage,
    }
] as const;

export const getActivePage = () => {
    // Look at the current URL
    const params = new URLSearchParams(window.location.search);
    return Pages.find((page) => page.href === params.get("page"));
};
