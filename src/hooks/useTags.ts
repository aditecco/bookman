import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagsService } from "../services/tags";
import { useAuth } from "./useAuth";
import { useAppStore } from "../stores/appStore";

export const useTags = () => {
  const { user } = useAuth();
  const { addNotification } = useAppStore();
  const queryClient = useQueryClient();

  const {
    data: tags = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tags", user?.id],
    queryFn: () => tagsService.getTags(user!.id),
    enabled: !!user?.id,
  });

  const { data: uniqueTagNames = [], isLoading: isLoadingTagNames } = useQuery({
    queryKey: ["tagNames", user?.id],
    queryFn: () => tagsService.getUniqueTagNames(user!.id),
    enabled: !!user?.id,
  });

  const createTagMutation = useMutation({
    mutationFn: (tagData: Parameters<typeof tagsService.createTag>[0]) =>
      tagsService.createTag(tagData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["tagNames"] });
      addNotification({
        message: "Tag created successfully!",
        type: "success",
        timeout: 3000,
      });
    },
    onError: error => {
      addNotification({
        message: "Failed to create tag",
        type: "error",
        timeout: 5000,
      });
      console.error("Error creating tag:", error);
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Parameters<typeof tagsService.updateTag>[1];
    }) => tagsService.updateTag(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["tagNames"] });
      addNotification({
        message: "Tag updated successfully!",
        type: "success",
        timeout: 3000,
      });
    },
    onError: error => {
      addNotification({
        message: "Failed to update tag",
        type: "error",
        timeout: 5000,
      });
      console.error("Error updating tag:", error);
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: (id: string) => tagsService.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["tagNames"] });
      addNotification({
        message: "Tag deleted successfully!",
        type: "success",
        timeout: 3000,
      });
    },
    onError: error => {
      addNotification({
        message: "Failed to delete tag",
        type: "error",
        timeout: 5000,
      });
      console.error("Error deleting tag:", error);
    },
  });

  return {
    tags,
    uniqueTagNames,
    isLoading: isLoading || isLoadingTagNames,
    error,
    refetch,
    createTag: createTagMutation.mutate,
    updateTag: updateTagMutation.mutate,
    deleteTag: deleteTagMutation.mutate,
    isCreating: createTagMutation.isPending,
    isUpdating: updateTagMutation.isPending,
    isDeleting: deleteTagMutation.isPending,
  };
};
