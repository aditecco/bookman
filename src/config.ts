/* ---------------------------------
config
--------------------------------- */

import { TSettings } from "./types/bookman";

export const settings: TSettings = {
  // TODO maybe create util to convert camelCase => title case
  // and write as camelCase
  show_descriptions: true,
  admin_mode: false,
};

export function updateSettings(prevSettings, settings) {
  return {
    ...prevSettings,
    ...settings,
  };
}
