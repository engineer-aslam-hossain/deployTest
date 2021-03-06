import { useContext, useEffect } from "react";
import DaktarContext from "../../components/Context/Context";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
const docAppointmentDashboard = () => {
  const { loggedInUser } = useContext(DaktarContext);
  const router = useRouter();
  //   console.log(loggedInUser);

  useEffect(async () => {
    const userType = await loggedInUser.user_type;
    if (userType && userType !== "DOCTOR") {
      router.push("/");
    }
  });

  if (loggedInUser.user_type === "DOCTOR") {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 d-flex justify-content-between align-items-center">
              <h1 className="dashboardTitle">Appointment Dashboard</h1>
              <button className="editProfile py-2">
                <FontAwesomeIcon icon={faEdit} /> Configure Appointments
                Schedule
              </button>
            </div>
            <div className="col-lg-12 dashboardCard p-4">
              <div className="my-4">
                <h5>Consultation Fee: 750 BDT</h5>
                <p>
                  You will recieve BDT ### per Consultation after adjusting x%
                  service charge.
                </p>
              </div>
              <div className="my-4">
                <h5>Follow-up Fee: 500 BDT</h5>
                <p>
                  You will recieve BDT ### per Consultation after adjusting x%
                  service charge.
                </p>
              </div>
              <div className="my-4">
                <h5>Follow-up Day limit: 7 Days</h5>
                <p>
                  Patients who come back within this time period will be counted
                  as follow-up appointments
                </p>
              </div>
              <div className="my-4">
                <h5>Advanced Charge: 30%</h5>
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
                <div className="appointmentView p-4">
                  <h6>Saturday, 06.03.2021</h6>
                  <p className="mb-1">10:00am - 02:00pm</p>
                  <p className="patientNo">10 Patients (4 Followups)</p>
                </div>
              </div>
              <div className="col-lg-9 px-4 pb-5">
                <div className="col-lg-12 mt-3 my-5">
                  <h2 className="weekCardTitle">
                    Appointments for Sunday, 07.03.2021
                  </h2>
                </div>
                <div className="col-lg-12 serialCard p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="serialNo">
                      <h6>Serial: 01</h6>
                      <h4>Name of Patient</h4>
                      <p>32 y/o, 60 Kg, Female</p>
                    </div>
                    <div>
                      <button className="callNowBtn">Call Now</button>
                    </div>
                  </div>
                  <div className="mb-3 serialDetails">
                    <div className="mb-4 ">
                      <h6>Health Complications:</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec pellentesque mauris risus, at egestas nibh
                        condimentum ut. Integer et metus sit amet est gravida
                        rutrum sit amet vitae augue. Nulla non enim sagittis ex
                        suscipit posuere. Phasellus gravida enim non molestie
                        mattis. Duis eget dui in augue viverra rutrum. Nunc
                        sodales pretium consectetur. Sed non porttitor orci.
                        Morbi dapibus sollicitudin mi in volutpat. Suspendisse
                        ac lacus molestie, lacinia odio eget
                      </p>
                    </div>
                    <div>
                      <button className="seeUploadBtn">
                        See Uploaded Files
                      </button>
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
