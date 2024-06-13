"use client";
import React from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";

export default function DashboardLayout({children}) {
  return (
    <>
      <Sidebar />
      <section className="container-fluid">
        <Nav />
        {children}
      </section>
    </>
  );
}
