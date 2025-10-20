import {DeleteOutlined} from "@ant-design/icons";
import { Modal} from "antd";
import { useRootStore } from "../../../context/RootStoreContext";
import { observer } from "mobx-react-lite";


interface PropEmployeeDelete{
    isDeleteEmployee: boolean;
    setDeleteEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    idDeleteEmployee:number | null
}

const EmployeeDelete = observer(({isDeleteEmployee, setDeleteEmployee, idDeleteEmployee}:PropEmployeeDelete) => {
    
    const {employeeStore} = useRootStore();
    const {employee} = employeeStore;
    const {deleteEmployeeStore} = useRootStore();
    const {loading, fetchDeleteEmployee} = deleteEmployeeStore;

    const employeeDelete = employee.find(e => e.id === idDeleteEmployee);
    const handleOnOk = async () =>{
        await fetchDeleteEmployee(Number(idDeleteEmployee),employeeStore);
        setDeleteEmployee(false)
    }
    const handleCancel = () =>{
        setDeleteEmployee(false)
    }
    return (
        <>
            <Modal 
               open={isDeleteEmployee}
               onCancel={handleCancel}
               onOk={handleOnOk}
               destroyOnHidden
               okText='Xác nhận' 
               okButtonProps={{
                loading:loading
               }}
                >
                <DeleteOutlined />
                <p>Xác nhận xoá nhân viên {employeeDelete?.name}</p> 
            </Modal>
        </>
    );
});
export default EmployeeDelete;
