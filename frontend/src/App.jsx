import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import NotFound from "./errors/NotFound";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import BaseLayout from "./layouts/BaseLayout";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Chat from "./pages/Chat";
import Account from "./pages/settings/Account";
import Email from "./pages/settings/Email";
import Password from "./pages/settings/Password";
import Theme from "./pages/settings/Theme";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to={"/login"} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<BaseLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/chat" element={<Chat />} />

          {/* Setting */}
          <Route path="/account" element={<Account />} />
          <Route path="/email" element={<Email />} />
          <Route path="/password" element={<Password />} />
          <Route path="/theme" element={<Theme />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
