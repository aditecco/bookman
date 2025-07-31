"use client";

import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUserSettings } from "../../../hooks/useUserSettings";
import BaseButton from "../../../components/BaseButton/BaseButton";
import Spinner from "../../../components/Spinner/Spinner";
import InfoMessage, { InfoMessageTypes } from "../../../components/InfoMessage/InfoMessage";
import MaterialIcon from "../../../components/MaterialIcon/MaterialIcon";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { settings, isLoading: settingsLoading } = useUserSettings();

  if (!user) {
    return (
      <div className="wrapper error">
        <InfoMessage
          type={InfoMessageTypes.error}
          body="User not found"
        />
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="wrapper">
      <header className="pageHeader">
        <h1>Profile</h1>
        <p>Your BookMan account information</p>
      </header>

      <div className="profileContainer">
        <div className="profileSection">
          <h2>Account Information</h2>
          
          <div className="profileItem">
            <label>Email</label>
            <span>{user.email}</span>
          </div>

          <div className="profileItem">
            <label>User ID</label>
            <span className="userId">{user.id}</span>
          </div>

          <div className="profileItem">
            <label>Display Name</label>
            <span>{user.user_metadata?.display_name || "Not set"}</span>
          </div>

          <div className="profileItem">
            <label>Account Created</label>
            <span>{formatDate(user.created_at)}</span>
          </div>

          {user.last_sign_in_at && (
            <div className="profileItem">
              <label>Last Sign In</label>
              <span>{formatDate(user.last_sign_in_at)}</span>
            </div>
          )}
        </div>

        <div className="profileSection">
          <h2>Account Settings</h2>
          
          {settingsLoading ? (
            <Spinner />
          ) : settings ? (
            <div className="settingsSummary">
              <div className="settingSummaryItem">
                <span>Show Descriptions:</span>
                <span className={settings.show_descriptions ? "enabled" : "disabled"}>
                  {settings.show_descriptions ? "Enabled" : "Disabled"}
                </span>
              </div>
              
              <div className="settingSummaryItem">
                <span>Admin Mode:</span>
                <span className={settings.admin_mode ? "enabled" : "disabled"}>
                  {settings.admin_mode ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          ) : (
            <p>No settings found</p>
          )}
        </div>

        <div className="profileSection">
          <h2>Account Actions</h2>
          
          <div className="actionButtons">
            <BaseButton
              className="button--secondary"
              onClick={() => window.location.href = "/settings"}
            >
              <MaterialIcon icon="settings" />
              Manage Settings
            </BaseButton>

            <BaseButton
              className="button--outline"
              onClick={handleSignOut}
            >
              <MaterialIcon icon="logout" />
              Sign Out
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}
