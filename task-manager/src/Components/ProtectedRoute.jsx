import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? <Element {...rest} /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoute;
