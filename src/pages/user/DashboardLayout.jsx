import React, { useEffect, useState } from "react";
import SideMenu from "../../components/user/SideMenu";
import { Outlet, useNavigate } from "react-router";
import { getAccessTokenFromLocalStorage } from "../../services/LocaStorageSrevice";
import Swal from "sweetalert2";

function DashboardLayout() {
  const navigate = useNavigate();

  function checkAuthentication() {
    const token = getAccessTokenFromLocalStorage();
    if (!token) { 
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "You must be logged in to access the dashboard.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }
  }
  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

  return (  
    <div className="">
      {/* Sidebar */}
      <SideMenu />

      {/* Main content */}
      <main className="mt-16 md:p-10 ">
        <Outlet />
      </main>
    </div>
  );
}


export default DashboardLayout;
