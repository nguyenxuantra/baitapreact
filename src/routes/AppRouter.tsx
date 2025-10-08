import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import Employee from "../pages/Employee/Employee";
import EmployeeEdit from "../pages/Employee/EmployeeEdit";

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
            {
                path:"employee/:id/edit",
                element: <EmployeeEdit/>
            }
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
