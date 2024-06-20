"use client";

import React from "react";
import SmallWidget from "./SmallWidget";
import WidgetWithGraph from "./WidgetWithGraph";
import {useAuthContext} from "@/src/auth/context/auth/authContext";

const WidgetsRow = ({t}) => {
    const { user } = useAuthContext();

    const sentRequests = user?.sentRequests ? user?.sentRequests.length : 0;
    const acceptedRequest = user?.sentRequests.filter(request => request.status === 20);
  const receivedRequests = user?.receivedRequests ? user?.receivedRequests.length : 0;
    const allRequests = sentRequests + receivedRequests;

  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
      <WidgetWithGraph
        title={t("accepted_swaps")}
        doneNumber={acceptedRequest?.length}
        totalNumber={allRequests}
      />
      <SmallWidget
        title={t("sent_swaps")}
        number={sentRequests}
        image="/assets/images/pending.png"
      />
      <SmallWidget
        title={t("received_swaps")}
        number={receivedRequests}
        image="/assets/images/rejected.png"
      />
    </div>
  );
};

export default WidgetsRow;
