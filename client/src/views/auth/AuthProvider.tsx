import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserType, registerUser } from "../../api/api";

type AuthContextType = {
  user: string;
  login: (data: UserType) => void;
  signup: (data: UserType) => void;
  logout: () => void;
};

interface AuthProviderType {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export default function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useLocalStorage({
    keyName: "user",
    defaultValue: null,
  });
  const navigate = useNavigate();

  //call this func to authenticate user
  const login = async ({ email, password }: UserType) => {
    try {
      const { data } = await registerUser({
        email,
        password,
      });
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const signup = async (data: UserType) => {
    const res = await registerUser(data);
    setUser(res);
    navigate("/dashboard");
  };

  //call this func to log out
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
