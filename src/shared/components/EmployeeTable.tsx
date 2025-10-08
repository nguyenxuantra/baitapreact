import { Table, type TableProps } from "antd";
import type { Employee } from "../../data/employees";





interface PropEmployee{
    data: Employee[];
    columns: TableProps<Employee>['columns'];
}

const EmployeeTable = ({data, columns}:PropEmployee) =>{
    return(
        <>
            <Table<Employee> columns={columns} dataSource={data} rowKey="id"/>
        </>
    )
};

export default EmployeeTable;