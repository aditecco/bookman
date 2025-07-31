"use client";

import React from "react";
import { useUserSettings } from "../../../hooks/useUserSettings";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";
import InfoMessage, { InfoMessageTypes } from "../../../components/InfoMessage/InfoMessage";
import MaterialIcon from "../../../components/MaterialIcon/MaterialIcon";

export default function Settings() {
  const { settings, isLoading, error, toggleSetting, isUpdating } = useUserSettings();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="wrapper error">
        <InfoMessage
          type={InfoMessageTypes.error}
          body="Failed to load settings"
        />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="wrapper">
        <InfoMessage
          type={InfoMessageTypes.info}
          body="No settings found"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <header className="pageHeader">
        <h1>Settings</h1>
        <p>Manage your BookMan preferences</p>
      </header>

      <div className="settingsContainer">
        <div className="settingItem">
          <div className="settingInfo">
            <h3>Show Descriptions</h3>
            <p>Display bookmark descriptions in the bookmark list</p>
          </div>
          <BaseButton
            className={settings.show_descriptions ? "button--primary" : "button--outline"}
            onClick={() => toggleSetting("show_descriptions")}
            disabled={isUpdating}
          >
            {settings.show_descriptions ? "ON" : "OFF"}
          </BaseButton>
        </div>

        <div className="settingItem">
          <div className="settingInfo">
            <h3>Admin Mode</h3>
            <p>Enable advanced features and debugging options</p>
          </div>
          <BaseButton
            className={settings.admin_mode ? "button--primary" : "button--outline"}
            onClick={() => toggleSetting("admin_mode")}
            disabled={isUpdating}
          >
            {settings.admin_mode ? "ON" : "OFF"}
          </BaseButton>
        </div>

        <div className="settingItem">
          <div className="settingInfo">
            <h3>Account Information</h3>
            <p>View your account details and preferences</p>
          </div>
          <BaseButton
            className="button--secondary"
            onClick={() => window.location.href = "/profile"}
          >
            <MaterialIcon icon="person" />
            View Profile
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
