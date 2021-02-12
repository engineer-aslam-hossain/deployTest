import { Card, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { useRouter } from "next/router";
const PatientRequiredForm = ({ nextStep, inputChange, values }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user_signup`,
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
    data.success && data.success == "yes" && handleShow();
  };

  return (
    <Card style={{ padding: "2rem 2rem" }} className="signUpCard mx-auto">
      <Form noValidate onSubmit={submitHandler}>
        <div>
          <h3 className="formTitle text-center">Signup</h3>
          <p className="text-center">( as Patient )</p>
        </div>

        <Form.Group className="basicFormInput">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Full Name"
            name="fullname"
            onBlur={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="name">
            {!values.fullname
              ? "FullName must be start with atleast 6 character"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            name="email"
            onBlur={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="email">
            {!values.email ? "Please provide an valid email" : ""}
          </Form.Control.Feedback>
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
        <Form.Group className="basicFormInput">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onBlur={inputChange}
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
          />
          <Form.Control.Feedback
            type="invalid"
            className="mb-3 confirm_password"
          >
            {"Password and Confirm Doesn't match"}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="findDocBtn">
            Create Account
          </button>
          <Link href="/">
            <a className="forgetPass"> forget password ?</a>
          </Link>
          <p className="text-secondary">Or Sign Up with...</p>
        </div>
        <div className="d-flex justify-content-around">
          <Link href="https://sleepy-island-99039.herokuapp.com/auth/facebook">
            <a>
              <img
                src="/images/icon_fb.svg"
                alt=""
                className="facebook img-fluid"
              />
            </a>
          </Link>
          <Link href="https://sleepy-island-99039.herokuapp.com/auth/linkedin">
            <a>
              <img
                src="/images/icon_linkedin.svg"
                alt=""
                className="linkedin img-fluid"
              />
            </a>
          </Link>
          <Link href="https://sleepy-island-99039.herokuapp.com/auth/google">
            <a>
              <img
                src="/images/google.png"
                alt=""
                className="google img-fluid"
              />
            </a>
          </Link>
        </div>
      </Form>
      <div className="mt-5 loginFormFooter">
        <p className="text-center m-0 text-decoration-none">
          Have an Account ?
        </p>
        <p className="text-center">
          <Link href="/Login">
            <a>Login</a>
          </Link>
        </p>
      </div>
      <Modal
        show={show}
        onHide={() => alert("Finish your setup for further move")}
      >
        <div className="p-5">
          <div className="PatientModalTop">
            <p>
              <CheckIcon /> Account Created Successfully
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center modalMsgIcon">
            <div className="d-flex align-items-center position-relative px-3 my-3">
              <p className="number">1</p>
              <h4>
                Check your Email Inbox and Verify your Email for Sobar Daktar
              </h4>
            </div>
            <div className="d-flex align-items-center position-relative px-3 my-3">
              <p className="number">2</p>
              <h4>Now Go to Your Profile and Fill in all the info needed</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="findDocBtn"
              onClick={() => router.push("/Login")}
            >
              Go to Your Profile
            </button>
          </div>
          <div className="modalFooter">
            <p>Email Verification is necessary for using our services.</p>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default PatientRequiredForm;
