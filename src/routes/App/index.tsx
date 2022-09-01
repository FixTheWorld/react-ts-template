import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input, Button, Avatar, Dropdown, MenuProps } from "antd";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { postApi, checkLogin } from "../../common/request";
import { mainMenu, userMenu } from "../../config/menus";
import { logout } from "../../common/utils";

function App() {
  interface ItemType {
    item: Object;
    key: String;
  }

  const { Header, Content, Footer, Sider } = Layout;
  const { Search } = Input;

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
    checkLogin();
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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={mainMenu}
            onClick={linkTo}
          />
        </Sider>
        <Layout>
          <Header className="app-header cm-padding" style={{ padding: 0 }}>
            {/* <Search
              enterButton={
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                  <SearchOutlined />
                </Button>
              }
            /> */}
            <Dropdown overlay={userMenuEle} placement="bottomRight" arrow>
              <Avatar size={30} icon={<UserOutlined />} />
            </Dropdown>
          </Header>
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

export default App;
