import { memo } from "react";


interface PropEmployeeTotal{
    totalEmployee:number;
}
const EmployeeTotal = ({totalEmployee}:PropEmployeeTotal) =>{
    console.log("tổng số nhân viên ")
    return (
        <>
            Tổng nhân viên {totalEmployee}
        </>
    )
}
export default memo(EmployeeTotal);