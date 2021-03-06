import { Card, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const RequiredForm = ({ nextStep, inputChange, values, setDoctorInfo }) => {
  const bankProvider = ["NAGAD", "BKASH", "ROCKET"];
  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    !values.mobile_banking_provider &&
      setDoctorInfo({ ...values, mobile_banking_provider: "NAGAD" });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/doctor_signup`,
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
      // console.log(data);
      data.success &&
        data.success == "yes" &&
        setDoctorInfo({ ...values, success: data.success });
      data.success && data.success === "yes" && handleShow();
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.msg,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };

  return (
    <Card style={{ padding: "2rem 2rem" }} className="signUpCard mx-auto">
      <Form noValidate onSubmit={submitHandler}>
        <div>
          <h3 className="formTitle text-center">Signup</h3>
          <p className="text-center">( as Doctor )</p>
        </div>

        <Form.Group className="basicFormInput">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Full Name"
            name="fullname"
            onChange={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="name">
            {!values.fullname
              ? "FullName must be have atleast 6 character"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            name="email"
            onChange={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="email">
            {!values.email ? "Please provide an valid email" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your phone no."
            name="phone_number"
            onChange={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="phone_number">
            {!values.phone_number ? "Must have atleast 11 number" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>BMDC Reg No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your BMDC No."
            name="bmdc_reg"
            onChange={inputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicMobile">
          <Form.Label>Mobile Bank Info.</Form.Label>
          <div className="d-flex align-items-center">
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Enter your phone no."
                name="mobile_banking_number"
                onChange={inputChange}
                required
              />
              <InputGroup.Append>
                <Dropdown className="d-flex flex-column justify-content-center">
                  <Dropdown.Toggle id="Mobile-Bank-Dropdown">
                    {values.mobile_banking_provider
                      ? values.mobile_banking_provider
                      : "NAGAD"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {bankProvider.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onSelect={() =>
                          setDoctorInfo({
                            ...values,
                            mobile_banking_provider: item,
                          })
                        }
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </InputGroup.Append>
              <Form.Control.Feedback
                type="invalid"
                className="mobile_banking_number"
              >
                {!values.mobile_banking_number
                  ? "Must have atleast 11 number"
                  : ""}
              </Form.Control.Feedback>
            </InputGroup>
          </div>
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
            {!values.password
              ? "Must have minimum 6 character with number"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={inputChange}
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
        onHide={() => alert("You must continue account setup")}
      >
        <div className="p-5">
          <div className="modalTop">
            <p>
              <ErrorOutlineIcon /> Email Verification Required
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
              id="pulse"
              className="findDocBtn"
              onClick={() => router.push("/Login")}
            >
              Go to Profile Now
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

export default RequiredForm;

// export function parseCookies(req) {
//   return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
// }

// RequiredForm.getInitialProps = async ({ req }) => {
//   const data = parseCookies(req);

//   // if (res) {
//   //   if (Object.keys(data).length === 0 && data.constructor === Object) {
//   //     res.writeHead(301, { Location: "/" });
//   //     res.end();
//   //   }
//   // }

//   data.sobar_daktar_session;

//   return {
//     data: data.sobar_daktar_session,
//   };
// };
