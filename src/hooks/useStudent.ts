/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

export interface CourseVM {
  id: number;
  title: string;
  image?: string;
  price?: number;
  [key: string]: any;
}

const useStudent = () => {
  const queryClient = useQueryClient();

  // -------- Save a course --------
  const saveCourse = useMutation({
    mutationFn: async (courseId: number) => {
      const res = await api.post<{ success: boolean; data: any }>(
        Urls.saveCourse + `?courseId=${courseId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedCourses"] });
    },
  });

  // -------- Get saved courses --------
  const savedCourses = useQuery({
    queryKey: ["savedCourses"],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: CourseVM[] }>(
        Urls.savedCourses
      );
      return res.data;
    },
  });

  // -------- Remove saved course --------
  const removeSavedCourse = useMutation({
    mutationFn: async (courseId: number) => {
      const res = await api.delete<{ success: boolean; data: any }>(
        Urls.removeSavedCourse + `?courseId=${courseId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedCourses"] });
    },
  });

  // -------- Get my enrollments --------
  const myEnrollments = useQuery({
    queryKey: ["myEnrollments"],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: CourseVM[] }>(
        Urls.myEnrollments
      );
      return res.data;
    },
  });

  // -------- Enroll in a course --------
  const enrollCourse = useMutation({
    mutationFn: async (courseId: number) => {
      const res = await api.post<{ success: boolean; data: any }>(
        Urls.enroll + `?courseId=${courseId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
  });

  // -------- Remove enrollment --------
  const removeEnrollment = useMutation({
    mutationFn: async (courseId: number) => {
      const res = await api.delete<{ success: boolean; data: any }>(
        Urls.removeEnrollment + `?courseId=${courseId}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
  });

  return {
    saveCourse,
    savedCourses,
    removeSavedCourse,
    myEnrollments,
    enrollCourse,
    removeEnrollment,
  };
};

export default useStudent;
