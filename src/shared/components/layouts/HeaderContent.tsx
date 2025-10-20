import { Menu } from "antd"
import { useLocation, useNavigate } from "react-router-dom"

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
    const locate = useLocation();
    const handleClick = (e:any) =>{
        const item = items.find(i => i.key === Number(e.key));
        if(item)navigate(item.path);
    }
    const currentItem = items.find(i =>i.path === locate.pathname);
    return (
       <>
        <Menu   
            mode="horizontal"
            selectedKeys={[String(currentItem)]}
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