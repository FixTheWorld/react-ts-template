import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar, Dropdown, MenuProps, Space } from "antd";
import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import { postApi, checkLogin } from "../../common/request";
import { mainMenu, userMenu } from "../../config/menus";
import { logout } from "../../common/utils";
interface ItemType {
  item: Object;
  key: String;
}
const { Header, Content, Footer, Sider } = Layout;
let path: string = "";
const activeMenu: string[] = [];
const userInfoStr = localStorage.getItem("userInfo");
let username = "";
if (userInfoStr) {
  const userInfo = JSON.parse(userInfoStr);
  username = userInfo.username;
}

const App: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const arr: string[] = pathname.split("/");

  const navigate = useNavigate();
  const linkTo = (params: ItemType) => {
    const { key } = params;
    navigate(key.toString());
  };

  arr.map((item, index) => {
    if (item) {
      path += "/" + item;
      activeMenu.push(path);
    }
  });
  //异步操作，里面的变化无法显示在
  useEffect(() => {
    checkLogin();
    if (pathname === "/") {
      navigate("/home");
    }
  }, []);

  const userMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        {
          logout();
          navigate("/login");
        }
        break;
      case "settings":
        {
        }
        break;
      default: {
      }
    }
  };

  const userMenuEle = <Menu items={userMenu} onClick={userMenuClick} />;

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
          <div>&nbsp;</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={activeMenu}
            defaultSelectedKeys={activeMenu}
            items={mainMenu}
            onClick={linkTo}
          />
        </Sider>
        <Layout>
          <Header className="app-header cm-padding" style={{ padding: 0 }}>
            <Dropdown overlay={userMenuEle} placement="bottomRight" arrow>
              <Space>
                <span>你好，{username}</span>
                <Avatar size={30} icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </Header>
          <Content className="app-content">
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
};

function checkAuth() {
  const login = sessionStorage.getItem("login");
  if (login) {
    return <App />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
