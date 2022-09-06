import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { postApi } from "../../common/request";

const Register: React.FC = () => {
  const onFinish = (values: Array<string>) => {
    postApi("/users/register", values).then((res) => {
      if (res.data.code=== 0) {
        Modal.success({
          content: "注册成功",
          onOk() {
            nav("/login");
          },
        });
      }
    });
  };
  const nav = useNavigate();
  return (
    <div className="cm-flex-v-c cm-full-h">
      <Form className="rg cm-padding" onFinish={onFinish}>
        <h2>注册账号</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Register</Button>
          <Button
            className="cm-margin"
            onClick={() => nav("/login")}
            type="primary"
          >
            Back To Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
