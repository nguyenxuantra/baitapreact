import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRootStore } from "../../context/RootStoreContext";
import { Avatar, Button, Form, Input } from "antd";
import type { Employee } from "../../stores/employees/EmployeeStore";
import { observer } from "mobx-react-lite";

const EmployeeEdit = observer(() => {

  //  react-router-dom
  const { id } = useParams();
  // handle change form
  const [isChage, setChange] = useState<boolean>(true);
  // employee edit store
  const { employeeStore } = useRootStore();
  const { editEmployeeStore } = useRootStore();
  const { loading, fetchEditEmployee } = editEmployeeStore;
  // find employee by id
  const employee = employeeStore.employee.find(
    (employees) =>Number( employees.id) === Number(id)
  );
  // employee form
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async (values: Employee) => {
    const updateEmployee = {
      ...employee,
      ...values,
    };
    await fetchEditEmployee(updateEmployee, Number(id), employeeStore);
    navigate('/')
  };
  return (
    <Form
      form={form}
      onChange={() => setChange(false)}
      layout="vertical"
      initialValues={employee || {}}
      preserve={false}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="avatar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar size={100} src={employee?.avatar} />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Country" name="country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true }]}
      >
        <Input placeholder="Phòng ban" />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input />
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
          <Button onClick={()=>navigate("/")}>Cancel</Button>
          <Button disabled={isChage} type="primary" onClick={() => form.submit()} loading={loading}>
            Save
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
export default EmployeeEdit;
