import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./views/ErrorPage";
import ProtectedLayout from "./ProtectedLayout";
import CreateReport from "./views/Reports/CreateReport";
import ReportsList from "./views/Reports/ReportsList";
import LoginPage from "./views/auth/LoginPage";
import AuthLayout from "./views/auth/AuthLayout";
import Report from "./views/Reports/Report";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route path="login" element={<LoginPage />}></Route>
        </Route>
        <Route path="dashboard" element={<ProtectedLayout />}>
          <Route path="report" element={<CreateReport />}></Route>
          <Route path="reports/:id" element={<Report />}> </Route>
          <Route path="reports" element={<ReportsList />}></Route>
        </Route>
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
