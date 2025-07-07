import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import UploadFile from "./components/UploadFile";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <DashboardLayout>
              <Account />
            </DashboardLayout>
          }
        />

        <Route
          path="/uploadfile"
          element={
            <DashboardLayout>
              <UploadFile />
            </DashboardLayout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
