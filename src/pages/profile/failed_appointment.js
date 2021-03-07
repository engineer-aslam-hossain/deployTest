import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
const failed_appointment = () => {
  const [show, setShow] = useState(true);
  const router = useRouter();

  return (
    <div className="vh-100">
      <Modal
        show={show}
        onHide={() => alert("Click eighter Back to Home or Find Doctors")}
      >
        <Card style={{ padding: "1rem" }}>
          <Card.Body>
            <div className="newApointHead mb-5">
              <h2>Appointment Creation Failed</h2>
            </div>
            <div
              className="d-flex flex-column align-items-center justify-content-between"
              style={{ height: "15rem" }}
            >
              <img
                src="/icons/error.svg"
                alt="errorIcon"
                className="img-fluid"
              />
              <h5>Payment Unsuccessful</h5>
              <p className="text-center">
                We’re sorry! Seems like the payment gateway was unable to
                complete the payment.
              </p>
            </div>
            <div className="col-md-12 d-flex justify-content-between my-5">
              <button className="cancelBtn" onClick={() => router.push("/")}>
                Back to Home
              </button>
              <button
                className="findDocBtn"
                onClick={() => router.push("/findDoctors")}
              >
                Find Doctors
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
};

export default failed_appointment;
