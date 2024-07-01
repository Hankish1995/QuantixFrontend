import React from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import { MdOutlineCancel } from "react-icons/md";

function ReviewModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        size={"lg"}
        show={show}
        onHide={handleClose}
        className="reviewModal_outer"
      >
        <div className="review_modal_header">
          <div className="cross_icon text-end" onClick={handleClose}>
            <MdOutlineCancel />
          </div>
          <h3 className="large_font">Review Report</h3>
        </div>
        <Modal.Body>
          <div>
            <h3 className="large_font">Issue Detected</h3>
            <p className="cmn_small_heading">
              Lorem ipsum dolor sit amet consectetur. Libero velit egestas
              pellentesque dolor mi quis augue elementum.
            </p>
          </div>
          <div>
            <h3 className="large_font"> Major Issues</h3>
            <p className="cmn_small_heading">
              Lorem ipsum dolor sit amet consectetur. Libero velit egestas
              pellentesque dolor mi quis augue elementum.
            </p>
          </div>
          <div>
            <h3 className="large_font">Resolved</h3>
            <p className="cmn_small_heading">
              Lorem ipsum dolor sit amet consectetur. Libero velit egestas
              pellentesque dolor mi quis augue elementum.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewModal;
