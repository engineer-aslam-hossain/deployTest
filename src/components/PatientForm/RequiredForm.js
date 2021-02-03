import { Card, Dropdown, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
const PatientRequiredForm = ({
  nextStep,
  inputChange,
  values,
  setDoctorInfo,
}) => {
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
    data.success && data.success == "yes" && nextStep();

    console.log(data);
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
              ? "name must be start with atleast 3 character"
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
            {!values.email ? "please provide an valid email" : ""}
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
              ? "must have minimum 6 character with number"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="sign-up-btn">
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
          <Link href="/">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default PatientRequiredForm;
