import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  List,
  Modal,
  message,
  Pagination,
  PaginationProps,
  Space,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { deleteApi, getApi, postApi } from "../../../../common/request";

const { Header, Content } = Layout;

interface IRole {
  role_id: number;
  role_name: string;
}

interface IRoleList {
  list: IRole[];
  count: number;
}

const App: React.FC = () => {
  const [list, setList] = useState<IRoleList>({ list: [], count: 0 });
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const [page, setPage] = useState(1);
  let [refreshCount, setRefreshCount] = useState(0);
  const changePage: PaginationProps["onChange"] = (p) => {
    setPage(p);
  };
  const refreshPage = () => {
    console.log({page,refreshCount});
    if (page === 1) {
      setRefreshCount(++refreshCount);
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    getApi("/roles/list/" + page).then((res) => {
      setList(res?.data?.data);
    });
    return () => {};
  }, [page, refreshCount]);

  const addRole = () => {
    setVisible(true);
  };

  const submitRole = (v: any) => {
    postApi("/roles/add", v).then((res) => {
      if (res?.data?.data?.insertId > 0) {
        setVisible(false);
        message.success("添加成功!");
        refreshPage();
      } else {
        message.warning("添加失败!角色名已存在");
      }
    });
  };

  const deleteRole = (item: IRole) => {
    deleteApi(`/roles/${item.role_id}`).then((res) => {
      if (res.data.code === 0) {
        message.success("删除成功!");
        refreshPage();
      } else {
        message.warning("删除失败!");
      }
    });
  };

  const listItem = (item: IRole) => {
    return (
      <List.Item>
        <h4>{item.role_name}</h4>
        <Space>
          <Button size="small" onClick={() => deleteRole(item)}>
            编辑
          </Button>
          <Button size="small" onClick={() => deleteRole(item)}>
            删除
          </Button>
        </Space>
      </List.Item>
    );
  };
  return (
    <Layout>
      <Header>
        <Button onClick={addRole}>添加角色</Button>
      </Header>
      <Content className="cm-padding">
        <Divider style={{ margin: "0 0" }} />
        <List
          dataSource={list.list}
          className="rl-list"
          header={<h2>角色列表</h2>}
          pagination={{
            position: "bottom",
            pageSize: 3,
            current: page,
            onChange: changePage,
            total: list.count,
          }}
          renderItem={(item: IRole) => listItem(item)}
        />
        {/* <Pagination
          style={{ textAlign: "center" }}
          current={page}
          onChange={changePage}
          total={50}
        /> */}
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
      </Content>
    </Layout>
  );
};

export default App;
