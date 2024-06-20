"use client";
import { useGetUsers } from "@/app/actions/GetUsers";
import PageSubheader from "@/components/PageSubheader";
import PersonList from "@/components/persons/PersonList";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "@/src/auth/context/auth/authContext";
import useLangStore from "@/app/store/LangStore";
import {useTranslation} from "@/app/i18n/client";

export default function FindSwaps() {
    const { currentLang } = useLangStore();
    const { t } = useTranslation(currentLang);

  const { data: users, isLoading: usersLoading } = useGetUsers();

  return (
    <section>
      <PageSubheader title={t("find_swaps")} />

      {!usersLoading && users && <PersonList users={users} findUsers={true} t={t} />}
    </section>
  );
}
