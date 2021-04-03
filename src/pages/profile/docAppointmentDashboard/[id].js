import React, { useState } from "react";
import { Card, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
const StartAppointment = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 d-flex justify-content-between align-items-center">
            <h1 className="dashboardTitle">Appointment</h1>
          </div>
          <div
            className={`col-lg-12 serialCard p-4 d-flex flex-column justify-content-between my-3 mx-auto`}
            // key={item._id}
            // onClick={() => setAppointmentDetailsShow(item._id)}
          >
            <div className="d-flex justify-content-between mb-3">
              <div className="serialNo">
                <h6>
                  Serial:
                  {/* {item.serial} */}
                </h6>
                <h4>Name of Patient</h4>
                <p>32 y/o, 60 Kg, Female</p>
              </div>
              <div>
                <button
                  className="callNowBtn"
                  //   onClick={() => callToClient(item)}
                >
                  Start Appointment
                </button>
              </div>
            </div>
            <div
            //   className={`mb-3 serialDetails ${
            //     appointmentDetailsShow === item._id ? "detailsShow" : ""
            //   }`}
            >
              <div className="mb-4 ">
                <h6>Health Complications:</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  pellentesque mauris risus, at egestas nibh condimentum ut.
                  Integer et metus sit amet est gravida rutrum sit amet vitae
                  augue. Nulla non enim sagittis ex suscipit posuere. Phasellus
                  gravida enim non molestie mattis. Duis eget dui in augue
                  viverra rutrum. Nunc sodales pretium consectetur. Sed non
                  porttitor orci. Morbi dapibus sollicitudin mi in volutpat.
                  Suspendisse ac lacus molestie, lacinia odio eget
                </p>
              </div>
              <div>
                <button className="seeUploadBtn">See Uploaded Files</button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <p className="apointmentType">New Appointment</p>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h6 className="apointmentDay">Sunday, 07.03.2021</h6>
                <p>Estimated Time: 10:00am - 02:00pm</p>
              </div>
            </div>
          </div>
          <div className="col-lg-12 prescriptionCard p-4">
            <div className="d-flex justify-content-between mb-3">
              <div className="">
                <h5>Prescription Creation</h5>
              </div>
              <div>
                <button
                  className="callNowBtn"
                  //   onClick={() => callToClient(item)}
                >
                  Save Progress
                </button>
              </div>
            </div>
            <div>
              <div>
                <h5 className="prescriptionLabel">Rx: Medicine</h5>
                <p>No medicine added yet</p>
              </div>

              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Medicine Name </p>
                  <p>Dosage, Direction, Duration </p>
                  <p>Additional Comments on the drug</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Medicine Name </p>
                  <p>Dosage, Direction, Duration </p>
                  <p>Additional Comments on the drug</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <button className="addBtn" onClick={handleShow}>
                <AddIcon /> Add Drug
              </button>
              <p>
                <small>
                  Every new advice will be added as an item in a list in the
                  prescription
                </small>
              </p>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">Dx: Condition / Disease</h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Disease name here, this is an editable text box</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write Disease name here.."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add Disease
                  </button>
                  <p>
                    <small>
                      Every new disease will be added as an item in a list in
                      the prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">
                  Rx: Direction / Advice / Recommendation
                </h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>
                    Some advice here Lorem Ipsum Repellendus neque vel omnis
                    possimus molestiae et. Blanditiis ut vitae fugiat molestiae
                    sed voluptatem voluptatem nihil. Sunt sit enim maiores
                    ipsum.
                  </p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>
                    Some advice here Lorem Ipsum Repellendus neque vel omnis
                    possimus molestiae et. Blanditiis ut vitae fugiat molestiae
                    sed voluptatem voluptatem nihil. Sunt sit enim maiores
                    ipsum.
                  </p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write Advice here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add New Advice
                  </button>
                  <p>
                    <small>
                      Every new advice will be added as an item in a list in the
                      prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">CC: Symptoms</h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>
                    Some symptom here Lorem Ipsum Repellendus neque vel omnis
                    possimus molestiae et. Blanditiis ut vitae fugiat molestiae
                    sed voluptatem voluptatem nihil. Sunt sit enim maiores
                    ipsum.
                  </p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>
                    Some symptom here Lorem Ipsum Repellendus neque vel omnis
                    possimus molestiae et. Blanditiis ut vitae fugiat molestiae
                    sed voluptatem voluptatem nihil. Sunt sit enim maiores
                    ipsum.
                  </p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write a symptom here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add New Symptom
                  </button>
                  <p>
                    <small>
                      Every new symptom will be added as an item in a list in
                      the prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">O/E: On Examination</h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Test Name Here</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Test Name Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add Examination
                  </button>
                  <p>
                    <small>
                      Each new examination will be added as an item in a list in
                      the prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">O/E: On Investigation</h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Test Name Here</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Test Name Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add Investigation
                  </button>
                  <p>
                    <small>
                      Every new investigation will be added as an item in a list
                      in the prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <h5 className="prescriptionLabel">Further Tests</h5>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="medicine w-100 p-2">
                  <p>Test Name Here</p>
                </div>
                <div className="closeIcon p-2">
                  <CloseIcon />
                </div>
              </div>
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write test name here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    // onChange={(e) =>
                    //   setSearchData({
                    //     ...searchData,
                    //     key: e.target.value,
                    //   })
                    // }
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    // onClick={() => searchFriends(searchData)}
                  >
                    <AddIcon /> Add Test
                  </button>
                  <p>
                    <small>
                      Every new test will be added as an item in a list in the
                      prescription
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Card style={{ padding: "1rem" }} className="addDrugCard">
              <Card.Body>
                {" "}
                <div>
                  <h3>Add Medication</h3>
                </div>
                <div className="mb-4">
                  <Form.Group controlId="formBasicEmail">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Medicine Name</h6>
                      <p>Suggest a Medicine</p>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Write medicine name here..."
                    />
                  </Form.Group>
                </div>
                <div className="mb-4">
                  <Form.Group controlId="formBasicEmail">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Dosage</h6>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Choose a dosage format"
                    />
                    <div className="d-flex  my-2">
                      <Form.Check
                        type="radio"
                        label="Hourly"
                        name="formHorizontalRadios"
                        id="1"
                      />
                      <Form.Check
                        type="radio"
                        label="1/0 Format"
                        name="foadios"
                        id="2"
                      />
                      <Form.Check
                        type="radio"
                        label="Presets"
                        name="formHtalRadios"
                        id="3"
                      />
                      <Form.Check
                        type="radio"
                        label="Custom"
                        name="formHorizontas"
                        id="4"
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="mb-4">
                  <Form.Group controlId="formBasicEmail">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Duration</h6>
                    </div>
                    <Form.Control type="text" placeholder="Select days" />
                    <div className="d-flex  my-2">
                      <Form.Check
                        type="radio"
                        label="Days"
                        name="formHorizontalRadios"
                        id="5"
                      />
                      <Form.Check
                        type="radio"
                        label="Months"
                        name="foadios"
                        id="6"
                      />
                      <Form.Check
                        type="radio"
                        label="Years"
                        name="formHtalRadios"
                        id="7"
                      />
                      <Form.Check
                        type="radio"
                        label="Continue till next notice"
                        name="formHorizontas"
                        id="8"
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="mb-4">
                  <Form.Group controlId="formBasicEmail">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Direction</h6>
                    </div>
                    <Form.Control type="text" placeholder="" />
                    <div className="d-flex  my-2">
                      <Form.Check
                        type="radio"
                        label="Before Meal"
                        name="formHorizontalRadios"
                        id="9"
                      />
                      <Form.Check
                        type="radio"
                        label="After Meal"
                        name="foadios"
                        id="10"
                      />
                      <Form.Check
                        type="radio"
                        label="Before Bed"
                        name="formHtalRadios"
                        id="11"
                      />
                      <Form.Check
                        type="radio"
                        label="After Waking Up"
                        name="formHorizontas"
                        id="12"
                      />
                      <Form.Check
                        type="radio"
                        label="Custom"
                        name="formHorizontas"
                        id="13"
                      />
                    </div>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group controlId="formBasicEmail">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Additional Comments on this drug</h6>
                    </div>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </div>
                <div className="col-md-12 d-flex justify-content-end my-5">
                  <div className="col-md-6 d-flex justify-content-between align-items-center">
                    <button className="cancelBtn">Close</button>
                    <button className="findDocBtn">Add Drug</button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default StartAppointment;

// export async function getServerSideProps({ params }) {
//   // Fetch data from external API
//   const res = await fetch(
//     `${process.env.API_BASE_URL}/patient/appointment_by_id?doctor_id=${params.id}`
//   );
//   const doc = await res.json();
//   // console.log(doc);
//   // Pass doc to the page via props
//   return { props: { doc } };
// }
