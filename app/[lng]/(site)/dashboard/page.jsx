"use client";
import useLangStore from "@/app/store/LangStore";
import PageSubheader from "@/components/PageSubheader";
import RequestsWrap from "@/components/dashboard/RequestsWrap";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import React from "react";
import {useGetRequests} from "@/app/actions/GetRequests";
import {useTranslation} from "@/app/i18n/client";

const Dashboard = () => {
  const { currentLang } = useLangStore();
  const { t } = useTranslation(currentLang);

  const { data: requests, isLoading: requestsLoading } = useGetRequests();

  return (
    <section>
      <PageSubheader
        title={t("dashboard")}
      />

        {!requestsLoading && requests ? (
            <>
                <WidgetsRow t={t} />

                <RequestsWrap requests={requests} isLoading={requestsLoading} t={t} />
            </>
        ) : (
            <p>Loading...</p>
        )}
    </section>
  );
};

export default Dashboard;
