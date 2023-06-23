import React from "react";
import style from "./UserDashboardPage.module.css";
import withAuth from "../../components/HOC/withAuth";
import RecommendedEvents from "./components/RecommendedEvents";
import UpcomingReservations from "./components/UpcomingReservations";
import ReservationHistory from "./components/ReservationHistory";

const UserDashboardPage = ({ user }) => {
  return (
    <div className={style.dashboard}>
      <h1>User Dashboard</h1>
      <div className={style.flexDashboard}>
        <ReservationHistory />
        <UpcomingReservations />
        <RecommendedEvents />
      </div>
    </div>
  );
};

export default withAuth(UserDashboardPage);
