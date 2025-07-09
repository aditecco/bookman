import type { Database } from "../lib/supabase";
import { supabase } from "../lib/supabase";
import { TAG_VALIDATOR } from "../constants";

type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];
type BookmarkInsert = Database["public"]["Tables"]["bookmarks"]["Insert"];
type BookmarkUpdate = Database["public"]["Tables"]["bookmarks"]["Update"];

type Tag = Database["public"]["Tables"]["tags"]["Row"];

export interface BookmarkWithTags extends Bookmark {
  tags: Tag[];
}

export const bookmarksService = {
  // Get all bookmarks for a user with their tags
  async getBookmarks(userId: string): Promise<BookmarkWithTags[]> {
    const { data, error } = await supabase
      .from("bookmarks")
      .select(
        `
        *,
        bookmark_tags(
          tags(*)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data to flatten the tags array
    return data.map(bookmark => ({
      ...bookmark,
      tags: bookmark.bookmark_tags?.map(bt => bt.tags) || [],
    }));
  },

  // Create a new bookmark with tags
  async createBookmark(
    bookmarkData: BookmarkInsert & { tags?: string[] }
  ): Promise<BookmarkWithTags> {
    const { tags, ...bookmark } = bookmarkData;

    console.log("Creating bookmark:", { bookmark, tags });

    // Create the bookmark first
    const { data: bookmarkResult, error: bookmarkError } = await supabase
      .from("bookmarks")
      .insert(bookmark)
      .select()
      .single();

    if (bookmarkError) throw bookmarkError;

    console.log("Bookmark created:", bookmarkResult);

    // Handle tags if provided
    if (tags && tags.length > 0) {
      // Normalize tag names
      const normalizedTags = tags
        .map(tag => tag.replace(TAG_VALIDATOR, "").trim().toLowerCase())
        .filter(tag => tag.length > 0);

      console.log("Normalized tags:", normalizedTags);

      // Get existing tags for this user
      const { data: existingTags, error: existingTagsError } = await supabase
        .from("tags")
        .select("id, name")
        .eq("user_id", bookmark.user_id)
        .in("name", normalizedTags);

      if (existingTagsError) throw existingTagsError;

      console.log("Existing tags found:", existingTags);

      // Create a map of existing tag names to their IDs
      const existingTagMap = new Map(
        existingTags.map(tag => [tag.name, tag.id])
      );

      // Find tags that need to be created
      const tagsToCreate = normalizedTags.filter(
        tagName => !existingTagMap.has(tagName)
      );

      console.log("Tags to create:", tagsToCreate);

      // Create new tags if needed
      let newTags: Tag[] = [];
      if (tagsToCreate.length > 0) {
        const { data: createdTags, error: createTagsError } = await supabase
          .from("tags")
          .insert(
            tagsToCreate.map(name => ({
              user_id: bookmark.user_id,
              name,
            }))
          )
          .select();

        if (createTagsError) throw createTagsError;
        newTags = createdTags;
        console.log("New tags created:", newTags);
      }

      // Combine existing and new tag IDs
      const allTagIds = [
        ...Array.from(existingTagMap.values()),
        ...newTags.map(tag => tag.id),
      ];

      console.log("All tag IDs for relationships:", allTagIds);

      // Create bookmark-tag relationships
      if (allTagIds.length > 0) {
        const { error: relationshipError } = await supabase
          .from("bookmark_tags")
          .insert(
            allTagIds.map(tagId => ({
              bookmark_id: bookmarkResult.id,
              tag_id: tagId,
            }))
          );

        if (relationshipError) throw relationshipError;
        console.log("Bookmark-tag relationships created successfully");
      }
    }

    // Return the created bookmark with tags
    return this.getBookmark(bookmarkResult.id);
  },

  // Get a single bookmark with tags
  async getBookmark(id: string): Promise<BookmarkWithTags> {
    const { data, error } = await supabase
      .from("bookmarks")
      .select(
        `
        *,
        bookmark_tags(
          tags(*)
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      ...data,
      tags: data.bookmark_tags?.map(bt => bt.tags) || [],
    };
  },

  // Update a bookmark
  async updateBookmark(
    id: string,
    updates: BookmarkUpdate & { tags?: string[] }
  ): Promise<BookmarkWithTags> {
    const { tags, ...bookmarkUpdates } = updates;

    // Update the bookmark
    const { data: bookmark, error: bookmarkError } = await supabase
      .from("bookmarks")
      .update(bookmarkUpdates)
      .eq("id", id)
      .select()
      .single();

    if (bookmarkError) throw bookmarkError;

    // Handle tags if provided
    if (tags !== undefined) {
      // Remove all existing tag relationships
      await supabase.from("bookmark_tags").delete().eq("bookmark_id", id);

      // Add new tag relationships
      if (tags.length > 0) {
        // Normalize tag names
        const normalizedTags = tags.map(tag => tag.trim().toLowerCase());

        // Get existing tags for this user
        const { data: existingTags, error: existingTagsError } = await supabase
          .from("tags")
          .select("id, name")
          .eq("user_id", bookmark.user_id)
          .in("name", normalizedTags);

        if (existingTagsError) throw existingTagsError;

        // Create a map of existing tag names to their IDs
        const existingTagMap = new Map(
          existingTags.map(tag => [tag.name, tag.id])
        );

        // Find tags that need to be created
        const tagsToCreate = normalizedTags.filter(
          tagName => !existingTagMap.has(tagName)
        );

        // Create new tags if needed
        let newTags: Tag[] = [];
        if (tagsToCreate.length > 0) {
          const { data: createdTags, error: createTagsError } = await supabase
            .from("tags")
            .insert(
              tagsToCreate.map(name => ({
                user_id: bookmark.user_id,
                name,
              }))
            )
            .select();

          if (createTagsError) throw createTagsError;
          newTags = createdTags;
        }

        // Combine existing and new tag IDs
        const allTagIds = [
          ...Array.from(existingTagMap.values()),
          ...newTags.map(tag => tag.id),
        ];

        // Create bookmark-tag relationships
        if (allTagIds.length > 0) {
          const { error: relationshipError } = await supabase
            .from("bookmark_tags")
            .insert(
              allTagIds.map(tagId => ({
                bookmark_id: id,
                tag_id: tagId,
              }))
            );

          if (relationshipError) throw relationshipError;
        }
      }
    }

    // Return the updated bookmark with tags
    return this.getBookmark(id);
  },

  // Delete a bookmark
  async deleteBookmark(id: string): Promise<void> {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) throw error;
  },
};
