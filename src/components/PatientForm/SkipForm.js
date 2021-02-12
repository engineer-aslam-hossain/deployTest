import { Card, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const PatientSkipForm = ({ inputChange, values, setDoctorInfo }) => {
  const genders = ["Male", "Female", "Others"];
  const bankProvider = ["NAGAD", "BKASH", "ROCKET", "NONE"];

  useEffect(() => {
    !values.mobile_banking_info &&
      setDoctorInfo({
        ...values,
        mobile_banking_info: {
          ...values.mobile_banking_info,
          provider: "NAGAD",
        },
      });
  }, []);

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
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ padding: "2rem 2rem" }} className="signUpCard mx-auto">
      <Form noValidate onSubmit={submitHandler}>
        <div>
          <h3 className="formTitle text-center">Signup</h3>
          <p className="text-center">( as Patient )</p>
        </div>
        <Form.Group controlId="formBasicMobile">
          <Form.Label>Gender</Form.Label>
          <Dropdown className="d-flex flex-column justify-content-center Gender">
            <Dropdown.Toggle id="GenderDropdown">
              {values.gender ? values.gender : "Gender"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {genders.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  // onSelect={() => setDoctorInfo({ ...values, gender: item })}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group className="basicFormInput">
          <Form.Label>NID No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter NID no."
            name="nid"
            onChange={inputChange}
          />
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            name="date_of_birth"
            onChange={inputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicMobile">
          <Form.Label>Mobile Bank Info.</Form.Label>
          <div className="d-flex align-items-center">
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Enter your phone no."
                name="number"
                onChange={inputChange}
                required
              />
              <InputGroup.Append>
                <Dropdown className="d-flex flex-column justify-content-center">
                  <Dropdown.Toggle id="Mobile-Bank-Dropdown">
                    {values.mobile_banking_info
                      ? values.mobile_banking_info.provider
                      : "NAGAD"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {bankProvider.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onSelect={() =>
                          setDoctorInfo({
                            ...values,
                            mobile_banking_info: {
                              ...values.mobile_banking_info,
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
                {!values.phone ? "must have atleast 11 number" : ""}
              </Form.Control.Feedback>
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your phone no."
            name="phone_number"
            onChange={inputChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="phone_number">
            {!values.phone_number ? "Must have atleast 11 number" : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="basicFormInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={inputChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid" className="mb-3 password">
            {!values.password
              ? "Must have minimum 6 character with number"
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-column align-items-center mt-5">
          <button type="submit" className="findDocBtn">
            Save & Continue
          </button>
        </div>
      </Form>
      <div className="d-flex flex-column align-items-center mt-5 skipFormFooter">
        <button onClick={handleShow}>Skip for Now</button>
        <p>These Information are necessary for using our services.</p>
      </div>
      <Modal
        show={show}
        onHide={() => alert("Finish your setup for further move")}
      >
        <div className="p-5">
          <div className="PatientModalTop">
            <p>
              <CheckIcon /> Account Created Successfully
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center modalMsgIcon">
            <p>
              <MailOutlineIcon />
            </p>
            <h4>
              Check your Email Inbox and Verify your Email for Sobar Daktar
            </h4>
          </div>
          <div className="d-flex justify-content-center">
            <button className="findDocBtn">Finish Setup</button>
          </div>
          <div className="modalFooter">
            <p>Email Verification is necessary for using our services.</p>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default PatientSkipForm;
