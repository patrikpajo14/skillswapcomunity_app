"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import { useGetRequests } from "@/app/actions/GetRequests";
import PersonList from "../persons/PersonList";

export default function RequestsWrap() {
  const { user } = useAuthContext();
  const [lastSendList, setLastSendList] = useState([]);
  const [lastRecivedList, setLastRecivedList] = useState([]);

  const { data: requests, isLoading: requestsLoading } = useGetRequests();

  console.log("requests", requests);

  useEffect(() => {
    if (!requestsLoading) {
      const tmpSend = requests
        .filter((request) => request.sender.id === user.id)
        .map((request) => ({
          ...request.recipient,
          status: request.status,
          requestId: request.id,
        }))
        .slice(0, 3);
      setLastSendList(tmpSend);
      console.log("lastSendList", tmpSend);

      const tmpRecived = requests
        .filter((request) => request.recipient.id === user.id)
        .map((request) => ({
          ...request.sender,
          status: request.status,
          requestId: request.id,
        }))
        .slice(0, 3);
      setLastRecivedList(tmpRecived);
    }
  }, [requests]);
  return (
    <div>
      {!requestsLoading && lastSendList.length > 0 && (
        <PersonList title={"Last sent swaps"} users={lastSendList} />
      )}
      {!requestsLoading && lastRecivedList.length > 0 && (
        <PersonList
          title={"Last received swaps"}
          users={lastRecivedList}
          recivedList={true}
        />
      )}
    </div>
  );
}
