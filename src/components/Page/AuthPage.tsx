import { Navigate, Outlet } from "react-router";
import { AuthPageProps } from "./types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
const AuthPage = ({ roles }: AuthPageProps) => {
  const user = useSelector(authSelector);
  const { roles: userRoles } = user;
  console.log(user, roles);
  if (!userRoles) return <Navigate to="/login" />;
  if (roles && !userRoles.some((role) => roles.has(role)))
    return <Navigate to={"/forbidden"}></Navigate>;
  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthPage;
