import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import appPublicRequest from "@/src/auth/utils/app-public-request";
import useProtectedRequestHeaders from "@/src/auth/utils/useProtectedRequestHeaders";

const fetchSkills = ({ queryKey }) => {
  const [_, axiosPrivate] = queryKey;
  return axiosPrivate("/skill/all");
};

export const useGetSkills = () => {
  const axiosPrivate = useProtectedRequestHeaders();
  return useQuery(["skills", axiosPrivate], fetchSkills);
};

const fetchSkillById = (id) => {
  return appPublicRequest.get(`/skill/${id}`);
};

export const useGetSkillById = (id) => {
  return useQuery(["skill-by-id", id], fetchSkillById, {
    select: (data) => {
      return data.data;
    },
    enabled: !!id,
  });
};