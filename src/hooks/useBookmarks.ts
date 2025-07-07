import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookmarksService } from "../services/bookmarks";
import { useAuth } from "./useAuth";
import { useAppStore } from "../stores/appStore";
import toast from "react-hot-toast";

export const useBookmarks = () => {
  const { user } = useAuth();
  const { addNotification } = useAppStore();
  const queryClient = useQueryClient();

  const {
    data: bookmarks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: () => bookmarksService.getBookmarks(user!.id),
    enabled: !!user?.id,
  });

  const createBookmarkMutation = useMutation({
    mutationFn: (
      bookmarkData: Parameters<typeof bookmarksService.createBookmark>[0]
    ) => bookmarksService.createBookmark(bookmarkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });

      toast.success("Bookmark created successfully!");
    },
    onError: error => {
      toast.error(error.message || "Failed to create bookmark");
      console.error("Error creating bookmark:", error);
    },
  });

  const updateBookmarkMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Parameters<typeof bookmarksService.updateBookmark>[1];
    }) => bookmarksService.updateBookmark(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      addNotification({
        message: "Bookmark updated successfully!",
        type: "success",
        timeout: 3000,
      });
    },
    onError: error => {
      addNotification({
        message: "Failed to update bookmark",
        type: "error",
        timeout: 5000,
      });
      console.error("Error updating bookmark:", error);
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (id: string) => bookmarksService.deleteBookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      addNotification({
        message: "Bookmark deleted successfully!",
        type: "success",
        timeout: 3000,
      });
    },
    onError: error => {
      addNotification({
        message: "Failed to delete bookmark",
        type: "error",
        timeout: 5000,
      });
      console.error("Error deleting bookmark:", error);
    },
  });

  return {
    bookmarks,
    isLoading,
    error,
    refetch,
    createBookmark: createBookmarkMutation.mutate,
    updateBookmark: updateBookmarkMutation.mutate,
    deleteBookmark: deleteBookmarkMutation.mutate,
    isCreating: createBookmarkMutation.isPending,
    isUpdating: updateBookmarkMutation.isPending,
    isDeleting: deleteBookmarkMutation.isPending,
  };
};
