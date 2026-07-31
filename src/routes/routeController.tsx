// src/routes/routeController.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import { routes } from "./routePaths";
import Layout from "../pages/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import UnfinishedPage from "../pages/UnfinishedPage";

const Home = lazy(() => import("../pages/Home"));
const EventDetails = lazy(() => import("../pages/eventDetailsV2"));
// const About = lazy(() => import("../pages/About"));
// const Features = lazy(() => import("../pages/Features"));
// const Publications = lazy(() => import("../pages/Publications"));
// const Calendar = lazy(() => import("../pages/Calendar"));
const Health = lazy(() => import("../pages/Health"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminHome = lazy(() => import("../pages/admin/AdminHome"));
const AdminLayout = lazy(() => import("../pages/admin/AdminLayout"));
const AdminMembers = lazy(() => import("../pages/admin/AdminMembers"));
const AdminImages = lazy(() => import("../pages/admin/AdminImages"));

export default function RouteController() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* admin login route */}
        <Route path={routes.login} element={<AdminLogin />} />
        
        {/* protected admin routes */}
        <Route
          path={routes.adminRoot}
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path={routes.adminMembers} element={<AdminMembers />} />
          <Route path={routes.adminImages} element={<AdminImages />} />
        </Route>

        {/* visitor routes */}
        <Route path={routes.root} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.eventDetails} element={<EventDetails />} />
          <Route path={routes.about} element={<UnfinishedPage />} />
          <Route path={routes.features} element={<UnfinishedPage />} />
          <Route path={routes.publications} element={<UnfinishedPage />} />
          <Route path={routes.calendar} element={<UnfinishedPage />} />
          <Route path={routes.health} element={<Health />} />

          {/* catch-all 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>

          <Route path="/admin" element={<AdminHome />} />

      </Routes>
    </Suspense>
  );
}
