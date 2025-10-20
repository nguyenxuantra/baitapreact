import { Select } from "antd";
import { useRootStore } from "../../../context/RootStoreContext";
import { observer } from "mobx-react-lite";
import {  useMemo } from "react";

interface PropEmployeeFilter {
  handleSelect: (value: string) => void;
  value: string;
}
const EmployeeFilter = observer(({ handleSelect, value }: PropEmployeeFilter) => {
  console.log("render filter")
  const { employeeStore } = useRootStore();
  const options = useMemo(() => {
    const departmentOptions = Array.from(
      new Set(employeeStore.employee.map((e) => e.department))
    ).map((dept) => ({
      value: dept.toLowerCase(),
      label: dept,
    }));
    return [{ value: "all", label: "All Departments" }, 
        ...departmentOptions];
  },[employeeStore.employee]);
  return (
    <>
      <Select
        value={value}
        defaultValue={"All Department"}
        style={{ marginLeft: 10 }}
        onChange={handleSelect}
        options={options}
      />
    </>
  );
});
export default EmployeeFilter;
