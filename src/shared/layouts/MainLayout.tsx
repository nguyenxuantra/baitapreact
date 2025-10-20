import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import HeaderContent from "../components/layouts/HeaderContent";
const {Header, Content} = Layout;
const MainLayout = () => {
    return (
        <Layout style={{background: "white"}}>
            <Header
                style={{
                    backgroundColor: "#ebf2ef",
                    borderRadius: 5,
                    height: "50px",
                }}
            >
                <HeaderContent />
            </Header>
            <Content style={{margin: "15px 0px", background: "#f5f7f6", borderRadius: 5}}>
                <Outlet />
            </Content>
        </Layout>
    );
};
export default MainLayout;
