import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import appPublicRequest from "@/src/auth/utils/app-public-request";
import useProtectedRequestHeaders from "@/src/auth/utils/useProtectedRequestHeaders";



const fetchSkills = ({ queryKey }) => {
    const [_, axiosPrivate] = queryKey; // Extract axiosPrivate from queryKey
    return axiosPrivate("/skill/all");
};

export const useGetSkills = () => {
    const axiosPrivate = useProtectedRequestHeaders();
    return useQuery(['skills', axiosPrivate], fetchSkills);
};

const fetchSkillById = (id) => {
    return appPublicRequest.get(`/skill/${id}`);
};

export const useGetSkillById = (id) => {
    return useQuery(['skill-by-id', id], fetchSkillById, {
        select: (data) => {
            return data.data;
        },enabled: !!id,
    });
};

const addArticle = (article) => {
    return axios.post("/api/article", article);
};

export const useAddArticle = () => {
    const queryClient = useQueryClient();
    return useMutation(addArticle, {
        onSuccess: (data) => {
            toast.success("Article Created!");
            queryClient.setQueryData("skills", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],
                };
            });
            queryClient.invalidateQueries("skills");
        },
        onError: () => {
            toast.error("Creating article failed!");
        },
    });
};

const updateArticle = (data) => {
    return axios.put(`/api/article/${data.id}`, data.body);
};

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation(updateArticle, {
        onSuccess: () => {
            toast.success("Article Updated!");
            queryClient.invalidateQueries("skills");
        },
        onError: () => {
            toast.error("Update failed!");
        },
    });
};

const deleteArticle = (id) => {
    return axios.delete(`/api/article/${id}`);
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => deleteArticle(id), {
        onSuccess: () => {
            toast.success("Article deleted successfuly!");
            queryClient.invalidateQueries("skills");
            queryClient.invalidateQueries("offers");
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });
};
