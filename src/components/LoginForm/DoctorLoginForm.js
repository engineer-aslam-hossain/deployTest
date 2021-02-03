import { Card, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const DoctorLoginForm = ({ inputChange, values }) => {
  const router = useRouter();

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
    data.success && data.success == "yes" && router.push("/");
    console.log(data);
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
            onBlur={inputChange}
            required
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
        </Form.Group>

        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="sign-up-btn">
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

export default DoctorLoginForm;
