import { Avatar, Button, Card, Col, Row, type TableProps } from "antd";

import EmployeeTable from "./EmployeeTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EmployeeDetail from "./EmployeeDetail";
import { useEffect, useMemo, useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import { useRootStore } from "../../../context/RootStoreContext";
import type { Employee } from "../../../stores/employees/EmployeeStore";
import { observer } from "mobx-react-lite";
import EmployeeDelete from "./EmployeeDetele";
import EmployeeCreate from "./EmployeeCreate";

const EmployeeList = observer(() => {
  const { employeeStore } = useRootStore();
  const { employee, fetchEmployee, loading } = employeeStore;
  useEffect(() => {
    fetchEmployee();
  }, []);
  const [isOpenEmployee, setOpenEmployee] = useState(false);
  const [isDeleteEmployee, setDeleteEmployee] = useState<boolean>(false);
  const [isIdEmployee, setIdEmployee] = useState<number | null>(null);
  const [isIdDeleteEmployee, setIdDeleteEmployee] = useState<number | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all");

  const [isCreateEmployee, setCreateEmployee] = useState<boolean>(false);

  const handleOpenEmployee = (idEmployee: number) => {
    setOpenEmployee(true);
    setIdEmployee(idEmployee);
  };
  const handleDeleteEmployee = (idEmployee: number) => {
    setDeleteEmployee(true);
    setIdDeleteEmployee(idEmployee);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const handleSelect = (value: string) => {
    setSelect(value);
  };
  const handleSetCreateEmployee = () => {
    setCreateEmployee(true);
  };
  const handleReset = () => {
    setSearch("");
    setSelect("all");
  };
  const { dataSearch, dataLength } = useMemo(() => {
    const dataFilter = employee.filter((emp) => {
      const filterSearch =
        emp.id.toString().includes(search) ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.address.toLowerCase().includes(search.toLowerCase()) ||
        emp.city.toLowerCase().includes(search.toLowerCase()) ||
        emp.country.toLowerCase().includes(search.toLowerCase());
      const filterSelect =
        select === "all" || select.toLowerCase() === emp.department.toLowerCase();
      return filterSearch && filterSelect;
    });
    return {
      dataSearch: dataFilter,
      dataLength: dataFilter.length,
    };
  }, [employee, select, search]);

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
              <Button
                color="cyan"
                variant="solid"
                onClick={() => handleOpenEmployee(action.id)}
              >
                <EditOutlined />
              </Button>
              <Button
                color="danger"
                variant="solid"
                onClick={() => handleDeleteEmployee(action.id)}
              >
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
      <Row style={{ marginBottom: 20 }}>
        <Col span={6}>
          <EmployeeSearch onSearch={handleSearch} />
        </Col>
        <Col span={12} offset={6}>
          <Row justify={"end"} align={"middle"}>
            <Col>
              <p>
                Tổng số nhân viên <span>{dataLength}</span>
              </p>
            </Col>
            <Col>
              <EmployeeFilter handleSelect={handleSelect} />
            </Col>
            <Col>
              <Button onClick={handleReset} style={{ marginLeft: 10 }}>
                Reset
              </Button>
            </Col>
            <Col>
              <Button
                style={{ marginLeft: 10 }}
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
      <Row>
        <Col span={24}>
          <EmployeeTable
            data={dataSearch}
            columns={columns}
            loading={loading}
          />
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
          <EmployeeCreate
            isCreateEmployee={isCreateEmployee}
            setCreateEmployee={setCreateEmployee}
          />
        </Col>
      </Row>
    </>
  );
});

export default EmployeeList;
