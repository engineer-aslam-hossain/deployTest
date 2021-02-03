import { Form, FormControl, InputGroup, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
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
        <Form inline className="mx-auto">
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
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-end align-items-center ">
            <Form.Group controlId="exampleForm.ControlSelect1" className="mb-0">
              <Form.Control as="select" className="selectLang">
                <option>বাংলা</option>
                <option>English</option>
              </Form.Control>
            </Form.Group>

            <Link href="/doctor">
              <a className="text-decoration-none">Find Doctor</a>
            </Link>
            <Link href="/Login">
              <a className={`text-decoration-none ${isActive("/Login")}`}>
                Login
              </a>
            </Link>
            <Link href="/sign-up">
              <a
                className={`text-decoration-none LoginBtn mr-0 ${isActive(
                  "/Login"
                )}`}
              >
                Sign Up
              </a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
