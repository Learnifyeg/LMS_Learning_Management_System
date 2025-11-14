/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

// export interface Feedback {
//   id: string;
//   userId: string;
//   message: string;
//   createdAt: string;
// }

export interface FeedbackData {
  Email: string;
  Massage: string;
  image?: File;
}

const useFeedback = () => {
  const queryClient = useQueryClient();

  // Fetch all feedback
  const getAllFeedback = () =>
    useQuery({
      queryKey: ["feedback"],
      queryFn: async () => {
        const res = await api.get(Urls.GetAllFeedback);
        return res.data;
      },
    });

  //  Add feedback
  const addFeedback = useMutation({
    mutationFn: async (data: FeedbackData) => {
      const res = await api.post(Urls.AddFeedBack, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  return {
    getAllFeedback,
    addFeedback,
  };
};

export default useFeedback;
