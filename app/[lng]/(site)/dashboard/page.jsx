"use client";
import PageSubheader from "@/components/PageSubheader";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import PersonList from "@/components/persons/personList";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const lastSendUser = {
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

  const lastRecivedUser = {
    id: 1,
    name: "Jan Stojsavljevic",
    email: "jan.stojsavljevic@gmail.com",
    phone: "095555555",
    description: "jan description",
    achievements: "achievements",
    skill: 2,
    salary: 1500,
    rating: 3.5,
    experience: 1,
    company: 1,
  };

  return (
    <section>
      <PageSubheader
        title={"Dashboard"}
        body={
          <div className="flex gap-4 items-center">
            <Link href={"/dashboard/find-users"} className="primary_btn">
              Swap skills
            </Link>
          </div>
        }
      />

      <WidgetsRow />

      <PersonList title={"Last send swaps"} user={lastSendUser} />
      <PersonList title={"Last received swaps"} user={lastRecivedUser} />
    </section>
  );
};

export default Dashboard;
