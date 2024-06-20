"use client";
import PageSubheader from "@/components/PageSubheader";
import ProfileForm from "@/components/profile/ProfileForm";
import React from "react";
import useLangStore from "@/app/store/LangStore";
import {useTranslation} from "@/app/i18n/client";

export default function Profile() {
    const { currentLang } = useLangStore();
    const { t } = useTranslation(currentLang);

  return (
    <section>
      <PageSubheader title={t("profile")} />
      <ProfileForm t={t} />
    </section>
  );
}
