import AuthContext from "../store/context";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  console.log("test");
  let { auth } = useContext(AuthContext);
  console.log(auth);
  if (Object.keys(auth).length === 0) {
    const restoredAuth =
      JSON.parse(window.sessionStorage.getItem("auth")) || {};
    console.log(restoredAuth);
    if (Object.keys(restoredAuth) !== 0) {
      auth = restoredAuth;
    }
  }
  const location = useLocation();
  if (!auth.token || !auth.userId) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element,
};

export default RequireAuth;
