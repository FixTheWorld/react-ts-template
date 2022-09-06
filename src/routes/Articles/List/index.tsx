import { Layout, Button, Space, PaginationProps, message } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { deleteApi, getApi, postApi } from "../../../common/request";
import List from "../../../components/List";
interface IArticle {
  article_title: string;
  article_id: number;
  article_content: string;
}

interface IArticleList {
  list: IArticle[];
  count: number;
}
const ArticleList = () => {
  // const [articleList, setArticleList] = useState<IArticleList>({
  //   list: [],
  //   count: 0,
  // });
  // const [page, setPage] = useState(1);
  // let [refreshCount, setRefreshCount] = useState(0);
  const navigate = useNavigate();
  const refList = useRef(null);
  // const changePage: PaginationProps["onChange"] = (p) => {
  //   setPage(p);
  // };

  // useEffect(() => {
  //   console.log({ page, refreshCount });
  //   getApi("/articles/list/" + page).then((res) => {
  //     setArticleList(res?.data?.data);
  //   });
  //   return () => {};
  // }, [page, refreshCount]);
  // const refreshPage = () => {
  //   console.log({ page, refreshCount });
  //   if (page === 1) {
  //     setRefreshCount(++refreshCount);
  //   } else {
  //     setPage(1);
  //   }
  // };
  const articleEdit = (articleId: number) => {
    navigate(`/articles/addOrEdit/${articleId}`);
  };
  // const articleDelete = (articleId: number) => {
  //   deleteApi(`/articles/${articleId}`).then((res) => {
  //     if (res.data.code === 0) {
  //       message.success("删除成功!");
  //       refreshPage();
  //     } else {
  //       message.warning("删除失败!");
  //     }
  //   });
  // };

  // const renderArticle = (item: IArticle) => {
  //   return (
  //     <List.Item>
  //       <List.Item.Meta
  //         title={item.article_title}
  //         description={item.article_content}
  //       />
  //       <Space>
  //         <Button onClick={() => articleEdit(item.article_id)}>编辑</Button>
  //         <Button onClick={() => articleDelete(item.article_id)}>删除</Button>
  //       </Space>
  //     </List.Item>
  //   );
  // };
  const newArticle = () => {
    navigate("/articles/addOrEdit/");
  };
  console.log("ref",refList);
  return (
    <Layout>
      {/* <List
        header={<Button onClick={() => newArticle()}>写文章</Button>}
        dataSource={articleList.list}
        renderItem={renderArticle}
        pagination={{
          position: "bottom",
          pageSize: 3,
          current: page,
          onChange: changePage,
          total: articleList.count,
        }}
      /> */}

      <List
        itemFields={{
          id: "article_id",
          title: "article_title",
          content: "article_content",
        }}
        apiList="/articles/list/"
        ref={refList}
        apiDelete="/articles/"
        itemEdit={articleEdit}
        header={<Button onClick={() => newArticle()}>写文章</Button>}
      />
    </Layout>
  );
};

export default ArticleList;
