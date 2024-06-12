"use client";
import { useEffect, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthContext } from "../context/auth/authContext";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function GuestGuard({ children }) {
  return <Container>{children}</Container>;
}

function Container({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const returnTo = "/";
  const { session } = useAuthContext();
  const check = useCallback(() => {
    if (session?.token) {
      router.replace(returnTo);
    } else {
      setLoading(false);
    }
  }, [session?.token, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (loading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
