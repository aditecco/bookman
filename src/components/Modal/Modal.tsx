/* ---------------------------------
Modal
--------------------------------- */

import React from "react";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { useAppStore } from "../../stores/appStore";

export default function Modal() {
  const { modal, closeModal } = useAppStore();
  const { open, content } = modal;

  if (!open) return null;

  return (
    <section className="Modal">
      <div className="ModalControls">
        <button type="button" className="ModalCloseButton" onClick={closeModal}>
          <MaterialIcon icon="close" />
        </button>
      </div>

      <div className="ModalContainer">{content}</div>
    </section>
  );
}
