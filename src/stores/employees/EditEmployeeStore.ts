import {makeAutoObservable, runInAction} from "mobx";
import employeeService from "../../services/employee/employeeService";
import type {Employee, EmployeeStore} from "./EmployeeStore";

export class EditEmployeeStore {
    loading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    fetchEditEmployee = async (data: Employee, id: number, employeeStore: EmployeeStore) => {
        this.loading = true;
        try {
            const response = await employeeService.update(data, id);
            runInAction(() => {
                this.loading = false;
                employeeStore.updateEmployee(response);
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                this.error = error instanceof Error ? error.message : "update thất bại";
            });
        }
    };
}

export const editEmployeeStore = new EditEmployeeStore();
