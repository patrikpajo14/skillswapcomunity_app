"use client";
import PageSubheader from "@/components/PageSubheader";
import ProfileForm from "@/components/profile/ProfileForm";
import React from "react";

export default function Profile() {
  return (
    <section>
      <PageSubheader title={"Profile"} />
      <ProfileForm />
    </section>
  );
}
