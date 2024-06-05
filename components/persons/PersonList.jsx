import React from "react";
import PersonCard from "./PersonCard";
import toast from "react-hot-toast";

const PersonList = ({ title = null, user }) => {
  const handleSendSwap = () => {
    toast.success("Swap sended successfuly!");
  };

  const handleOpenDrawer = () => {
    toast.success("Drawer opened!");
  };

  return (
    <section className="mb-5">
      {title && (
        <div className="flex-between mb-5">
          <h2 className="text-[20px] md:text-[24px] font-bold">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        <PersonCard
          user={user}
          onClick={handleSendSwap}
          handleOpenDrawer={handleOpenDrawer}
        />
        <PersonCard
          user={user}
          onClick={handleSendSwap}
          handleOpenDrawer={handleOpenDrawer}
        />
        <PersonCard
          user={user}
          onClick={handleSendSwap}
          handleOpenDrawer={handleOpenDrawer}
        />
      </div>
    </section>
  );
};

export default PersonList;
