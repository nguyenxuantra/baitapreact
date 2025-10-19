
import EmployeeCreate from "./EmployeeCreate";
import EmployeeEdit from "./EmployeeEdit";

export const employeeRouter = [
    {
        path: "employee/:id/edit",
        element: <EmployeeEdit />,
    },
    {
        path:"employee/create",
        element: <EmployeeCreate/>
    }
];
