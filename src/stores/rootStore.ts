import { employeeStore } from "./employees/EmployeeStore";



export class RootStore {
    employeeStore= employeeStore
}

const rootStore = new RootStore();
export default rootStore;