import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import cookie from "cookie";

const HomepageAdd = ({ data }) => {
  console.log(data);
  return (
    <section className="homepage-add">
      <div className="container">
        <div className="row">
          <div className="col-md-4 imgDiv">
            <img src="/images/app.svg" alt="" className="img-fluid" />
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
            <h3 className="addPageTitle">
              Download The Sobar Daktar App Today!
            </h3>
            <div className="store">
              <a
                href="#"
                target="_blank"
                className="d-flex justify-content-end  flexImg"
              >
                <img
                  src="/images/icon_appstore.png"
                  alt="#"
                  className="img-fluid"
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src="/images/icon_playstore.png"
                  alt="#"
                  className="img-fluid"
                />
              </a>
            </div>
            <p className="my-3 font-weight-bold text-center">
              Send a Download Link to your phone?
            </p>
            <Form>
              <InputGroup className="searchInputGroup">
                <FormControl
                  placeholder="Send Phone Number"
                  aria-label="Search input"
                  aria-describedby="basic-addon2"
                  className="searchInput"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageAdd;

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

HomepageAdd.getServerSideProps = async ({ req }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  console.log(data);

  return {
    data: data,
  };
};
