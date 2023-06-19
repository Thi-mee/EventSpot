import React from "react";

import SearchBar from "../../components/searchBar";
import CategoriesSection from "./components/CategoriesSection";
import PopularEventsSection from "./components/PopularEventsSection";
import { useAuth } from "../../providers/AuthProvider";
import withAuth from "../../components/HOC/withAuth";

const UserDashboardPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Welcome back, {user.name}</h2>
      <SearchBar />
      <CategoriesSection />
      <PopularEventsSection />
    </div>
  );
};

export default withAuth(UserDashboardPage);
