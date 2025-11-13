// WAITING FOR PROFILE CLARIFICATION
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/API/Config";
import Urls from "@/API/URL";

// export interface UserSettings {
//   id: string;
//   userId: string;
//   language: string;
//   theme: "light" | "dark";
//   notificationsEnabled: boolean;
//   [key: string]: any; // for additional dynamic fields
// }

export interface UpdateUserSettingsData {
  firstName: string;
  lastName: string;
  headline: string;
  about: string;
  email: string;
  phone: string;
  newsletter: boolean;
}

const useUserSettings = (userId: string) => {
  const queryClient = useQueryClient();

  // ✅ Get user settings
  const {
    data: userSettings,
    isLoading: isUserSettingsLoading,
    isError: isUserSettingsError,
    refetch: refetchUserSettings,
  } = useQuery({
    queryKey: ["userSettings", userId],
    queryFn: async () => {
      const res = await api.get(Urls.getUserSettings + userId);
      return res.data;
    },
    enabled: !!userId,
  });

  // ✅ Update user settings
  const {
    mutate: updateUserSettings,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async (data: UpdateUserSettingsData) => {
      const res = await api.put(Urls.updateUserSettings + userId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings", userId] });
    },
  });

  return {
    userSettings,
    isUserSettingsLoading,
    isUserSettingsError,
    refetchUserSettings,
    updateUserSettings,
    isUpdating,
    updateError,
  };
};

export default useUserSettings;
