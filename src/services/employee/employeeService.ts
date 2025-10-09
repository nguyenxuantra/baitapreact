
import type { Employee } from "../../stores/employees/EmployeeStore";
import baseApi from "../baseApi";



const employeeService = {
    getAll: ()=> baseApi.get<Employee[]>('/employee/Employee'),
    update: (data:Employee, id:number)=> baseApi.put<Employee>(`/employee/Employee/${id}`,data)
}
export default employeeService;
