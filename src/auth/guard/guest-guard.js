"use client";
import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthContext } from "../context/auth/authContext";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  return <Container>{children}</Container>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || paths.dashboard.root;
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

Container.propTypes = {
  children: PropTypes.node,
};
