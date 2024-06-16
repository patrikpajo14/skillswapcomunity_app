"use client";
import React from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import useLangStore from "@/app/store/LangStore";
import { useTranslation } from "@/app/i18n/client";

export default function DashboardLayout({ children }) {
  const { currentLang, setLang } = useLangStore();
  const { t } = useTranslation(currentLang);
  return (
    <>
      <Sidebar />
      <section className="container-fluid">
        <Nav t={t} lng={currentLang} setLang={setLang} />
        {children}
      </section>
    </>
  );
}
