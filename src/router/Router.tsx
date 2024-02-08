import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "../layout/Layout";
import SmallWithLogoLeft from "../layout/Footer";
import Login from "./pages/login/Login";
import { Box } from "@chakra-ui/react";
import Register from "./pages/register/Register";
import AuthPage from "../components/Page/AuthPage";
import CreateKey from "./pages/sales/createkey";
import CreateVendor from "./pages/sales/createvendor";
import SalesLayout from "../layout/sales/Layout";
import Sales from "./pages/sales";
import Search from "./pages/search";
import Orders from "./pages/orders";
import SalesOrders from "./pages/sales/orders";
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
        <Route path="/search" element={<Search />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route
          element={
            <>
              <AuthPage roles={new Set(["Sales"])} />
            </>
          }
        >
          <Route element={<SalesLayout />}>
            <Route path="/sales" element={<Sales />}></Route>
            <Route
              path="/sales/createkey"
              element={<CreateKey></CreateKey>}
            ></Route>
            <Route
              path="/sales/createvendor"
              element={<CreateVendor></CreateVendor>}
            ></Route>
            <Route path="/sales/orders" element={<SalesOrders />} />
          </Route>
        </Route>
        <Route path="*" element={<></>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
