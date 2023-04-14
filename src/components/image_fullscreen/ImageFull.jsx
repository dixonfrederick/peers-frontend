import React from "react";
import "./ImageFulscreen.css";

const ImageFull = ({ open, url, onClick }) => {
  return (
    <>
      <div className={`imageOverlay ${open ? "show" : ""}`}></div>
      <div data-testid="image_container" className={`image ${open ? "full" : ""}`} onClick={onClick}>
        <img src={url} alt={url} />
      </div>
    </>
  );
};

export default ImageFull;
