import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card, Form, Nav } from "react-bootstrap";
import Swal from "sweetalert2";
import DaktarContext from "../../components/Context/Context";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const ConfigureAppointments = () => {
  const [active, setActive] = useState(1);
  const { loggedInUser, setLoggedInUser } = useContext(DaktarContext);
  // console.log(loggedInUser);
  const [appointmentDetails, setAppointmentDetails] = useState({
    fee: 0,
    time_per_patient: 0,
    followup_within: 0,
    followup_fee: 0,
    advance_fee_percentage: 0,
  });

  const [saturday, setSaturday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Saturday",
  });

  const [sunday, setSunday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Sunday",
  });

  const [monday, setMonday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Monday",
  });

  const [Tuesday, setTuesday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Tuesday",
  });

  const [WednesDay, setWednesDay] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Wednesday",
  });

  const [Thursday, setThursday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Thursday",
  });

  const [Friday, setFriday] = useState({
    start_time_hour: 0,
    start_time_min: 0,
    end_time_hour: 0,
    end_time_min: 0,
    off_day: false,
    day: "Friday",
  });

  // console.log(saturday, sunday, monday, Tuesday, WednesDay, Thursday, Friday);
  const satrudayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(saturday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const sundayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(sunday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const mondayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(monday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const tuesdayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(Tuesday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const wednesDayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(WednesDay),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const thursdayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(Thursday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fridayAppointmentTime = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/set_appointment_time_for_certain_day`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(Friday),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const appointmentScheduleHandler = async (e) => {
    e.preventDefault();
    await satrudayAppointmentTime();
    await sundayAppointmentTime();
    await mondayAppointmentTime();
    await tuesdayAppointmentTime();
    await wednesDayAppointmentTime();
    await thursdayAppointmentTime();
    await fridayAppointmentTime();
    Swal.fire({
      icon: "success",
      title: "Successfully Change the schedule",
    });
  };

  const appointmentDetailsChangeHandler = async (e) => {
    e.preventDefault();
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/change_appointment_details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify(appointmentDetails),
        }
      );
      const data = await res.json();
      if (data.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Successfully change appointment details",
        });
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

  const [availability, setAvailability] = useState(loggedInUser.available);
  // console.log(loggedInUser);
  useEffect(() => {
    setAvailability(loggedInUser.available);
  }, [loggedInUser.available]);

  const statusHandler = async (e) => {
    // console.log(e);
    if (e) {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/make_me_available`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              sobar_daktar_session: getToken,
            },
          }
        );
        const data = await res.json();
        // console.log(data);
        if ((data.success = "yes")) {
          try {
            const getToken = JSON.parse(localStorage.getItem("loginToken"));
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
              {
                method: "GET",
                headers: { sobar_daktar_session: getToken },
                mode: "cors",
              }
            );
            const data = await res.json();
            // console.log(data);
            setLoggedInUser(data);
          } catch (err) {
            console.log(err);
          }
        }
        Swal.fire({
          icon: "success",
          title: "Successfully change Availability",
          showConfirmButton: false,
          timer: 1000,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const getToken = JSON.parse(localStorage.getItem("loginToken"));
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/make_me_unavailable`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              sobar_daktar_session: getToken,
            },
          }
        );
        const data = await res.json();
        if ((data.success = "yes")) {
          try {
            const getToken = JSON.parse(localStorage.getItem("loginToken"));
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
              {
                method: "GET",
                headers: { sobar_daktar_session: getToken },
                mode: "cors",
              }
            );
            const data = await res.json();
            // console.log(data);
            setLoggedInUser(data);
          } catch (err) {
            console.log(err);
          }
        }
        Swal.fire({
          icon: "success",
          title: "Successfully change Availability",
          showConfirmButton: false,
          timer: 1000,
        });
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 d-flex justify-content-between align-items-center">
            <h1 className="dashboardTitle">Configure Appointments</h1>
            <Link href="/profile/docAppointmentDashboard">
              <a className="editProfile py-2">Back to Appointment Dashboard</a>
            </Link>
          </div>
          <div className="col-lg-12 py-5 px-0 d-flex justify-content-end align-items-center">
            <div className="col-lg-6 mb-4 configureForm">
              <div className="d-flex align-items-center justify-content-end">
                <div className="activeStatus mr-5">
                  <h5>Active Status</h5>
                </div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={availability || false}
                        onChange={(e) => statusHandler(e.target.checked)}
                        name="checkedB"
                      />
                    }
                    label="ON"
                  />
                </FormGroup>
              </div>
              <Form.Text className="text-muted text-right">
                Turning this off will prevent users from finding you in search &
                setting further appointments. But Appointments already set for
                the next week will NOT be cancelled.
              </Form.Text>
            </div>
          </div>
          <div className="col-lg-12">
            <Nav justify variant="tabs" defaultActiveKey="link-1">
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => setActive(1)}>
                  Appointment Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => setActive(2)}>
                  Appointment Schedule
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          {active === 1 ? (
            <div className="col-lg-12 py-5 appointmentDetailsTab">
              <div className="Credits">
                <Form noValidate onSubmit={appointmentDetailsChangeHandler}>
                  <div className="col-lg-6 mb-5 configureForm">
                    <Form.Group>
                      <Form.Label>Consultation Fee</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="BDT"
                        onChange={(e) =>
                          setAppointmentDetails({
                            ...appointmentDetails,
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
                          setAppointmentDetails({
                            ...appointmentDetails,
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
                          setAppointmentDetails({
                            ...appointmentDetails,
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
                          setAppointmentDetails({
                            ...appointmentDetails,
                            advance_fee_percentage: parseInt(e.target.value),
                          })
                        }
                      />
                      <Form.Text className="text-muted">
                        Patients will have to pay this percentage of charge when
                        creating an appointment. The rest will be collected
                        after completion of appointment.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Estimated Time Per Patient</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Minutes"
                        onChange={(e) =>
                          setAppointmentDetails({
                            ...appointmentDetails,
                            time_per_patient: parseInt(e.target.value),
                          })
                        }
                      />
                      <Form.Text className="text-muted">
                        Our system will suggest you proper time scheduling based
                        on this value
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-lg-12">
                    <div className="col-md-4 d-flex justify-content-between my-5 px-0">
                      <button className="findDocBtn" type="submit">
                        Save Changes
                      </button>
                      <button className="cancelBtn" type="button">
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          ) : loggedInUser.appointment === null ? (
            <div className="col-md-12 my-4 px-0">
              <h4 className="creditTitle">WEEK Schedule</h4>
              <div className="Credits px-0">
                <div className="col-lg-12 weekScheduleForm">
                  <Card>
                    <h1>hello</h1>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <Form
                className=""
                noValidate
                onSubmit={appointmentScheduleHandler}
              >
                <div className="col-md-12 my-4 px-0">
                  <h4 className="creditTitle">WEEK Schedule</h4>
                  <div className="Credits px-0">
                    <div className="col-lg-12 weekScheduleForm">
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Saturday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setSaturday({
                                    ...saturday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setSaturday({
                                    ...saturday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setSaturday({
                                  ...saturday,
                                  off_day: !saturday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Sunday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setSunday({
                                    ...sunday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setSunday({
                                    ...sunday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox1">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setSunday({
                                  ...sunday,
                                  off_day: !sunday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Monday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setMonday({
                                    ...monday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setMonday({
                                    ...monday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox2">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setMonday({
                                  ...monday,
                                  off_day: !monday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Tuesday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setTuesday({
                                    ...Tuesday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setTuesday({
                                    ...Tuesday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox3">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setTuesday({
                                  ...Tuesday,
                                  off_day: !Tuesday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Wednesday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setWednesDay({
                                    ...WednesDay,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setWednesDay({
                                    ...WednesDay,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox4">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setWednesDay({
                                  ...WednesDay,
                                  off_day: !WednesDay.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Thursday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setThursday({
                                    ...Thursday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setThursday({
                                    ...Thursday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox5">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setThursday({
                                  ...Thursday,
                                  off_day: !Thursday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-4">
                        <div className="col-lg mb-3">
                          <h5>Friday</h5>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Starting Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setFriday({
                                    ...Friday,
                                    start_time_hour: e.target.value.split(
                                      ":"
                                    )[0],
                                    start_time_min: e.target.value.split(
                                      ":"
                                    )[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                          <div>to</div>
                          <div className="col-lg-6">
                            <Form.Group>
                              <Form.Label>Ending Time</Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Minutes"
                                onChange={(e) =>
                                  setFriday({
                                    ...Friday,
                                    end_time_hour: e.target.value.split(":")[0],
                                    end_time_min: e.target.value.split(":")[1],
                                  })
                                }
                              />
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg">
                          <Form.Group controlId="formBasicCheckbox6">
                            <Form.Check
                              type="checkbox"
                              label="Mark as Off Day"
                              onChange={(e) =>
                                setFriday({
                                  ...Friday,
                                  off_day: !Friday.off_day,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 px-4">
                      <div className="col-md-4 d-flex justify-content-between my-5 px-3">
                        <button className="findDocBtn" type="submit">
                          Save Changes
                        </button>
                        <button className="cancelBtn" type="button">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfigureAppointments;

// export async function getServerSideProps({ req, res }) {
//   // Get the user's session based on the request
//   const user = await JSON.parse(localStorage.getItem("loginToken"));

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/Login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { user },
//   };
// }
