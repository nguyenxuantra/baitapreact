import {Button, Card, Col, Form, Input} from "antd";
import {useRootStore} from "../../../context/RootStoreContext";
import type {Employee} from "../../../stores/employees/EmployeeStore";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import EmployeeDelete from "./EmployeeDetele";

interface EmployeeCardEditProps {
    employee: Employee;
}

const EmployeeCardEdit = observer(({employee}: EmployeeCardEditProps) => {
    //state
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
        await fetchEditEmployee(values, id, employeeStore);
        setEdit(false);
    };
    const [form] = Form.useForm();
    return (
        <>
            <Col span={6}>
                <Card variant="borderless">
                    <Form
                        form={form}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 14}}
                        initialValues={employee || {}}
                        onFinish={(value) => handleSubmit(value, employee.id)}
                        preserve={false}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: "Vui lòng nhập tên nhân viên"}]}
                        >
                            {isEdit  ? (
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
                            {isEdit? (
                                <Input placeholder="Thành Phố" />
                            ) : (
                                <Input disabled placeholder="Thành phố" />
                            )}
                        </Form.Item>
                        <Form.Item label="Country" name="country" rules={[{required: true}]}>
                            {isEdit ? (
                                <Input placeholder="Quốc gia" />
                            ) : (
                                <Input disabled placeholder="Quốc gia" />
                            )}
                        </Form.Item>
                        <Form.Item label="Department" name="department" rules={[{required: true}]}>
                            {isEdit ? (
                                <Input placeholder="Phòng ban" />
                            ) : (
                                <Input disabled placeholder="Phòng ban" />
                            )}
                        </Form.Item>
                        <Form.Item label="Address" name="address" rules={[{required: true}]}>
                            {isEdit ? (
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
                                {isEdit ? (
                                    <>
                                        <Button onClick={() => setEdit(false)}>Quay lại</Button>
                                        <Button
                                            type="primary"
                                            loading={loading}
                                            onClick={() => form.submit()}
                                        >
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => {
                                                setIdDeleteEmployee(employee.id);
                                                setDeleteEmployee(true);
                                            }}
                                        >
                                            xoá
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setEdit(true);
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
            <EmployeeDelete
                isDeleteEmployee={isDeleteEmployee}
                setDeleteEmployee={setDeleteEmployee}
                idDeleteEmployee={isIdDeleteEmployee}
            />
        </>
    );
});
export default EmployeeCardEdit;
