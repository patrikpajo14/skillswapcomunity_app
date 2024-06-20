"use client";
import useLangStore from "@/app/store/LangStore";
import PageSubheader from "@/components/PageSubheader";
import RequestsWrap from "@/components/dashboard/RequestsWrap";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import Link from "next/link";
import React from "react";
import {useGetRequests} from "@/app/actions/GetRequests";

const Dashboard = () => {
  const { currentLang } = useLangStore();

  const { data: requests, isLoading: requestsLoading } = useGetRequests();

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

        {!requestsLoading && requests ? (
            <>
                <WidgetsRow requests={requests} isLoading={requestsLoading} />

                <RequestsWrap requests={requests} isLoading={requestsLoading} />
            </>
        ) : (
            <p>Loading...</p>
        )}
    </section>
  );
};

export default Dashboard;
