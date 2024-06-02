import AdministrationForm from "@/components/AdministrationForm";
import PageSubheader from "@/components/PageSubheader";
import React from "react";

const Administration = () => {
  return (
    <section>
      <PageSubheader title={"Administration"} />

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
        <AdministrationForm
          title={"Add new Color"}
          inputLabel={"color name"}
          btnText={"Add color"}
          url={"/api/colors"}
        />
        <AdministrationForm
          title={"Add new Article Type"}
          inputLabel={"type"}
          btnText={"Add type"}
          url={"/api/articleType"}
        />
        <AdministrationForm
          title={"Add new Panel"}
          inputLabel={"panel name"}
          btnText={"Add panel"}
          url={"/api/panel"}
        />
        <AdministrationForm
          title={"Add new blinds type"}
          inputLabel={"blinds type"}
          btnText={"Add new"}
          url={"/api/blindsType"}
        />
      </div>
    </section>
  );
};

export default Administration;
