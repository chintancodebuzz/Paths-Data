// src/routes/DashboardRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Workspace from "../pages/workspace/Workspace";
import AddWorkspace from "../pages/workspace/AddWorkspace";
import Network from "../pages/network/Network";
import NewHome from "../pages/home/NewHome";
import Home from "../pages/home/Home";
import AddNetwork from "../pages/network/AddNetwork";
import Roles from "../pages/users/roles/Roles";
import Users from "../pages/users/Users";
import Setting from "../pages/setting/Setting";
import CrossAccountIAMRole from "../pages/network/crossAccountIAMRoles/CrossAccountIAMRole";
import AddCrossAccountIAMRole from "../pages/network/crossAccountIAMRoles/AddCrossAccountIAMRole";

export const DashboardRoutes = (
  <Route
    path="/dashboard/*"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="workspace" element={<Workspace />} />
    <Route path="workspace/add-workspace" element={<AddWorkspace />} />
    <Route path="users" element={<Users />} />
    <Route path="users/roles" element={<Roles />} />
    <Route path="network" element={<Network />} />
    <Route path="account-role" element={<CrossAccountIAMRole />} />
    <Route path="network/add-network" element={<AddNetwork />} />
    <Route
      path="account-role/add-cross-role"
      element={<AddCrossAccountIAMRole />}
    />
    <Route path="setting" element={<Setting />} />
    <Route path="home" element={<NewHome />} />
    <Route path="home2" element={<Home />} />
  </Route>
);
