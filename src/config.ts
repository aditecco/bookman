/* ---------------------------------
config
--------------------------------- */

import { ISettings } from "./types/bookman";

export const settings: ISettings = { showDescriptions: true };

export function updateSettings(prevSettings, settings): ISettings {
  return {
    ...prevSettings,
    ...settings,
  };
}
