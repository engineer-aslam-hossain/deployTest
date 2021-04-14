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
import Swal from "sweetalert2";

const PatientProfile = () => {
  const router = useRouter();

  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
  const [saveChanges, setSaveChanges] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
  const [searchData, setsearchData] = useState([]);

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

  const nameValidation = /^([a-zA-Z]{3,30}\s*)+/;
  const passValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const mailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
      handleClose();
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
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: data.msg,
      });
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
        } catch (err) {
          console.log(err);
        }
      } else {
      }
      // console.log(data);
    }
    setGender("");
    setEditInfo({});
    // console.log(data);
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
    // console.log(data);
    if (data.success === "yes") {
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
      addMailhandleClose();
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
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: data.msg,
      });
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
    // console.log(data);
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
        Swal.fire({
          icon: "success",
          title: "Successfully Save the Changes",
          showConfirmButton: false,
          timer: 1000,
        });
        deleteMailhandleClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: data.msg,
      });
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
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
      changePasshandleClose();
    } else {
      Swal.fire({
        icon: "error",
        title: data.msg,
      });
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

  const myAppointmentsHandler = async () => {
    setActive(2);
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const myAppoints = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/get_my_appointments`,
        {
          method: "GET",
          headers: { sobar_daktar_session: getToken },
          mode: "cors",
        }
      );
      const myAppointsData = await myAppoints.json();
      setMyAppointments(myAppointsData);
      // console.log(myAppointsData);
    } catch (err) {
      console.log(err);
    }
  };

  const [spinner, setSpinner] = useState(false);

  const searchFriends = async () => {
    // console.log(data);
    setSpinner(true);
    setActive(3);
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const friends = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/get_friend_list`,
        {
          method: "GET",
          headers: { sobar_daktar_session: getToken },
        }
      );
      const { friend } = await friends.json();
      // console.log(friend);
      setsearchData(friend);
    } catch (err) {
      console.log(err);
    }
  };

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
                onClick={myAppointmentsHandler}
              >
                Appointments
              </div>
              <div
                className={`col-md-4 d-flex justify-content-center l ${
                  active === 3 && "active"
                }`}
                onClick={searchFriends}
              >
                Friends
              </div>
            </div>
          </div>
          {active === 1 ? (
            <Profile handleShow={handleShow} />
          ) : active === 2 ? (
            <Appointments appointments={myAppointments} />
          ) : active === 3 ? (
            <Friends searchInfo={searchData} spinner={spinner} />
          ) : (
            <Error />
          )}
          <Modal show={show} onHide={handleClose} className="PatientEditModal">
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={submitHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Edit Info</h3>
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
                    {!nameValidation.test(editInfo.fullname)
                      ? "FullName must be start with atleast 3 character"
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
                    {editInfo.phone_number && editInfo.phone_number.length < 11
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
                        {editInfo.mobile_banking_info &&
                        editInfo.mobile_banking_info.number &&
                        editInfo.mobile_banking_info.number.length < 11
                          ? "must have atleast 11 number"
                          : ""}
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
                  <Form.Control.Feedback type="invalid" className="name">
                    {editInfo.nid && editInfo.nid.length < 10
                      ? "NID number should have more or equal to 10 number"
                      : ""}
                  </Form.Control.Feedback>
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
                    {editInfo.password &&
                    !passValidation.test(editInfo.password)
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
            onHide={changePasshandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
              <Form noValidate onSubmit={passwordChangeHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Reset Password</h3>
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
                    {editInfo.password &&
                    !passValidation.test(editInfo.password)
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
                    {changePass.new_password &&
                    !passValidation.test(changePass.new_password)
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
                    {changePass.confirm_password &&
                    !passValidation.test(changePass.confirm_password)
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
            onHide={deleteMailhandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
              <Form noValidate onSubmit={deleteEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Remove Email ?</h3>
                  <p className="text-center">
                    You need to enter your password to remove an email.
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
            onHide={addMailhandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className=" mx-auto">
              <Form noValidate onSubmit={addEmailHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Add New Email</h3>
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
                    {editEmail.email && !mailValidation.test(editEmail.email)
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
                    {editEmail.password &&
                    !passValidation.test(editEmail.password)
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
