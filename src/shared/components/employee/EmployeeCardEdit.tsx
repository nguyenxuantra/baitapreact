import {Button, Card, Col, Form, Input, Row} from "antd";
import {useRootStore} from "../../../context/RootStoreContext";
import type {Employee} from "../../../stores/employees/EmployeeStore";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import EmployeeDelete from "./EmployeeDetele";

interface EmployeeCardEditProps {
    dataSearch: Employee[];
}

const EmployeeCardEdit = observer(({dataSearch}: EmployeeCardEditProps) => {
    //state
    const [idSubmit, setIdSubmit] = useState<number | null>(null);
    const [isEdit, setEdit] = useState<boolean>(false);
    const [isDeleteEmployee, setDeleteEmployee] = useState<boolean>(false);
    const [isIdDeleteEmployee, setIdDeleteEmployee] = useState<number | null>(null);

    // employee store
    const {employeeStore} = useRootStore();
    // employee edit store
    const {editEmployeeStore} = useRootStore();
    const {loading, fetchEditEmployee} = editEmployeeStore;
    // employee form
    const handleSubmit = async (values: Employee, id: number) => {
        setIdSubmit(id);
        await fetchEditEmployee(values, id, employeeStore);
        setEdit(false);
    };
    const [form] = Form.useForm();
    return (
        <>
            <Row style={{margin: 10}} gutter={[16, 16]}>
                {dataSearch.map((emp) => {
                    return (
                        <Col key={emp.id} span={6}>
                            <Card variant="borderless">
                                <Form
                                    form={form}
                                    labelCol={{span: 10}}
                                    wrapperCol={{span: 14}}
                                    initialValues={emp || {}}
                                    onFinish={(value) => handleSubmit(value, emp.id)}
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{required: true, message: "Vui lòng nhập tên nhân viên"}]}
                                    >
                                        {isEdit && emp.id === idSubmit ? (
                                            <Input placeholder="Tên nhân viên" />
                                        ) : (
                                            <Input disabled placeholder="Tên nhân viên" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="City"
                                        name="city"
                                        rules={[{required: true, message: "Vui lòng nhập thành phố"}]}
                                    >
                                        {isEdit && emp.id === idSubmit ? (
                                            <Input placeholder="Thành Phố" />
                                        ) : (
                                            <Input disabled placeholder="Thành phố" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Country" name="country" rules={[{required: true}]}>
                                        {isEdit && emp.id === idSubmit ? (
                                            <Input placeholder="Quốc gia" />
                                        ) : (
                                            <Input disabled placeholder="Quốc gia" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Department" name="department" rules={[{required: true}]}>
                                        {isEdit && emp.id === idSubmit ? (
                                            <Input placeholder="Phòng ban" />
                                        ) : (
                                            <Input disabled placeholder="Phòng ban" />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="Address" name="address" rules={[{required: true}]}>
                                        {isEdit && emp.id === idSubmit ? (
                                            <Input placeholder="Địa chỉ" />
                                        ) : (
                                            <Input disabled placeholder="Địa chỉ" />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        style={{
                                            marginBottom: 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                gap: 10,
                                            }}
                                        >
                                            {isEdit && emp.id === idSubmit ? (
                                                <>
                                                    <Button onClick={() => setEdit(false)}>Quay lại</Button>
                                                    <Button
                                                        type="primary"
                                                        loading={emp.id === idSubmit ? loading : false}
                                                        onClick={() => form.submit()}
                                                    >
                                                        Save
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={() => {
                                                            setIdDeleteEmployee(emp.id);
                                                            setDeleteEmployee(true);
                                                        }}
                                                    >
                                                        xoá
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            setEdit(true);
                                                            setIdSubmit(emp.id);
                                                        }}
                                                    >
                                                        Sửa
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <EmployeeDelete
                isDeleteEmployee={isDeleteEmployee}
                setDeleteEmployee={setDeleteEmployee}
                idDeleteEmployee={isIdDeleteEmployee}
            />
        </>
    );
});
export default EmployeeCardEdit;
