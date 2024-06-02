import axios from "axios";
import { useQuery } from "react-query";

const fetchObjectId = () => {
  return axios.get("/api/generateObjectId");
};

export const useGetObjectId = () => {
  return useQuery("objectId", fetchObjectId, {
    select: (data) => {
      return data.data.objectId;
    },
  });
};
