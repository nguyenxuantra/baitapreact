import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import Headers from "../components/layouts/Header";
import { Header } from "antd/es/layout/layout";

const MainLayout = () => {
  return (
    <div>
      <Layout>
        <Header>
          <Headers />
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
};
export default MainLayout;
