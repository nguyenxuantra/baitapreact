import { useEffect } from "react";
import { useRootStore } from "../../context/RootStoreContext"



export const EmployeeDemo = () =>{
    
    const {employeeStore} = useRootStore();
    const {employee, fetchEmployee} = employeeStore;

    useEffect(()=>{
        fetchEmployee()
    },[])
    return (
        <>
            <ul>
                {employee.map(employee=>{
                    return (
                        <li key={employee.id}>
                            {employee.address}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}