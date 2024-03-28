import IndexPage from "./pages/IndexPage";
import { Pages } from "./data/Pages";
import useRoutingStore from "./stores/useRoutingStore";

function App() {
    const activePage = useRoutingStore((state) => state.activePage);
    if (activePage === "home") {
        return <IndexPage />;
    }

    const foundPage = Pages.find((p) => p.href === activePage);
    if (foundPage) {
        return <foundPage.component />;
    }

    // Return a 404
    return <div>404</div>;
}

export default App;
