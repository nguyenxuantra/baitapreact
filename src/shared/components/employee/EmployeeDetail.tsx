import {Avatar, Form, Input, Modal} from "antd";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../../context/RootStoreContext";
import {useState} from "react";
import type {Employee} from "../../../stores/employees/EmployeeStore";

interface PropsEmployeeDetail {
    isOpenEmployee: boolean;
    setOpenEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    idEmployee: number | null;
}

const EmployeeDetail = observer(({isOpenEmployee, setOpenEmployee, idEmployee}: PropsEmployeeDetail) => {
    const [isChage, setChange] = useState<boolean>(true);
    const {employeeStore} = useRootStore();
    const {editEmployeeStore} = useRootStore();
    const {loading, fetchEditEmployee} = editEmployeeStore;
    const employee = employeeStore.employee.find((employees) => employees.id === idEmployee);
    const [form] = Form.useForm();
    const handleCancel = () => {
        setOpenEmployee(false);
        setChange(true);
    };
    const handleSubmit = async (values: Employee) => {
        const updateEmployee = {
            ...employee,
            ...values,
        };
        await fetchEditEmployee(updateEmployee, Number(idEmployee), employeeStore);
        setOpenEmployee(false);
    };
    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal
            open={isOpenEmployee}
            onCancel={handleCancel}
            onOk={handleOk}
            okButtonProps={{
                disabled: isChage,
                loading: loading,
            }}
            okText="Save"
            destroyOnHidden
        >
            <Form
                form={form}
                onChange={() => setChange(false)}
                layout="vertical"
                initialValues={employee || {}}
                preserve={false}
                onFinish={handleSubmit}
            >
                <Form.Item name="avatar" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar size={100} src={employee?.avatar}/>
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="City" name="city" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Country" name="country" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Department" name="department" rules={[{required: true}]}>
                    <Input placeholder="Phòng ban" />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default EmployeeDetail;
