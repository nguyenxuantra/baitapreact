import {Avatar, Button, Select, Tag, type TableProps} from "antd";

import EmployeeTable from "./EmployeeTable";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EmployeeDetail from "./EmployeeDetail";
import {useEffect, useMemo, useState} from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import {useNavigate} from "react-router-dom";
import {useRootStore} from "../../context/RootStoreContext";
import type {Employee} from "../../stores/employees/EmployeeStore";
import {observer} from "mobx-react-lite";

const EmployeeList = observer(() => {
    const {employeeStore} = useRootStore();
    const {employee, fetchEmployee, loading} = employeeStore;
    useEffect(() => {
        fetchEmployee();
    }, []);
    const [isOpenEmployee, setOpenEmployee] = useState(false);
    const [isIdEmployee, setIdEmployee] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("all");
    const handleOpenEmployee = (idEmployee: number) => {
        setOpenEmployee(true);
        setIdEmployee(idEmployee);
    };
    const handleSearch = (value: string) => {
        setSearch(value);
    };
    const handleSelect = (value: string) => {
        setSelect(value);
    };
    const dataSearch =useMemo(()=> employee.filter((emp) => {
        const filterSearch =
            emp.id.toString().includes(search) ||
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.address.toLowerCase().includes(search.toLowerCase()) ||
            emp.city.toLowerCase().includes(search.toLowerCase()) ||
            emp.country.toLowerCase().includes(search.toLowerCase());
        const filterSelect = select === "all" || select.toLowerCase() === emp.country.toLowerCase();
        return filterSearch && filterSelect;
    }),[employee, select, search]) 
    // const navigate = useNavigate();
    // const handleOnclick = (id: number) => {
    //     navigate(`employee/${id}/edit`);
    // };

    const columns: TableProps<Employee>["columns"] = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (_, avatar) => {
                return <Avatar size="default" src={avatar.avatar} />;
            },
        },
        {
            title: "city",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "action",
            dataIndex: "action",
            key: "action",
            render: (_, action) => {
                return (
                    <>
                        <Button onClick={() => handleOpenEmployee(action.id)}>
                            <EditOutlined />
                        </Button>
                        <Button>
                            <DeleteOutlined/>
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <EmployeeFilter handleSelect={handleSelect} />
            <EmployeeSearch onSearch={handleSearch} />
            <EmployeeTable data={dataSearch} columns={columns} loading={loading} />
            <EmployeeDetail
                isOpenEmployee={isOpenEmployee}
                setOpenEmployee={setOpenEmployee}
                idEmployee={isIdEmployee}
            />
        </>
    );
});

export default EmployeeList;
