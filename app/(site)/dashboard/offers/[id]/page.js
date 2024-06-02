"use client";

import React from "react";
import PageSubheader from "@/components/PageSubheader";
import OffersForm from "@/app/(site)/dashboard/offers/components/OffersForm";
import { useParams } from "next/navigation";
import ArticleLIst from "@/components/article/ArticleLIst";
import { useGetOffers, useGetOffersById } from "@/app/actions/GetOffers";
import Loader from "@/components/Loader/Loader";

const EditOffer = () => {
  const params = useParams();

  const { data: offer, isLoading } = useGetOffersById(params.id);

  return (
    <section className="max-h-[calc(100vh - 50px)]">
      <PageSubheader title={"Edit offer"} />

      {isLoading ? (
        <>
          <Loader sx="min-h-[250px]" />
          <Loader />
          <Loader />
        </>
      ) : (
        <OffersForm isEdit={true} offer={offer} />
      )}
    </section>
  );
};

export default EditOffer;
