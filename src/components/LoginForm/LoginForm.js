import { Alert, Card, Form, Overlay } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import DaktarContext from "../Context/Context";

const LoginForm = ({ inputChange, values, show, target }) => {
  const router = useRouter();
  // console.log(router);
  const { setLoggedInUser } = useContext(DaktarContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user_signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();
    if (data.sobar_daktar_session) {
      localStorage.setItem(
        "loginToken",
        JSON.stringify(data.sobar_daktar_session)
      );
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
          method: "GET",
          headers: { sobar_daktar_session: getToken },
          mode: "cors",
        });
        const data = await res.json();
        // console.log(data);
        setLoggedInUser(data);
        if (data.fullname) {
          router.push("/profile");
        }
      } catch (err) {
        console.log(err);
      }
    } else if ((data.success = "no")) {
      setLoggedInUser(data);
    }
  };

  return (
    <Card
      style={{
        borderRadius: "16px",
        padding: "2rem 2rem",
        backgroundColor: "#FFF5F5",
      }}
    >
      <Form noValidate onSubmit={submitHandler}>
        <div ref={target}>
          <Overlay target={target.current} show={show} placement="top">
            {({
              placement,
              scheduleUpdate,
              arrowProps,
              outOfBoundaries,
              show,
              ...props
            }) => (
              <Alert variant="danger" {...props}>
                Email or Password Doesn't match
              </Alert>
            )}
          </Overlay>
          <h3 className="formTitle text-center">Login</h3>
          <p className="text-center">( as Patient )</p>
        </div>
        <Form.Group className="basicFormInput">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address or phone"
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
            {values.password.length < 6
              ? "must have minimum 6 character with number"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="findDocBtn">
            Login
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
          don't have an account ?
        </p>
        <p className="text-center">
          <Link href="/">
            <a>Create Account</a>
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
