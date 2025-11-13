import api from "@/API/Config";
import Urls from "@/API/URL";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAdmin = (id?: string) => {
  const {
    data: AllUsers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(Urls.Users);
      return response.data;
    },
  });
  const {
    data: userById,
    isLoading: isLoadingById,
    error: errorById,
    refetch: refetchById,
  } = useQuery({
    queryKey: ["userById", id],
    queryFn: async () => {
      const response = await api.get(Urls.userById + id);
      return response.data;
    },
    enabled: !!id,
  });

  const {
    mutate: deleteUserById,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(Urls.DeleteUsers + "/" + id);
      return response.data;
    },
    onError: (err) => console.log(err),
  });

  const {
    mutate: approveUserById,
    isPending: isApproving,
    error: approveError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(Urls.ApproveUser + "/" + id);
      return response.data;
    },
    onError: (err) => console.log(err),
  });

  return {
    AllUsers,
    isLoading,
    error,
    refetch,
    userById,
    isLoadingById,
    errorById,
    refetchById,
    deleteUserById,
    isDeleting,
    deleteError,
    approveUserById,
    isApproving,
    approveError,
  };
};
