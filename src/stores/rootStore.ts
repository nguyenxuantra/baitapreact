import { createEmployeeStore } from "./employees/CreateEmployeeStore";
import { deleteEmployeeStore } from "./employees/DeleteEmployeeStore";
import { editEmployeeStore } from "./employees/EditEmployeeStore";
import { employeeStore } from "./employees/EmployeeStore";



export class RootStore {
    employeeStore= employeeStore;
    editEmployeeStore = editEmployeeStore;
    deleteEmployeeStore = deleteEmployeeStore;
    createEmployeeStore = createEmployeeStore;
}

const rootStore = new RootStore();
export default rootStore;