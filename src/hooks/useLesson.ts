/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

// export interface Lesson {
//   id: string;
//   title: string;
//   description?: string;
//   courseId: string;
//   videoUrl?: string;
//   isCompleted?: boolean;
//   order?: number;
// }

// export interface LessonProgress {
//   courseId: string;
//   completedLessons: number;
//   totalLessons: number;
//   progressPercentage: number;
// }
interface AddLessonData {
  courseId: number;
  title: string;
  videoUrl: string;
  order: number;
}

interface UpdateLessonData extends Omit<AddLessonData, "courseId"> {}

const useLesson = (id?: string) => {
  const queryClient = useQueryClient();

  // ✅ Get lesson by ID
  const getLessonById = (id: string) =>
    useQuery({
      queryKey: ["lesson", id],
      queryFn: async () => {
        const res = await api.get(Urls.GetLessonById + id);
        return res.data;
      },
      enabled: !!id,
    });

  // ✅ Get lessons by course
  const getLessonsByCourse = (courseId: string) =>
    useQuery({
      queryKey: ["lessons", courseId],
      queryFn: async () => {
        const res = await api.get(Urls.GetLessonByCourse + courseId);
        return res.data;
      },
      enabled: !!courseId,
    });

  // ✅ Get lesson progress for a course
  const getLessonProgress = (courseId: string) =>
    useQuery({
      queryKey: ["lessonProgress", courseId],
      queryFn: async () => {
        const res = await api.get(Urls.LessonProgress + courseId);
        return res.data;
      },
      enabled: !!courseId,
    });

  // ✅ Add lesson
  const addLessonMutation = useMutation({
    mutationFn: async (data: AddLessonData) => {
      const res = await api.post(Urls.AddLesson, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });

  // ✅ Update lesson
  const updateLessonMutation = useMutation({
    mutationFn: async (data: UpdateLessonData) => {
      const res = await api.put(Urls.UpdateLesson + id, data);
      return res.data;
    },

    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
    },
  });

  // ✅ Delete lesson
  const deleteLessonMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(Urls.DeleteLesson + id);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });

  // ✅ Complete lesson
  const completeLessonMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post(`/Lesson/complete/${id}`);
      return res.data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
    },
  });

  return {
    // Queries
    getLessonById,
    getLessonsByCourse,
    getLessonProgress,

    // Mutations
    addLessonMutation,
    updateLessonMutation,
    deleteLessonMutation,
    completeLessonMutation,
  };
};

export default useLesson;
