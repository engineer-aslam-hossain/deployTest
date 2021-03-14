import React, { useContext, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const DoctorProfile = () => {
  const router = useRouter();

  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
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
    credit,
    current_workplace,
    profile_pic,
    phone_number,
    practice_since,
    email_info,
    date_of_birth,
    mobile_banking_info,
  } = loggedInUser;

  const [expertiseArr, setExpertiseArr] = useState();
  const [educationArr, setEducationArr] = useState();
  const [achievementArr, setAchievementArr] = useState();
  const [previousWorkArr, setpreviousWorkArr] = useState();
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
  const genders = ["Male", "Female", "Other"];
  const bankProvider = ["NAGAD", "BKASH", "ROCKET", "NONE"];
  const [editInfo, setEditInfo] = useState({});
  const [editEmail, setEditEmail] = useState({});
  const [genderSelect, setGenderSelect] = useState("");
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

  // console.log(editEmail);

  const overViewSubmitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const filterValue =
      expertiseArr &&
      expertiseField.filter((item) => !expertiseArr.includes(item));

    console.log(filterValue);
    const newArr =
      filterValue !== null
        ? [...expertiseArr, ...filterValue]
        : [...expertiseField];

    console.log(newArr);
    try {
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
            expertise: newArr,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      if (data.success === "yes") {
        overviewHandleClose();
        Swal.fire({
          icon: "success",
          title: "Successfully Save the Changes",
          showConfirmButton: false,
          timer: 1000,
        });
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
    } catch (err) {}
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

    if (genderSelect) {
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
            gender: genderSelect,
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
        } catch (err) {
          console.log(err);
        }
      } else {
      }
      console.log(data);
    }
    setGenderSelect("");
    setEditInfo({});
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
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
      deleteMailhandleClose();
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

  const addEducationHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const newArr = [
      ...educationArr,
      {
        name: addNewEducation.name,
        institution: addNewEducation.institution,
        passing_year: addNewEducation.passing_year,
        completed: completed,
      },
    ];
    console.log(newArr);

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
          degree: newArr,
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
      educationHandleClose();
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

  const achievementsHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const newArr = [...achievementArr, addNewAchievements];
    console.log(newArr);

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
          extra_degree: newArr,
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
      achievementhandleClose();
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

  const achievementsDeleteHandler = async (item) => {
    const updatedArr = achievementArr.filter((work) => item._id !== work._id);
    console.log(updatedArr);
    try {
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
            extra_degree: updatedArr,
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
    } catch (err) {}
  };
  const previousWorkPlaceHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    const newArr = [...previousWorkArr, addNewWorkPlace];
    console.log(newArr);

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
          worked_at_previously: newArr,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success === "yes") {
      workPlaceHandleClose();
      Swal.fire({
        icon: "success",
        title: "Work Place add Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
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

  const previousWorkPlaceDeleteHandler = async (item) => {
    const updatedArr = previousWorkArr.filter((work) => item._id !== work._id);
    console.log(updatedArr);
    try {
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
            worked_at_previously: updatedArr,
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
    } catch (err) {}
  };

  const currentWorkPlaceDeleteHandler = async () => {
    try {
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
            current_workplace: {},
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
    } catch (err) {}
  };

  const removeEducationHandler = async (item) => {
    const updatedArr = educationArr.filter((work) => item._id !== work._id);
    console.log(updatedArr);
    try {
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
            degree: updatedArr,
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
    } catch (err) {}
  };

  const currentWorkPlaceHandler = async (e) => {
    // console.log(...loggedInUser.worked_at_previously);
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
    // console.log(data);
    if (data.success === "yes") {
      workPlaceHandleClose();
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
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
    // console.log(data);
    if (data.success === "yes") {
      changePasshandleClose();
      Swal.fire({
        icon: "success",
        title: "Successfully Save the Changes",
        showConfirmButton: false,
        timer: 1000,
      });
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

  const style = {
    control: (base) => ({
      ...base,
      // border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  const logoutHandler = () => {
    setLoggedInUser({});
    router.push("/Login");
    localStorage.removeItem("loginToken");
  };

  // console.log(loggedInUser);

  function formatAMPM(date) {
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const [showSuccess, setShowSuccess] = useState(false);
  const showSuccessClose = () => setShowSuccess(false);
  const showSuccessShow = () => setShowSuccess(true);

  const appointmentRouteHandle = () => {
    appointment
      ? router.push("/profile/docAppointmentDashboard")
      : showSuccessShow();
  };

  const [weekApointmentDetails, setWeekAppointmentDetails] = useState({});
  // console.log(weekApointmentDetails);

  const appointmentForAWeekHandler = async (e) => {
    e.preventDefault();
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_whole_week`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(weekApointmentDetails),
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
          // console.log(data);
          setLoggedInUser(userData);
        } catch (err) {
          console.log(err);
        }
        Swal.fire({
          icon: "success",
          title: "Successfully Complete Appointment Setup",
        });
        showSuccessClose();
      }

      console.log(data);

      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: data.msg,
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    setExpertiseArr(expertise);
    setEducationArr(degree);
    setAchievementArr(extra_degree);
    setpreviousWorkArr(worked_at_previously);
  }, [loggedInUser]);

  // console.log(expertiseArr, educationArr, achievementArr, previousWorkArr);
  console.log(loggedInUser);
  return (
    <div className="doctorProfile">
      <div className="container">
        <div className="row">
          {degree && degree.length <= 1 && (
            <div className="col-md-12 d-flex justify-content-between my-3 align-items-center warningDiv">
              <h3>
                <WarningIcon /> Education Info Missing
              </h3>
              <p>
                Click Here to go to “Edit Overview” and fill in all your
                information
              </p>
            </div>
          )}
          {email_info[0] && email_info[0].is_email_verified ? (
            ""
          ) : (
            <div className="col-md-12 d-flex justify-content-between my-3 align-items-center warningDiv">
              <h3>
                <WarningIcon /> Email Not Verified
              </h3>
              <p>
                Go to Your Email inbox and search for “Sobar Daktar” & Verify
                your email
              </p>
            </div>
          )}
          <div className="col-md-12 d-flex flex-wrap docInfo">
            <div className="col-md-8 mb-5">
              <div className="d-flex align-items-end mb-3 flex-wrap">
                <img src={profile_pic} alt="docImg" className="img-fluid" />
                <button className="editProfile" onClick={handleShow}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
              </div>
              <h3>{fullname}</h3>
              <p className="docPractice">
                Medical Practitioner since{" "}
                {practice_since && new Date(practice_since).getFullYear()} (
                {practice_since &&
                  new Date().getFullYear() -
                    new Date(practice_since).getFullYear()}
                Years)
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
              <p className="mb-0">
                Rating: {rating}/5({total_consultation})
              </p>
              <p className="mb-0">Total Consultations: {total_consultation}</p>
            </div>
            <div className="col-md-4 docInfoRight">
              <div className="d-flex justify-content-end">
                <button
                  className="findDocBtn mb-4"
                  onClick={appointmentRouteHandle}
                >
                  Appointment Dashboard
                </button>
              </div>
              <div className="mb-5 mt-3 pr-4">
                <h5>Consultation Fee: {appointment && appointment.fee} BDT</h5>
                <h5>
                  7 Days Follow-up Fee:{" "}
                  {appointment && appointment.followup_fee} BDT
                </h5>
              </div>
              <div className="pr-5">
                <h6>SCHEDULE THIS WEEK</h6>
                <Table borderless>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Sun</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Sunday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Sunday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Sunday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Mon</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Monday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Monday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Monday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Tue</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Tuesday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Tuesday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Tuesday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Wed</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Wednesday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Wednesday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Wednesday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Thu</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Thursday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Thursday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Thursday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Fri</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Friday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Friday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Friday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
                    </tr>
                    <tr>
                      <td>Sat</td>
                      <td className="text-right pr-0">
                        {appointment &&
                        appointment.day &&
                        !appointment.day.Saturday.off_day
                          ? `${formatAMPM(
                              new Date(appointment.day.Saturday.start_time)
                            )}- ${formatAMPM(
                              new Date(appointment.day.Saturday.end_time)
                            )}`
                          : "Off Day"}
                      </td>
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
                <strong>{credit}</strong>
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
                    <p>
                      {item.institution}, {new Date(item.year).getFullYear()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4 px-0">
            <h4 className="creditTitle">Your Personal Info</h4>
            <div className="Credits">
              <div className="d-flex justify-content-between flex-wrap">
                <p className="visibility">
                  This information is only visible to you
                </p>
                <button className="editProfile" onClick={handleShow}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Info
                </button>
              </div>
              <div>
                <h5 className="colorHeader">Gender</h5>
                <div className="px-3">
                  <h6>{gender ? gender : "Not set Yet"}</h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Email</h5>
                <div className="px-3">
                  {email_info &&
                    email_info.map((email, index) => (
                      <h6 key={index}>{email.email} </h6>
                    ))}
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Phone</h5>
                <div className="px-3">
                  <h6>{phone_number ? phone_number : "Not Set Yet"}</h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Birthdate</h5>
                <div className="px-3">
                  <h6>
                    {date_of_birth && new Date(date_of_birth).toDateString()}
                  </h6>
                </div>
              </div>
              <div className="py-3">
                <h5 className="colorHeader">Mobile Banking</h5>
                <div className="px-3">
                  <h6>
                    {mobile_banking_info && mobile_banking_info.number}(
                    {mobile_banking_info && mobile_banking_info.provider})
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
                    defaultValue={loggedInUser.fullname}
                    name="fullname"
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
                      {genderSelect ? genderSelect : "Gender"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {genders.map((item, index) => (
                        <Dropdown.Item
                          key={index}
                          onSelect={() => setGenderSelect(item)}
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
            onHide={changePasshandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
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
            onHide={deleteMailhandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
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
            <Card style={{ padding: "2rem 2rem" }} className="">
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
          <Modal
            show={overviewShow}
            onHide={overviewHandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={overViewSubmitHandler}>
                <div>
                  <h3 className="editFormTitle text-center">Edit Overview</h3>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Expertise Fields</Form.Label>
                  <Select
                    isMulti
                    name="colors"
                    inputId="test123"
                    instanceId="test456"
                    closeMenuOnSelect={false}
                    styles={style}
                    options={fakeOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Start Typing your fields"
                    onChange={(e) =>
                      e.map((item) =>
                        SetExpertiseField([...expertiseField, item.label])
                      )
                    }
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center my-3">
                  <button type="submit" className="findDocBtn py-2">
                    Save Expertise
                  </button>
                </div>
                <Form.Group className="basicFormInput">
                  <Form.Label>Work Places</Form.Label>
                  {loggedInUser.current_workplace && (
                    <button type="button" className="removeBtn2 py-3">
                      <div>
                        <h6>
                          {loggedInUser.current_workplace &&
                            loggedInUser.current_workplace.name}
                        </h6>
                        <p>
                          {new Date(
                            loggedInUser.current_workplace &&
                              loggedInUser.current_workplace.work_since
                          ).toDateString()}
                          - Now
                        </p>
                      </div>
                      <CloseIcon onClick={currentWorkPlaceDeleteHandler} />
                    </button>
                  )}

                  {loggedInUser.worked_at_previously.map((item, index) => (
                    <button
                      type="button"
                      className="removeBtn2 py-3"
                      key={index}
                    >
                      <div>
                        <h6>{item.name}</h6>
                        <p>
                          {new Date(item.worked_from).toDateString()} -
                          {new Date(item.worked_till).toDateString()}
                        </p>
                      </div>
                      <CloseIcon
                        onClick={() => previousWorkPlaceDeleteHandler(item)}
                      />
                    </button>
                  ))}

                  <div>
                    <button
                      type="button"
                      className="addNewEmail"
                      onClick={workPlaceHandleShow}
                    >
                      + Add new
                    </button>
                  </div>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Education Background</Form.Label>
                  {loggedInUser.degree &&
                    loggedInUser.degree.map((item, index) => (
                      <button
                        type="button"
                        className="removeBtn2 py-3"
                        key={index}
                      >
                        <div>
                          <h6>{item.institution}</h6>
                          <p>
                            {item.name} -
                            {new Date(item.passing_year).toDateString()}
                          </p>
                        </div>
                        <CloseIcon
                          onClick={() => removeEducationHandler(item)}
                        />
                      </button>
                    ))}
                  <div>
                    <button
                      type="button"
                      className="addNewEmail"
                      onClick={educationHandleShow}
                    >
                      + Add new
                    </button>
                  </div>
                </Form.Group>

                <Form.Group className="basicFormInput">
                  <Form.Label>Achievements</Form.Label>
                  {loggedInUser.extra_degree &&
                    loggedInUser.extra_degree.map((item) => (
                      <button
                        type="button"
                        className="removeBtn2 py-3"
                        key={item._id}
                      >
                        <div>
                          <h6>{item.name}</h6>
                          <p>
                            {item.institution},
                            {new Date(item.year).getFullYear()}
                          </p>
                        </div>
                        <CloseIcon
                          onClick={() => achievementsDeleteHandler(item)}
                        />
                      </button>
                    ))}

                  <div>
                    <button
                      type="button"
                      className="addNewEmail"
                      onClick={achievementhandleShow}
                    >
                      + Add new
                    </button>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end align-items-end mt-4">
                  <button
                    type="button"
                    className="cancelBtn"
                    onClick={overviewHandleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Card>
          </Modal>
          <Modal
            show={achievementShow}
            onHide={achievementhandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={achievementsHandler}>
                <div>
                  <h3 className="editFormTitle text-center">
                    Add New Achievement
                  </h3>
                </div>

                <Form.Group className="basicFormInput">
                  <Form.Label>Achievement Title</Form.Label>
                  <Form.Control
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                <Form.Group className="basicFormInput">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="date_of_birth"
                    onChange={(e) =>
                      setAddNewAchievements({
                        ...addNewAchievements,
                        year: e.target.value,
                      })
                    }
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
            onHide={educationHandleClose}
            className="PatientEditModal"
          >
            <Card style={{ padding: "2rem 2rem" }} className="">
              <Form noValidate onSubmit={addEducationHandler}>
                <div>
                  <h3 className="editFormTitle text-center">
                    Add New Education
                  </h3>
                </div>

                <Form.Group className="basicFormInput">
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
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
                    onChange={(e) =>
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
            onHide={workPlaceHandleClose}
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
                  </div>

                  <Form.Group className="basicFormInput">
                    <Form.Label>Workplace Name</Form.Label>
                    <Form.Control
                      onChange={(e) =>
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
                      onChange={(e) =>
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
                  </div>

                  <Form.Group className="basicFormInput">
                    <Form.Label>Workplace Name</Form.Label>
                    <Form.Control
                      onChange={(e) =>
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
                      onChange={(e) =>
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
          <Modal show={showSuccess} onHide={showSuccessClose}>
            <Card style={{ padding: "1rem" }}>
              <Card.Body>
                <div className="col-lg-12 newApointHead mb-5">
                  <h2>Please Complete Appointment Setup</h2>
                  <p>You can always change All this information later.</p>
                </div>
                <div className="col-md-12 selectedCard">
                  <Form noValidate onSubmit={appointmentForAWeekHandler}>
                    <div className="configureForm">
                      <Form.Group>
                        <Form.Label>Consultation Fee</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="BDT"
                          onChange={(e) =>
                            setWeekAppointmentDetails({
                              ...weekApointmentDetails,
                              fee: parseInt(e.target.value),
                            })
                          }
                        />
                        <Form.Text className="text-muted">
                          You will recieve BDT ### per Consultation after
                          adjusting x% service charge.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Follow-up Fee</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="BDT"
                          onChange={(e) =>
                            setWeekAppointmentDetails({
                              ...weekApointmentDetails,
                              followup_fee: parseInt(e.target.value),
                            })
                          }
                        />
                        <Form.Text className="text-muted">
                          You will recieve BDT ### per Consultation after
                          adjusting x% service charge.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Follow-up Day limit</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="DAYS"
                          onChange={(e) =>
                            setWeekAppointmentDetails({
                              ...weekApointmentDetails,
                              followup_within: parseInt(e.target.value),
                            })
                          }
                        />
                        <Form.Text className="text-muted">
                          Patients who come back within this time period will be
                          counted as follow-up appointments
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Advanced Charge Percentage</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Percent"
                          onChange={(e) =>
                            setWeekAppointmentDetails({
                              ...weekApointmentDetails,
                              advance_fee_percentage: parseInt(e.target.value),
                            })
                          }
                        />
                        <Form.Text className="text-muted">
                          Patients will have to pay this percentage of charge
                          when creating an appointment. The rest will be
                          collected after completion of appointment.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Estimated Time Per Patient</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Minutes"
                          onChange={(e) =>
                            setWeekAppointmentDetails({
                              ...weekApointmentDetails,
                              time_per_patient: parseInt(e.target.value),
                            })
                          }
                        />
                        <Form.Text className="text-muted">
                          Our system will suggest you proper time scheduling
                          based on this value
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Set Schedule for Whole Week</Form.Label>
                        <div className="d-flex col-lg-12 px-0">
                          <div className="col-lg-6 pl-0">
                            <Form.Group>
                              <Form.Text className="text-muted">
                                Starting Time
                              </Form.Text>

                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setWeekAppointmentDetails({
                                    ...weekApointmentDetails,
                                    start_time_hour: parseInt(
                                      e.target.value.split(":")[0]
                                    ),
                                    start_time_min: parseInt(
                                      e.target.value.split(":")[1]
                                    ),
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            to
                          </div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Text className="text-muted">
                                Ending Time
                              </Form.Text>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setWeekAppointmentDetails({
                                    ...weekApointmentDetails,
                                    end_time_hour: parseInt(
                                      e.target.value.split(":")[0]
                                    ),
                                    end_time_min: parseInt(
                                      e.target.value.split(":")[1]
                                    ),
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <Form.Text className="text-muted">
                          This will make it easier & faster for you to set your
                          week schedule in Sobar Daktar. You can always change
                          individual weekday schedule later.
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <div className="col-md-12 d-flex justify-content-between my-5 px-0">
                      <button className="findDocBtn" type="submit">
                        Complete Setup
                      </button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
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

export default DoctorProfile;
