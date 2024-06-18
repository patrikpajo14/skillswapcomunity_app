import React, { useEffect, useState } from "react";
import PersonCard from "./PersonCard";
import CustomDrawer from "../CustomDrawer";
import PersonDetails from "./PersonDetails";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import { useCreateRequest } from "@/app/actions/GetRequests";

const PersonList = ({ title = null, users, recivedList = false }) => {
  const { user } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mySentRequests, setMySentRequests] = useState([]);

  const { mutate: sendRequest } = useCreateRequest();

  const currentUser = users.find((u) => u?.id === user?.id);

  console.log("USRES", users, currentUser);

  const handleSendSwap = (recipientId) => {
    sendRequest({ senderId: user?.id, recipientId });
  };
  const handleDeleteSwap = (id) => {
    console.log("DELETE /////////", id);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = (user) => {
    setOpenDrawer(true);
    setSelectedUser(user);
  };

  console.log("selected user", selectedUser);
  console.log("mySentRequests", mySentRequests);

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
          .map((person) => {
            const existingRequest = currentUser?.sentRequests.find((sentReq) =>
              person?.receivedRequests.some(
                (recReq) => recReq.id === sentReq.id
              )
            );
            console.log("existingRequest", existingRequest);
            return (
              <PersonCard
                key={person.id}
                user={person}
                recived={recivedList}
                sent={existingRequest !== undefined || recivedList}
                onClick={() => {
                  handleSendSwap(person.id);
                }}
                onDelete={() => {
                  handleDeleteSwap(person.id);
                }}
                handleOpenDrawer={() => {
                  handleOpenDrawer(person);
                }}
              />
            );
          })}
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
