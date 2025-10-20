import {Avatar, Button, Col, Row, type TableProps} from "antd";

import EmployeeTable from "./EmployeeTable";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import EmployeeDetail from "./EmployeeDetail";
import {useCallback, useEffect, useMemo, useState} from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import {useRootStore} from "../../../context/RootStoreContext";
import type {Employee} from "../../../stores/employees/EmployeeStore";
import {observer} from "mobx-react-lite";
import EmployeeDelete from "./EmployeeDetele";
import EmployeeCreate from "./EmployeeCreate";
import {useNavigate} from "react-router-dom";
import EmployeeTotal from "./EmployeeTotal";
import {handleFilter} from "../../../utils/employee/handleFilter";
import Pagination from "../pagination/pagination";

const EmployeeList = observer(() => {
    // employee store
    const {employeeStore} = useRootStore();
    const {employee, fetchEmployee, loading} = employeeStore;
    useEffect(() => {
        fetchEmployee();
    }, []);
    // state open detail, edit employee, delete employee
    const [isOpenEmployee, setOpenEmployee] = useState(false);
    const [isDeleteEmployee, setDeleteEmployee] = useState<boolean>(false);
    const [isIdEmployee, setIdEmployee] = useState<number | null>(null);
    const [isIdDeleteEmployee, setIdDeleteEmployee] = useState<number | null>(null);
    const [isCreateEmployee, setCreateEmployee] = useState<boolean>(false);
    // state search, select, pagination
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("all");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);

    // handle edit, delelete, create employee
    const handleOpenEmployee = (idEmployee: number) => {
        setOpenEmployee(true);
        setIdEmployee(idEmployee);
    };
    const handleDeleteEmployee = (idEmployee: number) => {
        setDeleteEmployee(true);
        setIdDeleteEmployee(idEmployee);
    };
    const handleSetCreateEmployee = () => {
        setCreateEmployee(true);
    };
    // handle search, select
    const handleSearch = useCallback((value: string) => {
        setSearch(value);
    }, []);
    const handleSelect = useCallback((value: string) => {
        setSelect(value);
    }, []);
    // handle reset form
    const handleReset = () => {
        setSearch("");
        setSelect("all");
    };
    const navigate = useNavigate();
    // logic handle filter, search, pagination
    const {dataSearch, dataLength} = useMemo(() => {
        const {dataSearch, dataLength} = handleFilter(search, select, page, pageSize, employee);
        return {dataSearch, dataLength};
    }, [employee, select, search, page, pageSize]);

    // columns table employee
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
            title: "department",
            dataIndex: "department",
            key: "department",
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <Button color="cyan" variant="solid" onClick={() => handleOpenEmployee(action.id)}>
                                <EditOutlined />
                            </Button>
                            <Button color="cyan" variant="solid" onClick={() => navigate(`employee/${action.id}/edit`)}>
                                <EditOutlined /> redirect
                            </Button>
                            <Button color="danger" variant="solid" onClick={() => handleDeleteEmployee(action.id)}>
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Row style={{marginBottom: 20}}>
                <Col span={6}>
                    <EmployeeSearch onSearch={handleSearch} />
                </Col>
                <Col span={12} offset={6}>
                    <Row justify={"end"} align={"middle"}>
                        <Col>
                            <EmployeeTotal totalEmployee={dataLength} />
                        </Col>
                        <Col>
                            <EmployeeFilter handleSelect={handleSelect} />
                        </Col>
                        <Col>
                            <Button onClick={handleReset} style={{marginLeft: 10}}>
                                Reset
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{marginLeft: 10}}
                                color="primary"
                                variant="solid"
                                onClick={handleSetCreateEmployee}
                            >
                                Create
                            </Button>
                            <Button
                                style={{marginLeft: 10}}
                                color="primary"
                                variant="solid"
                                onClick={() => navigate(`employee/create`)}
                            >
                                redirect Create
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <EmployeeTable data={dataSearch} columns={columns} loading={loading} />
                </Col>
                <Pagination
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalEmployee={dataLength}
                />
            </Row>
            <EmployeeDetail
                isOpenEmployee={isOpenEmployee}
                setOpenEmployee={setOpenEmployee}
                idEmployee={isIdEmployee}
            />
            <EmployeeDelete
                isDeleteEmployee={isDeleteEmployee}
                setDeleteEmployee={setDeleteEmployee}
                idDeleteEmployee={isIdDeleteEmployee}
            />
            <EmployeeCreate isCreateEmployee={isCreateEmployee} setCreateEmployee={setCreateEmployee} />
        </>
    );
});

export default EmployeeList;
