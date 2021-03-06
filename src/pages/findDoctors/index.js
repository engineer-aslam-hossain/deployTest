import {
  Card,
  CardDeck,
  Form,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const FindDoctors = ({ doctors }) => {
  const [docFilterInfo, setFilterInfo] = useState({});
  const [findedDoc, SetFindedDoc] = useState([...doctors]);
  console.log(findedDoc);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const queryString = `${
      docFilterInfo.name ? `name=${docFilterInfo.name}&` : ""
    }${docFilterInfo.location ? `location=${docFilterInfo.location}&` : ""}${
      docFilterInfo.min_fee ? `min_fee=${docFilterInfo.min_fee}&` : ""
    }${docFilterInfo.max_fee ? `max_fee=${docFilterInfo.max_fee}` : ""}`;
    // console.log(queryString);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/search_doctor?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      SetFindedDoc(data);
      // console.log(data);
      if ((data.success = "yes")) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Something went wrong!",
        // });
      }
      if ((data.success = "no")) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Something went wrong!",
        // });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const searchBySymtoms = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/search_doctor?symptoms=${docFilterInfo.symptoms}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      // console.log(data);
      SetFindedDoc(data);
      if ((data.success = "yes")) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Something went wrong!",
        // });
      }
      if ((data.success = "no")) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Something went wrong!",
        // });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 findDocBanner  d-flex align-items-center">
            <div className="col-md-6  d-flex align-items-center">
              <h1 className="findDocBannerText">
                Important Text or Catch Phrase
              </h1>
            </div>
          </div>
          <div className="col-md-12 d-flex">
            <div className="col-md-3">
              <Form noValidate onSubmit={submitHandler}>
                <div className="my-3 mb-4">
                  <h4 className="searchTitle">Search Filters</h4>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Doctor’s Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Doctor’s Name"
                    onChange={(e) =>
                      setFilterInfo({
                        ...docFilterInfo,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFilterInfo({
                        ...docFilterInfo,
                        location: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Location"
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Minimum Fee</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFilterInfo({
                        ...docFilterInfo,
                        min_fee: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="Minimum Fee"
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Maximum Fee</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFilterInfo({
                        ...docFilterInfo,
                        max_fee: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="Maximum Fee"
                    required
                  />
                </Form.Group>
                <div className="d-flex flex-column align-items-center mt-5">
                  <button type="submit" className="findDocBtn mb-4">
                    Apply Filters
                  </button>
                  <button type="button" className="ResetBtn">
                    Reset Filters
                  </button>
                </div>
              </Form>
            </div>
            <div className="col-md-9">
              <div className="col-md-12 mb-4">
                <h2>Find Doctor</h2>
              </div>
              <div className="col-md-12 my-3">
                <Form
                  className="mx-auto symtomSearch"
                  noValidate
                  onSubmit={searchBySymtoms}
                >
                  <h6>
                    Not sure? Search your Health complications to find the
                    doctor for you
                  </h6>
                  <InputGroup className="searchInputGroup">
                    <FormControl
                      placeholder="Type in your Health issues"
                      aria-label="Search input"
                      aria-describedby="basic-addon2"
                      className="searchInput"
                      onChange={(e) =>
                        setFilterInfo({
                          ...docFilterInfo,
                          symptoms: e.target.value,
                        })
                      }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text
                        id="basic-addon2"
                        onClick={searchBySymtoms}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </div>
              <div className="col-md-12">
                <CardDeck>
                  {findedDoc.map((doc) => (
                    <Link href={`/findDoctors/${[doc._id]}`} key={doc._id}>
                      <div className="col-lg-4 my-3">
                        <Card className="h-100">
                          <Card.Body>
                            <div className="docCardTop d-flex justify-content-between align-items-center mb-2">
                              <h5>750 BDT</h5>
                              <p>4.6/5.0 (348)</p>
                            </div>
                            <div>
                              <img
                                src={doc.profile_pic}
                                alt="docImg"
                                className="img-fluid"
                              />
                            </div>
                            <div className="docCardFooter mt-3">
                              <h5>{doc.fullname} </h5>
                              {doc.expertise &&
                                doc.expertise.slice(0, 1).map((item, index) => (
                                  <p className="mb-1" key={index}>
                                    {item}
                                  </p>
                                ))}

                              <h6>Available This Week</h6>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Link>
                  ))}
                </CardDeck>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindDoctors;

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${process.env.API_BASE_URL}/patient/search_doctor?`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const doctors = await res.json();
  console.log(doctors);
  // Pass doctors data to the page via props
  return { props: { doctors } };
}
