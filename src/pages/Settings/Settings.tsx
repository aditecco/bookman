/* ---------------------------------
Settings
--------------------------------- */

import React, { ReactElement, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import BaseButton from "../../components/BaseButton/BaseButton";
import { SettingsContext } from "../../Routes";

interface IOwnProps {}

export default function Settings(props: IOwnProps): ReactElement {
  const [settings, updateSettings] = useContext(SettingsContext);

  return (
    <Layout root="Settings">
      <ul className="settingList">
        {Object.entries(settings).map(([setting, value], i) => (
          <li key={"setting" + i}>
            {setting}: {String(value)}
            <BaseButton
              onClick={() => {
                updateSettings({
                  [setting]: !value,
                });
              }}
            >
              {value ? `Disable` : `Enable`}
            </BaseButton>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
