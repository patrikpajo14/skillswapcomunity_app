import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchArticles = () => {
  return axios.get("/api/article");
};

const fetchCustomArticle = () => {
  return axios.get("/api/article");
};

export const useGetArticles = () => {
  return useQuery("articles", fetchArticles, {
    select: (data) => {
      return data.data;
    },
  });
};

export const useGetCustomArticles = () => {
  return useQuery("articles", fetchCustomArticle, {
    select: (data) => {
      return data.data;
    },
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
      queryClient.setQueryData("articles", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
      queryClient.invalidateQueries("articles");
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
      queryClient.invalidateQueries("articles");
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
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("offers");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
