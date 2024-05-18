import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Info from "./components/about/Info";
import Work from "./components/about/Work";
import Social from "./components/about/Social";
import { Navigate } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
                children: [
                    // {
                        // path: ":tab",
                        // children: [
                            {
                                path: "info",
                                element: <Info/>,
                            },
                            {
                                path: "work",
                                element: <Work />,
                            },
                            {
                                path: "social",
                                element: <Social />,
                            },
                            {
                                path: "",
                                element: <Navigate to="info"/>,
                            },
                        // ],
                    // },
                ],
            },
            {
                path: "projects",
                element: <Projects />,
            },
        ],
    },
]);


export default router;