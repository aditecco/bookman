/* ---------------------------------
Settings
--------------------------------- */

import React, { ReactElement, useContext } from "react";
import Layout from "../../../components/Layout/Layout";
import BaseButton from "../../../components/BaseButton/BaseButton";
import { SettingsContext } from "../../../routes";
import { capitalize } from "../../../utils";

interface IOwnProps {}

export default function Settings(props: IOwnProps): ReactElement {
  const [settings, updateSettings] = useContext(SettingsContext);

  return (
    <Layout root="Settings">
      {/* TODO move to Layout */}
      <header className="pageHeader">
        <h1>Your settings</h1>
      </header>

      <ul className="settingList">
        {Object.entries(settings).map(([setting, value], i) => (
          <li className="settingItem" key={"setting" + i}>
            {capitalize(setting.split("_").join(" "))}
            {/* {setting}: {String(value)} */}

            <BaseButton
              className={value ? "" : "button--outline"}
              onClick={() => {
                updateSettings({
                  [setting]: !value,
                });
              }}
            >
              {value ? `ON` : `OFF`}
            </BaseButton>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
