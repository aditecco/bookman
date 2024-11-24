/* ---------------------------------
NotificationMessage
--------------------------------- */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotif } from "../../store/actions";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { RootState } from "../../store/store";

export default function NotificationMessage() {
  const dispatch = useDispatch();
  const { message, icon, visible, timeout, theme } = useSelector(
    (state: RootState) => state.notificationMessage
  );

  useEffect(() => {
    visible &&
      setTimeout(() => {
        dispatch(hideNotif());
      }, timeout);
  }, [visible]);

  return visible ? (
    <div
      className={`NotificationMessage ${visible ? "visible" : ""} ${
        theme === "light" ? "light" : ""
      }`}
    >
      {icon && (
        <div className="NotificationMessageVisual">
          <MaterialIcon icon={icon} />
        </div>
      )}

      <div className="NotificationMessageContent">{message}</div>
    </div>
  ) : null;
}
