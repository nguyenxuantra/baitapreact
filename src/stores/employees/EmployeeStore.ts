import { makeAutoObservable, runInAction } from "mobx";
import employeeService from "../../services/employee/employeeService";


export interface Employee{
    id: number;
    name: string;
    address: string;
    avatar: string;
    country: string;
    city: string;
    createdAt:string;
}

export class EmployeeStore {
    employee: Employee[] = [];
    loading = false;
    error : string | null = null;
    
    constructor(){
        makeAutoObservable(this);
    }

    updateEmployee(updatedEmployee: Employee) {
        runInAction(() => {
            const index = this.employee.findIndex(e => e.id === updatedEmployee.id);
            if (index !== -1) {
                this.employee = [
                    ...this.employee.slice(0, index),
                    updatedEmployee,
                    ...this.employee.slice(index + 1)
                ];
            }
        });
    }
    deleteEmployee(deleteEmployee: Employee){
        runInAction(()=>{
            const index = this.employee.findIndex(e => e.id === deleteEmployee.id)
            if(index != -1){
                this.employee = [
                    ...this.employee.slice(0,index),
                    ...this.employee.slice(index+1)
                ]
            }
        })
    }
    createEmployee(createEmployee: Employee){
        this.employee=[
            createEmployee,
            ...this.employee
        ]
    }
    fetchEmployee = async()=>{
        this.loading = true;
        try{
            const response = await employeeService.getAll();
            runInAction(()=>{
                this.employee = response;
                this.loading = false;
            })
        } catch(error) {
            runInAction(()=>{
                this.loading = false;
                this.error = error instanceof Error ? error.message : 'An unknown error occurred';
            })
        }
    }
    get listEmployee(){
        return this.employee;
    }
}


export const employeeStore = new EmployeeStore();