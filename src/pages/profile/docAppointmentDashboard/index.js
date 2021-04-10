import { useContext, useEffect, useState } from "react";
import DaktarContext from "../../../components/Context/Context";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const docAppointmentDashboard = () => {
  const { loggedInUser } = useContext(DaktarContext);
  const { appointment } = loggedInUser;

  const router = useRouter();

  const [appointmentDetailsShow, setAppointmentDetailsShow] = useState();

  useEffect(async () => {
    const userType = await loggedInUser.user_type;
    if (userType && userType !== "DOCTOR") {
      router.push("/");
    }
  });

  const [appointmentSchedule, setAppointmentSchedule] = useState([]);
  // console.log(loggedInUser);
  const handleAppointmentSchedule = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const getStatus = await fetch(
        `${process.env.API_BASE_URL}/doctor/get_next_seven_days_appointment_count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
        }
      );
      const data = await getStatus.json();
      setAppointmentSchedule(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAppointmentSchedule();
  }, [loggedInUser]);

  const [appointmentsForAday, setAppointmentsForAday] = useState([]);
  const [appointmentAday, setAppointmentAday] = useState(null);
  const [offDay, setoffDay] = useState(false);
  const [spinner, setspinner] = useState(false);

  // console.log(offDay);
  const getAppointmentsFor_A_Day = async (date, offDay) => {
    setoffDay(offDay);
    setAppointmentAday(date);
    setspinner(true);
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const getStatus = await fetch(
        `${process.env.API_BASE_URL}/doctor/get_my_all_appointment_for_a_date?appointment_date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
        }
      );
      const data = await getStatus.json();
      setAppointmentsForAday(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(appointmentSchedule);

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

  // console.log(appointmentsForAday);

  if (loggedInUser.user_type === "DOCTOR") {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 d-flex justify-content-between align-items-center">
              <h1 className="dashboardTitle">Appointment Dashboard</h1>
              <Link href="/profile/configureAppointments">
                <a className="editProfile py-2">
                  <FontAwesomeIcon icon={faEdit} /> Configure Appointments
                  Schedule
                </a>
              </Link>
            </div>
            <div className="col-lg-12 dashboardCard p-4">
              <div className="my-4">
                <h5>Consultation Fee : {appointment && appointment.fee} BDT</h5>
                <p>
                  You will recieve BDT ### per Consultation after adjusting x%
                  service charge.
                </p>
              </div>
              <div className="my-4">
                <h5>
                  Follow-up Fee : {appointment && appointment.followup_fee} BDT
                </h5>
                <p>
                  You will recieve BDT ### per Consultation after adjusting x%
                  service charge.
                </p>
              </div>
              <div className="my-4">
                <h5>
                  Follow-up Day limit :{" "}
                  {appointment && appointment.followup_within} Days
                </h5>
                <p>
                  Patients who come back within this time period will be counted
                  as follow-up appointments
                </p>
              </div>
              <div className="my-4">
                <h5>
                  Advanced Charge :{" "}
                  {appointment && appointment.advance_fee_percentage}%
                </h5>
                <p>
                  Patients will have to pay this percentage of charge when
                  creating an appointment. The rest will be collected after
                  completion of appointment.
                </p>
              </div>
            </div>
            <div className="col-lg-12 my-4 d-flex justify-content-between align-items-center">
              <h1 className="dashboardTitle">Appointments This WEEK</h1>
            </div>
            <div className="col-lg-12 d-flex  apointmentWeekCard px-0">
              <div className="col-lg-3 col-md-4 .col-sm-4 col-4 weekViewColumn px-0">
                <div className="weekView">
                  <h2 className="weekCardTitle">WEEK VIEW</h2>
                </div>
                {appointmentSchedule.length > 0 ? (
                  appointmentSchedule.map((item, index) => (
                    <div
                      className="appointmentView p-4"
                      key={index}
                      onClick={() =>
                        getAppointmentsFor_A_Day(
                          item.date,
                          item.off_day ? item.off_day : false
                        )
                      }
                    >
                      <h6>
                        {item.day_name}, {item.date}
                      </h6>
                      <p className="mb-1">
                        {item.off_day ? (
                          "Off Day"
                        ) : (
                          <>
                            {`${formatAMPM(
                              new Date(item.start_time)
                            )} - ${formatAMPM(new Date(item.end_time))}`}
                          </>
                        )}
                      </p>
                      <p className="patientNo">
                        {item.total_appointment} Patients (
                        {item.total_follow_appointment} Followups)
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-50 py-4">
                    <Spinner animation="border" />
                  </div>
                )}
              </div>
              <div className="col-lg-9 px-0 pb-5">
                <div>
                  <div className="col-lg-12  appointmentDivTitle">
                    <h2 className="weekCardTitle">
                      {offDay
                        ? "Off Day"
                        : appointmentAday !== null
                        ? `Appointments for ${new Date(
                            appointmentAday
                          ).toLocaleString("en-us", {
                            weekday: "long",
                          })} , ${new Date(
                            appointmentAday
                          ).toLocaleDateString()} `
                        : "NO Date Selected"}
                    </h2>
                  </div>
                  {appointmentsForAday.length > 0 ? (
                    appointmentsForAday.map((item) => (
                      <div
                        className={`col-lg-11 serialCard p-4 d-flex flex-column justify-content-between my-3 mx-auto`}
                        key={item._id}
                        onClick={() => setAppointmentDetailsShow(item._id)}
                      >
                        <div className="d-flex justify-content-between mb-3">
                          <div className="serialNo">
                            <h6>Serial: {item.serial} </h6>
                            <h4>
                              {item.patient_id && item.patient_id.fullname}
                            </h4>
                            <p>
                              {item.age} y/o, {item.weight} Kg,
                              {item.patient_id && item.patient_id.gender}
                            </p>
                          </div>
                          <div>
                            <Link
                              href={`/profile/docAppointmentDashboard/${[
                                item._id,
                              ]}`}
                            >
                              <a className="startAppointment">
                                Start Appointment
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div
                          className={`mb-3 serialDetails ${
                            appointmentDetailsShow === item._id
                              ? "detailsShow"
                              : ""
                          }`}
                        >
                          <div className="mb-4 ">
                            <h6>Health Complications:</h6>
                            <p>{item.problem_details}</p>
                          </div>
                          <div>
                            <button className="seeUploadBtn">
                              See Uploaded Files
                            </button>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <p className="apointmentType">
                              {item.appointment_type === "FRESH"
                                ? "New Appointment"
                                : item.appointment_type}
                            </p>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <h6 className="apointmentDay">
                              {new Date(item.appointment_time).toLocaleString(
                                "en-us",
                                {
                                  weekday: "long",
                                }
                              )}
                              {" , "}
                              {new Date(
                                item.appointment_time
                              ).toLocaleDateString()}
                              ,
                            </h6>
                            <p>
                              Estimated Time :{" "}
                              {formatAMPM(new Date(item.appointment_time))} -{" "}
                              {formatAMPM(new Date(item.appointment_end_time))}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : spinner ? (
                    <div className="d-flex justify-content-center align-items-center h-50 py-4">
                      <div className="appointmentDaySpinner">
                        <Spinner animation="border" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="profile">
        <div className="d-flex justify-content-center align-items-center h-50">
          <Spinner animation="border" />
        </div>
      </section>
    );
  }
};

export default docAppointmentDashboard;
