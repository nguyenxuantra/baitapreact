import { Descriptions, Modal } from "antd";
import { employees } from "../../data/employees";


interface PropsEmployeeCard{
    isOpenEmployee: boolean;
    setOpenEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    idEmployee: number | null;
}

const EmployeeCard = ({isOpenEmployee, setOpenEmployee, idEmployee}: PropsEmployeeCard) =>{
    const employee = employees.find(employees=>employees.id === idEmployee);
    const handleCancel = () =>{
       setOpenEmployee(false)
    }
    
    return (
        <Modal 
            open={isOpenEmployee}
            onCancel={handleCancel}
            onOk={handleCancel}
        >
            {employee ? (
                <Descriptions title="Employee Detail">
                    <Descriptions.Item label="ID">{employee.id}</Descriptions.Item>
                    <Descriptions.Item label="Code">{employee.code}</Descriptions.Item>
                    <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{employee.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
                </Descriptions>   
            ) : (
                <div>Employee not found</div>
            )}
        </Modal>
    )
}

export default EmployeeCard;