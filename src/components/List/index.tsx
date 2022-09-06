import { Layout, List, Button, Space, PaginationProps, message } from "antd";
import React, {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import { deleteApi, getApi } from "../../common/request";

export interface IProps {
  itemFields: { id: string; title: string; content: string };
  header?: ReactNode;
  apiList: string;
  apiDelete: string;
  itemEdit: (itemId: number) => void;
}

export interface IRef {
  refreshPage: () => void;
}
const ArticleList = forwardRef((props: IProps, ref: React.Ref<IRef>) => {
  let { header, apiList, apiDelete, itemEdit, itemFields } = props;
  const [articleList, setArticleList] = useState({
    list: [],
    count: 0,
  });
  const [page, setPage] = useState(1);
  const { id, content, title } = itemFields;
  let [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    getApi(apiList + page).then((res) => {
      setArticleList(res?.data?.data);
    });
    return () => {};
  }, [page, refreshCount]);

  const changePage: PaginationProps["onChange"] = (p) => {
    setPage(p);
  };
  const refreshPage = () => {
    if (page === 1) {
      setRefreshCount(++refreshCount);
    } else {
      setPage(1);
    }
  };
  const articleDelete = (articleId: number) => {
    deleteApi(apiDelete + `/${articleId}`).then((res) => {
      if (res.data.code === 0) {
        message.success("删除成功!");
        refreshPage();
      } else {
        message.warning("删除失败!");
      }
    });
  };
  const renderItem = (item: any) => {
    return (
      <List.Item>
        <List.Item.Meta title={item[title]} description={item[content]} />
        <Space>
          <Button onClick={() => itemEdit(item[id])}>编辑</Button>
          <Button onClick={() => articleDelete(item[id])}>删除</Button>
        </Space>
      </List.Item>
    );
  };

  useImperativeHandle(ref, () => ({
    refreshPage,
  }));

  return (
    <Layout>
      <List
        header={header ? header : null}
        dataSource={articleList.list}
        renderItem={renderItem}
        pagination={{
          position: "bottom",
          pageSize: 3,
          current: page,
          onChange: changePage,
          total: articleList.count,
        }}
      />
    </Layout>
  );
});

export default ArticleList;
