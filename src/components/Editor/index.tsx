import React, { useState } from "react";
import { ContentState, Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
export type TFunc = (content: string) => void;

interface IProps {
  getContent: TFunc;
}
const ArticleEditor:React.FC<IProps> = ({ getContent }: IProps) => {
  const [content, setContent] = useState<EditorState>();
  return (
    <div>
      <Editor
        editorState={content}
        // toolbarClassName="toolbarClassName"
        // wrapperClassName="wrapperClassName"
        editorClassName="cp-editor-editor"
        onEditorStateChange={(editorState) => setContent(editorState)}
        onBlur={() => {
          const contentState = content?.getCurrentContent();
          if (contentState) {
            console.log(
              "content html",
              draftToHtml(convertToRaw(contentState))
            );
            getContent(draftToHtml(convertToRaw(contentState)));
          }
        }}
      />
    </div>
  );
};

export default ArticleEditor;
