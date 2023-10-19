import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "../layout/Layout";
import SmallWithLogoLeft from "../layout/Footer";
import Login from "./pages/login/Login";
import { Box } from "@chakra-ui/react";
import Register from "./pages/register/Register";
const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <SidebarWithHeader />
            <Box position={"relative"} ml={{ base: 0, md: 60 }} p="4">
              <SmallWithLogoLeft />
            </Box>
          </>
        }
      >
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<></>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
