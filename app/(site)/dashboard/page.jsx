"use client";
import PageSubheader from "@/components/PageSubheader";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import PersonList from "@/components/persons/personList";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <section>
      <PageSubheader
        title={"Dashboard"}
        body={
          <div className="flex gap-4 items-center">
            <Link href={"/dashboard/offers/create"} className="primary_btn">
              Swap skills
            </Link>
          </div>
        }
      />

      <WidgetsRow />

      <PersonList />
    </section>
  );
};

export default Dashboard;
