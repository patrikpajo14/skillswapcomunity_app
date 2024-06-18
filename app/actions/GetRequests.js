import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import appPublicRequest from "@/src/auth/utils/app-public-request";
import useProtectedRequestHeaders from "@/src/auth/utils/useProtectedRequestHeaders";

const fetchRequests = ({ queryKey }) => {
  const [_, axiosPrivate] = queryKey;
  return axiosPrivate("/requests/all");
};

export const useGetRequests = () => {
  const axiosPrivate = useProtectedRequestHeaders();
  return useQuery(["requests", axiosPrivate], fetchRequests, {
    select: (data) => {
      return data.data;
    },
  });
};

const createRequest = (data) => {
  return appPublicRequest.post(
    `/requests?senderId=${data?.senderId}&recipientId=${data?.recipientId}`
  );
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(createRequest, {
    onSuccess: (data) => {
      toast.success("Request sent!");
      queryClient.invalidateQueries("requests");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Sending request failed!");
    },
  });
};
