
import type { Employee } from "../stores/employees/EmployeeStore";
import baseApi from "./baseApi";



const employeeService = {
    getAll: ()=> baseApi.get<Employee[]>('/employee')
}
export default employeeService;
