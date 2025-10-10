import {Avatar, Form, Input, Modal} from "antd";
import {observer} from "mobx-react-lite";

import {useRootStore} from "../../../context/RootStoreContext";
import type {Employee} from "../../../stores/employees/EmployeeStore";
import {UploadOutlined} from "@ant-design/icons";

interface PropCreateEmployee {
    isCreateEmployee: boolean;
    setCreateEmployee: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeCreate = observer(({isCreateEmployee, setCreateEmployee}: PropCreateEmployee) => {
    const [form] = Form.useForm();
    const {employeeStore} = useRootStore();
    const {createEmployeeStore} = useRootStore();
    const {loading, fetchCreateEmployee} = createEmployeeStore;
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setCreateEmployee(false);
    };
    const handleSubmit = async (value: Employee) => {
        const values = {
            ...value,
            avatar:'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg'
        }
        await fetchCreateEmployee(values ,employeeStore)
        setCreateEmployee(false);
    };
    
    return (
        <Modal
            open={isCreateEmployee}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Trở lại"
            okButtonProps={{
                loading: loading,
            }}
            destroyOnHidden
        >
            <Form form={form} preserve={false} layout="vertical" onFinish={handleSubmit}>
                <Form.Item style={{ display: "flex", justifyContent:"center", alignItems:"center"}} name="avatar">
                    <Avatar  src='https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg' size={100} icon={<UploadOutlined />} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{required: true}]}>
                    <Input placeholder="Tên nhân viên" />
                </Form.Item>
                <Form.Item label="City" name="city" rules={[{required: true}]}>
                    <Input placeholder="Thành Phố" />
                </Form.Item>
                <Form.Item label="Country" name="country" rules={[{required: true}]}>
                    <Input placeholder="Quốc gia" />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{required: true}]}>
                    <Input placeholder="Địa chỉ" />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default EmployeeCreate;
