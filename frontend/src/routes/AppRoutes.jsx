import {
  Route,
  Routes,
  // Outlet, useNavigate
} from "react-router-dom";

// General Pages
import LandingPage from "../views/LandingPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import FeaturesPage from "../views/FeaturesPage";
import ReservePage from "../views/ReservePage";

// User Pages
import UserDashboardPage from "../views/UserPage";
import EventsPage from "../views/UserPage/EventsPage";

// Organizer Pages
import OrganizerPage from "../views/OrganizerPage";
import OrgEventsPage from "../views/OrganizerPage/OrgEventsPage";
import OrgEventPage from "../views/OrganizerPage/OrgEventPage";
import CreateEventPage from "../views/OrganizerPage/CreateEventPage";
import OrgSettingsPage from "../views/OrganizerPage/SettingsPage";

import Layout from "../components/layout/Layout";
// import { useAuth } from "../providers/AuthProvider";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reserve/:id" element={<ReservePage />} />
      <Route path="/user" element={<Layout sidebar />}>
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="events" element={<EventsPage />} />
      </Route>

      {/* <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="/" element={<UserDashboardPage />} />
        </Route> */}

      <Route path="/organizer" element={<Layout sidebar />}>
        <Route path="dashboard" element={<OrganizerPage />} />
        <Route path="events" element={< OrgEventsPage/>} />
        <Route path="create-event" element={<CreateEventPage />} />
        <Route path="event/:id" element={<OrgEventPage />} />
        <Route path="settings" element={<OrgSettingsPage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

// const ProtectedRoutes = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   if (user) {
//     return <Outlet />;
//   } else {
//     navigate("/");
//   }
// };

export default AppRoutes;
