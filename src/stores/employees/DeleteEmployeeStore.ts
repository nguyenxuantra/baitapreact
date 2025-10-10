import { makeAutoObservable, runInAction } from "mobx";
import employeeService from "../../services/employee/employeeService";
import type { EmployeeStore } from "./EmployeeStore";



export class DeleteEmployeeStore{
    loading = false;
    error: string | null = null;
    constructor(){
        makeAutoObservable(this)
    }
    fetchDeleteEmployee = async(id: number, employeeStore: EmployeeStore)=>{
        this.loading = true;
        try{
            const response = await employeeService.delete(id);
            runInAction(()=>{
                this.loading = false;
                employeeStore.deleteEmployee(response)
            })
        }catch(error){
            runInAction(()=>{
                this.loading = false;
                this.error = error instanceof Error ? error.message : 'Xoá nhân viên không thành công';
            })
        }

    }
}

export const deleteEmployeeStore = new DeleteEmployeeStore();