import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("accessToken");
  console.log("this", isAuthenticated);

  return isAuthenticated !== null ? <Outlet /> : <Navigate to="/login" />;
  //   return (
  //     <Route
  //       {...restOfProps}
  //       render={(props) =>
  //         isAuthenticated !== null ? <Component {...props} /> : <Navigate to="/Login" />
  //       }
  //     />
  //   );
}

export default ProtectedRoute;
