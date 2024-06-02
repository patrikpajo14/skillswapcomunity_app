"use client";

import React from "react";
import SmallWidget from "./SmallWidget";
import WidgetWithGraph from "./WidgetWithGraph";

const WidgetsRow = () => {
  /*  const { data: offers, isLoading } = useGetOffers();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1  sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  } */

  /*   const offersDone = offers.filter((offer) => {
    return offer.status === "done";
  });
  const offersPending = offers.filter((offer) => {
    return offer.status === "pending";
  });
  const offersRejected = offers.filter((offer) => {
    return offer.status === "rejected";
  }); */

  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
      <WidgetWithGraph
        title="Percentage of Done"
        /*  doneNumber={offersDone.length}
        totalNumber={offers.length} */
        doneNumber={10}
        totalNumber={20}
      />
      <SmallWidget
        title="Swaps send"
        number={10}
        image="/assets/images/pending.png"
      />
      <SmallWidget
        title="Rejecetd swaps"
        number={3}
        image="/assets/images/rejected.png"
      />
    </div>
  );
};

export default WidgetsRow;
