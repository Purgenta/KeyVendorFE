import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "../layout/Layout";
import SmallWithLogoLeft from "../layout/Footer";
import Login from "./pages/login/Login";
import { Box } from "@chakra-ui/react";
import Register from "./pages/register/Register";
import AuthPage from "../components/Page/AuthPage";
import CreateKey from "./pages/createkey";
import CreateVendor from "./pages/createvendor";
import SalesLayout from "../layout/sales/Layout";
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
        <Route
          element={
            <>
              <AuthPage roles={new Set(["Sales"])} />
            </>
          }
        >
          <Route element={<SalesLayout />}>
            <Route path="/sales" element={<></>}></Route>
            <Route
              path="/sales/createkey"
              element={<CreateKey></CreateKey>}
            ></Route>
            <Route
              path="/sales/createvendor"
              element={<CreateVendor></CreateVendor>}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<></>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
