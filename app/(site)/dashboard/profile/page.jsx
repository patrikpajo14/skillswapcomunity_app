"use client";
import PageSubheader from "@/components/PageSubheader";
import ProfileForm from "@/components/profile/ProfileForm";
import React from "react";

export default function Profile() {
  const user = {
    id: 1,
    name: "Patrik Stojsavljevic",
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
    <section>
      <PageSubheader title={"Profile"} />
      <ProfileForm  />
    </section>
  );
}
