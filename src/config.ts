/* ---------------------------------
config
--------------------------------- */

import { TSettings } from "./types/bookman";

export const settings: TSettings = {
  showDescriptions: true,
  lorem: false,
  ipsum: false,
  dolor: false,
  sit: true,
  amet: true,
};

export function updateSettings(prevSettings, settings): TSettings {
  return {
    ...prevSettings,
    ...settings,
  };
}
