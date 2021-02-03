import { Card, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "cookie";
import Cookies from "js-cookie";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useEffect } from "react";

const LoginForm = ({ inputChange, values, data, cookies }) => {
  const router = useRouter();
  console.log(cookies);
  const test = () => {
    console.log("clicked");
    Cookies.set("sobar_daktar_session", "hello");
  };
  const test2 = () => {
    const getc = Cookies.get("sobar_daktar_session");
    console.log(getc);
  };

  useEffect(() => {
    const getc = Cookies.get("sobar_daktar_session");
    console.log(getc);
  }, []);

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
    console.log(res);
    const data = await res.json();
    if (data.success === "yes") {
      Cookies.set(
        "sobar_daktar",
        Cookies.get("sobar_daktar_session", {
          domain: "https://sleepy-island-99039.herokuapp.com/auth/user_signin",
        }),
        {
          expires: 30,
        }
      );
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
      <Form noValidate onSubmit={submitHandler}>
        <div>
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
          <p className="text-secondary" onClick={test}>
            Or Sign Up with...
          </p>
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
        <p className="text-center m-0 text-decoration-none" onClick={test2}>
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

// export function parseCookies(req) {
//   return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
// }

// LoginForm.getInitialProps = async ({ req }) => {
//   const data = parseCookies(req);

//   if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" });
//       res.end();
//     }
//   }

//   console.log(data);

//   return {
//     data: data,
//   };
// };
// export async function getServerSideProps(ctx) {
//   // Parse
//   const cookies = nookies.get(ctx);

//   // Set
//   nookies.set(ctx, "fromGetInitialProps", "value", {
//     maxAge: 30 * 24 * 60 * 60,
//     path: "/",
//   });

//   // Destroy
//   // nookies.destroy(ctx, 'cookieName')

//   return { cookies };
// }
