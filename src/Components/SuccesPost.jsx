import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function StackingExample() {
  const [position, setPosition] = useState("bottom-end");
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <div style={{ zIndex: 1 }}>
      <ToastContainer position={position} className="p-3">
        <Toast show={showA} onClose={toggleShowA} delay={1500} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>Berhasil input data</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default StackingExample;
