// src/routes/WorkspaceRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import WorkspaceHome from "../pages/workspace/home/WorkspaceHome";
import Cluster from "../pages/cluster/Cluster";
import AddCluster from "../pages/cluster/AddCluster";
import ClusterDetails from "../pages/cluster/ClusterDetails";
import CloudResourceIAMRole from "../pages/cloudResourceIAMRole/CloudResourceIAMRole";
import AddCloudResourceIAMRole from "../pages/cloudResourceIAMRole/AddCloudResourceIAMRole";
import WorkspaceDashboardLayout from "../layouts/workspace/workspaceDashboardLayout";

export const WorkspaceRoutes = (
  <Route
    path="/workspace/:workspaceId/*"
    element={
      <ProtectedRoute>
        <WorkspaceDashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="home" element={<WorkspaceHome />} />
    <Route path="cluster" element={<Cluster />} />
    <Route path="cluster/add-cluster" element={<AddCluster />} />
    <Route
      path="cluster/:clusterId/cluster-detail"
      element={<ClusterDetails />}
    />
    <Route path="cloude-resource" element={<CloudResourceIAMRole />} />
    <Route
      path="cloude-resource/add-cloude-resource"
      element={<AddCloudResourceIAMRole />}
    />
  </Route>
);
