import { Select } from "antd";


interface PropEmployeeFilter{
    handleSelect: (value: string)=>void;
}
const EmployeeFilter = ({handleSelect}: PropEmployeeFilter) => {
    return (
        <>
            <Select
                defaultValue={"Country"}
                onChange={handleSelect}
                options={[
                    {
                        value: "all",
                        label: "Country",
                    },
                    {
                        value: "cumbria",
                        label: "Cumbria",
                    },
                    {
                        value: "derbyshire",
                        label: "Derbyshire",
                    },
                    {
                        value: "lancashire",
                        label: "Lancashire",
                    },
                    {
                        value: "northumberland",
                        label: "Northumberland",
                    },
                ]}
            />
        </>
    );
};
export default EmployeeFilter;
