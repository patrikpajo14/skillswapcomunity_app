import React, { useState } from "react";
import PersonCard from "./PersonCard";
import toast from "react-hot-toast";
import CustomDrawer from "../CustomDrawer";
import PersonDetails from "./PersonDetails";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

const PersonList = ({ title = null, users }) => {
  const { user } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendSwap = () => {
    toast.success("Swap sended successfuly!");
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = (user) => {
    setOpenDrawer(true);
    setSelectedUser(user);
  };

  console.log("selected user", selectedUser);

  return (
    <section className="mb-5">
      {title && (
        <div className="flex-between mb-5">
          <h2 className="text-[20px] md:text-[24px] font-bold">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        {users
          .filter((u) => u?.id !== user?.id)
          .map((person) => (
            <PersonCard
              key={person.id}
              user={person}
              onClick={handleSendSwap}
              handleOpenDrawer={() => {
                handleOpenDrawer(person);
              }}
            />
          ))}
      </div>

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title={"User details"}
      >
        <PersonDetails user={selectedUser} onClick={handleSendSwap} />
      </CustomDrawer>
    </section>
  );
};

export default PersonList;
