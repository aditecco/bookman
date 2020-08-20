/* ---------------------------------
config
--------------------------------- */

import { TSettings } from "./types/bookman";

export const settings: TSettings = {
  show_descriptions: true,
  lorem_ipsum: false,
  dolor_sit_amet: false,
};

export function updateSettings(prevSettings, settings): TSettings {
  return {
    ...prevSettings,
    ...settings,
  };
}
