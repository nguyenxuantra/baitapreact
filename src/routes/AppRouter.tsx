import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import Employee from "../pages/Employee/Employee";
import { employeeRouter } from "../pages/Employee/employeeRouter";
import EmployeeCard from "../pages/Employee/EmployeeCard";


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
            {
                path:"/employee-card",
                element: <EmployeeCard />
            }
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
