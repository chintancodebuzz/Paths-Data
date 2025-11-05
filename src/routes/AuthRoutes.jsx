// src/routes/AuthRoutes.jsx
import { Route } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import VerifyOtp from "../pages/auth/VerifyOtp";
import CreateProfile from "../pages/auth/profile/CreateProfile";
import CreateOrganization from "../pages/auth/organization/CreateOrganization";

export const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/create-profile" element={<CreateProfile />} />
    <Route path="/create-organization" element={<CreateOrganization />} />
  </>
);
