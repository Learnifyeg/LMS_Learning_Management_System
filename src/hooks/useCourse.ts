/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";
export interface CourseForm {
  // id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  authorId: number;
  views: string;
  posted: string;
  rating: number;
  hours: string;
  price: number;
  tag: string;
  image: string;
  studentsEnrolled: number;
  certificateIncluded: boolean;
  duration: string;
  instructorId: number;
  isApproved: boolean;
}

// export interface Course {
//   id: string;
//   title: string;
//   description?: string;
//   price: number;
//   category: string;
//   isActive: boolean;
//   imageUrl?: string;
// }

const useCourse = (id?: string) => {
  const queryClient = useQueryClient();

  // ✅ Fetch single course
  const CourseById = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await api.get<{ success: boolean; data: any }>(
        Urls.getCourseById + id
      );
      return res.data;
    },
    enabled: !!id,
  });

  const pendingCourses = useQuery({
    queryKey: ["pendingCourses"],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: any[] }>(
        Urls.getPendingCourses
      );
      return res.data;
    },
  });

  const approvedCourses = useQuery({
    queryKey: ["approvedCourses"],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: any[] }>(
        Urls.getApprovedCourses
      );
      return res.data;
    },
  });

  // ✅ Create course
  const createCourse = useMutation({
    mutationFn: async (data: CourseForm) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const res = await api.post<{ success: boolean; data: any }>(
        Urls.addCourse,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  // ✅ Update course
  const updateCourse = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CourseForm }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const res = await api.put<{ success: boolean; data: any }>(
        Urls.updateCourse + id,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
  });

  const approveCourse = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put<{ success: boolean; data: any }>(
        Urls.approveCourse + id
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  // ✅ Delete course
  const deleteCourse = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(Urls.deleteCourse + id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingCourses"] });
      queryClient.invalidateQueries({ queryKey: ["approvedCourses"] });
    },
  });

  return {
    CourseById,
    pendingCourses,
    approvedCourses,
    createCourse,
    updateCourse,
    approveCourse,
    deleteCourse,
  };
};

export default useCourse;
