import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Employee from "../pages/Employee";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {path: "/", element: <Employee />},
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
