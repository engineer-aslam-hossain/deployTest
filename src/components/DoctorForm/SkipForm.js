import { Card, Dropdown, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const SkipForm = ({ nextStep, inputChange, values, setDoctorInfo }) => {
  const genders = ["Male", "Female", "Others"];

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/change_personal_info`,
        {
          method: "PUT",
          headers: {
            sobar_daktar_session: getToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ padding: "2rem 2rem" }} className="signUpCard mx-auto">
      <Form noValidate onSubmit={submitHandler}>
        <div>
          <h3 className="formTitle text-center">Signup</h3>
          <p className="text-center">( as Doctor )</p>
        </div>
        <Form.Group className="basicFormInput">
          <Form.Label>Gender</Form.Label>
          <Dropdown className="d-flex flex-column justify-content-center Gender">
            <Dropdown.Toggle id="GenderDropdown">
              {values.gender ? values.gender : "Gender"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {genders.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onSelect={() => setDoctorInfo({ ...values, gender: item })}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group className="basicFormInput">
          <Form.Label>NID No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter NID no."
            name="nid"
            onBlur={inputChange}
          />
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            name="date_of_birth"
            onChange={inputChange}
          />
          <Form.Control.Feedback type="invalid" className="phone">
            {!values.phone ? "must have atleast 11 number" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Residence / Address</Form.Label>
          <Form.Control
            onBlur={inputChange}
            type="text"
            name="address"
            placeholder="Residence / Address"
          />
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={inputChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid" className="mb-3 password">
            {!values.password
              ? "Must have minimum 6 character with number"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="findDocBtn">
            Save & Continue
          </button>
        </div>
      </Form>
      <div className="d-flex flex-column align-items-center mt-5 skipFormFooter">
        <button onClick={handleShow}>Skip for Now</button>
        <p>These Information are necessary for using our services.</p>
      </div>
      <Modal
        show={show}
        onHide={() => alert("You must continue account setup")}
      >
        <div className="p-5">
          <div className="modalTop">
            <p>
              <ErrorOutlineIcon /> Email Verification Required
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center modalMsgIcon">
            <p>
              <MailOutlineIcon />
            </p>
            <h4>
              Check your Email Inbox and Verify your Email for Sobar Daktar
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <button className="findDocBtn">Continue Account Setup</button>
          </div>
          <div className="modalFooter">
            <p>Email Verification is necessary for using our services.</p>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default SkipForm;
