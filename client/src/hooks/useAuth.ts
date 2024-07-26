import { useContext } from "react";
import { AuthContext } from "../views/auth/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};
