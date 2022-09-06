import { Button, Input, message, PaginationProps, Space } from "antd";
import React, { useState } from "react";
import { EditorState } from "react-draft-wysiwyg";
import { useNavigate, useParams } from "react-router";
import { postApi } from "../../../common/request";
import { clone } from "../../../common/utils";
import ArticleEditor, { TFunc } from "../../../components/Editor";

const userInfoStr = localStorage.getItem("userInfo");
let userInfo = { user_id: null };
if (userInfoStr) {
  userInfo = JSON.parse(userInfoStr);
}

const Index: React.FC = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const { articleId } = params;
 
  const getContent: TFunc = (contents: string) => {
    setContent(contents);
  };
  const submitArticle = () => {
    if (!content || !title) {
      message.warning("标题或内容不可为空!");
      return;
    }
    if (!articleId) {
      postApi("/articles/add", {
        title,
        content,
        user_id: userInfo?.user_id,
      }).then((res) => {
        const result = res.data.code;
        if (result === 0) {
          message.success("文章提交成功");
          nav("/articles/list");
        }
      });
    }
  };
  return (
    <div>
      <Space direction="vertical">
        <Input
          placeholder="标题"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <ArticleEditor getContent={getContent} />
        <Button onClick={submitArticle}>提交</Button>
      </Space>
    </div>
  );
};

export default Index;
