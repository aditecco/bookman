/* ---------------------------------
NotificationMessage
--------------------------------- */

import React from "react";
import { useAppStore } from "../../stores/appStore";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

export default function NotificationMessage() {
  const { notifications, removeNotification } = useAppStore();

  if (notifications.length === 0) return null;

  return (
    <div className="NotificationMessageContainer">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`NotificationMessage visible ${
            notification.type === "success" ? "light" : ""
          }`}
        >
          <div className="NotificationMessageVisual">
            <MaterialIcon
              icon={
                notification.type === "success"
                  ? "check_circle"
                  : notification.type === "error"
                    ? "error"
                    : "info"
              }
            />
          </div>

          <div className="NotificationMessageContent">
            {notification.message}
          </div>

          <button
            className="NotificationMessageClose"
            onClick={() => removeNotification(notification.id)}
          >
            <MaterialIcon icon="close" />
          </button>
        </div>
      ))}
    </div>
  );
}
