import React, { useContext, useState } from "react";
import {
  Card,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";

const DoctorDetails = ({ doc }) => {
  const {
    fullname,
    rating,
    total_consultation,
    bio,
    appointment,
    expertise,
    extra_degree,
    worked_at_previously,
    gender,
    degree,
    current_workplace,
    profile_pic,
  } = doc;
  const {
    day: { Friday, Sunday, Saturday, Monday, Wednesday, Tuesday, Thursday },
  } = appointment;

  console.log(doc);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showMyAppointment, setShowMyAppointment] = useState(false);
  const showMyAppointmentClose = () => setShowMyAppointment(false);
  const showMyAppointmentShow = () => setShowMyAppointment(true);

  const [showSearchFriend, setShowSearchFriend] = useState(false);
  const showSearchFriendClose = () => setShowSearchFriend(false);
  const showSearchFriendShow = () => setShowSearchFriend(true);

  const [showDetails, setShowDetails] = useState(false);
  const showDetailsClose = () => setShowDetails(false);
  const showDetailsShow = () => setShowDetails(true);

  const [appointmentSelectedFor, setAppointmentSelectedFor] = useState("");

  const [doctorStatus, setDoctorStatus] = useState([]);
  console.log(doctorStatus);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardSelect = (id) => {
    setSelectedCard(id);
  };

  const handleApointmentFor = async () => {
    selectedCard === 1 ? showMyAppointmentShow() : showSearchFriendShow();

    try {
      const getStatus = await fetch(
        `${process.env.API_BASE_URL}/patient/get_doctor_available_status?doctor_id=6016c2ccc482746f70be7c7f`
      );
      const data = await getStatus.json();
      setDoctorStatus(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApointmentForFriend = () => {
    showMyAppointmentShow();
  };

  //   console.log(selectedCard);
  return (
    <div className="doctorProfile">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12 d-flex flex-wrap docInfo mb-4">
            <div className="col-md-8 mb-5">
              <div className="d-flex align-items-end mb-3 flex-wrap">
                <img src={profile_pic} alt="docImg" className="img-fluid" />
              </div>
              <h3>{fullname}</h3>
              <p className="docPractice">
                Medical Practitioner since 2009 (11 Years)
              </p>
              <div className="my-4 d-flex flex-wrap">
                {expertise &&
                  expertise.map((item, index) => (
                    <span className="expertise" key={index}>
                      {item}
                    </span>
                  ))}
              </div>
              <p className="my-4">{bio}</p>
              <p className="mb-0">Rating: {rating}</p>
              <p className="mb-0">Total Consultations: {total_consultation}</p>
            </div>
            <div className="col-md-4 docInfoRight">
              <div className="d-flex justify-content-end">
                <button className="findDocBtn mb-4" onClick={handleShow}>
                  Make an Appointment
                </button>
              </div>
              <div className="mb-5 mt-3 pr-4">
                <h5>Consultation Fee: 750 BDT</h5>
                <h5>7 Days Follow-up Fee: 500 BDT</h5>
              </div>
              <div className="pl-4 pr-4">
                <h6>SCHEDULE THIS WEEK</h6>
                <Table borderless>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Sun</td>
                      <td className="text-right pr-0">
                        {!Sunday.off_day
                          ? `${new Date(
                              Sunday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Sunday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Mon</td>
                      <td className="text-right pr-0">
                        {!Monday.off_day
                          ? `${new Date(
                              Monday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Monday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Tue</td>
                      <td className="text-right pr-0">
                        {!Tuesday.off_day
                          ? `${new Date(
                              Tuesday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Tuesday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Wed</td>
                      <td className="text-right pr-0">
                        {!Wednesday.off_day
                          ? `${new Date(
                              Wednesday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Wednesday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Thu</td>
                      <td className="text-right pr-0">
                        {!Thursday.off_day
                          ? `${new Date(
                              Thursday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Thursday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Fri</td>
                      <td className="text-right pr-0">
                        {console.log(!Friday.off_day)}
                        {!Friday.off_day
                          ? `${new Date(
                              Friday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Friday.end_time
                            ).toLocaleTimeString()}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Sat</td>
                      <td className="text-right pr-0">
                        {!Saturday.off_day
                          ? `${new Date(
                              Saturday.start_time
                            ).toLocaleTimeString()}- ${new Date(
                              Saturday.end_time
                            ).toLocaleTimeString()}`
                          : Saturday.off_day}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-4 px-0">
            <h4 className="creditTitle">Doctor's Overview</h4>
            <div className="Credits">
              <div>
                <h5 className="colorHeader">Expertise Field</h5>
                <div className="my-4 d-flex flex-wrap">
                  {expertise &&
                    expertise.map((item, index) => (
                      <span className="expertise" key={index}>
                        {item}
                      </span>
                    ))}
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">
                  Current Workplace / Hospital Affiliation
                </h5>
                <div className="px-3">
                  <h6>{current_workplace && current_workplace.name} </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Education Background</h5>
                {degree &&
                  degree.map((item, index) => (
                    <div className="px-3" key={index}>
                      <h6>{item.institution}</h6>
                      <p>
                        {item.name},{" "}
                        {new Date(item.passing_year).toDateString()}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Achievements</h5>
                {extra_degree.map((item) => (
                  <div className="px-3" key={item._id}>
                    <h6>{item.name}</h6>
                    <p>{item.institution}, YEAR</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Card style={{ padding: "1rem" }}>
              <Card.Body>
                <div className="newApointHead mb-5">
                  <h2>Make a New Appointment</h2>
                  <p>Who is it for?</p>
                </div>
                <div className="col-md-12 selectedCard">
                  <div
                    className={`selected ${
                      selectedCard === 1 ? "selectedFor" : ""
                    }`}
                    onClick={() => handleCardSelect(1)}
                  >
                    <h3>For Myself</h3>
                    <p>Will set the appointment Directly for you.</p>
                  </div>
                  <div
                    className={`selected ${
                      selectedCard === 2 ? "selectedFor" : ""
                    }`}
                    onClick={() => handleCardSelect(2)}
                  >
                    <h3>For a Family / Friend</h3>
                    <p>
                      Search a friend from your friendlist and set an
                      appointment for them.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-end my-5">
                  <div className="col-md-6 d-flex justify-content-between align-items-center">
                    <button className="cancelBtn" onClick={handleClose}>
                      Cancel
                    </button>
                    <button
                      className="findDocBtn"
                      onClick={handleApointmentFor}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Modal>
          <Modal show={showMyAppointment} onHide={showMyAppointmentClose}>
            <Card style={{ padding: "1rem" }}>
              <Card.Body>
                <div className="newApointHead mb-5">
                  <h2>Make a New Appointment</h2>
                  <p>Select a Suitable Date</p>
                </div>
                {doctorStatus.map((item) => (
                  <div className="col-md-12 d-flex justify-content-between align-items-center ApointmentDate">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>{item.day}</h3>
                        <p className="mb-0">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1">
                          {`${new Date(
                            appointment.day[item.day].start_time
                          ).toLocaleTimeString()} - ${new Date(
                            appointment.day[item.day].end_time
                          ).toLocaleTimeString()}`}
                        </p>
                      </div>
                    </div>
                    <div>
                      {item.off_day ? (
                        <button className="cancelBtn mx-4">Off Day</button>
                      ) : (
                        <button
                          className={`${`${
                            item.status && item.status.includes("Available")
                              ? "editProfile"
                              : "friendsApointmentBtn disabled"
                          }`} `}
                        >
                          {item.status}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-md-12 d-flex justify-content-between my-5">
                  <button className="cancelBtn">Previous</button>
                  <button className="findDocBtn">Next</button>
                </div>
              </Card.Body>
            </Card>
          </Modal>
          <Modal show={showSearchFriend} onHide={showSearchFriendClose}>
            <Card style={{ padding: "1rem" }}>
              <Card.Body>
                <div className="newApointHead mb-5">
                  <h2>Make a New Appointment</h2>
                  <p>Search a friend</p>
                </div>
                <div className="col-md-12 my-3">
                  <Form className="mx-auto friendSearch">
                    <InputGroup>
                      <FormControl
                        placeholder="Search a Friend"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                      />
                      <InputGroup.Append>
                        <button className="searchFriends">Search</button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form>
                </div>

                <div className="col-md-12 d-flex flex-wrap friendsCard">
                  <div className="pr-3 d-flex justify-content-center align-items-center">
                    <img
                      src="/images/doc.png"
                      alt="userImg"
                      className="img-fluid friendsImg"
                    />
                  </div>
                  <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap ">
                      <div>
                        <h3 className="mb-0">Mr. Friend Here</h3>
                        <p>Male</p>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <MoreHorizIcon />
                        {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                      </div>
                    </div>
                    <div className="">
                      <button className="friendsApointmentBtn">
                        Appointments for Friends
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 d-flex flex-wrap friendsCard">
                  <div className="pr-3 d-flex justify-content-center align-items-center">
                    <img
                      src="/images/doc.png"
                      alt="userImg"
                      className="img-fluid friendsImg"
                    />
                  </div>
                  <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap ">
                      <div>
                        <h3 className="mb-0">Mr. Friend Here</h3>
                        <p>Male</p>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <MoreHorizIcon />
                        {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                      </div>
                    </div>
                    <div className="">
                      <button className="friendsApointmentBtn">
                        Appointments for Friends
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-between my-5">
                  <button className="cancelBtn">Previous</button>
                  <button className="findDocBtn" onClick={showDetailsShow}>
                    Next
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Modal>
          <Modal show={showDetails} onHide={showDetailsClose}>
            <Card style={{ padding: "1rem" }}>
              <Card.Body>
                <div className="newApointHead mb-5">
                  <h2>Make a New Appointment</h2>
                  <p>Fill in your details</p>
                </div>
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <div className="col-md-6 px-0">
                    <Form.Group className="basicFormInput">
                      <Form.Label>Age (Years)</Form.Label>
                      <Form.Control type="number" placeholder="" required />
                    </Form.Group>

                    <Form.Group className="basicFormInput">
                      <Form.Label>Weight (Kg)</Form.Label>
                      <Form.Control type="number" placeholder="" required />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-12">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Detailed Health Problem</Form.Label>
                    <Form.Control
                      as="textarea"
                      // defaultValue={`I am interested to inquire about your property in Dreamfinder: ID-${ref_code}. Please contact me according to your convenience
                      //           `}
                      placeholder=""
                      rows={3}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <Form.Group className="w-100">
                    <Form.Label>File Upload</Form.Label>
                    <button type="button" className="removeBtn2 py-3 ">
                      <div>
                        <p>Filename.pdf</p>
                        <h6>Test Report</h6>
                      </div>
                      <CloseIcon />
                    </button>
                    <button type="button" className="removeBtn2 py-3 ">
                      <div>
                        <p>Filename.pdf</p>
                        <h6>Prescription</h6>
                      </div>
                      <CloseIcon />
                    </button>
                  </Form.Group>
                </div>
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <div className="col-md-6 pl-0">
                    <Form.Group controlId="formBasicMobile">
                      <Form.Label>Select File Type</Form.Label>
                      <Dropdown className="d-flex flex-column justify-content-center Gender">
                        <Dropdown.Toggle id="GenderDropdown">
                          NONE
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>NONE</Dropdown.Item>
                          <Dropdown.Item>Prescription</Dropdown.Item>
                          <Dropdown.Item>Report</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 pr-0">
                    <div>
                      <Form.Group>
                        <Form.Label>Upload Related Documents</Form.Label>
                        <input type="file" id="file" className="file" />
                        <label htmlFor="file" className="cvLabel">
                          <p className="mb-0">Upload</p> <PublishIcon />
                        </label>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-between my-5">
                  <button className="cancelBtn">Previous</button>
                  <button className="findDocBtn">Next</button>
                </div>
              </Card.Body>
            </Card>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.API_BASE_URL}/patient/get_doctor_by_id?doctor_id=${params.id}`
  );
  const doc = await res.json();
  // console.log(doc);
  // Pass doc to the page via props
  return { props: { doc } };
}
