import { Route, Routes } from "react-router-dom";

import LandingPage from "../views/LandingPage";
import EventsPage from "../views/EventsPage";


const AppRoutes = () => {
  return (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/events" element={<EventsPage />} />

    
    <Route path="*" element={<h1>Not Found</h1>} />
  </Routes>
  );
};

export default AppRoutes;
