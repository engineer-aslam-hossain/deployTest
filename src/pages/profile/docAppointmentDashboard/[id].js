import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Fragment } from "react";
import { useRouter } from "next/router";
import DaktarContext from "../../../components/Context/Context";
import Swal from "sweetalert2";

const StartAppointment = () => {
  const { loggedInUser, socket } = useContext(DaktarContext);
  const [apppointmentById, setAppointmentById] = useState({});
  const router = useRouter();

  const getAppointmentById = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.API_BASE_URL}/doctor/get_appointment_by_id?appointment_id=${router.query.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
        }
      );
      const data = await res.json();
      setAppointmentById(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointmentById();
  }, [router.query.id]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [medicineList, setMedicineList] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [disease, setDisease] = useState("");
  const [advice, setAdvice] = useState("");
  const [symtoms, setSymtoms] = useState("");
  const [examination, setExamination] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [test, setTest] = useState("");
  const [diseasesList, setDiseasesList] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [symtomsList, setSymtomsList] = useState([]);
  const [examinationList, setExaminationList] = useState([]);
  const [investigationList, setInvestigationList] = useState([]);
  const [testList, setTestList] = useState([]);

  const [drugInfo, setDrugInfo] = useState({
    dosage: {
      dosage_type: "Write Yourself",
      dosage_value: "",
    },
    duration: {
      duration_type: "Continue till next notice",
      duration_value: "",
    },
    direction: {
      direction_type: "Write Yourself",
      direction_value: "",
    },
  });

  const hourlyDosageList = [
    "Every 1 hour",
    "Every 2 hour",
    "Every 3 hour",
    "Every 4 hour",
    "Every 5 hour",
    "Every 6 hour",
    "Every 7 hour",
    "Every 8 hour",
    "Every 9 hour",
    "Every 10 hour",
    "Every 11 hour",
    "Every 12 hour",
    "Every 13 hour",
    "Every 14 hour",
    "Every 15 hour",
    "Every 16 hour",
    "Every 17 hour",
    "Every 18 hour",
    "Every 19 hour",
    "Every 20 hour",
    "Every 21 hour",
    "Every 22 hour",
    "Every 23 hour",
    "Every 24 hour",
  ];
  const zeroOneFormat = [
    "1 - 0 - 1",
    "1 - 0 - 0",
    "0 - 0 - 1",
    "1 - 1 - 1 - 1",
    "1 - 1 - 1",
    "0 - 1 - 0",
  ];

  const daysList = [1, 2, 3, 4, 5, 6, 7];
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yearList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [dosageList, setDosageList] = useState([]);
  const [durationList, setDurationList] = useState([]);
  const getDosageList = (e) => {
    e.preventDefault();
    setDrugInfo({
      ...drugInfo,
      dosage: {
        ...drugInfo.dosage,
        dosage_value: e.target.value,
      },
    });
    const filterdList =
      drugInfo.dosage.dosage_type === "hourly"
        ? hourlyDosageList.filter((item) => item.includes(e.target.value))
        : drugInfo.dosage.dosage_type === "1/0 format"
        ? zeroOneFormat.filter((item) => item.includes(e.target.value))
        : drugInfo.dosage.dosage_type === "presets"
        ? hourlyDosageList.filter((item) => item.includes(e.target.value))
        : [];

    setDosageList(filterdList);
  };

  const [medicines, setMedicines] = useState([]);

  const searchMedicine = async (e) => {
    e.preventDefault();
    setMedicineName(e.target.value);
    setDrugInfo({
      ...drugInfo,
      name: e.target.value,
    });
    console.log(e.target.value);
    const getToken = JSON.parse(localStorage.getItem("loginToken"));
    const res = await fetch(
      `${process.env.API_BASE_URL}/admin/get_medicine?${
        e.target.value && `name=${e.target.value}`
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sobar_daktar_session: getToken,
        },
      }
    );

    const medicines = await res.json();
    console.log(medicines);
    setMedicines(medicines);
  };

  const dosageHandler = (item) => {
    drugInfo.dosage.dosage_type === item
      ? setDrugInfo({
          ...drugInfo,
          dosage: {
            ...drugInfo.dosage,
            dosage_type: "",
            dosage_value: "",
          },
        })
      : setDrugInfo({
          ...drugInfo,
          dosage: {
            ...drugInfo.dosage,
            dosage_type: item,
            dosage_value: "",
          },
        });
  };

  const dosageValueHandler = (item) => {
    setDrugInfo({
      ...drugInfo,
      dosage: {
        ...drugInfo.dosage,
        dosage_value: item,
      },
    });
    setDosageList([]);
  };

  const durationValueHandler = (item) => {
    // console.log(item);
    setDrugInfo({
      ...drugInfo,
      duration: {
        ...drugInfo.duration,
        duration_value: item,
      },
    });
    setDurationList([]);
  };

  const medicineSelection = (name) => {
    // console.log("clicked");
    setMedicineName(name);
    setMedicines([]);
    setDrugInfo({
      ...drugInfo,
      name: name,
    });
  };

  const medicineChangeHandler = (e, index, name) => {
    let oldList = [...medicineList];
    oldList[index][name] = e.target.value.toString();
    setMedicineList(oldList);
    // console.log(oldList);
  };

  const medicineChangeHandler2 = (e, index, name) => {
    let oldList = [...medicineList];
    oldList[index][name] = e.target.value.toString();
    setMedicineList(oldList);
    // console.log(oldList);
  };

  const diseaseChangeHandler = (e, index) => {
    let oldList = [...diseasesList];
    oldList[index] = e.target.value;
    setDiseasesList(oldList);
  };

  const diseaseDeleteHandler = (index) => {
    const newList = diseasesList.filter((item, indx) => indx !== index);
    setDiseasesList(newList);
  };

  const adviceChangeHandler = (e, index) => {
    let oldList = [...adviceList];
    oldList[index] = e.target.value;
    setAdviceList(oldList);
  };

  const adviceDeleteHandler = (index) => {
    const newList = adviceList.filter((item, indx) => indx !== index);
    setAdviceList(newList);
  };

  const symtomsChangeHandler = (e, index) => {
    let oldList = [...symtomsList];
    oldList[index] = e.target.value;
    setSymtomsList(oldList);
  };

  const symtomsDeleteHandler = (index) => {
    const newList = symtomsList.filter((item, indx) => indx !== index);
    setSymtomsList(newList);
  };

  const examinationChangeHandler = (e, index) => {
    let oldList = [...examinationList];
    oldList[index] = e.target.value;
    setExaminationList(oldList);
  };

  const examinationDeleteHandler = (index) => {
    const newList = examinationList.filter((item, indx) => indx !== index);
    setExaminationList(newList);
  };

  const investigationChangeHandler = (e, index) => {
    let oldList = [...investigationList];
    oldList[index] = e.target.value;
    setInvestigationList(oldList);
  };

  const investigationDeleteHandler = (index) => {
    const newList = investigationList.filter((item, indx) => indx !== index);
    setInvestigationList(newList);
  };

  const testChangeHandler = (e, index) => {
    let oldList = [...testList];
    oldList[index] = e.target.value;
    setTestList(oldList);
  };

  const testDeleteHandler = (index) => {
    const newList = testList.filter((item, indx) => indx !== index);
    setTestList(newList);
  };

  const drugSubmitHandler = (e) => {
    e.preventDefault();
    setMedicineList([
      ...medicineList,
      {
        name: drugInfo.name,
        dosage: drugInfo.dosage.dosage_value,
        duration: drugInfo.duration.duration_value.toString(),
        direction: drugInfo.direction.direction_value,
        comment: drugInfo.comment,
      },
    ]);
  };

  const deleteHandler = (index) => {
    const newList = medicineList.filter((item, indx) => indx !== index);
    setMedicineList(newList);
  };

  const savePrescriptions = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.API_BASE_URL}/doctor/generate_prescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify({
            appointment_id: apppointmentById._id,
            age: apppointmentById.age.toString(),
            sex: "Male",
            weight: apppointmentById.weight.toString(),
            date: apppointmentById.appointment_time,
            medicine: medicineList,
            advice: adviceList,
            disease: diseasesList,
            symptoms: symtomsList,
            on_examination: examinationList,
            on_investigation: investigationList,
            test: testList,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Successfully Save Prescription",
        });
      }
      if (data.success === "no") {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const callToClient = (item) => {
    socket.emit(
      "callUser",
      {
        doctor_id: item.doctor_id._id,
        userToCall: item.patient_id._id,
        link: "item.patient_id._id",
        doctor_name: item.doctor_id.fullname,
        patient_name: item.patient_id.fullname,
        doctor_profile_pic: item.doctor_id.profile_pic,
      },
      (data) => {
        // console.log(data);
      }
    );
  };
  const dosageListHandler = (item) => {
    item === "hourly"
      ? setDosageList(hourlyDosageList)
      : item === "1/0 format"
      ? setDosageList(zeroOneFormat)
      : item === "presets"
      ? setDosageList(hourlyDosageList)
      : setDosageList([]);
  };

  const emptyHandler = () => {
    setMedicines([]);
    setDosageList([]);
  };

  const modalClose = () => {
    handleClose();
    setDrugInfo({
      dosage: {
        dosage_type: "Write Yourself",
        dosage_value: "",
      },
      duration: {
        duration_type: "Continue till next notice",
        duration_value: "",
      },
      direction: {
        direction_type: "Write Yourself",
        direction_value: "",
      },
    });
    setMedicineName("");
  };

  // console.log(apppointmentById);
  // console.log(medicineList);
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
                <h6>Serial : {apppointmentById.serial}</h6>
                <h4>
                  {apppointmentById.patient_id &&
                    apppointmentById.patient_id.fullname}
                </h4>
                <p>
                  {apppointmentById.age} y/o, {apppointmentById.weight} Kg,
                  {apppointmentById.patient_id &&
                    apppointmentById.patient_id.gender}
                </p>
              </div>
              <div>
                <button
                  className="callNowBtn"
                  onClick={() => callToClient(apppointmentById)}
                >
                  Call Patient
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
                <p>{apppointmentById.problem_details}</p>
              </div>
              <div>
                <button className="seeUploadBtn">See Uploaded Files</button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <p className="apointmentType">
                  {apppointmentById.appointment_type === "FRESH"
                    ? "New Appointment"
                    : "Follow-up"}
                </p>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h6 className="apointmentDay">
                  {new Date(apppointmentById.appointment_time).toLocaleString(
                    "en-us",
                    {
                      weekday: "long",
                    }
                  )}
                  {" , "}
                  {new Date(
                    apppointmentById.appointment_time
                  ).toLocaleDateString()}
                  ,
                </h6>
                <p>
                  Estimated Time :{" "}
                  {formatAMPM(new Date(apppointmentById.appointment_time))} -{" "}
                  {formatAMPM(new Date(apppointmentById.appointment_end_time))}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12 prescriptionCard p-4">
            <div className="d-flex justify-content-between mb-3">
              <div className="">
                <h5>Prescription Creation</h5>
              </div>
              <div>
                <button className="callNowBtn" onClick={savePrescriptions}>
                  Save Progress
                </button>
              </div>
            </div>
            <div>
              <div>
                <h5 className="prescriptionLabel">Rx: Medicine</h5>
              </div>

              {medicineList.length > 0 ? (
                medicineList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <div>
                        <Form.Control
                          type="text"
                          value={item.name && item.name}
                          placeholder="Medicine Name"
                          onChange={(e) =>
                            medicineChangeHandler(e, index, "name")
                          }
                        />
                      </div>
                      <div className="medicineMid">
                        <Form.Control
                          type="text"
                          value={item.dosage && item.dosage}
                          placeholder="Dosage"
                          onChange={(e) =>
                            medicineChangeHandler2(e, index, "dosage")
                          }
                        />

                        <Form.Control
                          type="text"
                          value={item.direction && item.direction}
                          placeholder="Direction"
                          onChange={(e) =>
                            medicineChangeHandler2(e, index, "direction")
                          }
                        />

                        <Form.Control
                          type="text"
                          value={item.duration && item.duration}
                          placeholder="Duration"
                          onChange={(e) =>
                            medicineChangeHandler2(e, index, "duration")
                          }
                        />
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          value={item.comment && item.comment}
                          placeholder="Additional Comments on the drug"
                          onChange={(e) =>
                            medicineChangeHandler(e, index, "comment")
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="closeIcon p-2"
                      onClick={() => deleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))
              ) : (
                <p>No medicine added yet</p>
              )}

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
              {diseasesList &&
                diseasesList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => diseaseChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => diseaseDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}

              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write Disease name here.."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setDisease(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      disease.length > 0 &&
                      setDiseasesList([...diseasesList, disease])
                    }
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
              {adviceList &&
                adviceList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => adviceChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => adviceDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write Advice here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setAdvice(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      advice.length > 0 &&
                      setAdviceList([...adviceList, advice])
                    }
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
              {symtomsList &&
                symtomsList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => symtomsChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => symtomsDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}

              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write a symptom here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setSymtoms(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      symtoms.length > 0 &&
                      setSymtomsList([...symtomsList, symtoms])
                    }
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
              {examinationList &&
                examinationList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => examinationChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => examinationDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Test Name Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setExamination(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      examination.length > 0 &&
                      setExaminationList([...examinationList, examination])
                    }
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
              {investigationList &&
                investigationList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => investigationChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => investigationDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Test Name Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setInvestigation(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      investigation.length > 0 &&
                      setInvestigationList([
                        ...investigationList,
                        investigation,
                      ])
                    }
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
              {testList &&
                testList.map((item, index) => (
                  <div
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="medicine w-100">
                      <FormControl
                        placeholder="Write Disease name here.."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="searchFriends"
                        value={item}
                        onChange={(e) => testChangeHandler(e, index)}
                      />
                    </div>
                    <div
                      className="closeIcon p-2"
                      onClick={() => testDeleteHandler(index)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}
              <div className="col-lg-12 d-flex px-0">
                <div className="col-lg-9 pl-0">
                  <FormControl
                    placeholder="Write test name here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) => setTest(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 pr-0">
                  <button
                    className="addBtn"
                    onClick={() =>
                      test.length > 0 && setTestList([...testList, test])
                    }
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
          <Modal show={show} onHide={modalClose}>
            <Card style={{ padding: "1rem" }} className="addDrugCard">
              <Card.Body>
                <div>
                  <h3>Add Medication</h3>
                </div>
                <Form noValidate onSubmit={drugSubmitHandler}>
                  <div className="mb-4">
                    <Form.Group controlId="hellooo">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>Medicine Name</h6>
                        <p>Suggest a Medicine</p>
                      </div>
                      <Form.Control
                        type="text"
                        value={medicineName}
                        placeholder="Write medicine name here..."
                        onFocus={searchMedicine}
                        onChange={(e) => searchMedicine(e)}
                      />
                      <div className="my-3">
                        {medicines &&
                          medicines.length > 0 &&
                          medicines.map((item, index) => (
                            <div
                              className="medicineName mb-0"
                              key={index}
                              onClick={() => medicineSelection(item.brand_name)}
                            >
                              <h6>
                                {item.brand_name}
                                <span>{`( ${item.generic_name} )`} </span>
                              </h6>
                              <p>{item.pharmaceutical_company_name} </p>
                            </div>
                          ))}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6>Dosage</h6>
                    </div>

                    <div className="dosageType">
                      <Fragment>
                        <Form.Group controlId="helloooasfds">
                          <Form.Control
                            type="text"
                            value={
                              drugInfo.dosage && drugInfo.dosage.dosage_value
                            }
                            placeholder={`${
                              drugInfo.dosage.dosage_type === "hourly"
                                ? "choose a hourly Formate"
                                : drugInfo.dosage.dosage_type === "1/0 format"
                                ? "choose a  1/0 format"
                                : drugInfo.dosage.dosage_type === "presets"
                                ? "choose a  presets Format"
                                : "Write Yourself"
                            }`}
                            onFocus={() =>
                              dosageListHandler(drugInfo.dosage.dosage_type)
                            }
                            onChange={(e) => getDosageList(e)}
                          />
                        </Form.Group>
                        <div className="my-3 listOfEntry">
                          {dosageList.length > 0 &&
                            dosageList.map((item, index) => (
                              <p
                                className="medicineName mb-0"
                                key={index}
                                onClick={() => dosageValueHandler(item)}
                              >
                                {item}
                              </p>
                            ))}
                        </div>
                      </Fragment>
                    </div>
                    <div className="d-flex">
                      <Form.Group controlId="hellooorwrwqe">
                        <Form.Check
                          type="checkbox"
                          checked={drugInfo.dosage.dosage_type === "hourly"}
                          label="Hourly"
                          onChange={() => dosageHandler("hourly")}
                        />
                      </Form.Group>
                      <Form.Group controlId="hellooodfsda">
                        <Form.Check
                          type="checkbox"
                          checked={drugInfo.dosage.dosage_type === "1/0 format"}
                          label="1/0 Format"
                          onChange={() => dosageHandler("1/0 format")}
                        />
                      </Form.Group>
                      <Form.Group controlId="hellooo13142">
                        <Form.Check
                          type="checkbox"
                          label="Presets"
                          checked={drugInfo.dosage.dosage_type === "presets"}
                          onChange={() => dosageHandler("presets")}
                        />
                      </Form.Group>
                      <Form.Group controlId="hellooosdgfds">
                        <Form.Check
                          type="checkbox"
                          label="Write Yourself"
                          checked={
                            drugInfo.dosage.dosage_type === "Write Yourself"
                          }
                          onChange={() => dosageHandler("Write Yourself")}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Form.Group controlId="hellooofsafasf;">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>Duration</h6>
                      </div>
                      <div>
                        {drugInfo.duration &&
                        drugInfo.duration.duration_type === "Days" ? (
                          <Fragment>
                            <Form.Group controlId="helloooasfds">
                              <Form.Control
                                type="text"
                                value={
                                  drugInfo.duration &&
                                  drugInfo.duration.duration_value
                                }
                                placeholder="Select days"
                                onFocus={() => setDurationList(daysList)}
                                onChange={(e) =>
                                  setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_value: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Form.Group>
                            <div className="my-3 listOfEntry">
                              {durationList &&
                                durationList.length > 0 &&
                                durationList.map((item, index) => (
                                  <p
                                    className="medicineName mb-0"
                                    key={index}
                                    onClick={() => durationValueHandler(item)}
                                  >
                                    {item}
                                  </p>
                                ))}
                            </div>
                          </Fragment>
                        ) : drugInfo.duration.duration_type === "Months" ? (
                          <Fragment>
                            <Form.Group controlId="helasfds">
                              <Form.Control
                                type="text"
                                value={
                                  drugInfo.duration &&
                                  drugInfo.duration.duration_value
                                }
                                placeholder="Select Months"
                                onFocus={() => setDurationList(monthList)}
                                onChange={(e) =>
                                  setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_value: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Form.Group>
                            <div className="my-3 listOfEntry">
                              {durationList &&
                                durationList.length > 0 &&
                                durationList.map((item, index) => (
                                  <p
                                    className="medicineName mb-0"
                                    key={index}
                                    onClick={() => durationValueHandler(item)}
                                  >
                                    {item}
                                  </p>
                                ))}
                            </div>
                          </Fragment>
                        ) : drugInfo.duration.duration_type === "Years" ? (
                          <Fragment>
                            <Form.Group controlId="helasfds">
                              <Form.Control
                                type="text"
                                value={
                                  drugInfo.duration &&
                                  drugInfo.duration.duration_value
                                }
                                placeholder="Select Years"
                                onFocus={() => setDurationList(yearList)}
                                onChange={(e) =>
                                  setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_value: e.target.value,
                                    },
                                  })
                                }
                              />
                            </Form.Group>
                            <div className="my-3 listOfEntry">
                              {durationList &&
                                durationList.length > 0 &&
                                durationList.map((item, index) => (
                                  <p
                                    className="medicineName mb-0"
                                    key={index}
                                    onClick={() => durationValueHandler(item)}
                                  >
                                    {item}
                                  </p>
                                ))}
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Form.Group controlId="helloooasfds">
                              <Form.Control
                                type="text"
                                disabled
                                value={
                                  drugInfo.duration &&
                                  drugInfo.duration.duration_value
                                }
                                placeholder="Continue till next notice"
                              />
                            </Form.Group>
                          </Fragment>
                        )}
                      </div>
                      <div className="d-flex">
                        <Form.Group controlId="safdsafphellooo">
                          <Form.Check
                            type="checkbox"
                            checked={drugInfo.duration.duration_type === "Days"}
                            label="Days"
                            onChange={() =>
                              drugInfo.duration.duration_type === "Days"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "",
                                      duration_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "Days",
                                      duration_value: "",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="helloooafsfa">
                          <Form.Check
                            type="checkbox"
                            checked={
                              drugInfo.duration.duration_type === "Months"
                            }
                            label="Months"
                            onChange={() =>
                              drugInfo.duration.duration_type === "Months"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "",
                                      duration_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "Months",
                                      duration_value: "",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="wqerhellooo">
                          <Form.Check
                            type="checkbox"
                            label="Years"
                            checked={
                              drugInfo.duration.duration_type === "Years"
                            }
                            onChange={() =>
                              drugInfo.duration.duration_type === "Years"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "",
                                      duration_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "Years",
                                      duration_value: "",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="hellooowqerq">
                          <Form.Check
                            type="checkbox"
                            label="Continue till next notice"
                            checked={
                              drugInfo.duration.duration_type ===
                              "Continue till next notice"
                            }
                            onChange={() =>
                              drugInfo.duration.duration_type ===
                              "Continue till next notice"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type: "",
                                      duration_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    duration: {
                                      ...drugInfo.duration,
                                      duration_type:
                                        "Continue till next notice",
                                      duration_value:
                                        "Continue till next notice",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="mb-4">
                    <Form.Group controlId="hellooosafs">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>Direction</h6>
                      </div>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={
                            drugInfo.direction &&
                            drugInfo.direction.direction_value
                          }
                          onChange={(e) =>
                            setDrugInfo({
                              ...drugInfo,
                              direction: {
                                ...drugInfo.direction,
                                direction_value: e.target.value,
                              },
                            })
                          }
                        />
                      </Form.Group>
                      <div className="d-flex">
                        <Form.Group controlId="hellooowertew">
                          <Form.Check
                            type="checkbox"
                            checked={
                              drugInfo.direction.direction_type ===
                              "Before Meal"
                            }
                            label="Before Meal"
                            onChange={() =>
                              drugInfo.direction.direction_type ===
                              "Before Meal"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "",
                                      direction_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "Before Meal",
                                      direction_value: "Before Meal",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="hellooohellooo">
                          <Form.Check
                            type="checkbox"
                            checked={
                              drugInfo.direction.direction_type === "After Meal"
                            }
                            label="After Meal"
                            onChange={() =>
                              drugInfo.direction.direction_type === "After Meal"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "",
                                      direction_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "After Meal",
                                      direction_value: "After Meal",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="hellooo0hellooo">
                          <Form.Check
                            type="checkbox"
                            label="Before Bed"
                            checked={
                              drugInfo.direction.direction_type === "Before Bed"
                            }
                            onChange={() =>
                              drugInfo.direction.direction_type === "Before Bed"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "",
                                      direction_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "Before Bed",
                                      direction_value: "Before Bed",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="hellooouuhellooo">
                          <Form.Check
                            type="checkbox"
                            label="After Waking Up"
                            checked={
                              drugInfo.direction.direction_type ===
                              "After Waking Up"
                            }
                            onChange={() =>
                              drugInfo.direction.direction_type ===
                              "After Waking Up"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "",
                                      direction_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "After Waking Up",
                                      direction_value: "After Waking Up",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                        <Form.Group controlId="hellooollhellooo">
                          <Form.Check
                            type="checkbox"
                            label="Write Yourself"
                            checked={
                              drugInfo.direction.direction_type ===
                              "Write Yourself"
                            }
                            onChange={() =>
                              drugInfo.direction.direction_type ===
                              "Write Yourself"
                                ? setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "",
                                      direction_value: "",
                                    },
                                  })
                                : setDrugInfo({
                                    ...drugInfo,
                                    direction: {
                                      ...drugInfo.direction,
                                      direction_type: "Write Yourself",
                                      direction_value: "",
                                    },
                                  })
                            }
                          />
                        </Form.Group>
                      </div>
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId="hellooo99hellooo">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>Additional Comments on this drug</h6>
                      </div>
                      <Form.Control
                        type="text"
                        placeholder=""
                        onChange={(e) =>
                          setDrugInfo({
                            ...drugInfo,
                            comment: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12 d-flex justify-content-end my-5">
                    <div className="col-md-6 d-flex justify-content-between align-items-center">
                      <button
                        className="cancelBtn"
                        type="button"
                        onClick={modalClose}
                      >
                        Close
                      </button>
                      <button className="findDocBtn" type="submit">
                        Add Drug
                      </button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default StartAppointment;
