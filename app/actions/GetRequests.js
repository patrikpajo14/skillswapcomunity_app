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

const fetchRequestById = ({ queryKey }) => {
  const [_, id] = queryKey;
  return appPublicRequest.get(`/requests/${id}`);
};

export const useGetRequestById = (id) => {
  return useQuery(["requestById", id], fetchRequestById, {
    select: (data) => {
      return data.data;
    },
    enabled: !!id
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


const updateRequest = (data) => {
  return appPublicRequest.put(`/requests/${data.id}`, data);
};

export const useUpdateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRequest, {
    onSuccess: () => {
      toast.success("Request Updated!");
      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries("requests");
    },
    onError: () => {
      toast.error("Update failed!");
    },
  });
};

const deleteRequest = (id) => {
  return appPublicRequest.delete(`/requests/${id}`);
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteRequest(id), {
    onSuccess: () => {
      toast.success("Request deleted successfully!");
      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries("requests");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};

