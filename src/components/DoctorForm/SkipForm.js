import { Card, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const SkipForm = ({ nextStep, inputChange, values, setDoctorInfo }) => {
  const genders = ["Male", "Female", "Others"];

  const continueForm = (e) => {
    e.preventDefault();
    nextStep();
  };
  //   const inputHandler = (e) => {
  //     e.preventDefault();
  //     let isInputValid;

  //     if (e.target.name === "name") {
  //       const nameValidation = /^([a-zA-Z]{3,30}\s*)+/;
  //       isInputValid = nameValidation.test(e.target.value);

  //       !isInputValid &&
  //         document.querySelector(".name").style.setProperty("display", "block");
  //     }
  //     if (e.target.name === "phone") {
  //       isInputValid = e.target.value.length > 10 ? e.target.value : "";
  //       !isInputValid &&
  //         document.querySelector(".phone").style.setProperty("display", "block");
  //     }
  //     if (e.target.name === "email") {
  //       const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       isInputValid = validation.test(e.target.value);
  //       !isInputValid &&
  //         document.querySelector(".email").style.setProperty("display", "block");
  //     }
  //     if (e.target.name === "password") {
  //       const passValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  //       isInputValid = passValidation.test(e.target.value);
  //       !isInputValid &&
  //         document
  //           .querySelector(".password")
  //           .style.setProperty("display", "block");
  //     }
  //     if (isInputValid) {
  //       const newUser = { ...CreateUser };
  //       newUser[e.target.name] = e.target.value;
  //       SetCreateUser(newUser);
  //     }
  //   };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/doctor_signin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    console.log(data);
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
            name="nid_no"
            onBlur={inputChange}
          />
          <Form.Control.Feedback type="invalid" className="phone">
            {!values.phone ? "must have atleast 11 number" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            name="birth_date"
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
        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="sign-up-btn">
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
