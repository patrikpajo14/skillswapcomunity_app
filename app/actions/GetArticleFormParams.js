import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchParams = async () => {
  const types = await axios.get(`/api/articleType`);
  const panels = await axios.get(`/api/panel`);
  const colors = await axios.get(`/api/colors`);
  const blindsType = await axios.get(`/api/blindsType`);

  return {
    data: {
      types: types.data,
      panels: panels.data,
      colors: colors.data,
      blindsTypes: blindsType.data,
    },
  };
};

export const useGetArticleFormParams = () => {
  return useQuery(["article-form"], () => fetchParams(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 3600000,
    select: (data) => {
      return data.data;
    },
  });
};
