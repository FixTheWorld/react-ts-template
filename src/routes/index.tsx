/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = React.lazy(() => import("./App/"));
const TestRedux = React.lazy(() => import("./TestRedux"));
const Login = React.lazy(() => import("./Login/index"));
const TestMobx = React.lazy(() => import("./TestMobx"));

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
        <Route
          path="/testHooks/*"
          element={<React.Suspense children={<TestRedux />} />}
        >
          <Route path="useContext" element={<TestRedux />} />
          <Route path="useMemo" element={<TestRedux />} />
        </Route>
        <Route
          path="/testRedux"
          element={<React.Suspense children={<TestRedux />} />}
        />
        <Route
          path="/testMobx"
          element={<React.Suspense children={<TestMobx/>} />}
        />
      </Route>
      <Route
          path="/login"
          element={<React.Suspense children={<Login />} />}
        />
    </Routes>
  );
}
