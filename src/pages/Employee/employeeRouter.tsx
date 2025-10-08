import { EmployeeDemo } from "./EmployeeDemo";
import EmployeeEdit from "./EmployeeEdit";

export const employeeRouter = [
    {
        path: "employee/:id/edit",
        element: <EmployeeEdit />,
    },
    {
        path:"employee-list",
        element: <EmployeeDemo/>
    }
];
