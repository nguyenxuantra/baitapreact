import { Select } from "antd";


interface PropEmployeeFilter{
    handleSelect: (value: string)=>void;
}
const EmployeeFilter = ({handleSelect}: PropEmployeeFilter) => {
    return (
        <>
            <Select
                defaultValue={"Chức vụ"}
                onChange={handleSelect}
                options={[
                    {
                        value: "all",
                        label: "Chức vụ",
                    },
                    {
                        value: "Frontend Dev",
                        label: "Frontend Dev",
                    },
                    {
                        value: "Backend Dev",
                        label: "Backend Dev",
                    },
                    {
                        value: "Manager",
                        label: "Manager",
                    },
                    {
                        value: "UI/UX Designer",
                        label: "UI/UX Designer",
                    },
                ]}
            />
        </>
    );
};
export default EmployeeFilter;
