import {Button, Card, Col, Form, Input, Row, Spin} from "antd";
import {useRootStore} from "../../context/RootStoreContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {handleFilter} from "../../utils/employee/handleFilter";
import EmployeeSearch from "../../shared/components/employee/EmployeeSearch";
import EmployeeTotal from "../../shared/components/employee/EmployeeTotal";
import EmployeeFilter from "../../shared/components/employee/EmployeeFilter";
import EmployeeCreate from "../../shared/components/employee/EmployeeCreate";
import {observer} from "mobx-react-lite";
import Pagination from "../../shared/components/pagination/pagination";

const EmployeeCard = observer(() => {
    // employee store
    const {employeeStore} = useRootStore();
    const {employee, fetchEmployee, loading} = employeeStore;
    useEffect(() => {
        fetchEmployee();
    }, []);
    // state search, select, pagination
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("all");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    // state create employee
    const [isCreateEmployee, setCreateEmployee] = useState<boolean>(false);
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
    // handle create employee
    const handleSetCreateEmployee = () => {
        setCreateEmployee(true);
    };
    // logic handle filter, search, pagination
    const {dataSearch, dataLength} = useMemo(() => {
        const {dataSearch, dataLength} = handleFilter(search, select, page, pageSize, employee);
        return {dataSearch, dataLength};
    }, [employee, select, search, page, pageSize]);

    return (
        <>
            <Row>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Row style={{margin: 10}} gutter={[16, 16]}>
                    {dataSearch.map((emp) => {
                        return (
                            <Col key={emp.id} span={6}>
                                <Card variant="borderless">
                                    <Form
                                        labelCol={{span: 10}}
                                        wrapperCol={{span: 14}}
                                        initialValues={emp || {}}
                                    >
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[{required: true, message: "Vui lòng nhập tên nhân viên"}]}
                                        >
                                            <Input placeholder="Tên nhân viên" />
                                        </Form.Item>
                                        <Form.Item
                                            label="City"
                                            name="city"
                                            rules={[{required: true, message: "Vui lòng nhập thành phố"}]}
                                        >
                                            <Input placeholder="Thành Phố" />
                                        </Form.Item>
                                        <Form.Item label="Country" name="country" rules={[{required: true}]}>
                                            <Input placeholder="Quốc gia" />
                                        </Form.Item>
                                        <Form.Item label="Department" name="department" rules={[{required: true}]}>
                                            <Input placeholder="Phòng ban" />
                                        </Form.Item>
                                        <Form.Item label="Address" name="address" rules={[{required: true}]}>
                                            <Input placeholder="Địa chỉ" />
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
                <Row>
                    <Col span={24}>
                        <Pagination
                          page={page}
                          setPage={setPage}
                          pageSize={pageSize}
                          setPageSize={setPageSize}
                          totalEmployee={dataLength}
                        />
                    </Col>
                </Row>
            </Spin>
            
            <EmployeeCreate isCreateEmployee={isCreateEmployee} setCreateEmployee={setCreateEmployee} />
        </>
    );
});
export default EmployeeCard;
