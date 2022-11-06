import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const ProtectedRouteAuth = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (getCookie("accessToken") ? <Redirect to="/" /> : children)}
    />
  );
};

export default ProtectedRouteAuth;
