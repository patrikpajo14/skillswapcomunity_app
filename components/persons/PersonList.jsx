import React, { useState } from "react";
import PersonCard from "./PersonCard";
import toast from "react-hot-toast";
import CustomDrawer from "../CustomDrawer";
import PersonDetails from "./PersonDetails";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import { useCreateRequest } from "@/app/actions/GetRequests";

const PersonList = ({
  title = null,
  users,
  recivedList = false,
  sentList = false,
}) => {
  const { user } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { mutate: sendRequest } = useCreateRequest();

  const handleSendSwap = (recipientId) => {
    sendRequest({ senderId: user?.id, recipientId });
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
              recived={recivedList}
              sent={recivedList}
              onClick={() => {
                handleSendSwap(person.id);
              }}
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
        {selectedUser && (
          <PersonDetails
            user={selectedUser}
            onClick={() => {
              handleSendSwap(selectedUser?.id);
            }}
          />
        )}
      </CustomDrawer>
    </section>
  );
};

export default PersonList;
