/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

// export interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   userId: string;
//   isRead: boolean;
//   createdAt: string;
// }

interface SendNotificationData {
  //   senderId: number;
  receiverEmail: string;
  title: string;
  message: string;
  type: string;
}

const useNotification = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch user notifications
  const getNotifications = () =>
    useQuery({
      queryKey: ["notifications"],
      queryFn: async () => {
        const res = await api.get(Urls.ReceiveNotifications);
        return res.data;
      },
    });

  // ✅ Send notification
  const sendNotification = useMutation({
    mutationFn: async (data: SendNotificationData) => {
      const res = await api.post(Urls.SendNotification, data);
      return res.data as Notification;
    },

    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  // ✅ Mark notifications as read
  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await api.post(Urls.MarkasReadNotifications + notificationId);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  // ✅ Delete notifications
  const deleteNotification = useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await api.post(Urls.DeleteNotification + notificationId);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return {
    getNotifications,
    sendNotification,
    markAsRead,
    deleteNotification,
  };
};

export default useNotification;
