import { Avatar, Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { UploadOutlined } from "@ant-design/icons";
import { useRootStore } from "../../context/RootStoreContext";
import type { Employee } from "../../stores/employees/EmployeeStore";
import { useNavigate } from "react-router-dom";

const EmployeeCreate = observer(() => {
  const [form] = Form.useForm();
  const { employeeStore } = useRootStore();
  const { createEmployeeStore } = useRootStore();
  const { loading, fetchCreateEmployee } = createEmployeeStore;
  const navigate = useNavigate();
  const handleSubmit = async (value: Employee) => {
    const values = {
      ...value,
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg",
    };
    await fetchCreateEmployee(values, employeeStore);
    navigate("/")
  };

  return (
    <Form
      form={form}
      preserve={false}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        name="avatar"
      >
        <Avatar
          src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/42.jpg"
          size={100}
          icon={<UploadOutlined />}
        />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Tên nhân viên" />
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Input placeholder="Thành Phố" />
      </Form.Item>
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Input placeholder="Quốc gia" />
      </Form.Item>
      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true }]}
      >
        <Input placeholder="Phòng ban" />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input placeholder="Địa chỉ" />
      </Form.Item>
      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Button onClick={() => navigate("/")}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
export default EmployeeCreate;
