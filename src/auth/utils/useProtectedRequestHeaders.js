"use client";

import { useEffect } from "react";
import appPublicRequest from "../utils/app-public-request";
import { useRouter } from "next/navigation";
import useCheckExpireTokens from "./useCheckExpireTokens";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

const useProtectedRequestHeaders = () => {
  const { session, logoutUser } = useAuthContext();
  const router = useRouter();
  const { isTokenExpired } = useCheckExpireTokens(session?.expire);

  useEffect(() => {
    const requestIntercept = appPublicRequest.interceptors.request.use(
      async (config) => {
        if (isTokenExpired) {
          console.log("isTokenExpired", isTokenExpired);
          logoutUser();
          router.push("/auth/login");
        } else {
          console.log("HAVE TOKEN CREATE HEADERS");
          try {
            config.headers["Authorization"] = `Bearer ${session?.token}`;
            console.log("config", config);
          } catch (error) {
            console.error("Error refreshing token:", error);
          }
        }

        if (!config.headers["Authorization"]) {
          console.log("config dosent have hadears", config);
          config.headers["Authorization"] = `Bearer ${session?.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = appPublicRequest.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log(
            "error?.response?.status === 403 && !prevRequest?.sent",
            error?.response,
            prevRequest
          );
          prevRequest.sent = true;
          //router.push('/403');
        }
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          logoutUser();
          toast.error("Session expired! Login again.");
          router.push("/");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      appPublicRequest.interceptors.request.eject(requestIntercept);
      appPublicRequest.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return appPublicRequest;
};

export default useProtectedRequestHeaders;
