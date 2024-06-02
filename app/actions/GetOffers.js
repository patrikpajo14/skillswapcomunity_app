import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchOffers = () => {
  return axios.get("/api/offer");
};

export const useGetOffers = () => {
  return useQuery("offers", fetchOffers, {
    select: (data) => {
      return data.data;
    },
  });
};

const addOffer = (offer) => {
  return axios.post("/api/offer", offer);
};

export const useAddOffer = () => {
  const queryClient = useQueryClient();
  return useMutation(addOffer, {
    onSuccess: (data) => {
      toast.success("offer Created!");
      queryClient.setQueryData("offers", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

const updateOffer = (data) => {
  return axios.put(`/api/offer/${data.id}`, data.body);
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOffer, {
    onSuccess: () => {
      toast.success("offer Updated!");
      queryClient.invalidateQueries("offers");
    },
    onError: () => {
      toast.error("offer Update failed!");
    },
  });
};

const updateOfferStatus = (data) => {
  return axios.put(`/api/offer/status`, data);
};

export const useUpdateOfferStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOfferStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("offers");
    },
    onError: () => {
      toast.error("Status change failed!");
    },
  });
};

const fetchOffersById = (id) => {
  return axios.get(`/api/offer/${id}`);
};

export const useGetOffersById = (id) => {
  const queryClient = useQueryClient();
  return useQuery(["offer", id], () => fetchOffersById(id), {
    initialData: () => {
      const offer = queryClient
        .getQueryData("offers")
        ?.data?.find((offer) => offer.id === id);

      if (offer) {
        return { data: offer };
      } else {
        return undefined;
      }
    },
    select: (data) => {
      return data.data;
    },
  });
};

const deleteOffer = (id) => {
  return axios.delete(`/api/offer/${id}`);
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteOffer(id), {
    onSuccess: () => {
      toast.success("Offer deleted successfuly!");
      queryClient.invalidateQueries("articles");
      queryClient.invalidateQueries("offers");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
