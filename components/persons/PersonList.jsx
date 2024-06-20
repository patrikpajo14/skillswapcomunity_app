import React, { useState } from "react";
import PersonCard from "./PersonCard";
import CustomDrawer from "../CustomDrawer";
import PersonDetails from "./PersonDetails";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import {
  useCreateRequest,
  useDeleteRequest,
  useGetRequestById,
  useUpdateRequest,
} from "@/app/actions/GetRequests";

const PersonList = ({ title = null, users, receivedList = false, findUsers = false}) => {
  const { user, updateUserBasicInfo } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const {
    data: requestForUpdate,
    isLoading: requestLoading,
    refetch: getUpdatedRequest,
  } = useGetRequestById(requestId);
  const { mutate: sendRequest } = useCreateRequest();
  const { mutate: updateRequest } = useUpdateRequest();
  const { mutate: deleteRequest } = useDeleteRequest();

  const handleSendSwap = (recipientId) => {
    sendRequest(
      { senderId: user?.id, recipientId },
      {
        onSuccess: (data) => {
          if (data?.status === 200 || data?.status === 201) {
            updateUserBasicInfo(data?.data?.sender);
          }
        },
      }
    );
  };
  const handleUpdateSwap = (request) => {
    if (request !== null) {
      setRequestId(request.id);
      getUpdatedRequest().then((data) => {
        if (data.status === "success" || data.status === 200) {
          const updatedStatusRequest = {
            ...data.data,
            status: 20,
          };
          updateRequest(updatedStatusRequest, {
            onSuccess: (updatedData) => {
              updateUserBasicInfo(updatedData?.data?.recipient);
            },
          });
        }
      });
    }
  };
  const handleDeleteSwap = (id) => {
    deleteRequest(id, {
      onSuccess: (data) => {
        if (
          data?.status === 200 ||
          data?.status === 201 ||
          data?.status === 204
        ) {
          const updatedSentRequests = user.sentRequests.filter(
            (req) => req.id !== id
          );
          const updatedUser = {
            ...user,
            sentRequests: updatedSentRequests,
          };
          updateUserBasicInfo(updatedUser);
        }
      },
    });
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = (user) => {
    setOpenDrawer(true);
    setSelectedUser(user);
  };

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
            const existingSentRequest = user?.sentRequests.find((sentReq) =>
              person?.receivedRequests.some(
                (recReq) => recReq.id === sentReq.id
              )
            );
            const existingReceivedRequest = user?.receivedRequests.find(
              (recReq) =>
                person?.sentRequests.some((sentReq) => sentReq.id === recReq.id)
            );

            const forDelete = existingSentRequest !== undefined || existingReceivedRequest?.status === 20;
            if(findUsers && (existingReceivedRequest?.status === 20 || existingSentRequest?.status === 20)){
              return ""
            }else{
              return (
                  <PersonCard
                      key={person?.id}
                      user={person}
                      received={existingReceivedRequest !== undefined}
                      sent={existingSentRequest !== undefined}
                      forDelete={forDelete}
                      onClick={() => {
                        handleSendSwap(person?.id);
                      }}
                      onAccept={() => {
                        handleUpdateSwap(
                            existingReceivedRequest !== undefined
                                ? { id: existingReceivedRequest.id, status: 20 }
                                : null
                        );
                      }}
                      onDelete={() => {
                        handleDeleteSwap(existingSentRequest?.id);
                      }}
                      handleOpenDrawer={() => {
                        handleOpenDrawer(person);
                      }}
                  />
              );
            }
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
