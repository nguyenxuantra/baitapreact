import { editEmployeeStore } from "./employees/EditEmployeeStore";
import { employeeStore } from "./employees/EmployeeStore";



export class RootStore {
    employeeStore= employeeStore;
    editEmployeeStore = editEmployeeStore;
    
}

const rootStore = new RootStore();
export default rootStore;