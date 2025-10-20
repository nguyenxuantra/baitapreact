import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Button, Select} from "antd";
import { useMemo } from "react";

interface PropPagination{
    page:number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageSize:number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    totalEmployee:number;
}
const Pagination = ({page, setPage, pageSize, setPageSize, totalEmployee}:PropPagination) => {
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
                        border: page === i ? "1px solid #50b6e6" : "none",
                        background:"#f5f7f6",
                    }}
                >
                    {i}
                </Button>
            );
        }
        return <>{pageButton}</>;
    };
    return (
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
    );
};
export default Pagination;
