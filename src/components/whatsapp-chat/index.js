import React from "react";
import { imagePath } from "../../utils/assetUtils";
import "./whatsapp.scss";
export default function WhatsApp() {
  return (
    <>
      {/* whatsapp chat start */}
      <div className="whatsapp-chat">
        <a href="https://wa.me/919167352347" target="_blank">
          <img src={imagePath("whatsapp-icon.gif")} alt="whatsapp" />
        </a>
      </div>
      {/* whatsapp chat end */}
    </>
  );
}
