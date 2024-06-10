"use client";
import React from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";

export default function DashboardLayout({children}) {
  const currentUser = {
    id: 1,
    name: "patrik stojsavljevic",
    email: "patrik.stojsavljevic@gmail.com",
    phone: "095555555",
    description: "patrik description",
    achievements: "achievements",
    skill: 1,
    salary: 2000,
    rating: 4.5,
    experience: 2,
    company: 1,
  };
  return (
    <>
      <Sidebar currentUser={currentUser} />
      <section className="container-fluid">
        <Nav currentUser={currentUser} />
        {children}
      </section>
    </>
  );
}
