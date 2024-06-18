"use client";
import { useGetUsers } from "@/app/actions/GetUsers";
import PageSubheader from "@/components/PageSubheader";
import PersonList from "@/components/persons/PersonList";
import React from "react";

export default function FindSwaps() {
  const { data: users, isLoading: usersLoading } = useGetUsers();

  return (
    <section>
      <PageSubheader title={"Find swaps"} />

      {!usersLoading && users && <PersonList users={users} />}
    </section>
  );
}
