import {Table, type TableProps} from "antd";
import type {Employee} from "../../stores/employees/EmployeeStore";

interface PropEmployee {
    data: Employee[];
    columns: TableProps<Employee>["columns"];
    loading: boolean;
}

const EmployeeTable = ({data, columns, loading}: PropEmployee) => {
    return (
        <>
            <Table<Employee>
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                
                pagination={{
                    pageSize: 8,
                    position:["bottomCenter"]
                }}
                
            />
            
        </>
    );
};

export default EmployeeTable;
