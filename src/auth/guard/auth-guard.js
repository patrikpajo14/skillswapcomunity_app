"use client";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../context/auth/authContext";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  return <Container>{children}</Container>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();
  const { session, logoutUser } = useAuthContext();
  const [checkUserSession, setCheckUserSession] = useState(false);

  const checkSession = useCallback(() => {
    if (!session?.token) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      /* const href = `${paths.auth.login}?${searchParams || ""}`; */
      const href = `/`;
      logoutUser();
      router.replace(href);
    } else {
      setCheckUserSession(true);
    }
  }, [session?.token, router]);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checkUserSession) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
