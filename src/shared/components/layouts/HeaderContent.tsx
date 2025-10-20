import { Menu } from "antd"
import { useNavigate } from "react-router-dom"

const items = [
    {
        key:1,
        label:"Employee Table",
        path:"/"
    },
    {
        key:2,
        label:"Employee Card",
        path:"/employee-card"
    }
]

const HeaderContent = () =>{
    const navigate = useNavigate();
    const handleClick = (e:any) =>{
        const item = items.find(i => i.key === Number(e.key));
        switch(item?.key){
            case 1:
                navigate(item.path);
                break;
            case 2: 
                navigate(item.path);
                break;
            default:
                navigate("/");
                break;
        }
    }
    return (
       <>
        <Menu   
            mode="horizontal"
            defaultSelectedKeys={['1']}
            onClick={handleClick}
            items={items}
            style={{
                flex:1,
                minWidth:0,
                backgroundColor:'#ebf2ef',
                height:"50px",
                lineHeight:"50px",
            }}
        />
       </>
   )
}

export default HeaderContent;