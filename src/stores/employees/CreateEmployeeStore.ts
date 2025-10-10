import { makeAutoObservable, runInAction } from "mobx";
import type { Employee, EmployeeStore } from "./EmployeeStore";
import employeeService from "../../services/employee/employeeService";



export class CreateEmployeeStore {
    loading = false;
    error: string | null = null;

    constructor(){
        makeAutoObservable(this)
    }
    fetchCreateEmployee = async(data: Employee, employeeStore: EmployeeStore)=>{
        this.loading = true;
        try{
            const response = await employeeService.create(data);
            runInAction(()=>{
                this.loading = false;
                employeeStore.createEmployee(response)
            })
        }catch(error){
            runInAction(()=>{
                this.loading = false;
                this.error = error instanceof Error ? error.message : 'Tại thất bại'
            })
        }
    }
}
export const createEmployeeStore = new CreateEmployeeStore();