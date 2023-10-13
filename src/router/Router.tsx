import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "../layout/Layout";
const Router = () => {
  return (
    <Routes>
      <Route element={<SidebarWithHeader />}>
        <Route path="*" element={<></>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
