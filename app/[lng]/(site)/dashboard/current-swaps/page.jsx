"use client";
import PageSubheader from "@/components/PageSubheader";
import PersonList from "@/components/persons/PersonList";
import React, {useEffect, useState} from "react";
import {useGetRequests} from "@/app/actions/GetRequests";
import {useAuthContext} from "@/src/auth/context/auth/authContext";

export default function CurrentSwaps() {
    const { user } = useAuthContext();
    const [currentSwapsList, setCurrentSwapsList] = useState([]);

    const { data: requests, isLoading } = useGetRequests();

    useEffect(() => {
        if (!isLoading) {
            const tmpSent = requests
                .filter(
                    (request) =>
                        (request.sender.id === user.id || request.sender === user.id) && request.status === 20
                )
                .map((request) => ({
                        ...request.recipient,
                        status: request.status,
                        requestId: request.id,
                }));

            const tmpReceived = requests
                .filter(
                    (request) =>
                        (request.recipient.id === user.id || request.sender === user.id) && request.status === 20
                )
                .map((request) => ({
                    ...request.sender,
                    status: request.status,
                    requestId: request.id,
                }));

            setCurrentSwapsList([...tmpSent, ...tmpReceived]);
        }
    }, [requests]);

  return (
    <section>
      <PageSubheader title={"Current swaps"} />

        {currentSwapsList.length > 0 && (<PersonList users={currentSwapsList} receivedList={true} />)}
    </section>
  );
}
