import { makeAutoObservable, runInAction } from "mobx";
import employeeService from "../../services/employeeService";


export interface Employee{
    id: number;
    name: string;
    address: string;
    avatar: string;
    country: string;
    city: string;
}

export class EmployeeStore {
    employee: Employee[] = [];
    loading = false;
    error : string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    async fetchEmployee(){
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
}


export const employeeStore = new EmployeeStore();