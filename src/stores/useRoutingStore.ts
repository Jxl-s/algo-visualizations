import { create } from "zustand";

interface RoutingStore {
    activePage: string;
    setActivePage: (activePage: string) => void;
}

const useRoutingStore = create<RoutingStore>((set) => ({
    activePage: "home",
    setActivePage: (activePage) => set({ activePage }),
}));

// Set the active page to the current
const params = new URLSearchParams(window.location.search);
useRoutingStore.setState({ activePage: params.get("page") ?? "home" });

export default useRoutingStore;
