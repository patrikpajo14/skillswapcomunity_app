"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import { useGetRequests } from "@/app/actions/GetRequests";
import PersonList from "../persons/PersonList";

export default function RequestsWrap({requests, isLoading}) {
  const { user, updateUserBasicInfo } = useAuthContext();
  const [lastSendList, setLastSendList] = useState([]);
  const [lastRecivedList, setLastRecivedList] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const tmpSend = requests
        .filter(
          (request) =>
            (request.sender.id === user.id || request.sender === user.id) && request.status !== 20
        )
        .map((request) => {
          return {
            ...request.recipient,
            status: request.status,
            requestId: request.id,
          };
        })
        .slice(0, 3);
      setLastSendList(tmpSend);

      const tmpRecived = requests
        .filter(
          (request) =>
            (request.recipient.id === user.id || request.sender === user.id) && request.status !== 20
        )
        .map((request) => {
          const updatedUser = {
            ...user,
            receivedRequests: request.recipient.receivedRequests,
          };
          updateUserBasicInfo(updatedUser);
          return {
            ...request.sender,
            status: request.status,
            requestId: request.id,
          };
        })
        .slice(0, 3);
      if(tmpRecived) setLastRecivedList(tmpRecived);
    }
  }, [requests]);

  return (
    <div>
      {!isLoading && lastSendList.length > 0 && (
        <PersonList title={"Last sent swaps"} users={lastSendList} />
      )}
      {!isLoading && lastRecivedList.length > 0 && (
        <PersonList
          title={"Last received swaps"}
          users={lastRecivedList}
          recivedList={true}
        />
      )}
    </div>
  );
}
