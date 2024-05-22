import React from "react";
import NavBar from "../../Components/website/NavBar/NavBar"
import { Outlet } from "react-router-dom";

export default function Website() {
  return (
    <>
      <NavBar />
      <Outlet/>
    </>
  );
}
