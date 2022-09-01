import { Button, Checkbox, Form, Input, Layout } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postApi } from "../../common/request";
import config from "../../config/index";

const prefix = `${config.appClassPrefix}login-`;
const cm = `${config.commonClassPrefix}`;
const { Header, Footer, Content } = Layout;

const Login: React.FC = () => {
  const nav = useNavigate();
  const onFinish = (values: any) => {
    postApi("/users/login", values).then((res:any) => {
      if (res.data.code === 0) {
        localStorage.setItem("loginToken", res.data.data);
        console.log('code=0');
        nav("/");
      }
    }).catch(e=>{
      console.log('error',e);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Content className="cm-flex-v-c">
        <Form
          className={`${prefix} ${cm}flex cm-padding`}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <NavLink to={"/register"}>注册账号</NavLink>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
