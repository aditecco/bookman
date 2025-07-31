import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userSettingsService } from "../services/userSettings";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useUserSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userSettings", user?.id],
    queryFn: () => userSettingsService.getUserSettings(user!.id),
    enabled: !!user?.id,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (updates: { show_descriptions?: boolean; admin_mode?: boolean }) =>
      userSettingsService.updateUserSettings(user!.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings", user?.id] });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update settings");
      console.error("Settings update error:", error);
    },
  });

  const toggleSettingMutation = useMutation({
    mutationFn: (setting: "show_descriptions" | "admin_mode") =>
      userSettingsService.toggleSetting(user!.id, setting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings", user?.id] });
      toast.success("Setting updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update setting");
      console.error("Setting toggle error:", error);
    },
  });

  const updateSettings = (updates: { show_descriptions?: boolean; admin_mode?: boolean }) => {
    updateSettingsMutation.mutate(updates);
  };

  const toggleSetting = (setting: "show_descriptions" | "admin_mode") => {
    toggleSettingMutation.mutate(setting);
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    toggleSetting,
    isUpdating: updateSettingsMutation.isPending || toggleSettingMutation.isPending,
  };
}; 