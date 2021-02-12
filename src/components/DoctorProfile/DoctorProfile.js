import React, { useContext, useState } from "react";
import {
  Card,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import WarningIcon from "@material-ui/icons/Warning";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DaktarContext from "../Context/Context";
import CloseIcon from "@material-ui/icons/Close";
import Select from "react-select";

const DoctorProfile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
  const [saveChanges, setSaveChanges] = useState({});
  const [completed, setCompleted] = useState(true);
  const [show, setShow] = useState(false);
  const [changePassShow, setchangePassShow] = useState(false);
  const [deleteMailShow, setdeleteMailShow] = useState(false);
  const [addMailShow, setAddMailShow] = useState(false);
  const [achievementShow, setAchievementShow] = useState(false);
  const [overviewShow, setOverviewShow] = useState(false);
  const [educationShow, setEducationShow] = useState(false);
  const [workPlaceShow, setWorkPlaceShow] = useState(false);
  const [workPlace, setWorkPlace] = useState("");
  const genders = ["Male", "Female", "Others"];
  const bankProvider = ["NAGAD", "BKASH", "ROCKET", "NONE"];
  const [editInfo, setEditInfo] = useState({});
  const [editEmail, setEditEmail] = useState({});
  const [gender, setGender] = useState("");
  const [deleteEmail, setDeleteEmail] = useState({});
  const [changePass, setChangePass] = useState({});
  const [addNewWorkPlace, setAddNewWorkPlace] = useState({});
  const [addCurrentWorkPlace, setAddCurrentWorkPlace] = useState({});
  const [addNewEducation, setAddNewEducation] = useState({});
  const [addNewAchievements, setAddNewAchievements] = useState({});
  const [expertiseField, SetExpertiseField] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changePasshandleClose = () => setchangePassShow(false);
  const changePasshandleShow = () => setchangePassShow(true);
  const deleteMailhandleClose = () => setdeleteMailShow(false);
  const deleteMailhandleShow = () => setdeleteMailShow(true);
  const addMailhandleClose = () => setAddMailShow(false);
  const addMailhandleShow = () => setAddMailShow(true);
  const achievementhandleClose = () => setAchievementShow(false);
  const achievementhandleShow = () => setAchievementShow(true);
  const overviewHandleClose = () => setOverviewShow(false);
  const overviewHandleShow = () => setOverviewShow(true);
  const educationHandleClose = () => setEducationShow(false);
  const educationHandleShow = () => setEducationShow(true);
  const workPlaceHandleClose = () => setWorkPlaceShow(false);
  const workPlaceHandleShow = () => setWorkPlaceShow(true);

  const fakeOptions = [
    { value: "ExpertiseField", label: "ExpertiseField" },
    { value: "ExpertiseField1", label: "ExpertiseField1" },
    { value: "ExpertiseField2", label: "ExpertiseField2" },
    { value: "ExpertiseField3", label: "ExpertiseField3" },
    { value: "ExpertiseField3", label: "ExpertiseField3" },
    { value: "ExpertiseField4", label: "ExpertiseField4" },
    { value: "ExpertiseField5", label: "ExpertiseField5" },
    { value: "ExpertiseField6", label: "ExpertiseField6" },
    { value: "ExpertiseField7", label: "ExpertiseField7" },
    { value: "ExpertiseField8", label: "ExpertiseField8" },
    { value: "ExpertiseField9", label: "ExpertiseField9" },
    { value: "ExpertiseField10", label: "ExpertiseField10" },
  ];

  const passwordToSave = (e) => {
    setEditInfo({
      ...editInfo,
      password: e.target.value,
    });
    setEditEmail({
      ...editEmail,
      password: e.target.value,
    });
  };

  console.log(editEmail);

  const overViewSubmitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_bio_address_practiceSince`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInfo),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector("p.text-success.notification.text-center.overviewP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.overviewP")
        .style.setProperty("display", "block");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/change_personal_info`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInfo),
      }
    );
    const data = await res.json();
    if (data.success === "yes") {
      setSaveChanges(data);

      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();

        setLoggedInUser(userData);
        document
          .querySelector("p.text-success.notification.text-center.docEditP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.docEditP")
        .style.setProperty("display", "block");
    }

    if (gender) {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/change_language_gender`,
        {
          method: "PUT",
          headers: {
            sobar_daktar_session: getToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender: gender,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    }
    setGender("");
    setEditInfo({});
  };
  console.log(gender, editInfo);
  const addEmailHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/add_email`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: editEmail.password,
          email: editEmail.email,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      setSaveChanges(data);
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        document
          .querySelector("p.text-success.notification.text-center.addEmailP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.addEmailP")
        .style.setProperty("display", "block");
    }
  };

  const deleteEmailHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/delete_email`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deleteEmail.password,
          email: deleteEmail.email,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector("p.text-success.notification.text-center.deleteEmailP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.deleteEmailP")
        .style.setProperty("display", "block");
    }
  };

  const addEducationHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_bio_address_practiceSince`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          degree: [
            {
              name: addNewEducation.name,
              institution: addNewEducation.institution,
              passing_year: addNewEducation.passing_year,
              completed: completed,
            },
          ],
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector("p.text-success.notification.text-center.educationP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.educationP")
        .style.setProperty("display", "block");
    }
  };

  const achievementsHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_bio_address_practiceSince`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extra_degree: [addNewAchievements],
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector("p.text-success.notification.text-center.achievementP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.achievementP")
        .style.setProperty("display", "block");
    }
  };

  const previousWorkPlaceHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_bio_address_practiceSince`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          worked_at_previously: [addNewWorkPlace],
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector(
            "p.text-success.notification.text-center.previousWorkP"
          )
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.previousWorkP")
        .style.setProperty("display", "block");
    }
  };

  const currentWorkPlaceHandler = async (e) => {
    console.log(...loggedInUser.worked_at_previously);
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_bio_address_practiceSince`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_workplace: addCurrentWorkPlace,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        // console.log(data);
        setLoggedInUser(userData);
        setSaveChanges(data);
        document
          .querySelector("p.text-success.notification.text-center.currentWorkP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.currentWorkP")
        .style.setProperty("display", "block");
    }
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    e.target.reset();
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/change_personal_info`,
      {
        method: "PUT",
        headers: {
          sobar_daktar_session: getToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: editInfo.password,
          new_password: changePass.new_password,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      setSaveChanges(data);
      document
        .querySelector("p.text-success.notification.text-center.changePassP")
        .style.setProperty("display", "block");
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.changePassP")
        .style.setProperty("display", "block");
    }
  };

  const emailDeleteShowBtn = (email) => {
    setDeleteEmail({
      ...deleteEmail,
      email: email,
    });
    deleteMailhandleShow();
  };

  const style = {
    control: (base) => ({
      ...base,
      // border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  console.log(editInfo);
  return (
    <div className="doctorProfile">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between my-3 align-items-center warningDiv">
            <h3>
              <WarningIcon /> Education Info Missing
            </h3>
            <p>
              Click Here to go to “Edit Overview” and fill in all your
              information
            </p>
          </div>
          <div className="col-md-12 d-flex justify-content-between my-3 align-items-center warningDiv">
            <h3>
              <WarningIcon /> Education Info Missing
            </h3>
            <p>
              Click Here to go to “Edit Overview” and fill in all your
              information
            </p>
          </div>
          <div className="col-md-12 d-flex flex-wrap docInfo">
            <div className="col-md-8 mb-5">
              <div className="d-flex align-items-end mb-3 flex-wrap">
                <img
                  src={loggedInUser.profile_pic}
                  alt="docImg"
                  className="img-fluid"
                />
                <button className="editProfile" onClick={handleShow}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
              </div>
              <h3>Dr. Generic Placeholdername</h3>
              <p className="docPractice">
                Medical Practitioner since 2009 (11 Years)
              </p>
              <div className="my-4 d-flex flex-wrap">
                {loggedInUser.expertise.map((item, index) => (
                  <span className="expertise" key={index}>
                    {item}
                  </span>
                ))}
              </div>
              <p className="my-4">
                Doctor’s Bio Goes Here Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Cras sodales vulputate purus, at eleifend
                tellus luctus ac. Aenean molestie consectetur urna, eu malesuada
                massa. Curabitur egestas odio sed nisl rutrum feugiat. Curabitur
                sit amet ornare enim
              </p>
              <p className="mb-0">Rating: 4.6/5(666)</p>
              <p className="mb-0">Total Consultations: 348</p>
            </div>
            <div className="col-md-4 docInfoRight">
              <div className="d-flex justify-content-end">
                <button className="findDocBtn mb-4">
                  Appointment Dashboard
                </button>
              </div>
              <div className="mb-5 mt-3 pr-4">
                <h5>Consultation Fee: 750 BDT</h5>
                <h5>7 Days Follow-up Fee: 500 BDT</h5>
              </div>
              <div className="px-5">
                <h6>SCHEDULE THIS WEEK</h6>
                <Table borderless>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Sun</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                    <tr>
                      <td>Mon</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                    <tr>
                      <td>Tue</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                    <tr>
                      <td>Wed</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                    <tr>
                      <td>Thu</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                    <tr>
                      <td>Fri</td>
                      <td className="text-right pr-0">Off Day</td>
                    </tr>
                    <tr>
                      <td>Sat</td>
                      <td className="text-right pr-0">6pm to 8pm</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-md-12 my-4 px-0">
            <h4 className="creditTitle">Credits and Finances</h4>
            <div className="Credits">
              <div className="d-flex justify-content-between flex-wrap">
                <p className="visibility">
                  This information is only visible to you
                </p>
                <button className="editProfile">
                  <AttachMoneyIcon /> Manage Credits
                </button>
              </div>
              <div>
                <h5 className="colorHeader">Sobar Daktar Credit Points</h5>
                <strong>1245</strong>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4 px-0">
            <h4 className="creditTitle">Doctor's Overview</h4>
            <div className="Credits">
              <div className="d-flex justify-content-between flex-wrap">
                <p className="visibility">This information is Public</p>
                <button className="editProfile" onClick={overviewHandleShow}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Overview
                </button>
              </div>
              <div>
                <h5 className="colorHeader">Expertise In</h5>
                <div className="my-4 d-flex flex-wrap">
                  {loggedInUser.expertise.map((item, index) => (
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
                  <h6>{loggedInUser.current_workplace.name} </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Education Background</h5>
                {loggedInUser.degree.map((item) => (
                  <div className="px-3">
                    <h6>{item.institution}</h6>
                    <p>
                      {item.name}, {new Date(item.passing_year).toDateString()}
                    </p>
                  </div>
                ))}
                <div className="px-3">
                  <h6>Institute Name</h6>
                  <p>DEGREE, 1995</p>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Achievements</h5>
                {loggedInUser.extra_degree.map((item) => (
                  <div className="px-3" key={item._id}>
                    <h6>{item.name}</h6>
                    <p>{item.institution}, YEAR</p>
                  </div>
                ))}

                <div className="px-3">
                  <h6>Achievement Title</h6>
                  <p>INSTITUTE, YEAR</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4 px-0">
            <h4 className="creditTitle">Your Personal Info</h4>
            <div className="Credits">
              <div className="d-flex justify-content-between flex-wrap">
                <p className="visibility">
                  ThiThis information is only visible to you
                </p>
                <button className="editProfile" onClick={handleShow}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Info
                </button>
              </div>
              <div>
                <h5 className="colorHeader">Gender</h5>
                <div className="px-3">
                  <h6>
                    {loggedInUser.gender ? loggedInUser.gender : "Not set Yet"}
                  </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Email</h5>
                <div className="px-3">
                  {loggedInUser.email_info.map((email, index) => (
                    <h6 key={index}>{email.email} </h6>
                  ))}
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Phone</h5>
                <div className="px-3">
                  <h6>
                    {loggedInUser.phone_number
                      ? loggedInUser.phone_number
                      : "Not Set Yet"}
                  </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Birthdate</h5>
                <div className="px-3">
                  <h6>{new Date(loggedInUser.date_of_birth).toDateString()}</h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Mobile Banking</h5>
                <div className="px-3">
                  <h6>
                    {loggedInUser.mobile_banking_info.number} (
                    {loggedInUser.mobile_banking_info.provider})
                  </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">NID</h5>
                <div className="px-3">
                  <h6>{loggedInUser.nid}</h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">BMDC Reg. Number</h5>
                <div className="px-3">
                  <h6>{loggedInUser.bmdc_reg}</h6>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={submitHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Edit Info</h3>
                  <p className="text-success notification text-center docEditP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center docEditP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="changePass"
                  onClick={changePasshandleShow}
                >
                  Change Password
                </button>
                <Form.Group className="basicFormInput">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Full Name"
                    name="fullname"
                    onBlur={(e) =>
                      setEditInfo({ ...editInfo, fullname: e.target.value })
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid" className="name">
                    {!editInfo.fullname
                      ? "FullName must be start with atleast 6 character"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Email</Form.Label>
                  {loggedInUser.email_info.map(({ email, index }) => (
                    <button
                      type="button"
                      className="removeBtn"
                      key={email}
                      onClick={() => emailDeleteShowBtn(email)}
                    >
                      {email}
                      <CloseIcon />
                    </button>
                  ))}
                  <button
                    type="button"
                    className="addNewEmail"
                    onClick={addMailhandleShow}
                  >
                    + Add new
                  </button>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your phone no."
                    name="phone_number"
                    onBlur={(e) =>
                      setEditInfo({ ...editInfo, phone_number: e.target.value })
                    }
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="phone_number"
                  >
                    {!editInfo.phone_number
                      ? "Must have atleast 11 number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicMobile">
                  <Form.Label>Mobile Bank Info.</Form.Label>
                  <div className="d-flex align-items-center">
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter your phone no."
                        name="number"
                        onBlur={(e) =>
                          setEditInfo({
                            ...editInfo,
                            mobile_banking_info: {
                              ...editInfo.mobile_banking_info,
                              number: e.target.value,
                            },
                          })
                        }
                        required
                      />
                      <InputGroup.Append>
                        <Dropdown className="d-flex flex-column justify-content-center">
                          <Dropdown.Toggle id="Mobile-Bank-Dropdown">
                            {editInfo.mobile_banking_info &&
                            editInfo.mobile_banking_info.provider
                              ? editInfo.mobile_banking_info.provider
                              : "NAGAD"}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {bankProvider.map((item, index) => (
                              <Dropdown.Item
                                key={index}
                                onSelect={() =>
                                  setEditInfo({
                                    ...editInfo,
                                    mobile_banking_info: {
                                      ...editInfo.mobile_banking_info,
                                      provider: item,
                                    },
                                  })
                                }
                              >
                                {item}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup.Append>
                      <Form.Control.Feedback type="invalid" className="number">
                        {!editInfo.phone ? "must have atleast 11 number" : ""}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </div>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>NID No.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter NID no."
                    name="nid"
                    onBlur={(e) =>
                      setEditInfo({
                        ...editInfo,
                        nid: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>BMDC Reg No.</Form.Label>
                  <p className="bmdcP">
                    You can’t change this, contact support for any changes
                  </p>
                </Form.Group>

                <Form.Group controlId="formBasicMobile">
                  <Form.Label>Gender</Form.Label>
                  <Dropdown className="d-flex flex-column justify-content-center Gender">
                    <Dropdown.Toggle id="GenderDropdown">
                      {gender ? gender : "Gender"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {genders.map((item, index) => (
                        <Dropdown.Item
                          key={index}
                          onSelect={() => setGender(item)}
                        >
                          {item}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="date_of_birth"
                    onChange={(e) =>
                      setEditInfo({
                        ...editInfo,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid" className="phone">
                    {!editInfo.phone ? "must have atleast 11 number" : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Enter Password to Save Changes</Form.Label>
                  <Form.Control
                    onBlur={passwordToSave}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={changePassShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={passwordChangeHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Reset Password</h3>
                  <p className="text-success notification text-center changePassP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center changePassP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    onBlur={passwordToSave}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setChangePass({
                        ...changePass,
                        new_password: e.target.value,
                      })
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setChangePass({
                        ...changePass,
                        confirm_password: e.target.value,
                      })
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={changePasshandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Reset Password
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={deleteMailShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={deleteEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Remove Email ?</h3>
                  <p className="text-center">
                    You need to enter your password to remove an email.
                  </p>
                  <p className="text-success notification text-center deleteEmailP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center deleteEmailP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Enter Your Password</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setDeleteEmail({
                        ...deleteEmail,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={deleteMailhandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Delete Mail
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={addMailShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={addEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Add New Email</h3>
                  <p className="text-success notification text-center addEmailP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center addEmailP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Add New Email</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setEditEmail({
                        ...editEmail,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editEmail.email
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Enter Password for Security</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setEditEmail({
                        ...editEmail,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editEmail.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={addMailhandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={overviewShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={overViewSubmitHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Edit Overview</h3>
                  <p className="text-success notification text-center overviewP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center overviewP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Expertise Fields</Form.Label>
                  <Select
                    isMulti
                    name="colors"
                    inputId="test123"
                    instanceId="test456"
                    styles={style}
                    options={fakeOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Start Typing your fields"
                    onChange={(e) =>
                      e.map((item) =>
                        setEditInfo({
                          ...editInfo,
                          expertise: editInfo.expertise
                            ? [...editInfo.expertise, item.label]
                            : [item.label],
                        })
                      )
                    }
                  />
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Work Places</Form.Label>
                  <button type="button" className="removeBtn2 py-3">
                    <div>
                      <h6>{loggedInUser.current_workplace.name}</h6>
                      <p>
                        {new Date(
                          loggedInUser.current_workplace.work_since
                        ).toDateString()}
                        - Now
                      </p>
                    </div>
                    <CloseIcon />
                  </button>
                  {loggedInUser.worked_at_previously.map((item) => (
                    <button type="button" className="removeBtn2 py-3">
                      <div>
                        <h6>{item.name}</h6>
                        <p>
                          {new Date(item.worked_from).toDateString()} -
                          {new Date(item.worked_till).toDateString()}
                        </p>
                      </div>
                      <CloseIcon />
                    </button>
                  ))}

                  <button
                    type="button"
                    className="addNewEmail"
                    onClick={workPlaceHandleShow}
                  >
                    + Add new
                  </button>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Education Background</Form.Label>
                  {loggedInUser.degree.map((item) => (
                    <button type="button" className="removeBtn2 py-3">
                      <div>
                        <h6>{item.institution}</h6>
                        <p>
                          {item.name} -
                          {new Date(item.passing_year).toDateString()}
                        </p>
                      </div>
                      <CloseIcon />
                    </button>
                  ))}
                  <button type="button" className="removeBtn2 py-3">
                    <div>
                      <h6>Placeholder Medical College Name</h6>
                      <p>Degree_Name, Passing Year</p>
                    </div>
                    <CloseIcon />
                  </button>
                  <button
                    type="button"
                    className="addNewEmail"
                    onClick={educationHandleShow}
                  >
                    + Add new
                  </button>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Achievements</Form.Label>
                  {loggedInUser.extra_degree.map((item) => (
                    <button
                      type="button"
                      className="removeBtn2 py-3"
                      key={item._id}
                    >
                      <div>
                        <h6>{item.name}</h6>
                        <p>{item.institution}, Year</p>
                      </div>
                      <CloseIcon />
                    </button>
                  ))}
                  <button type="button" className="removeBtn2 py-3">
                    <div>
                      <h6>Achievement Title</h6>
                      <p>Institute_Name, Year</p>
                    </div>
                    <CloseIcon />
                  </button>
                  <button
                    type="button"
                    className="addNewEmail"
                    onClick={achievementhandleShow}
                  >
                    + Add new
                  </button>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Enter Password to Save Changes</Form.Label>
                  <Form.Control
                    onBlur={passwordToSave}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="mb-3 password"
                  >
                    {!editInfo.password
                      ? "Must have minimum 6 character with number"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={overviewHandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={achievementShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={achievementsHandler}>
                <div>
                  <h3 className="editFormTitle text-center">
                    Add New Achievement
                  </h3>
                  <p className="text-success notification text-center achievementP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center achievementP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>

                <Form.Group className="basicFormInput">
                  <Form.Label>Achievement Title</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setAddNewAchievements({
                        ...addNewAchievements,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    name="What did you achieve"
                    placeholder="Achievement Title"
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setAddNewAchievements({
                        ...addNewAchievements,
                        institution: e.target.value,
                      })
                    }
                    type="text"
                    name="Institution Name"
                    placeholder="Official Name of Institution"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={achievementhandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Save
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={educationShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={addEducationHandler}>
                <div>
                  <h3 className="editFormTitle text-center">
                    Add New Education
                  </h3>
                  <p className="text-success notification text-center educationP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center educationP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>

                <Form.Group className="basicFormInput">
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setAddNewEducation({
                        ...addNewEducation,
                        institution: e.target.value,
                      })
                    }
                    type="text"
                    name="What did you achieve"
                    placeholder="Official name of your institution"
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Degree Name</Form.Label>
                  <Form.Control
                    onBlur={(e) =>
                      setAddNewEducation({
                        ...addNewEducation,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    name="Institution Name"
                    placeholder="MBBS, BDS etc"
                    required
                  />
                </Form.Group>
                <Form.Group className="basicFormInput">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="date_of_birth"
                    onChange={(e) =>
                      setAddNewEducation({
                        ...addNewEducation,
                        passing_year: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Currently enrolled"
                    onChange={() => setCompleted(!completed)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={educationHandleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="findDocBtn">
                    Save
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>

          <Modal
            show={workPlaceShow}
            onHide={() =>
              alert("For close modal please click to the Cancel Button")
            }
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                  className="findDocBtn"
                  onClick={() => setWorkPlace("previous")}
                >
                  Previous Place
                </button>
                <button
                  className="findDocBtn"
                  onClick={() => setWorkPlace("current")}
                >
                  Current Place
                </button>
              </div>
              {workPlace === "current" ? (
                <Form noValidate onSubmit={currentWorkPlaceHandler}>
                  <div>
                    <h3 className="editFormTitle text-center">
                      Add Current Workplace
                    </h3>
                    <p className="text-success notification text-center currentWorkP">
                      {saveChanges.success === "yes"
                        ? "Successfully Save the Changes"
                        : ""}
                    </p>
                    <p className="text-danger notification text-center currentWorkP">
                      {saveChanges.success === "no" ? saveChanges.msg : ""}
                    </p>
                  </div>

                  <Form.Group className="basicFormInput">
                    <Form.Label>Workplace Name</Form.Label>
                    <Form.Control
                      onBlur={(e) =>
                        setAddCurrentWorkPlace({
                          ...addCurrentWorkPlace,
                          name: e.target.value,
                        })
                      }
                      type="text"
                      name="What did you achieve"
                      placeholder="Officcial Name of Institute"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="basicFormInput">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      onBlur={(e) =>
                        setAddCurrentWorkPlace({
                          ...addCurrentWorkPlace,
                          address: e.target.value,
                        })
                      }
                      type="text"
                      name="Institution Name"
                      placeholder="Your role in this workplace"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="basicFormInput">
                    <Form.Label>Work Since</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      name="date_of_birth"
                      onChange={(e) =>
                        setAddCurrentWorkPlace({
                          ...addCurrentWorkPlace,
                          work_since: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <button
                      type="button"
                      className="cancelBtn"
                      onClick={workPlaceHandleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="findDocBtn">
                      Save Changes
                    </button>
                  </div>
                </Form>
              ) : workPlace === "previous" ? (
                <Form noValidate onSubmit={previousWorkPlaceHandler}>
                  <div>
                    <h3 className="editFormTitle text-center mb-3">
                      Add Previous Workplace
                    </h3>
                    <p className="text-success notification text-center previousWorkP">
                      {saveChanges.success === "yes"
                        ? "Successfully Save the Changes"
                        : ""}
                    </p>
                    <p className="text-danger notification text-center previousWorkP">
                      {saveChanges.success === "no" ? saveChanges.msg : ""}
                    </p>
                  </div>

                  <Form.Group className="basicFormInput">
                    <Form.Label>Workplace Name</Form.Label>
                    <Form.Control
                      onBlur={(e) =>
                        setAddNewWorkPlace({
                          ...addNewWorkPlace,
                          name: e.target.value,
                        })
                      }
                      type="text"
                      name="What did you achieve"
                      placeholder="Officcial Name of Institute"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="basicFormInput">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      onBlur={(e) =>
                        setAddNewWorkPlace({
                          ...addNewWorkPlace,
                          address: e.target.value,
                        })
                      }
                      type="text"
                      name="Institution Name"
                      placeholder="Your role in this workplace"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="basicFormInput">
                    <Form.Label>Starting Year</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      name="date_of_birth"
                      onChange={(e) =>
                        setAddNewWorkPlace({
                          ...addNewWorkPlace,
                          worked_from: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="basicFormInput">
                    <Form.Label>Starting Year</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      name="date_of_birth"
                      onChange={(e) =>
                        setAddNewWorkPlace({
                          ...addNewWorkPlace,
                          worked_till: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <button
                      type="button"
                      className="cancelBtn"
                      onClick={workPlaceHandleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="findDocBtn">
                      Save Changes
                    </button>
                  </div>
                </Form>
              ) : (
                ""
              )}
            </Card>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
