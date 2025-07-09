import type { Database } from "../lib/supabase";
import { supabase } from "../lib/supabase";

type Tag = Database["public"]["Tables"]["tags"]["Row"];
type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];

export interface TagWithCount extends Tag {
  bookmark_count: number;
}

export const tagsService = {
  // Get all tags for a user
  async getTags(userId: string): Promise<Tag[]> {
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get all tags for a user with bookmark counts
  async getTagsWithCounts(userId: string): Promise<TagWithCount[]> {
    console.log("Fetching tags with counts for user:", userId);
    
    const { data, error } = await supabase
      .from("tags")
      .select(`
        *,
        bookmark_tags!inner(
          bookmark_id
        )
      `)
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) throw error;

    console.log("Raw tags data:", data);

    // Transform the data to include bookmark counts
    const tagsWithCounts = data.map(tag => ({
      ...tag,
      bookmark_count: tag.bookmark_tags?.length || 0,
    }));

    console.log("Tags with counts:", tagsWithCounts);
    return tagsWithCounts;
  },

  // Create a new tag
  async createTag(tagData: TagInsert): Promise<Tag> {
    const { data, error } = await supabase
      .from("tags")
      .insert(tagData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a tag
  async updateTag(id: string, updates: TagUpdate): Promise<Tag> {
    const { data, error } = await supabase
      .from("tags")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a tag
  async deleteTag(id: string): Promise<void> {
    const { error } = await supabase.from("tags").delete().eq("id", id);

    if (error) throw error;
  },

  // Get unique tag names for a user
  async getUniqueTagNames(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("tags")
      .select("name")
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) throw error;

    // Return unique tag names
    return [...new Set(data.map(tag => tag.name))];
  },
};
