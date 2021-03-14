import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DaktarContext from "../Context/Context";

const Header = () => {
  const { loggedInUser } = useContext(DaktarContext);

  const router = useRouter();
  const isActive = (route) => {
    if (route == router.pathname) {
      return "active";
    } else "";
  };
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const languageChange = async (e) => {
    const language = {
      language: e.target.value,
    };
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/change_language_gender`,
      {
        method: "PUT",
        headers: { sobar_daktar_session: getToken },
        mode: "cors",
        body: JSON.stringify(language),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <header>
      <Navbar className="navbar" expand="lg">
        <div className="logoContainer">
          <Link href="/" className="logo ">
            <a className="ml-3">
              {windowWidth < 768 ? (
                <img
                  src="/images/SobarDaktar_Logo_Mobile.png"
                  alt=""
                  className="logoImg2 "
                />
              ) : (
                <img
                  src="/images/SobarDaktar_Logo_Desktop.png"
                  alt=""
                  className="logoImg "
                />
              )}
            </a>
          </Link>
        </div>
        {/* <Form inline className="mx-auto">
          <InputGroup className="searchInputGroup">
            <FormControl
              placeholder="Search...."
              aria-label="Search input"
              aria-describedby="basic-addon2"
              className="searchInput"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-end align-items-center ml-auto">
            <Form.Group controlId="exampleForm.ControlSelect1" className="mb-0">
              <Form.Control
                as="select"
                className="selectLang"
                onChange={languageChange}
              >
                <option value="Bangla">বাংলা</option>
                <option value="English">English</option>
              </Form.Control>
            </Form.Group>

            <Link href="/findDoctors">
              <a className="text-decoration-none">Find Doctor</a>
            </Link>
            {loggedInUser.user_type ? (
              <button className="headerBtn">
                <NotificationsNoneIcon />
              </button>
            ) : (
              <Link href="/Login">
                <a className={`text-decoration-none ${isActive("/Login")}`}>
                  Login
                </a>
              </Link>
            )}
            {loggedInUser.user_type ? (
              <button
                className="headerBtn"
                onClick={() => router.push("/profile")}
              >
                <AccountCircleIcon />
              </button>
            ) : (
              <Link href="/sign-up">
                <a
                  className={`text-decoration-none LoginBtn mr-0 ${isActive(
                    "/Login"
                  )}`}
                >
                  Sign Up
                </a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
