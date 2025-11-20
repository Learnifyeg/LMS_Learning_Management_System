/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

interface AddQuizData {
  title: string;
  duration: number;
  lessonId: number;
  passingScore: number;
  totalQuestions: number;
}

interface UpdateQuizData {
  title: string;
  duration: number;
  passingScore: number;
  lessonId: number; // required by backend
   totalQuestions: number;

}
const useQuiz = (id?: string) => {
  const queryClient = useQueryClient();

  // 🔹 Get quiz by ID
  const getQuizById = (id: string) =>
    useQuery({
      queryKey: ["quiz", id],
      queryFn: async () => {
        const res = await api.get(`${Urls.GetQuizById}${id}`);
        return res.data;
      },
      enabled: !!id,
    });

  // 🔹 Get all quizzes for instructor
  const getAllQuizzes = () =>
    useQuery({
      queryKey: ["quizzes"],
      queryFn: async () => {
        const res = await api.get(Urls.GetAllQuizzes);
        return res.data;
      },
    });

  // 🔹 Add quiz
  const addQuizMutation = useMutation({
    mutationFn: async (data: AddQuizData) => {
      const res = await api.post(Urls.AddQuiz, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });

  // 🔹 Update quiz
  const updateQuizMutation = useMutation({
    mutationFn: async (data: UpdateQuizData) => {
      const res = await api.put(`${Urls.UpdateQuiz}${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", id] });
    },
  });

  // 🔹 Delete quiz
  const deleteQuizMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${Urls.DeleteQuiz}${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });

  return {
    // Queries
    getQuizById,
    getAllQuizzes,

    // Mutations
    addQuizMutation,
    updateQuizMutation,
    deleteQuizMutation,
  };
};

export default useQuiz;
