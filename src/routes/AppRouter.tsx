import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/about", element: <About />},
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
