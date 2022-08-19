import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

function App() {
  interface ItemType {
    item: Object;
    key: String;
  }

  const { Header, Content, Footer, Sider } = Layout;

  const items = [
    {
      label: "Home",
      key: "/",
      icon: React.createElement(UploadOutlined),
    },
    {
      label: "Test Redux",
      key: "/testRedux",
      icon: React.createElement(UserOutlined),
    },
    {
      label: "Test Hooks",
      key: "/testHooks",
      icon: React.createElement(VideoCameraOutlined),
    },
    {
      label: "Test Mobx",
      key: "/testMobx",
      icon: React.createElement(VideoCameraOutlined),
    },
  ];
  const navigate = useNavigate();
  const linkTo = (params: ItemType) => {
    const { key } = params;
    navigate(key.toString());
  };

  //tests proxy
  useEffect(() => {
    // axios
    //   .get(
    //     "/ajax/filterCinemas?ci=10&optimus_uuid=7C7A63F0192A11ED97E2CB3B6951DCE48B79ED1D54BC49A99EBDB23EEF27CAD8&optimus_risk_level=71&optimus_code=10"
    //   )
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  }, []);

  return (
    <div className="cm-flex cm-flex-v">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            onClick={linkTo}
          />
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: "24px 16px 0", overflowY: "scroll" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

function checkAuth() {
  const login = sessionStorage.getItem("login");
  if (login) {
    return <App />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default checkAuth;
