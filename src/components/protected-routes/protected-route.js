import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

const ProtectedRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={() =>
        getCookie("accessToken") ? children : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
