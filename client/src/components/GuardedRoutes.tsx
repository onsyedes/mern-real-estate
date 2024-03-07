import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import { Navigate, Outlet } from "react-router-dom";
const GuardedRoutes = () => {
  const user = useAppSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default GuardedRoutes;
