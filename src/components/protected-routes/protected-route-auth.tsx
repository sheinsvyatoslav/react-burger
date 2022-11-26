import { ReactNode, FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

interface IProtectedRoute extends RouteProps {
  children: ReactNode;
}

const ProtectedRouteAuth: FC<IProtectedRoute> = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (getCookie("accessToken") ? <Redirect to="/" /> : children)}
    />
  );
};

export default ProtectedRouteAuth;
