import { type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes: FC<PropsWithChildren> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};
export default ProtectedRoutes;
