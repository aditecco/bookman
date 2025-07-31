import type { Database } from "../lib/supabase";
import { supabase } from "../lib/supabase";

type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
type UserSettingsInsert = Database["public"]["Tables"]["user_settings"]["Insert"];
type UserSettingsUpdate = Database["public"]["Tables"]["user_settings"]["Update"];

export const userSettingsService = {
  // Get user settings
  async getUserSettings(userId: string): Promise<UserSettings | null> {
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No settings found, create default settings
        return this.createDefaultSettings(userId);
      }
      throw error;
    }

    return data;
  },

  // Create default settings for a user
  async createDefaultSettings(userId: string): Promise<UserSettings> {
    const defaultSettings: UserSettingsInsert = {
      user_id: userId,
      show_descriptions: true,
      admin_mode: false,
    };

    const { data, error } = await supabase
      .from("user_settings")
      .insert(defaultSettings)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user settings
  async updateUserSettings(
    userId: string,
    updates: Partial<UserSettingsUpdate>
  ): Promise<UserSettings> {
    const { data, error } = await supabase
      .from("user_settings")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Toggle a specific setting
  async toggleSetting(
    userId: string,
    setting: keyof Pick<UserSettings, "show_descriptions" | "admin_mode">
  ): Promise<UserSettings> {
    const currentSettings = await this.getUserSettings(userId);
    if (!currentSettings) {
      throw new Error("User settings not found");
    }

    const newValue = !currentSettings[setting];
    return this.updateUserSettings(userId, { [setting]: newValue });
  },
}; 