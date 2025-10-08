import { Button, Select, Tag, type TableProps } from "antd";

import EmployeeTable from "./EmployeeTable";
import { EyeOutlined } from "@ant-design/icons";
import EmployeeCard from "./EmployeeCard";
import { useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import { useNavigate } from "react-router-dom";
import { employees, type Employee } from "../../data/employees";

const EmployeeList = () => {
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
  const dataSearch = employees.filter((emp) => {
    const filterSearch =
      emp.id.toString().includes(search) ||
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.code.toLowerCase().includes(search.toLowerCase()) ||
      emp.phone.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.title.toLowerCase().includes(search.toLowerCase());
    const filterSelect = select === "all" || select === emp.title;
    return filterSearch && filterSelect;
  });
  const navigate  = useNavigate();
    const handleOnclick = (id: number) =>{
        navigate(`employee/${id}/edit`)
    }
  
  const columns: TableProps<Employee>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (_, value) => {
        let color;
        value.title === "Frontend Dev"
          ? (color = "red")
          : value.title === "Backend Dev"
          ? (color = "green")
          : value.title === "UI/UX Designer"
          ? (color = "volcano")
          : (color = "gold");
        return <Tag color={color}>{value.title}</Tag>;
      },
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, action) => {
        return (
          <>
            <Button onClick={() => handleOnclick(action.id)}>
              <EyeOutlined />
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
      <EmployeeTable data={dataSearch} columns={columns} />
      <EmployeeCard
        isOpenEmployee={isOpenEmployee}
        setOpenEmployee={setOpenEmployee}
        idEmployee={isIdEmployee}
      />
    </>
  );
};

export default EmployeeList;
