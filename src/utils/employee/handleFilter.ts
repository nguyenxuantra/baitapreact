import type { Employee } from "../../stores/employees/EmployeeStore";



export const handleFilter = (search:string, select: string, page:number, pageSize:number, employee:Employee[]) =>{
    const dataFilter = employee.filter((emp) => {
      const filterSearch =
        emp.id.toString().includes(search) ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.address.toLowerCase().includes(search.toLowerCase()) ||
        emp.city.toLowerCase().includes(search.toLowerCase()) ||
        emp.country.toLowerCase().includes(search.toLowerCase());
      const filterSelect =
        select === "all" || select.toLowerCase() === emp.department.toLowerCase();
      return filterSearch && filterSelect;
    });
    return {
      dataSearch: dataFilter.slice((page-1)*pageSize, page*pageSize),
      dataLength: dataFilter.length,
    };
}