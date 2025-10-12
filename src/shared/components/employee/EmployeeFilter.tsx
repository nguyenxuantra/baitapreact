import { Select } from "antd";
import { useRootStore } from "../../../context/RootStoreContext";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

interface PropEmployeeFilter {
  handleSelect: (value: string) => void;
}
const EmployeeFilter = observer(({ handleSelect }: PropEmployeeFilter) => {
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
        defaultValue={"Department"}
        style={{ marginLeft: 10 }}
        onChange={handleSelect}
        options={options}
      />
    </>
  );
});
export default EmployeeFilter;
