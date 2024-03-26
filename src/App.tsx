import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import { Pages } from "./data/Pages";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            {Pages.map((page, i) => (
                <Route key={i} path={page.href} element={<page.component />} />
            ))}
        </Routes>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
