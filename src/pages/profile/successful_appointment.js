import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
const successful_appointment = () => {
  const [show, setShow] = useState(true);
  const router = useRouter();

  return (
    <div className="vh-100">
      <Modal
        show={show}
        onHide={() => alert("Click eighter Back to Home or Go to Profile")}
      >
        <Card style={{ padding: "1rem" }}>
          <Card.Body>
            <div className="newApointHead mb-5">
              <h2>Appointment Successfully Created</h2>
            </div>
            <div
              className="d-flex flex-column align-items-center justify-content-between"
              style={{ height: "15rem" }}
            >
              <img
                src="/icons/success.svg"
                alt="successIcon"
                className="img-fluid"
              />
              <h5>Payment Successful</h5>
              <p className="text-center">
                Thank you for Choosing Sobar Daktar! You can go to your profile
                and see all your future appointments over there.
              </p>
            </div>
            <div className="col-md-12 d-flex justify-content-between my-5">
              <button className="cancelBtn" onClick={() => router.push("/")}>
                Back to Home
              </button>
              <button
                className="findDocBtn"
                onClick={() => router.push("/profile")}
              >
                Go to Profile
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
};

export default successful_appointment;
