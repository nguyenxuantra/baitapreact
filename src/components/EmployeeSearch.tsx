import { Input } from "antd";
const {Search} = Input;

interface PropEmployeeSearch{
    onSearch: (value: string) =>void;
}


const EmployeeSearch = ({onSearch}:PropEmployeeSearch) =>{
    return (
        <>
            <Search
                placeholder="Tìm kiếm nhân viên"
                allowClear
                enterButton={true}
                onSearch={onSearch}
            />
        </>
    )
}
export default EmployeeSearch;