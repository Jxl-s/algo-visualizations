import { PropsWithChildren } from "react";
import useRoutingStore from "../stores/useRoutingStore";

// My custom router component, because it's difficult to route in static sites
export default function Link({
    to,
    children,
}: PropsWithChildren<{ to: string }>) {
    const setActivePage = useRoutingStore((state) => state.setActivePage);

    const onClick = () => {
        // Set the URL param
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("page", to);

        // Update the URL
        const baseUrl = window.location.href.split("?")[0];
        const newUrl = `${baseUrl}?${newParams.toString()}`;
        history.pushState({}, "", newUrl);

        // Update the state
        setActivePage(to);
    };

    return <div onClick={onClick}>{children}</div>;
}
