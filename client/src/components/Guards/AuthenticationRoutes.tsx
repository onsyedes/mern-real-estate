import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticationRoutes = () => {
  const user = useAppSelector(selectUser);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default AuthenticationRoutes;
