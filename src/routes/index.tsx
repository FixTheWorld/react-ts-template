/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = React.lazy(() => import("./App/"));
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login/index"));
const Roles = React.lazy(() => import("./Users/Roles/List"));
const Register = React.lazy(() => import("./Register"));
const Limits = React.lazy(() => import("./Users/Limits"));
const ArticleEdit = React.lazy(() => import("./Articles/AddOrEdit"));
const ArticleList = React.lazy(() => import("./Articles/List"));

function Redirect({ to }: { to: string }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export default function MainRoute() {
  //嵌套路由，可以在父路由的组件中使用outlet占位显示子路由信息
  //嵌套子路由的path可以不用加/以及父路由名称，但link的话还是要写完整
  return (
    <Routes>
      <Route path="/" element={<React.Suspense children={<App />} />}>
        <Route path="/users">
          <Route path="roles" element={<Roles />} />
          <Route path="limits" element={<Limits />} />
        </Route>
        <Route path="/home" element={<React.Suspense children={<Home />} />} />
        <Route path="/articles">
          <Route path="list" element={<ArticleList />} />
          <Route path="addOrEdit" element={<ArticleEdit />}>
            {/* 可选参数 */}
            <Route path=":articleId" element={<ArticleEdit />} />
            <Route path="" element={<ArticleEdit />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<React.Suspense children={<Login />} />} />
      <Route
        path="/register"
        element={<React.Suspense children={<Register />} />}
      />
    </Routes>
  );
}
