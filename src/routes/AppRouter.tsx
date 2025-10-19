import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import Employee from "../pages/Employee/Employee";
import { employeeRouter } from "../pages/Employee/employeeRouter";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                index:true,
                element: <Employee />
            }, 
             ...employeeRouter,
            
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
