import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import appPublicRequest from "@/src/auth/utils/app-public-request";
import useProtectedRequestHeaders from "@/src/auth/utils/useProtectedRequestHeaders";

const fetchUsers = ({ queryKey }) => {
  const [_, axiosPrivate] = queryKey;
  return axiosPrivate("/person/all");
};

export const useGetUsers = () => {
  const axiosPrivate = useProtectedRequestHeaders();
  return useQuery(["users", axiosPrivate], fetchUsers, {
    select: (data) => {
      return data.data;
    },
  });
};

const fetchUserById = (id) => {
  return appPublicRequest.get(`/person/${id}`);
};

export const useGetUserById = (id) => {
  return useQuery(["user-by-id", id], fetchUserById, {
    select: (data) => {
      return data.data;
    },
    enabled: !!id,
  });
};

const updateUser = (data) => {
  return appPublicRequest.put(`/person/${data.id}`, data.body);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Profile Updated!");
      queryClient.invalidateQueries("users");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Profile change failed!");
    },
  });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      toast.success("User deleted successfuly!");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
