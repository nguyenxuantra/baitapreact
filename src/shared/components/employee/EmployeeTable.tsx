import {Button, Select, Table, type TableProps} from "antd";
import type {Employee} from "../../../stores/employees/EmployeeStore";
import type React from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useMemo} from "react";

interface PropEmployee {
    data: Employee[];
    columns: TableProps<Employee>["columns"];
    loading: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    totalEmployee: number;
}

const EmployeeTable = ({data, columns, loading, page, setPage, pageSize, setPageSize, totalEmployee}: PropEmployee) => {
    const pageNumber = useMemo(() => {
        return totalEmployee % pageSize === 0
            ? Math.floor(totalEmployee / pageSize)
            : Math.floor(totalEmployee / pageSize + 1);
    }, [totalEmployee, pageSize]);

    const pagePre = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const pageNext = () => {
        if (page < pageNumber) {
            setPage(page + 1);
        }
    };

    const pageComponent = () => {
        const pageButton = [];
        for (let i = 1; i <= pageNumber; i++) {
            pageButton.push(
                <Button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{
                        border: page === i ? "1px solid #000" : "none",
                    }}
                >
                    {i}
                </Button>
            );
        }
        return <>{pageButton}</>;
    };
    return (
        <>
            <Table<Employee> columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={false} />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    marginTop: "10px",
                }}
            >
                <Button onClick={pagePre} style={{border: "none"}}>
                    <LeftOutlined />
                </Button>
                {pageComponent()}
                <Button onClick={pageNext} style={{border: "none"}}>
                    <RightOutlined />
                </Button>
                <Select
                    showSearch
                    placeholder="page"
                    optionFilterProp="label"
                    defaultValue={{value: 8, label: "8/page"}}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={(value) => setPageSize(Number(value))}
                    options={[
                        {
                            value: 8,
                            label: "8/page",
                        },
                        {
                            value: 10,
                            label: "10/page",
                        },
                        {
                            value: 15,
                            label: "15/page",
                        },
                        {
                            value: "20",
                            label: "20/page",
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default EmployeeTable;
