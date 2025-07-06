import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tag = Database['public']['Tables']['tags']['Row'];
type TagInsert = Database['public']['Tables']['tags']['Insert'];
type TagUpdate = Database['public']['Tables']['tags']['Update'];

export const tagsService = {
  // Get all tags for a user
  async getTags(userId: string): Promise<Tag[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Create a new tag
  async createTag(tagData: TagInsert): Promise<Tag> {
    const { data, error } = await supabase
      .from('tags')
      .insert(tagData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a tag
  async updateTag(id: string, updates: TagUpdate): Promise<Tag> {
    const { data, error } = await supabase
      .from('tags')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a tag
  async deleteTag(id: string): Promise<void> {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get unique tag names for a user
  async getUniqueTagNames(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('name')
      .eq('user_id', userId)
      .order('name', { ascending: true });

    if (error) throw error;
    
    // Return unique tag names
    return [...new Set(data.map(tag => tag.name))];
  }
}; 