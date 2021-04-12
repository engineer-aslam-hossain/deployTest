import React, { useState } from "react";
import StarIcon from "@material-ui/icons/Star";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

const Appointments = ({ appointments }) => {
  console.log(appointments);

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
  return (
    <>
      <div className="col-md-12 my-4 px-0" id="appointments">
        <h4 className="creditTitle">List of Your Appointments</h4>
        <div className="Credits px-0">
          {/* <div className="col-md-12 px-0 singleAppointments p-5">
            <h1>No Appointments Listed for Future</h1>
          </div> */}
          <div className="px-4">
            <p>Some Instructional Text Here</p>
          </div>
          {appointments.length > 0 ? (
            appointments.map(
              (appointment) =>
                appointment.appointment_type === "FRESH" && (
                  <Link
                    href={`/profile/patientAppointments/${[appointment._id]}`}
                    key={appointment._id}
                  >
                    <div
                      className="col-md-12 px-0 singleAppointments"
                      key={appointment._id}
                    >
                      <div className="col-md-12 d-flex px-0 flex-wrap">
                        <div className="px-4">
                          <img
                            src={
                              appointment.doctor_id &&
                              appointment.doctor_id.profile_pic
                            }
                            alt="userImg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="px-4 d-flex flex-column justify-content-between w-75">
                          <div>
                            <h3>
                              {appointment.doctor_id &&
                                appointment.doctor_id.fullname}
                            </h3>
                            <p className="apointmentType mt-2">
                              New Appointment
                            </p>
                          </div>
                          <div className="d-flex justify-content-between flex-wrap mt-3">
                            <div className="d-flex align-items-end">
                              <h5>{Math.floor(appointment.patient_due)} BDT</h5>
                            </div>
                            <div>
                              <h6>
                                {formatAMPM(
                                  new Date(appointment.appointment_time)
                                )}
                              </h6>
                              <h6>
                                {new Date(
                                  appointment.appointment_time
                                ).toDateString()}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )
          ) : (
            <div className="d-flex justify-content-center align-items-center w-100 h-50 ">
              <div className="">
                <Spinner animation="border" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-md-12 mb-4 px-0">
        <h4 className="creditTitle">Passed Appointments</h4>
        <div className="Credits px-0">
          <div className="px-4">
            <p>Some Instructional Text Here</p>
          </div>
          <div className="col-md-12 px-0 singleAppointments">
            <div className="col-md-12 d-flex px-0 flex-wrap">
              <div className="px-4">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-4 d-flex flex-column justify-content-between w-75">
                <div>
                  <h3>Dr. Generic Placeholdername</h3>
                  <div className="my-3 d-flex flex-wrap">
                    <span className="expertise">ExpertiseField</span>
                    <span className="expertise">ExpertiseField</span>
                    <span className="expertise">ExpertiseField</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap mt-3">
                  <div className="d-flex align-items-end">
                    <h5>750 BDT</h5>
                  </div>
                  <div>
                    <h6>
                      <StarIcon /> 4/5
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
