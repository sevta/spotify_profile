import React from "react";

export default function Modal({ children }) {
  return (
    <div className="modal-wrapper w-full h-screen bg-gray-600 flex items-center justify-center fixed top-0 left-0">
      <div className="modal-inner w-1/2 bg-white">{children}</div>
    </div>
  );
}
