"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../context/auth/authContext";
import { useRouter } from "next/navigation";
import useLangStore from "@/app/store/LangStore";

export default function AuthGuard({ children }) {
  return <Container>{children}</Container>;
}

function Container({ children }) {
  const router = useRouter();
  const { currentLang } = useLangStore();
  const { session, logoutUser } = useAuthContext();
  const [checkUserSession, setCheckUserSession] = useState(false);

  const checkSession = useCallback(() => {
    if (!session?.token) {
      const href = `/${currentLang}/`;
      logoutUser();
      router.replace(href);
    } else {
      setCheckUserSession(true);
    }
  }, [session, logoutUser, router]);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token]);

  if (!checkUserSession) {
    return null;
  }

  return <>{children}</>;
}
