// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { WorkspaceRoutes } from "./WorkspaceRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {AuthRoutes}
      {DashboardRoutes}
      {WorkspaceRoutes}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
