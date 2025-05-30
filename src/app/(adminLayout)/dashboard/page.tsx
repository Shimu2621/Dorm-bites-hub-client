import React from "react";
import AdminProfile from "./admin-profile/page";
import ManageUsers from "./manage-users/page";

const DashboardPage = () => {
  return (
    <div>
      <AdminProfile />
      <ManageUsers />
    </div>
  );
};

export default DashboardPage;
