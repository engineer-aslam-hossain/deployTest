import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import fb from "../../images/icon_fb.svg";
import linkedin from "../../images/icon_linkedin.svg";
import google from "../../images/google.png";
import "./LoginForm.css";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  console.log(loginInfo);
  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const res = await fetch(
      "https://sleepy-island-99039.herokuapp.com/auth/user_signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }
    );
    const data = await res.json();
    if (data.success === "yes") {
      Cookies.set("sobar_daktar_session", Cookies.get("sobar_daktar_session"), {
        expires: 30,
      });
    }
    console.log(data);
    // data.success && data.success == "yes" && router.push("/");
    console.log(data.success);
    // setDoctorInfo({ ...values, success: data.success });
  };

  return (
    <Card
      style={{
        borderRadius: "16px",
        padding: "2rem 2rem",
        backgroundColor: "#FFF5F5",
      }}
    >
      <Form onSubmit={submitHandler}>
        <h3 className="mb-5">Login</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email/Phone</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address or phone"
            onBlur={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onBlur={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </Form.Group>

        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="sign-up-btn">
            Login
          </button>
          <Link to="/" className="forgetPass">
            forget password ?
          </Link>
          <p className="text-secondary">Or Sign Up with...</p>
        </div>
        <div className="d-flex justify-content-around">
          <button className="facebook img-fluid">
            <img src={fb} alt="" />
          </button>
          <button className="linkedin img-fluid">
            <img src={linkedin} alt="" />
          </button>
          <button className="google img-fluid">
            <img src={google} alt="" />
          </button>
        </div>
      </Form>
      <div className="mt-5 loginFormFooter">
        <p className="text-center m-0 text-decoration-none">
          don't have an account ?
        </p>
        <p className="text-center">
          <Link to="/">Create Account</Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
