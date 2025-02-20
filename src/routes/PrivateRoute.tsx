import { logout, selectCurrentToken, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate state={location?.pathname} to={"/login"} replace={true} />;
  }

  if (role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }

  if (user) return children;
};

export default PrivateRoute;
