import { useOutlet } from "react-router-dom";
import AuthProvider from "./AuthProvider";

export default function AuthLayout() {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
}
