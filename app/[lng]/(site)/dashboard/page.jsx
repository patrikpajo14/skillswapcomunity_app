"use client";
import useLangStore from "@/app/store/LangStore";
import PageSubheader from "@/components/PageSubheader";
import RequestsWrap from "@/components/dashboard/RequestsWrap";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { currentLang } = useLangStore();

  return (
    <section>
      <PageSubheader
        title={"Dashboard"}
        body={
          <div className="flex gap-4 items-center">
            <Link
              href={`/${currentLang}/dashboard/find-users`}
              className="primary_btn"
            >
              Swap skills
            </Link>
          </div>
        }
      />

      <WidgetsRow />

      <RequestsWrap />
    </section>
  );
};

export default Dashboard;
