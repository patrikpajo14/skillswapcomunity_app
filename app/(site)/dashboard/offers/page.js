import PageSubheader from "@/components/PageSubheader";
import { OffersTable } from "@/components/offers";
import Link from "next/link";
import React from "react";

const Offers = () => {
  return (
    <section>
      <PageSubheader
        title={"Offers list"}
        body={
          <Link href="/dashboard/offers/create" className="primary_btn">
            New offer
          </Link>
        }
      />

      <OffersTable />
    </section>
  );
};

export default Offers;
