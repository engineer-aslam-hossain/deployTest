import { Alert, Card, Form, Overlay } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import DaktarContext from "../Context/Context";
import Swal from "sweetalert2";

const DoctorLoginForm = ({ inputChange, values, show, target }) => {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
  // console.log(loggedInUser);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
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

      if (data.sobar_daktar_session) {
        localStorage.setItem(
          "loginToken",
          JSON.stringify(data.sobar_daktar_session)
        );
        try {
          const getToken = JSON.parse(localStorage.getItem("loginToken"));
          // console.log(values, getToken);
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            method: "GET",
            headers: {
              sobar_daktar_session: getToken,
            },
            mode: "cors",
          });
          const data = await res.json();
          setLoggedInUser(data);
          if (data.fullname) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      } else if ((data.success = "no")) {
        Swal.fire({
          icon: "error",
          title: "Password or Email doesn't match",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
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
        <div>
          <h3 className="formTitle text-center">Login</h3>
          <p className="text-center">( as Doctor )</p>
        </div>
        <Form.Group className="basicFormInput">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address or phone"
            name="email"
            onChange={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="email">
            {!values.email ? "please provide an valid email" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputChange}
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
        </div>
      </Form>
      <div className="mt-5 loginFormFooter">
        <p className="text-center m-0 text-decoration-none">
          don't have an account ?
        </p>
        <p className="text-center">
          <Link href="/sign-up">
            <a>Create Account</a>
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default DoctorLoginForm;
