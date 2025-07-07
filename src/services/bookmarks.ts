import type { Database } from "../lib/supabase";
import { supabase } from "../lib/supabase";

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

    // Create the bookmark
    const { data: bookmarkResult, error: bookmarkError } = await supabase
      .from("bookmarks")
      .insert(bookmark)
      .select()
      .single();

    if (bookmarkError) throw bookmarkError;

    // Handle tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Upsert tag (create if doesn't exist)
        const { data: tag, error: tagError } = await supabase
          .from("tags")
          .upsert({
            user_id: bookmark.user_id,
            name: tagName.trim().toLowerCase(),
          })
          .select()
          .single();

        if (tagError) throw tagError;

        // Create bookmark-tag relationship
        await supabase.from("bookmark_tags").insert({
          bookmark_id: bookmarkResult.id,
          tag_id: tag.id,
        });
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
        for (const tagName of tags) {
          // Upsert tag
          const { data: tag, error: tagError } = await supabase
            .from("tags")
            .upsert({
              user_id: bookmark.user_id,
              name: tagName.trim().toLowerCase(),
            })
            .select()
            .single();

          if (tagError) throw tagError;

          // Create bookmark-tag relationship
          await supabase.from("bookmark_tags").insert({
            bookmark_id: id,
            tag_id: tag.id,
          });
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
