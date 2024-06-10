"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../context/auth/authContext";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  return <Container>{children}</Container>;
}

function Container({ children }) {
  const router = useRouter();
  const { session, logoutUser } = useAuthContext();
  const [checkUserSession, setCheckUserSession] = useState(false);

  console.log("session", session)

  const checkSession = useCallback(() => {
    if (!session?.token) {
      const href = `/`;
      logoutUser();
      router.replace(href);
    } else {
      setCheckUserSession(true);
    }
  }, [session, logoutUser, router]);

  useEffect(() => {
    checkSession();
    console.log("Check user session")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkSession]);

  if (!checkUserSession) {
    return null;
  }

  return <>{children}</>;
}