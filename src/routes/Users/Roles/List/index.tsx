import { Button, Form, Input, Layout, message, Modal } from "antd";
import React, { useRef, useState } from "react";
import { postApi } from "../../../../common/request";
import List,{IRef} from "../../../../components/List";

const RoleList = () => {
  const buttonRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const refList = useRef<IRef>(null);
  const roleEdit = () => {};
  const addRole = () => {
    setVisible(true);
  };
  const submitRole = (v: any) => {
    postApi("/roles/add", v).then((res) => {
      if (res?.data?.data?.insertId > 0) {
        setVisible(false);
        message.success("添加成功!");
        refList?.current?.refreshPage();
      } else {
        message.warning("添加失败!角色名已存在");
      }
    });
  };
  return (
    <Layout>
      <List
        itemFields={{
          id: "role_id",
          title: "role_name",
          content: "",
        }}
        apiList="/roles/list/"
        apiDelete="/roles/"
        itemEdit={roleEdit}
        ref={refList}
        header={<Button onClick={addRole}>添加角色</Button>}
      />

      <Modal
        title="添加角色"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={submitRole}
        footer={null}
      >
        <Form onFinish={submitRole}>
          <Form.Item
            name="role_name"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button ref={buttonRef} htmlType="submit">
              新增
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default RoleList;
