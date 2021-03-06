import React, { useContext, useState } from "react";
import { Dropdown, Form, InputGroup, Modal, Table } from "react-bootstrap";
import WarningIcon from "@material-ui/icons/Warning";
import Appointments from "./Appointments";
import Profile from "./Profile";
import Friends from "./Friends";
import Error from "../../pages/_error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { Card } from "@material-ui/core";
import DaktarContext from "../Context/Context";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";

const PatientProfile = () => {
  const router = useRouter();

  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
  const [saveChanges, setSaveChanges] = useState({});
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [changePassShow, setchangePassShow] = useState(false);
  const [deleteMailShow, setdeleteMailShow] = useState(false);
  const [addMailShow, setAddMailShow] = useState(false);

  const genders = ["Male", "Female", "Other"];
  const bankProvider = ["NAGAD", "BKASH", "ROCKET", "NONE"];
  const [editInfo, setEditInfo] = useState({});
  const [gender, setGender] = useState("");
  const [editEmail, setEditEmail] = useState({});
  const [deleteEmail, setDeleteEmail] = useState({});
  const [changePass, setChangePass] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changePasshandleClose = () => setchangePassShow(false);
  const changePasshandleShow = () => setchangePassShow(true);
  const deleteMailhandleClose = () => setdeleteMailShow(false);
  const deleteMailhandleShow = () => setdeleteMailShow(true);
  const addMailhandleClose = () => setAddMailShow(false);
  const addMailhandleShow = () => setAddMailShow(true);
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
          .querySelector("p.text-success.notification.text-center.editInfoP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.editInfoP")
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
      console.log(data);
    }
    setGender("");
    setEditInfo({});
    console.log(data);
  };

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
          .querySelector("p.text-success.notification.text-center.addMailP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.addMailP")
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
          .querySelector("p.text-success.notification.text-center.deleteMailP")
          .style.setProperty("display", "block");
      } catch (err) {
        console.log(err);
      }
    } else {
      setSaveChanges(data);
      document
        .querySelector("p.text-danger.notification.text-center.deleteMailP")
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

  const logoutHandler = () => {
    setLoggedInUser({});
    localStorage.removeItem("loginToken");
    router.push("/Login");
  };

  console.log(gender);
  return (
    <div className="patientProfile">
      <div className="container">
        <div className="row">
          <div className="col-md-12 docInfo pb-0 px-0 mb-5">
            <div className="col-md-12 d-flex flex-wrap px-3">
              <div className="col-md-8 mb-5">
                <div className="d-flex align-items-end mb-3 flex-wrap">
                  <img
                    src="/images/patient.png"
                    alt="docImg"
                    className="img-fluid"
                  />
                  <button className="editProfile" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                  </button>
                </div>
                <h3>{loggedInUser.fullname}</h3>
              </div>
              <div className="col-md-4 docInfoRight">
                <div className="d-flex justify-content-end">
                  <button className="editProfile mb-4">
                    <img
                      src="/images/SobarDaktar_Logo_Mobile.png"
                      alt="SobarDaktar_Logo_Mobile"
                      className="img-fluid"
                    />
                    My Medical Records
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex px-0">
              <div
                className={`col-md-4 d-flex justify-content-center ${
                  active === 1 && "active"
                }`}
                onClick={() => setActive(1)}
              >
                Profile
              </div>
              <div
                className={`col-md-4 d-flex justify-content-center ${
                  active === 2 && "active"
                }`}
                onClick={() => setActive(2)}
              >
                Appointments
              </div>
              <div
                className={`col-md-4 d-flex justify-content-center l ${
                  active === 3 && "active"
                }`}
                onClick={() => setActive(3)}
              >
                Friends
              </div>
            </div>
          </div>
          {active === 1 ? (
            <Profile handleShow={handleShow} />
          ) : active === 2 ? (
            <Appointments />
          ) : active === 3 ? (
            <Friends />
          ) : (
            <Error />
          )}
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
                  <p className="text-success notification text-center editInfoP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center editInfoP">
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
                    defaultValue={loggedInUser.fullname}
                    onChange={(e) =>
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
                  {loggedInUser.email_info &&
                    loggedInUser.email_info.map(({ email, index }) => (
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
                    onChange={(e) =>
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
                        onChange={(e) =>
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
                    onChange={(e) =>
                      setEditInfo({
                        ...editInfo,
                        nid: e.target.value,
                      })
                    }
                  />
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
                    onChange={passwordToSave}
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
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
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
                    onChange={passwordToSave}
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
              <Form noValidate onSubmit={deleteEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Remove Email ?</h3>
                  <p className="text-center">
                    You need to enter your password to remove an email.
                  </p>
                  <p className="text-success notification text-center deleteMailP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center deleteMailP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Enter Your Password</Form.Label>
                  <Form.Control
                    onChange={(e) =>
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
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
              <Form noValidate onSubmit={addEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Add New Email</h3>
                  <p className="text-success notification text-center addMailP">
                    {saveChanges.success === "yes"
                      ? "Successfully Save the Changes"
                      : ""}
                  </p>
                  <p className="text-danger notification text-center addMailP">
                    {saveChanges.success === "no" ? saveChanges.msg : ""}
                  </p>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Add New Email</Form.Label>
                  <Form.Control
                    onChange={(e) =>
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
                    onChange={(e) =>
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
          <div>
            <button className="logoutBtn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
